namespace GithubExperts.Api.Functions
{
    using System;
    using System.Collections.Generic;
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

    public static class UpdateAppointmentFunction
    {
        [FunctionName("UpdateAppointment")]
        public static async Task<IActionResult> Run(
            [HttpTrigger(AuthorizationLevel.Anonymous, "patch", Route = "appointment/{repo}/{id}")] HttpRequest req,
            string repo,
            string id,
            ILogger log)
        {
            log.LogInformation("UpdateAppointment(): Received request");

            using StreamReader reader = new StreamReader(req.Body);
            try
            {
                string requestBody = reader.ReadToEnd();
                AppointmentEntity appointmentEntity = JsonConvert.DeserializeObject<AppointmentEntity>(requestBody);

                var table = CosmosTableUtil.GetTableReference("schedule");

                var appointment = await AppointmentData.GetAppointmentAsync(repo, id);
                if (appointment != null)
                {
                    appointment.Status = appointmentEntity.Status;
                    var expert = await ExpertData.GetExpertAsync(appointment.Expert);

                    // Update record
                    var result = await table.ExecuteAsync(TableOperation.InsertOrReplace(appointment));

                    // Send email to expert
                    await EmailUtil.SendEmailAsync(appointment, expert);

                    return new OkResult();
                }
                else
                {
                    return new NotFoundResult();
                }
            }
            catch (Exception ex)
            {
                log.LogError(string.Format("UpdateAppointment(): Exception occurred {0}:{1}", ex.Message, ex.InnerException));
                return new InternalServerErrorResult();
            }
        }
    }
}
