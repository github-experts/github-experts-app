namespace GithubExperts.Api.Functions
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using GithubExperts.Api.DataAccess;
    using GithubExperts.Api.Models;
    using Microsoft.AspNetCore.Http;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.Azure.WebJobs;
    using Microsoft.Azure.WebJobs.Extensions.Http;
    using Microsoft.Extensions.Logging;
    using Microsoft.Extensions.Primitives;

    public static class Schedule
    {
        [FunctionName("Schedule")]
        public static async Task<IActionResult> Run(
            [HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = "schedule/{repo}")] HttpRequest req,
            string repo,
            ILogger log)
        {
            DateTime startDate, endDate;
            StringValues startBuffer, endBuffer;

            log.LogInformation("Schedule(): Received request");

            if (req.Query.TryGetValue("startdate", out startBuffer) && req.Query.TryGetValue("enddate", out endBuffer))
            {
                if (!DateTime.TryParse(startBuffer, out startDate) || !DateTime.TryParse(endBuffer, out endDate))
                {
                    log.LogError("Schedule(): Badly formed dates in query string");
                    return new BadRequestResult();
                }
            }
            else
            {
                // Dates were not provided, use default of next 31 days
                startDate = DateTime.Today;
                endDate = DateTime.Today.AddDays(31);
            }

            var result = await AppointmentData.GetAppointmentsAsync(repo, startDate, endDate);

            return new OkObjectResult(result);
        }
    }
}
