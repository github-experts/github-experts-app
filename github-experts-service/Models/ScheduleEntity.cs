namespace GithubExperts.Api.Models
{
    using System;
    using System.Text.Json.Serialization;
    using Microsoft.Azure.Cosmos.Table;

    public class ScheduleEntity : TableEntity
    {
        [JsonPropertyName("id")]
        public string Id { get; set; }

        [JsonPropertyName("datetime")]
        public DateTime DateTime { get; set; }

        [JsonPropertyName("end-datetime")]
        public DateTime EndDateTime { get; set; }

        [JsonPropertyName("requestor")]
        public string Requestor { get; set; }

        // Status is requested, accepted, rejected, or completed
        [JsonPropertyName("status")]
        public string Status { get; set; }

        [JsonPropertyName("details")]
        public string Details { get; set; }
    }
}