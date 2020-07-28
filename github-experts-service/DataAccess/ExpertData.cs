namespace GithubExperts.Api.DataAccess
{
    using System;
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using GithubExperts.Api.Models;
    using Microsoft.Azure.Cosmos.Table;

    public class ExpertData
    {

        public async Task<List<ExpertEntity>> GetExpertsAsync(string repo) 
        {
            TableQuery<ExpertEntity> query = new TableQuery<ExpertEntity>()
                .Where(TableQuery.GenerateFilterCondition("PartitionKey", QueryComparisons.Equal, repo));

            return await GetExpertsAsync(query);
        }

        protected async Task<List<ExpertEntity>> GetExpertsAsync(TableQuery<ExpertEntity> query) 
        {
            //Read in schedule for this repo and handle for these dates
            var table = Common.CosmosTableClient.Value.GetTableReference("experts"); // TODO: abstract this so that it's not a bare string
                
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