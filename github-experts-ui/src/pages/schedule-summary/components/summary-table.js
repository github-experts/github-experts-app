import React from 'react';
import { useTable, useSortBy } from 'react-table';
import { Styles } from './summary-table.style';
import { RepoCell, AcceptanceButtons } from './components.misc';

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
  const columns = React.useMemo(
    () => [
      {
        Header: 'REQ #',
        accessor: 'reqNumber',
      },
      {
        Header: 'Time',
        accessor: 'time',
      },
      {
        Header: 'Profile',
        accessor: 'profile',
      },
      {
        Header: 'Repo',
        accessor: 'repo',
        Cell: (props) => {
          return (
            <RepoCell
              repo={props.row.original.repo}
              color={props.row.original.repoCircleColor}
            />
          );
        },
      },
      {
        Header: 'Payment',
        accessor: 'payment',
        Cell: (props) =>
          props.row.original.isFree ? (
            <span class="Label mr-1 Label--pink" title="Label: Free">
              Free
            </span>
          ) : (
            <p>{props.row.original.payment}</p>
          ),
      },
      {
        Header: 'Description',
        accessor: 'description',
      },
      {
        Header: 'Acceptance',
        Cell: (props) => <AcceptanceButtons />,
      },
    ],
    []
  );

  const data = React.useMemo(
    () => [
      {
        reqNumber: '#271',
        time: '7/12 1:00PM',
        profile: '@Gafdu',
        repo: ['patniko', 'tutorDemo'],
        payment: '$50 USD',
        description:
          'Convalis luctus eleifend ut id amet sociis. Libero feugiat',
        repoCircleColor: 'orange',
      },
      {
        reqNumber: '#272',
        time: '7/12 1:00PM',
        profile: '@Gafdu',
        repo: ['patniko', 'tutorDemo'],
        payment: '$50US',
        isFree: true,
        description:
          'Convalis luctus eleifend ut id amet sociis. Libero feugiat',
        repoCircleColor: 'red',
      },
    ],
    []
  );

  return (
    <Styles>
      <Table columns={columns} data={data} />
    </Styles>
  );
}
