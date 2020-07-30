import { AcceptanceButtons, RepoCell } from './components.misc';
import React, { useCallback } from 'react';
import { useSortBy, useTable } from 'react-table';
import { Styles } from './summary-table.style';
import { getSchedule } from '../../../stores/schedulerStore';
import moment from 'moment';
import { randomColor } from 'pages/scheduler/components/Scheduler/CustomCell';
import request from 'utils/request';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';

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
  const params = useParams();
  const updateAppt = useCallback((status, id) => {
    return request(`api/appointment/${params.repo}/${id}`, {
      method: 'PATCH',
      body: JSON.stringify({
        status: status,
      }),
    });
  }, []);

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
        Cell: (props) => (
          <AcceptanceButtons {...props} updateAppt={updateAppt} />
        ),
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
