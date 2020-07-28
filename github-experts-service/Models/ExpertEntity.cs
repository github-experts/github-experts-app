namespace GithubExperts.Api.Models
{
    using System;
    using System.Text.Json.Serialization;
    using Microsoft.Azure.Cosmos.Table;

    public class ExpertEntity : TableEntity
    {
        [JsonPropertyName("organization")]
        public string Organization
        {
            get
            {
                return RowKey;
            }

            set
            {
                RowKey = value;
            }
        }

        [JsonPropertyName("repo")]
        public string Repository
        {
            get
            {
                return PartitionKey;
            }

            set
            {
                PartitionKey = value;
            }
        }

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