
namespace GithubExpertsService.Model
{
    using System;
    using System.Text.Json.Serialization;
    using Microsoft.Azure.Cosmos.Table;
    
    public class ExpertEntity : TableEntity
    {
        public ExpertEntity(string handle, string repo)
        {
            RowKey = handle;
            PartitionKey = repo;

            Handle = handle;
            Repo = repo;
        }

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
}