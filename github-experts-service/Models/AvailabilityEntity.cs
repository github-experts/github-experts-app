namespace GithubExperts.Api.Models
{
    using System;
    using System.Collections.Generic;
    using System.Text.Json.Serialization;
    using System.Globalization;
    using Newtonsoft.Json;
    using Newtonsoft.Json.Converters;

    public partial class AvailabilityEntity
    {
        [JsonPropertyName("startDate")]
        public DateTime StartDate { get; set; }

        [JsonPropertyName("endDate")]
        public DateTime EndDate { get; set; }

        [JsonPropertyName("available")]
        public bool Available { get; set; }
    }
}
