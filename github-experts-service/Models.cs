namespace GithubExpertsService
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

    public class Appointment
    {
        [JsonPropertyName("id")]
        public string Id { get; set; }

        [JsonPropertyName("date")]
        public string Date { get; set; }

        [JsonPropertyName("time")]
        public string Time { get; set; }

        [JsonPropertyName("requestor")]
        public string Requestor { get; set; }

        // Status is requested, accepted, rejected, or completed 
        [JsonPropertyName("status")]
        public string Status { get; set; }

        [JsonPropertyName("details")]
        public string Details { get; set; }

        [JsonPropertyName("rate")]
        public double Rate { get; set; }

        [JsonPropertyName("requestfree")]
        public bool RequestFree { get; set; }

        [JsonPropertyName("expert")]
        public string Expert { get; set; }

        [JsonPropertyName("repo")]
        public string Repo { get; set; }
    }

    public class RequestError {
        [JsonPropertyName("message")]
        public string Message { get; set; }
    }
}
