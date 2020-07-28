namespace GithubExperts.Api.Models
{
    using System;
    using System.Text.Json.Serialization;
    using Microsoft.Azure.Cosmos.Table;

    public class ExpertEntity : TableEntity
    {

        [JsonPropertyName("organization")]
        public string RowKey { get; set; }

        [JsonPropertyName("repo")]
        public string PartitionKey { get; set; }

        [JsonPropertyName("handle")]
        public string Handle { get; set; }

        [JsonPropertyName("timezone")]
        public string TimeZone { get; set; }

        [JsonPropertyName("starttime")]
        public DateTime StartTime { get; set; }

        [JsonPropertyName("endtime")]
        public DateTime EndTime { get; set; }

        [JsonPropertyName("rate")]
        public double Rate { get; set; }

        [JsonPropertyName("opentodonate")]
        public bool OpenToDonate { get; set; }

        [JsonPropertyName("excludeweekends")]
        public bool ExcludeWeekends { get; set; }
    }
}