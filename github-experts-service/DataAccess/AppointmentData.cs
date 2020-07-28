namespace GithubExperts.Api.DataAccess
{
    using System;
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using GithubExperts.Api.Models;
    using Microsoft.Azure.Cosmos.Table;

    public class AppointmentData
    {

        public async Task<List<AppointmentEntity>> GetAppointmentsAsync(string repo, string handle, DateTime startDate, DateTime endDate) 
        {
            TableQuery<AppointmentEntity> query = new TableQuery<AppointmentEntity>()
                .Where(TableQuery.CombineFilters(
                    TableQuery.CombineFilters(
                        TableQuery.GenerateFilterCondition("PartitionKey", QueryComparisons.Equal, repo),
                        TableOperators.And,
                        TableQuery.GenerateFilterCondition("Expert", QueryComparisons.Equal, handle)),
                    TableOperators.And,
                    TableQuery.CombineFilters(
                        TableQuery.GenerateFilterConditionForDate("DateTime", QueryComparisons.GreaterThanOrEqual, startDate),
                        TableOperators.And,
                        TableQuery.GenerateFilterConditionForDate("DateTime", QueryComparisons.LessThanOrEqual, endDate))
                ));
            return await GetAppointmentsAsync(query);
        }

        public async Task<List<AppointmentEntity>> GetAppointmentsAsync(string repo, DateTime startDate, DateTime endDate)
        {
            TableQuery<AppointmentEntity> query = new TableQuery<AppointmentEntity>()
                .Where(TableQuery.CombineFilters(
                    TableQuery.GenerateFilterCondition("PartitionKey", QueryComparisons.Equal, repo),
                    TableOperators.And,
                    TableQuery.CombineFilters(
                        TableQuery.GenerateFilterConditionForDate("DateTime", QueryComparisons.GreaterThanOrEqual, startDate),
                        TableOperators.And,
                        TableQuery.GenerateFilterConditionForDate("DateTime", QueryComparisons.LessThanOrEqual, endDate))
                ));
            return await GetAppointmentsAsync(query);
        }

        protected async Task<List<AppointmentEntity>> GetAppointmentsAsync(TableQuery<AppointmentEntity> query) 
        {
            //Read in schedule for this repo and handle for these dates
            var table = Common.CosmosTableClient.Value.GetTableReference("schedule"); // TODO: abstract this so that it's not a bare string
                
            var continuationToken = default(TableContinuationToken);
            var result = new List<AppointmentEntity>();
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