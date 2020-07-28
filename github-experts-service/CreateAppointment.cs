using System;
using System.IO;
using System.Threading.Tasks;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;

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

            string requestBody = await new StreamReader(req.Body).ReadToEndAsync();
            dynamic data = JsonConvert.DeserializeObject(requestBody);

            try 
            {
                var appointment = new Appointment() {
                    Date = data.date,
                    Time = data.time,
                    Requestor = data.requestor,
                    Status = data.status,
                    Rate = data.rate,
                    RequestFree = data.requestfree,
                    Expert = data.expert,
                    Repo = data.repo
                };
            } catch (Exception ex)
            {
                var err = new RequestError() {
                    Message = ex.Message
                }; 

                log.LogError(string.Format("CreateAppointment(): Error parsing payload. {1}", ex.InnerException));

                return new BadRequestObjectResult(err);
            }

            await documentOut.AddAsync(data);

            return new OkResult();
        }
    }
}
