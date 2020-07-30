namespace GithubExperts.Api.Models
{
    using System;
    using System.Text.Json.Serialization;

    public class RepositoryEntity
    {
        [JsonPropertyName("repository")]
        public string Repository { get; set; }
    }
}