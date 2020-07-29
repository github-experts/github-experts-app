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

    public class RequestError
    {
        [JsonPropertyName("message")]
        public string Message { get; set; }
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
}
