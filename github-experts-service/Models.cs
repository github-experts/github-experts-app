namespace GithubExperts.Api
{
    using System.Collections.Generic;
    using System.Text.Json.Serialization;

    public class AADIdentity
    {
        [JsonPropertyName("id_token")]
        public string IdToken { get; set; }

        [JsonPropertyName("provider_name")]
        public string ProviderName { get; set; }

        [JsonPropertyName("user_claims")]
        public List<AADUserClaim> UserClaims { get; set; }
    }

    public class AADUserClaim
    {
        [JsonPropertyName("typ")]
        public string Type { get; set; }

        [JsonPropertyName("val")]
        public string Value { get; set; }
    }

    public class GithubIdentity
    {
        [JsonPropertyName("name")]
        public string Name { get; set; }

        [JsonPropertyName("avatar_url")]
        public string AvatarUrl { get; set; }
    }

    public class EmailMessage
    {
        [JsonPropertyName("to")]
        public string To { get; set; }

        [JsonPropertyName("template")]
        public string Template { get; set; }

        [JsonPropertyName("placeholders")]
        public Dictionary<string, string> Placeholders { get; set; } = new Dictionary<string, string>();
    }

    public class EmailToSend
    {
        [JsonPropertyName("to")]
        public string To { get; set; }

        [JsonPropertyName("body")]
        public string Body { get; set; }

        [JsonPropertyName("subject")]
        public string Subject { get; set; }
    }

    public class Expert
    {
        [JsonPropertyName("handle")]
        public string Handle { get; set; }

        [JsonPropertyName("repo")]
        public string Repo { get; set; }

        [JsonPropertyName("tz")]
        public string Tz { get; set; }

        [JsonPropertyName("starttime")]
        public string StartTime { get; set; }

        [JsonPropertyName("rate")]
        public double Rate { get; set; }

        [JsonPropertyName("opentodonate")]
        public bool OpenToDonate { get; set; }
    }

    public class DailyAvailability
    {
        [JsonPropertyName("date")]
        public string Date { get; set; }

        [JsonPropertyName("starttime")]
        public string StartTime { get; set; }

        // bitmap is a string that corresponds to each 30 minute segment
        // for an Expert beginning with their start time. A bitmap corresponding
        // to an Expert available from 9am to 11am, with a 10:30 appointment 
        // booked would look like "AAAB" (9:00 available, 9:30 available,
        // 10:00 available, 10:30 booked)
        [JsonPropertyName("bitmap")]
        public string Bitmap { get; set; }
    }

    public class MonthlyAvailability
    {
        [JsonPropertyName("date")]
        public string Date { get; set; }

        // bitmap is a string that corresponds to each day of the month,
        // beginning with the date property. Days that have availability are
        // marked with 'O' (oh), days without availability, or not taking
        // appointments are marked with a '-' (dash). Example:
        // "--OOOOO--O-OOO--OOOOO--OOOOO--OOOOO--O"
        // For a period beginning 08/01/2020, the first two days of Aug have
        // no availability, but 8/3 - 8/7 all have availability.
        [JsonPropertyName("bitmap")]
        public string Bitmap { get; set; }
    }

    public class RequestError {
        [JsonPropertyName("message")]
        public string Message { get; set; }
    }
}
