namespace GithubExperts.Api.DataAccess
{
    using System;
    using System.Collections.Generic;
    using System.Net;
    using System.Net.Http;
    using System.Linq;
    using System.Threading.Tasks;
    using GithubExperts.Api.Models;
    using GithubExperts.Api.Util;
    using Microsoft.Azure.Cosmos.Table;
    using YamlDotNet.Core;
    using YamlDotNet.Serialization;
    using YamlDotNet.Serialization.NamingConventions;

    public static class GithubExpertsData
    {
        internal static HttpClient client = new HttpClient();

        public static async Task<GithubExperts> GetTutorYamlAsync(string repo)
        {
            // Retrieve YAML file from GitHub repo
            string url = string.Format("https://raw.githubusercontent.com/{0}/main/.github/tutors.yml", repo);
            
            var response = await client.GetStringAsync(new Uri(url));

            // Deserialize YAML
            var deserializer = new DeserializerBuilder()
                .WithNamingConvention(CamelCaseNamingConvention.Instance)
                .Build();
            var experts = deserializer.Deserialize<GithubExperts>(response);

            return experts;
        }
    }
}