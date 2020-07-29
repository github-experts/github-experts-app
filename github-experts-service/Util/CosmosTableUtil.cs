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
            var databaseName = string.Format("{0}_cosmos", Environment.GetEnvironmentVariable("APP_NAME"));
            return new CloudTableClient(
                new Uri(string.Format("https://{0}.table.cosmos.azure.com:443/", databaseName)),
                new StorageCredentials(
                    databaseName,
                    Environment.GetEnvironmentVariable("COSMOS_PRIMARY_KEY"),
                    Environment.GetEnvironmentVariable("COSMOS_SECONDARY_KEY")));
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