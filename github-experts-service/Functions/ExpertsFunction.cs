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

    public static class Experts
    {
        [FunctionName("Experts")]
        public static async Task<IActionResult> Run(
            [HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = "experts/{repo}")] HttpRequest req,
            string repo,
            ILogger log)
        {
            log.LogInformation("Experts(): Received request");

            var result = await ExpertData.GetExpertsAsync(repo);

            return new OkObjectResult(result);
        }
    }
}
