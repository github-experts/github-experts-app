namespace GithubExperts.Api.Functions
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using System.Web.Http;
    using GithubExperts.Api.DataAccess;
    using GithubExperts.Api.Models;
    using Microsoft.AspNetCore.Http;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.Azure.WebJobs;
    using Microsoft.Azure.WebJobs.Extensions.Http;
    using Microsoft.Extensions.Logging;


    public static class Experts
    {
        [FunctionName("Experts")]
        public static async Task<IActionResult> Run(
            [HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = "experts/{repo}")] HttpRequest req,
            string repo,
            ILogger log)
        {
            GithubExperts yamlData = null;

            log.LogInformation("Experts(): Received request");

            var result = await ExpertData.GetExpertsAsync(repo);

            // If no results, we might not have data for this repo yet...try and get it.
            if (result.Count == 0)
            {
                try
                {
                    yamlData = await GithubExpertsData.GetTutorYamlAsync(repo.Replace("+", "/"));
                    if (yamlData != null)
                    {
                        await ExpertData.UpsertExpertsAsync(yamlData.Experts, repo);
                        result = yamlData.Experts;
                    }
                }
                catch (Exception ex)
                {
                    log.LogError(string.Format("Experts(): Exception occurred {0}:{1}", ex.Message, ex.InnerException));
                    return new InternalServerErrorResult();
                }
            }

            return new OkObjectResult(result);
        }
    }
}
