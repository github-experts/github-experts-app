<<<<<<< HEAD
namespace GithubExpertsService.Api
{
    using System;
    using Microsoft.Azure.Cosmos.Table;
internal static class Common
=======
namespace GithubExperts.Api
{
    using System;
    using Microsoft.Azure.Cosmos.Table;

    /// <summary>
    ///
    /// </summary>
    internal static class Common
>>>>>>> 60ce718d9f1d0a42cae3f049684c1a2b4ce3822f
    {
        /// <summary>
        /// Returns an initialized CosmosTableClient.
        /// </summary>
        public static readonly Lazy<CloudTableClient> CosmosTableClient = new Lazy<CloudTableClient>(() =>
        {
<<<<<<< HEAD
=======
            // TODO: move hard coded values to env variables
>>>>>>> 60ce718d9f1d0a42cae3f049684c1a2b4ce3822f
            return new CloudTableClient(
                new Uri("https://github-experts-cosmos.table.cosmos.azure.com:443/"),
                new StorageCredentials(
                    "github-experts-cosmos",
                    "jFtzLcKfZclFCHLnA3ZhguupQKKwNUsIw6KE2nUMebefb8J6ddvnTrtn5Ffd7niuY73eTmX6f5zpGqjyhKctiA=="));
        });
<<<<<<< HEAD
    }
=======
    }
}
>>>>>>> 60ce718d9f1d0a42cae3f049684c1a2b4ce3822f
