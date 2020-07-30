namespace GithubExperts.Api.DataAccess
{
    using System;
    using System.IO;
    using System.Net.Http;
    using System.Threading.Tasks;
    using GithubExperts.Api.Models;
    using Newtonsoft.Json;
    using YamlDotNet.Serialization;
    using YamlDotNet.Serialization.NamingConventions;

    public static class GithubExpertsData
    {
        private static HttpClient client = new HttpClient();

        public static async Task<GithubExperts> GetTutorYamlAsync(string repo)
        {
            // Retrieve YAML file from GitHub repo
            var repoData = await GetRepoSettingsAsync(repo);
            string url = string.Format("https://raw.githubusercontent.com/{0}/{1}/.github/tutors.yml", repo, repoData.DefaultBranch);

            var response = await client.GetStringAsync(new Uri(url));

            // Deserialize YAML
            var deserializer = new DeserializerBuilder()
                .WithNamingConvention(CamelCaseNamingConvention.Instance)
                .Build();
            var experts = deserializer.Deserialize<GithubExperts>(response);

            return experts;
        }

        public static async Task<GitHubRepoSettingsEntity> GetRepoSettingsAsync(string repo)
        {
            string url = string.Format("https://api.github.com/repos/{0}", repo);

            GitHubRepoSettingsEntity repoData = null;
            client.DefaultRequestHeaders.UserAgent.ParseAdd("Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_4) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.1 Safari/605.1.15");
            var json = await client.GetStringAsync(new Uri(url));

            if (json?.Contains(repo) == true)
            {
                repoData = GitHubRepoSettingsEntity.FromJson(json);
                //repoData = JsonConvert.DeserializeObject<GitHubRepoSettingsEntity>(json);
            }

            return repoData;
        }
    }
}