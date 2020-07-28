namespace GithubExpertsService
{
    using System.Collections.Generic;
    using System.IO;
    using System.Linq;
    using System.Reflection;
    using System.Text;
    using System.Text.Json;
    using Microsoft.Azure.WebJobs;
    using Microsoft.Extensions.Logging;
    using SendGrid.Helpers.Mail;

    public static class SendEmailFunction
    {
        private static readonly IDictionary<string, string> Subjects = new Dictionary<string, string>
        {
            { "reminder", "Meeting reminder" },
            { "confirmation", "Meeting confirmed" },
            { "request", "You have a request" },
        };

        [FunctionName("SendEmailFunction")]
        public static void Run(
            [ServiceBusTrigger("email", Connection = "SERVICE_BUS_CONNECTION_STRING")]string queueItem,
            [SendGrid(ApiKey = "SENDGRID_KEY")] out SendGridMessage message,
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

            message = new SendGridMessage();
            message.AddTo(emailMessage.To);
            message.SetFrom(new EmailAddress("github-experts@microsoft.com"));
            message.SetSubject(Subjects[emailMessage.Template]);
            message.AddContent("text/html", emailContent.ToString());
        }
    }
}
