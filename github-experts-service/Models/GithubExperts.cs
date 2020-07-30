namespace GithubExperts.Api.Models
{
    using System;
    using System.Collections.Generic;
    using System.Text.Json.Serialization;

    public class GithubExperts
    {
        public List<ExpertEntity> Experts { get; set; }
    }
}