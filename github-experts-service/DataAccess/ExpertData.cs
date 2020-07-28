namespace GithubExperts.Api.DataAccess
{
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using GithubExperts.Api.Models;
    using GithubExperts.Api.Util;
    using Microsoft.Azure.Cosmos.Table;

    public static class ExpertData
    {
        public static async Task<List<ExpertEntity>> GetExpertsAsync(string repo)
        {
            TableQuery<ExpertEntity> query = new TableQuery<ExpertEntity>()
                .Where(TableQuery.GenerateFilterCondition("RowKey", QueryComparisons.Equal, repo));

            return await GetExpertsAsync(query);
        }

        public static async Task<ExpertEntity> GetExpertAsync(string handle)
        {
            TableQuery<ExpertEntity> query = new TableQuery<ExpertEntity>()
                .Where(TableQuery.GenerateFilterCondition("PartionKey", QueryComparisons.Equal, handle));

            var results = await GetExpertsAsync(query);
            return results.FirstOrDefault();
        }

        private static async Task<List<ExpertEntity>> GetExpertsAsync(TableQuery<ExpertEntity> query)
        {
            // Read in schedule for this repo and handle for these dates
            var table = CosmosTableUtil.GetTableReference("experts");

            var continuationToken = default(TableContinuationToken);
            var result = new List<ExpertEntity>();
            do
            {
                var queryResult = await table.ExecuteQuerySegmentedAsync(query, continuationToken);
                foreach (var item in queryResult)
                {
                    result.Add(item);
                }
            }
            while (continuationToken != null);

            return result;
        }
    }
}