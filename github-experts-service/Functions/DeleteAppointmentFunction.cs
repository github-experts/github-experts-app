namespace GithubExperts.Api.Functions
{
    using System;
    using System.IO;
    using System.Threading.Tasks;
    using System.Web.Http;
    using GithubExperts.Api.DataAccess;
    using GithubExperts.Api.Models;
    using GithubExperts.Api.Util;
    using Microsoft.AspNetCore.Http;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.Azure.Cosmos.Table;
    using Microsoft.Azure.WebJobs;
    using Microsoft.Azure.WebJobs.Extensions.Http;
    using Microsoft.Extensions.Logging;
    using Newtonsoft.Json;

    public static class DeleteAppointmentFunction
    {
        [FunctionName("DeleteAppointment")]
        public static async Task<IActionResult> Run(
            [HttpTrigger(AuthorizationLevel.Anonymous, "delete", Route = "appointment/{repo}/{id}")] HttpRequest req,
            string repo,
            string id,
            ILogger log)
        {
            log.LogInformation(string.Format("DeleteAppointment(): Received request to delete appointment with keys {0} {1}", repo, id));

            try
            {
                var table = CosmosTableUtil.GetTableReference("schedule");

                TableEntity appointment = await AppointmentData.GetAppointmentAsync(repo, id);
                if (appointment != null)
                {
                    var result = await table.ExecuteAsync(TableOperation.Delete(appointment));
                    return new OkObjectResult(result.Result as AppointmentEntity);
                }
                else
                {
                    return new NotFoundResult();
                }
            }
            catch (Exception ex)
            {
                log.LogError(string.Format("DeleteAppointment(): Exception occurred {0}:{1}", ex.Message, ex));
                return new InternalServerErrorResult();
            }
        }
    }
}
