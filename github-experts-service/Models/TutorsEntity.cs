namespace GithubExperts.Api.Models
{
    using System;
    using System.Collections.Generic;
    using System.Text.Json.Serialization;

    public class Tutors
    {
        public List<ExpertEntity> Experts { get; set; }
    }
}