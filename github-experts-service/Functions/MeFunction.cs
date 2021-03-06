namespace GithubExpertsService
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Net.Http;
    using System.Net.Http.Headers;
    using System.Text.Json;
    using System.Threading.Tasks;
    using GithubExperts.Api;
    using Microsoft.AspNetCore.Http;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.Azure.WebJobs;
    using Microsoft.Azure.WebJobs.Extensions.Http;
    using Microsoft.Extensions.Logging;
    using Microsoft.Extensions.Primitives;

    public static class MeFunction
    {
        [FunctionName("me")]
        public static async Task<IActionResult> Run(
            [HttpTrigger(AuthorizationLevel.Anonymous, "get", "post", Route = "me")] HttpRequest req,
            ILogger log)
        {
            if (!req.Headers.TryGetValue("X-MS-TOKEN-AAD-ID-TOKEN", out StringValues idToken))
            {
                return new ObjectResult("Missing id token")
                {
                    StatusCode = 401,
                };
            }

            log.LogInformation("Fetching AAD identities using token {idToken}", idToken);

            var aadClient = new HttpClient();
            aadClient.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
            aadClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", idToken);
            aadClient.BaseAddress = new Uri($"{req.Scheme}://{req.Host}");

            var aadMeResponse = await aadClient.GetStreamAsync("/.auth/me");
            var aadIdentities = await JsonSerializer.DeserializeAsync<List<AADIdentity>>(aadMeResponse);

            var githubToken = aadIdentities.FirstOrDefault(identity => identity.ProviderName == "aad")
                ?.UserClaims
                ?.FirstOrDefault(claim => claim.Type == "idp_access_token")
                ?.Value;

            if (githubToken == null)
            {
                return new ObjectResult("Missing github token")
                {
                    StatusCode = 401,
                };
            }

            log.LogInformation("Fetching Github identity using token {githubToken}", githubToken);

            var githubClient = new HttpClient();
            githubClient.DefaultRequestHeaders.UserAgent.Add(new ProductInfoHeaderValue(new ProductHeaderValue("github-experts-service")));
            githubClient.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/vnd.github.v3+json"));
            githubClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", githubToken);
            githubClient.BaseAddress = new Uri("https://api.github.com");

            var githubMeResponse = await githubClient.GetStreamAsync("/user");
            var githubIdentity = await JsonSerializer.DeserializeAsync<GithubIdentity>(githubMeResponse);

            return new JsonResult(githubIdentity);
        }
    }
}
