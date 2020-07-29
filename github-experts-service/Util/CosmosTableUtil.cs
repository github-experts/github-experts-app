namespace GithubExperts.Api.Util
{
    using System;
    using Microsoft.Azure.Cosmos.Table;

    /// <summary>
    ///
    /// </summary>
    internal static class CosmosTableUtil
    {
        /// <summary>
        /// Returns an initialized CosmosTableClient.
        /// </summary>
        public static readonly Lazy<CloudTableClient> GetClient = new Lazy<CloudTableClient>(() =>
        {
            // TODO: move hard coded values to env variables
            return new CloudTableClient(
                new Uri("https://github-experts-cosmos.table.cosmos.azure.com:443/"),
                new StorageCredentials(
                    "github-experts-cosmos",
                    "jFtzLcKfZclFCHLnA3ZhguupQKKwNUsIw6KE2nUMebefb8J6ddvnTrtn5Ffd7niuY73eTmX6f5zpGqjyhKctiA=="));
        });

        /// <summary>
        /// 
        /// </summary>
        /// <param name="tableName"></param>
        /// <returns></returns>
        public static CloudTable GetTableReference(string tableName)
        {
            return GetClient.Value.GetTableReference(tableName);
        }
    }
}