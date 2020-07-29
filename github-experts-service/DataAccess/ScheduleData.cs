namespace GithubExperts.Api.DataAccess
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using GithubExperts.Api.Models;
    using GithubExperts.Api.Util;
    using Microsoft.Azure.Cosmos.Table;

    public static class ScheduleData
    {
        public static async Task<IList<ScheduleEntity>> GetScheduleAsync(string repo, DateTime startDate, DateTime endDate)
        {
            TableQuery<ScheduleEntity> query = new TableQuery<ScheduleEntity>()
                .Where(TableQuery.CombineFilters(
                    TableQuery.GenerateFilterCondition("PartitionKey", QueryComparisons.Equal, repo),
                    TableOperators.And,
                    TableQuery.CombineFilters(
                        TableQuery.GenerateFilterConditionForDate("DateTime", QueryComparisons.GreaterThanOrEqual, startDate),
                        TableOperators.And,
                        TableQuery.GenerateFilterConditionForDate("DateTime", QueryComparisons.LessThanOrEqual, endDate))));
            return await GetScheduleAsync(query);
        }

        private static async Task<IList<ScheduleEntity>> GetScheduleAsync(TableQuery<ScheduleEntity> query)
        {
            // Read in schedule for this repo and handle for these dates
            var table = CosmosTableUtil.GetTableReference("schedule");

            var continuationToken = default(TableContinuationToken);
            var result = new List<ScheduleEntity>();
            do
            {
                var queryResult = await table.ExecuteQuerySegmentedAsync(query, continuationToken);
                foreach (var item in queryResult)
                {
                    item.EndDateTime = item.DateTime.AddMinutes(30);
                    result.Add(item);
                }
            }
            while (continuationToken != null);

            return result;
        }
    }
}