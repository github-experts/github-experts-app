namespace GithubExperts.Api.Functions
{
    using System.Threading.Tasks;
    using GithubExperts.Api.Util;
    using Microsoft.AspNetCore.Http;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.Azure.WebJobs;
    using Microsoft.Azure.WebJobs.Extensions.Http;
    using Microsoft.Extensions.Logging;

    public static class CatGeneratorFunction
    {
        [FunctionName("CatGenerator")]
        public static async Task<IActionResult> Run(
            [HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = "cat")] HttpRequest req,
            ILogger log)
        {
            log.LogInformation("CatGenerator(): Received request");

            var result = CatNameGenerator.NewCat();

            return new OkObjectResult(result);
        }
    }
}
