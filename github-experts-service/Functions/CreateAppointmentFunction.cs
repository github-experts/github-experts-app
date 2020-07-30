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

    public static class CreateAppointmentFunction
    {
        [FunctionName("CreateAppointment")]
        public static async Task<IActionResult> Run(
            [HttpTrigger(AuthorizationLevel.Anonymous, "post", Route = "appointment")] HttpRequest req,
            ILogger log)
        {
            log.LogInformation("CreateAppointment(): Received request");

            using StreamReader reader = new StreamReader(req.Body);
            try
            {
                string requestBody = reader.ReadToEnd();
                AppointmentEntity appointmentEntity = JsonConvert.DeserializeObject<AppointmentEntity>(requestBody);

                // Set status for new appointment request
                appointmentEntity.Status = "requested";

                var table = CosmosTableUtil.GetTableReference("schedule");
                var result = await table.ExecuteAsync(TableOperation.InsertOrMerge(appointmentEntity));

                var appointment = result.Result as AppointmentEntity;
                var expert = await ExpertData.GetExpertAsync(appointment.Expert);
                await EmailUtil.SendEmailAsync(appointment, expert);

                return new OkObjectResult(appointment);
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
