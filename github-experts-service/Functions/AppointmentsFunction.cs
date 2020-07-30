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

    public static class Appointments
    {
        [FunctionName("Appointments")]
        public static async Task<IActionResult> Run(
            [HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = "appointments/{handle}")] HttpRequest req,
            string handle,
            ILogger log)
        {
            DateTime startDate, endDate;
            StringValues startBuffer, endBuffer;

            log.LogInformation("Appointments(): Received request");

            if (req.Query.TryGetValue("startdate", out startBuffer) && req.Query.TryGetValue("enddate", out endBuffer))
            {
                if (!DateTime.TryParse(startBuffer, out startDate) || !DateTime.TryParse(endBuffer, out endDate))
                {
                    log.LogError("Appointments(): Badly formed dates in query string");
                    return new BadRequestResult();
                }
            }
            else
            {
                // Dates were not provided, use default of next 60 days
                startDate = DateTime.Today;
                endDate = DateTime.Today.AddDays(60);
            }

            // Protect from too large of a range
            if ((endDate - startDate).TotalDays > 100)
            {
                endDate = startDate.AddDays(100);
            }

            var result = await AppointmentData.GetAppointmentsAsync(handle, AppointmentData.AppointmentStatus.Requested, startDate, endDate);

            return new OkObjectResult(result);
        }
    }
}
