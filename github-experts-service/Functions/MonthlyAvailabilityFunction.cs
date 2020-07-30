namespace GithubExperts.Api.Functions
{
    using System;
    using System.Collections.Generic;
    using System.IO;
    using System.Linq;
    using System.Threading.Tasks;
    using System.Web.Http;
    using GithubExperts.Api.DataAccess;
    using GithubExperts.Api.Models;
    using Microsoft.AspNetCore.Http;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.Azure.Cosmos.Table;
    using Microsoft.Azure.WebJobs;
    using Microsoft.Azure.WebJobs.Extensions.Http;
    using Microsoft.Extensions.Logging;
    using Microsoft.Extensions.Primitives;
    using Newtonsoft.Json;

    public static class MonthlyAvailability
    {
        [FunctionName("MonthlyAvailability")]
        public static async Task<IActionResult> Run(
            [HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = "monthlyavailability/{repo}/{handle}")] HttpRequest req,
            string repo,
            string handle,
            ILogger log)
        {
            DateTime startDate, endDate;
            StringValues startBuffer, endBuffer;

            log.LogInformation("MonthlyAvailability(): Received request");

            if (req.Query.TryGetValue("startdate", out startBuffer) && req.Query.TryGetValue("enddate", out endBuffer))
            {
                if (!DateTime.TryParse(startBuffer, out startDate) || !DateTime.TryParse(endBuffer, out endDate))
                {
                    log.LogError("MonthlyAvailability(): Badly formed dates in query string");
                    return new BadRequestResult();
                }
            }
            else
            {
                // Dates were not provided, use default of next 45 days
                startDate = DateTime.Today;
                endDate = DateTime.Today.AddDays(45);
            }

            // Protect from too large of a range
            if ((endDate - startDate).TotalDays > 100)
            {
                endDate = startDate.AddDays(100);
            }

            var result = await AppointmentData.GetAppointmentsAsync(repo, handle, startDate, endDate);
            var expert = await ExpertData.GetExpertAsync(handle);

            var availabilityByDay = new List<AvailabilityEntity>((int)(endDate - startDate).TotalDays);

            // Compute number of 30 minute time slots for this expert
            var totalSlotsForExpert = (expert.EndTime.TimeOfDay - expert.StartTime.TimeOfDay).TotalHours / 30;
            var dayLoop = startDate;

            while (dayLoop <= endDate)
            {
                bool hasAvailability = false;

                // Check if day is a "working" day
                if (expert.ExcludeWeekends == false ||
                    (dayLoop.DayOfWeek != DayOfWeek.Saturday && dayLoop.DayOfWeek != DayOfWeek.Sunday))
                {
                    // Look how many time slots were filled and compare against total slots
                    var numAppointments = result.Count(x => x.DateTime.Date == dayLoop.Date);

                    hasAvailability = numAppointments < totalSlotsForExpert;
                }

                availabilityByDay.Add(new AvailabilityEntity
                    {
                        StartDate = dayLoop,
                        EndDate = dayLoop,
                        Available = hasAvailability,
                    });

                dayLoop = dayLoop.AddDays(1);
            }

            log.LogInformation("here");

            return new OkObjectResult(availabilityByDay);
        }
    }
}
