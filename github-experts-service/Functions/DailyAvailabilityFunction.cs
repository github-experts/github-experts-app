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

    public static class DailyAvailability
    {
        [FunctionName("DailyAvailability")]
        public static async Task<IActionResult> Run(
            [HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = "dailyavailability/{repo}/{handle}")] HttpRequest req,
            string repo,
            string handle,
            ILogger log)
        {
            DateTime startDate, endDate;
            StringValues startbuf, endbuf;

            log.LogInformation("DailyAvailability(): Received request");

            if (req.Query.TryGetValue("startdate", out startbuf) && req.Query.TryGetValue("enddate", out endbuf)) 
            {
                if (!DateTime.TryParse(startbuf, out startDate) || !DateTime.TryParse(endbuf, out endDate)) 
                {
                    log.LogError("DailyAvailability(): Badly formed dates in query string");
                    return new BadRequestResult();
                }
            } else {
                //Dates were not provided, use default of next 7 days
                startDate = DateTime.Today;
                endDate = DateTime.Today.AddDays(7);
            }

            var appointmentData = new DataAccess.AppointmentData();
            var result = await appointmentData.GetAppointmentsAsync(repo, handle, startDate, endDate);

            // TODO: Get Expert based on handle in route
            ExpertEntity expert = new ExpertEntity() {
                PartitionKey = "patniko",
                RowKey = "githubexperts",
                StartTime = new DateTime(2020, 1, 1, 9, 0, 0),
                EndTime = new DateTime(2020, 1, 1, 17, 0, 0),
                OpenToDonate = true,
                ExcludeWeekends = true,
                Handle = "patniko",
                TimeZone = "PST"
            };

            var availableTimeslots = new List<AvailabilityEntity>();

            if (result.Any())
            {
                var dayLoop = startDate;
                while (dayLoop <= endDate)
                {
                    if (expert.ExcludeWeekends == true &&
                        (dayLoop.DayOfWeek == DayOfWeek.Saturday || dayLoop.DayOfWeek == DayOfWeek.Sunday))
                    {
                        dayLoop = dayLoop.AddDays(1);
                        continue;
                    }

                    //Build slots for this day and mark as available or filled
                    var timeSlotLoop = expert.StartTime.TimeOfDay;
                    while (timeSlotLoop <= expert.EndTime.TimeOfDay)
                    {
                        var starttime = new DateTime(dayLoop.Year, dayLoop.Month, dayLoop.Day, timeSlotLoop.Hours, timeSlotLoop.Minutes, timeSlotLoop.Seconds);
                        var appointment = result.Where(x => x.DateTime.Date == dayLoop.Date && x.DateTime.TimeOfDay == timeSlotLoop).FirstOrDefault();
                        
                        var availability = new AvailabilityEntity()
                        {
                            StartDate = starttime,
                            EndDate = starttime.AddMinutes(30)
                        };

                        availability.Available = (appointment == null);

                        availableTimeslots.Add(availability);

                        // increment by 30 minutes
                        timeSlotLoop = timeSlotLoop.Add(new TimeSpan(0, 30, 0));
                    }

                    dayLoop = dayLoop.AddDays(1);
                }
            }

            return new OkObjectResult(availableTimeslots);
        }
    }
}
