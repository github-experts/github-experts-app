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

    public static class UpdateExpertFunction
    {
        [FunctionName("UpdateExpert")]
        public static async Task<IActionResult> Run(
            [HttpTrigger(AuthorizationLevel.Anonymous, "post", Route = "updateexpert")] HttpRequest req,
            ILogger log)
        {
            log.LogInformation("UpdateExpert(): Received request");

            using StreamReader reader = new StreamReader(req.Body);
            try
            {
                string requestBody = reader.ReadToEnd();
                ExpertEntity expert = JsonConvert.DeserializeObject<ExpertEntity>(requestBody);

                var data = await GithubTutorsData.GetAppointmentAsync("github-experts/github-experts-sample-repo");

                // var table = CosmosTableUtil.GetTableReference("expert");
                // var result = await table.ExecuteAsync(TableOperation.InsertOrMerge(expert));
                // return new OkObjectResult(result.Result as ExpertEntity);
                return new OkResult();
            }
            catch (JsonSerializationException ex)
            {
                log.LogError(string.Format("CreateAppointment(): JsonSerializationException occurred {0}:{1}", ex.Message, ex.InnerException));
                return new BadRequestObjectResult(ex.Message);
            }
            catch (StorageException ex)
            {
                log.LogError(string.Format("CreateAppointment(): StorageException occurred {0}:{1}", ex.Message, ex.InnerException));
                return new BadRequestObjectResult(ex.Message);
            }
            catch (Exception ex)
            {
                log.LogError(string.Format("CreateAppointment(): Exception occurred {0}:{1}", ex.Message, ex.InnerException));
                return new InternalServerErrorResult();
            }
        }
    }
}
