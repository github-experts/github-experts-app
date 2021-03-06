namespace GithubExpertsService
{
    using System.Collections.Generic;
    using System.IO;
    using System.Linq;
    using System.Reflection;
    using System.Text;
    using System.Text.Json;
    using GithubExperts.Api;
    using Microsoft.Azure.WebJobs;
    using Microsoft.Extensions.Logging;

    public static class SendEmailFunction
    {
        private static readonly IDictionary<string, string> Subjects = new Dictionary<string, string>
        {
            { "reminder", "Meeting reminder" },
            { "confirmation", "Meeting confirmed" },
            { "request", "You have a request" },
        };

        [FunctionName("SendEmailFunction")]
        [return: ServiceBus("tosend", Connection = "SERVICE_BUS_CONNECTION_STRING")]
        public static string Run(
            [ServiceBusTrigger("email", Connection = "SERVICE_BUS_CONNECTION_STRING")]string queueItem,
            ILogger log)
        {
            log.LogInformation("Processing message {message}", queueItem);
            var emailMessage = JsonSerializer.Deserialize<EmailMessage>(queueItem);

            var assembly = Assembly.GetExecutingAssembly();
            var templateResourceName = assembly.GetManifestResourceNames().Single(name => name.EndsWith($"{emailMessage.Template}.html"));
            using var templateResourceStream = assembly.GetManifestResourceStream(templateResourceName);
            using var templateResourceReader = new StreamReader(templateResourceStream);
            var template = templateResourceReader.ReadToEnd();

            var emailContent = new StringBuilder(template);

            foreach (var placeholder in emailMessage.Placeholders)
            {
                emailContent = emailContent.Replace($"[{placeholder.Key}]", placeholder.Value);
            }

            return JsonSerializer.Serialize(new EmailToSend
            {
                Subject = Subjects[emailMessage.Template],
                To = emailMessage.To,
                Body = emailContent.ToString(),
            });
        }
    }
}
