using System;
using System.IO;
using System.Threading.Tasks;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Microsoft.Azure.Cosmos.Table;
using Newtonsoft.Json;
using GithubExpertsService.Model;

namespace GithubExpertsService.Api
{
    public static class CreateAppointment
    {
        [FunctionName("CreateAppointment")]
        public static async Task<IActionResult> Run(
            [HttpTrigger(AuthorizationLevel.Anonymous, "post", Route = null)] HttpRequest req,
            ILogger log)
        {
            log.LogInformation("Create Appointment request.");

            AppointmentEntity appointment = null;
            try
            {
                string requestBody = await new StreamReader(req.Body).ReadToEndAsync();
                appointment = JsonConvert.DeserializeObject<AppointmentEntity>(requestBody);

            }
            catch (Exception ex)
            {
                var err = new RequestError() {
                    Message = ex.Message
                };

                log.LogError(string.Format("CreateAppointment(): payload parsing {0}:{1}", ex.Message, ex.InnerException));

                return new BadRequestObjectResult(err);
            }

            try
            {
                // Retrieve storage account information from connection string.
                var storageAccount = Common.CosmosTableClient;
                var table = Common.CosmosTableClient.Value.GetTableReference("schedule");

                TableOperation insert = TableOperation.InsertOrMerge(appointment);
                TableResult result = await table.ExecuteAsync(insert);
                var insertedAppointment = result.Result as AppointmentEntity;

                return new OkObjectResult(insertedAppointment);

            } catch (StorageException e)
            {
                var err = new RequestError() {
                    Message = e.Message
                };

                log.LogError(string.Format("CreateAppointment(): Storage exception occurred {0}:{1}", e.Message, e.InnerException));
                return new BadRequestObjectResult(err);
            }
        }
    }
}
