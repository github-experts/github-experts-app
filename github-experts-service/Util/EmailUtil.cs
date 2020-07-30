namespace GithubExperts.Api.Util
{
    using System;
    using System.Collections.Generic;
    using System.Text;
    using System.Text.Json;
    using System.Threading.Tasks;
    using GithubExperts.Api.Models;
    using Microsoft.Azure.ServiceBus;

    internal static class EmailUtil
    {
        public static async Task SendEmailAsync(AppointmentEntity appointment, ExpertEntity expert)
        {
            var emailMessage = BuildEmailMessageFor(appointment, expert);
            var queueClient = new QueueClient(Environment.GetEnvironmentVariable("SERVICE_BUS_CONNECTION_STRING"), "email");
            var message = new Message(Encoding.UTF8.GetBytes(JsonSerializer.Serialize<EmailMessage>(emailMessage)));
            await queueClient.SendAsync(message);
            await queueClient.CloseAsync();
        }

        private static EmailMessage BuildEmailMessageFor(AppointmentEntity appointment, ExpertEntity expert)
        {
            var template = string.Empty;
            var toAddr = string.Empty;
            var link = string.Empty;
            if (appointment.Status == "requested")
            {
                template = "request";
                toAddr = expert.Email;
                link = $"https://{Environment.GetEnvironmentVariable("BACKEND_HOSTNAME")}/site/scheduler/{expert.Handle}";
            }
            else if (appointment.Status == "accepted")
            {
                template = "confirmation";
                toAddr = appointment.Requestor;
                link = $"https://{Environment.GetEnvironmentVariable("BACKEND_HOSTNAME")}/site/videocall/{appointment.Id}";
            }

            /* TODO template conversions for 'completed' and 'rejected' */

            var placeholders = new Dictionary<string, string>();
            placeholders.Add("name", appointment.Requestor);
            placeholders.Add("date", appointment.DateTime.ToString("dddd, MMMM dd yyyy"));
            placeholders.Add("time", appointment.DateTime.ToString("HH:mm tt"));
            placeholders.Add("repo name here", appointment.Repo);
            placeholders.Add("link", link);
            return new EmailMessage
            {
                To = toAddr,
                Template = template,
                Placeholders = placeholders,
            };
        }
    }
}
