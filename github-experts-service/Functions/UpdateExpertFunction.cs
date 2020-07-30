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

    public static class RefreshFromGithubYamlFunction
    {
        [FunctionName("RefreshFromGithubYaml")]
        public static async Task<IActionResult> Run(
            [HttpTrigger(AuthorizationLevel.Anonymous, "post", Route = "refreshfromgithubyaml")] HttpRequest req,
            ILogger log)
        {
            log.LogInformation("RefreshFromGithubYaml(): Received request");

            using StreamReader reader = new StreamReader(req.Body);
            try
            {
                string requestBody = reader.ReadToEnd();
                var repo = JsonConvert.DeserializeObject<RepositoryEntity>(requestBody);

                var yamlData = await GithubExpertsData.GetTutorYamlAsync(repo.Repository);

                // Populate PartitionKey and RowKey
                foreach (var item in yamlData.Experts)
                {
                    item.RowKey = item.Handle.ToLower();
                    item.Repository = repo.Repository.ToLower();
                    item.PartitionKey = repo.Repository.Replace("/", "+").ToLower();
                }

                await ExpertData.UpsertExpertsAsync(yamlData.Experts);
                
                return new OkResult();
            }
            catch (JsonSerializationException ex)
            {
                log.LogError(string.Format("RefreshFromGithubYaml(): JsonSerializationException occurred {0}:{1}", ex.Message, ex.InnerException));
                return new BadRequestObjectResult(ex.Message);
            }
            catch (StorageException ex)
            {
                log.LogError(string.Format("RefreshFromGithubYaml(): StorageException occurred {0}:{1}", ex.Message, ex.InnerException));
                return new BadRequestObjectResult(ex.Message);
            }
            catch (Exception ex)
            {
                log.LogError(string.Format("RefreshFromGithubYaml(): Exception occurred {0}:{1}", ex.Message, ex.InnerException));
                return new InternalServerErrorResult();
            }
        }
    }
}
