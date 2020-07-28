namespace GithubExperts.Api.Functions
{
    using System;
    using System.IO;
    using System.Linq;
    using System.Threading.Tasks;
    using System.Web.Http;
    using GithubExperts.Api.Models;
    using Microsoft.AspNetCore.Http;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.Azure.Cosmos.Table;
    using Microsoft.Azure.WebJobs;
    using Microsoft.Azure.WebJobs.Extensions.Http;
    using Microsoft.Extensions.Primitives;
    using Microsoft.Extensions.Logging;
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
            StringValues startbuf, endbuf;

            log.LogInformation("MonthlyAvailability(): Received request");

            if (req.Query.TryGetValue("startdate", out startbuf) && req.Query.TryGetValue("enddate", out endbuf)) 
            {
                if (!DateTime.TryParse(startbuf, out startDate) || !DateTime.TryParse(endbuf, out endDate)) 
                {
                    log.LogError("MonthlyAvailability(): Badly formed dates in query string");
                    return new BadRequestResult();
                }
            } else {
                //Dates were not provided, use default of next 45 days
                startDate = DateTime.Today;
                endDate = DateTime.Today.AddDays(45);
            }

            //Read in schedule for this repo and handle for these dates
            var table = Common.CosmosTableClient.Value.GetTableReference("schedule"); // TODO: abstract this so that it's not a bare string

            TableQuery<AppointmentEntity> query = new TableQuery<AppointmentEntity>()
                .Where(TableQuery.CombineFilters(
                    TableQuery.CombineFilters(
                        TableQuery.GenerateFilterCondition("PartitionKey", QueryComparisons.Equal, repo),
                        TableOperators.And,
                        TableQuery.GenerateFilterCondition("Expert", QueryComparisons.Equal, handle)),
                    TableOperators.And,
                    TableQuery.CombineFilters(
                        TableQuery.GenerateFilterConditionForDate("DateTime", QueryComparisons.GreaterThanOrEqual, startDate),
                        TableOperators.And,
                        TableQuery.GenerateFilterConditionForDate("DateTime", QueryComparisons.LessThanOrEqual, endDate))
                )
                );
                
            var result = table.ExecuteQuery(query);
            string bitmap;

            if (result.Any())
            {
                var day = startDate;
                while(day <= endDate) 
                {
                    //Check if day is a "working" day


                    //Look how many time slots were filled and compare against total slots
    
                    
                }
            }

            log.LogInformation("here");
            // catch (StorageException ex)
            // {
            //     log.LogError(string.Format("CreateAppointment(): StorageException occurred {0}:{1}", ex.Message, ex.InnerException));
            //     return new BadRequestObjectResult(ex.Message);
            // }
            // catch (Exception ex)
            // {
            //     log.LogError(string.Format("CreateAppointment(): Exception occurred {0}:{1}", ex.Message, ex.InnerException));
            //     return new InternalServerErrorResult();
            // }

            // .Select(x => new AppointmentEntity() {
            //         Id = x.Id,
            //         Expert = x.Expert,
            //         Repo = x.Repo,
            //         Date = x.Date,
            //         Time = x.Time,
            //         Details = x.Details,
            //         Status = x.Status,
            //         RequestFree = x.RequestFree,
            //         Requestor = x.Requestor,
            //         Rate = x.Rate
            //     });
            return new OkResult();
        }
    }
}
