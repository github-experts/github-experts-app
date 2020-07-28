namespace GithubExpertsService.Api
{
    using System;
    using Microsoft.Azure.Cosmos.Table;
internal static class Common
    {
        /// <summary>
        /// Returns an initialized CosmosTableClient.
        /// </summary>
        public static readonly Lazy<CloudTableClient> CosmosTableClient = new Lazy<CloudTableClient>(() =>
        {
            return new CloudTableClient(
                new Uri("https://github-experts-cosmos.table.cosmos.azure.com:443/"),
                new StorageCredentials(
                    "github-experts-cosmos",
                    "jFtzLcKfZclFCHLnA3ZhguupQKKwNUsIw6KE2nUMebefb8J6ddvnTrtn5Ffd7niuY73eTmX6f5zpGqjyhKctiA=="));
        });
    }