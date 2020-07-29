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

    public static class Appointment
    {
        [FunctionName("Appointment")]
        public static async Task<IActionResult> Run(
            [HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = "appointment/{repo}/{id}")] HttpRequest req,
            string repo,
            string id,
            ILogger log)
        {
            log.LogInformation("Appointment(): Received request");

            var result = await AppointmentData.GetAppointmentAsync(repo, id);

            return new OkObjectResult(result);
        }
    }
}
