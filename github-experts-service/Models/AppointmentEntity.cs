namespace GithubExperts.Api.Models
{
    using System;
    using System.Text.Json.Serialization;
    using Microsoft.Azure.Cosmos.Table;

    public class AppointmentEntity : TableEntity
    {
        private string repo;

        public AppointmentEntity()
        {
            RowKey = Guid.NewGuid().ToString();
            Id = RowKey;
        }

        [JsonPropertyName("id")]
        public string Id { get; set; }

        [JsonPropertyName("datetime")]
        public DateTime DateTime { get; set; }

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
        public string Repo
        {
            get
            {
                return repo;
            }

            set
            {
                PartitionKey = value.Replace("/", "+");
                repo = value;
            }
        }
    }
}