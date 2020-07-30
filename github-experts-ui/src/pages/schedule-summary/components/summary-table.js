import { AcceptanceButtons, RepoCell } from './components.misc';
import { useSortBy, useTable } from 'react-table';
import React from 'react';
import { Styles } from './summary-table.style';
import { getSchedule } from '../../../stores/schedulerStore';
import { useSelector } from 'react-redux';
import moment from 'moment';
import { randomColor } from 'pages/scheduler/components/Scheduler/CustomCell';

function Table({ columns, data }) {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable(
    {
      columns,
      data,
    },
    useSortBy
  );
  const firstPageRows = rows.slice(0, 20);
  return (
    <table {...getTableProps()}>
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                {column.render('Header')}
                <span>
                  {column.isSorted ? (column.isSortedDesc ? '' : '') : ''}
                </span>
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {firstPageRows.map((row, i) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map((cell) => {
                return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>;
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export function SummaryTable() {
  const appointments = useSelector(getSchedule);

  const columns = React.useMemo(
    () => [
      {
        Header: 'Time',
        accessor: 'dateTime',
        Cell: (props) =>
          moment(props.row.original.dateTime).format('MM/DD hh:mm A'),
      },
      {
        Header: 'Requestor',
        accessor: 'requestor',
      },
      {
        Header: 'Repo',
        accessor: 'repo',
        Cell: (props) => {
          return (
            <RepoCell
              repo={[
                props.row.original.expert,
                props.row.original.repo.split('+')[1],
              ]}
              color={randomColor()}
            />
          );
        },
      },
      {
        Header: 'Payment',
        accessor: 'rate',
        Cell: (props) =>
          props.row.original.requestFree ? (
            <span className="Label mr-1 Label--pink" title="Label: Free">
              Free
            </span>
          ) : (
            <p>${props.row.original.rate}</p>
          ),
      },
      {
        Header: 'Description',
        accessor: 'details',
      },
      {
        Header: 'Acceptance',
        Cell: (props) => <AcceptanceButtons />,
      },
    ],
    []
  );

  return (
    <Styles>
      <Table columns={columns} data={appointments || []} />
    </Styles>
  );
}
