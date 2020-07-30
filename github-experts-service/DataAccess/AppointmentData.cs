namespace GithubExperts.Api.DataAccess
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using GithubExperts.Api.Models;
    using GithubExperts.Api.Util;
    using Microsoft.Azure.Cosmos.Table;

    public static class AppointmentData
    {
        public enum AppointmentStatus
        {
            Requested,
            Accepted,
            Completed,
        }

        public static async Task<AppointmentEntity> GetAppointmentAsync(string repo, string id)
        {
            TableQuery<AppointmentEntity> query = new TableQuery<AppointmentEntity>()
                .Where(TableQuery.CombineFilters(
                        TableQuery.GenerateFilterCondition("PartitionKey", QueryComparisons.Equal, repo),
                        TableOperators.And,
                        TableQuery.GenerateFilterCondition("RowKey", QueryComparisons.Equal, id)));

            var result = await GetAppointmentsAsync(query);
            return result.FirstOrDefault();
        }

        public static async Task<IList<AppointmentEntity>> GetAppointmentsAsync(string repo, string handle, DateTime startDate, DateTime endDate)
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
                        TableQuery.GenerateFilterConditionForDate("DateTime", QueryComparisons.LessThanOrEqual, endDate))));
            return await GetAppointmentsAsync(query);
        }

        public static async Task<IList<AppointmentEntity>> GetAppointmentsAsync(string handle, AppointmentStatus status, DateTime startDate, DateTime endDate)
        {
            string appointmentStatus = "requested";

            switch (status)
            {
                case AppointmentStatus.Requested:
                    appointmentStatus = "requested";
                    break;
                case AppointmentStatus.Accepted:
                    appointmentStatus = "accepted";
                    break;
                case AppointmentStatus.Completed:
                    appointmentStatus = "completed";
                    break;
            }

            TableQuery<AppointmentEntity> query = new TableQuery<AppointmentEntity>()
                .Where(TableQuery.CombineFilters(
                    TableQuery.CombineFilters(
                        TableQuery.GenerateFilterCondition("Expert", QueryComparisons.Equal, handle),
                        TableOperators.And,
                        TableQuery.GenerateFilterCondition("Status", QueryComparisons.Equal, appointmentStatus)),
                    TableOperators.And,
                    TableQuery.CombineFilters(
                        TableQuery.GenerateFilterConditionForDate("DateTime", QueryComparisons.GreaterThanOrEqual, startDate),
                        TableOperators.And,
                        TableQuery.GenerateFilterConditionForDate("DateTime", QueryComparisons.LessThanOrEqual, endDate))));
            return await GetAppointmentsAsync(query);
        }

        public static async Task<IList<AppointmentEntity>> GetAppointmentsAsync(string repo, DateTime startDate, DateTime endDate)
        {
            TableQuery<AppointmentEntity> query = new TableQuery<AppointmentEntity>()
                .Where(TableQuery.CombineFilters(
                    TableQuery.GenerateFilterCondition("PartitionKey", QueryComparisons.Equal, repo),
                    TableOperators.And,
                    TableQuery.CombineFilters(
                        TableQuery.GenerateFilterConditionForDate("DateTime", QueryComparisons.GreaterThanOrEqual, startDate),
                        TableOperators.And,
                        TableQuery.GenerateFilterConditionForDate("DateTime", QueryComparisons.LessThanOrEqual, endDate))));
            return await GetAppointmentsAsync(query);
        }

        private static async Task<IList<AppointmentEntity>> GetAppointmentsAsync(TableQuery<AppointmentEntity> query)
        {
            // Read in schedule for this repo and handle for these dates
            var table = CosmosTableUtil.GetTableReference("schedule");

            var continuationToken = default(TableContinuationToken);
            var result = new List<AppointmentEntity>();
            do
            {
                var queryResult = await table.ExecuteQuerySegmentedAsync(query, continuationToken);
                result.AddRange(queryResult);
            }
            while (continuationToken != null);

            return result;
        }
    }
}