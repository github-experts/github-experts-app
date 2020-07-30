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


    public static class GithubTutorsData
    {
        static HttpClient client = new HttpClient();

        public static async Task<Tutors> GetAppointmentAsync(string repo)
        {
            // Retrieve YAML file from GitHub repo
            //string url = string.Format("https://raw.githubusercontent.com/{0}/main/.github/tutors.yml", repo);
            string url = "https://gist.githubusercontent.com/steverhall/39c562086f9ccc694f5b6da4fb7019e3/raw/ee6f80f0dbab234232267f0833b01f0f976f6f22/tutors.yml";
            var response = await client.GetStringAsync(new Uri(url));

            // Process YAML
            var deserializer = new DeserializerBuilder()
                .WithNamingConvention(CamelCaseNamingConvention.Instance)
                .Build();
            var experts = deserializer.Deserialize<Tutors>(response);

            Console.WriteLine(response);

            return experts;
        }
    }
}