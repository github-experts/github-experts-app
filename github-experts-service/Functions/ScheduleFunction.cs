namespace GithubExperts.Api.Functions
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using GithubExperts.Api.Models;
    using Microsoft.AspNetCore.Http;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.Azure.WebJobs;
    using Microsoft.Azure.WebJobs.Extensions.Http;
    using Microsoft.Extensions.Primitives;
    using Microsoft.Extensions.Logging;

    public static class Schedule
    {
        [FunctionName("Schedule")]
        public static async Task<IActionResult> Run(
            [HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = "schedule/{repo}")] HttpRequest req,
            string repo,
            ILogger log)
        {
            DateTime startDate, endDate;
            StringValues startbuf, endbuf;

            log.LogInformation("Schedule(): Received request");

            if (req.Query.TryGetValue("startdate", out startbuf) && req.Query.TryGetValue("enddate", out endbuf)) 
            {
                if (!DateTime.TryParse(startbuf, out startDate) || !DateTime.TryParse(endbuf, out endDate)) 
                {
                    log.LogError("Schedule(): Badly formed dates in query string");
                    return new BadRequestResult();
                }
            } else {
                //Dates were not provided, use default of next 7 days
                startDate = DateTime.Today;
                endDate = DateTime.Today.AddDays(7);
            }

            var appointmentData = new DataAccess.AppointmentData();
            var result = await appointmentData.GetAppointmentsAsync(repo, startDate, endDate);

            return new OkObjectResult(result);
        }
    }
}
