import { useMemo } from "react";
import { useSelector } from "react-redux";
import { Column, useTable } from 'react-table';
import { getGists } from "../../../store/selectors/app";
import { format } from "date-fns";
import Avatar from "../../Avatar";

interface IGistInfo {
  avatar: string;
  name: string;
  date: string;
  time: string;
  description: string;
  notebook_name: string;
}

function Table() {
  const gists = useSelector(getGists);
  const columns = useMemo<Column<IGistInfo>[]>(
    () => [
      {
        Header: 'Avatar',
        accessor: 'avatar',
      },
      {
        Header: 'Name',
        accessor: 'name',
      },
      {
        Header: 'Date',
        accessor: 'date',
      },
      {
        Header: 'Time',
        accessor: 'time',
      },
      {
        Header: 'Description',
        accessor: 'description',
      },
      {
        Header: 'Notebook Name',
        accessor: 'notebook_name',
      }
    ],
    []
  );

  const data = useMemo(() => gists?.map(gist => ({
      avatar: gist.owner.avatar_url || '',
      name: gist.owner.login || '',
      date: gist.created_at ? format(new Date(gist.created_at), "dd/MM/yyyy") : '',
      time: gist.created_at ? format(new Date(gist.created_at), "p") : '',
      description: gist.description || '-',
      notebook_name: gist.id || '',
    })) || [],
    [gists]
  );  

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    rows: pages,
  } = useTable({ columns, data, manualPagination: true })

  return (
    <div className="overflow-x-auto w-full">
      <table className="table w-full" {...getTableProps()}>
        <thead id="table-header">
          { headerGroups.map(headerGroup => (
              // Apply the header row props
              <tr {...headerGroup.getHeaderGroupProps()}>
                {// Loop over the headers in each row
                headerGroup.headers.map(column => (
                  // Apply the header cell props
                  <th {...column.getHeaderProps()}>
                    {// Render the header
                    column.render('Header')}
                  </th>
                ))}
              </tr>
          ))}
        </thead>
        {/* Apply the table body props */}
        <tbody {...getTableBodyProps()}>
          {// Loop over the table rows
          pages.map(row => {
            // Prepare the row for display
            prepareRow(row)
            return (
              // Apply the row props
              <tr {...row.getRowProps()}>
                {// Loop over the rows cells
                row.cells.map(cell => {
                  // Apply the cell props
                  return (
                    <td {...cell.getCellProps()}>
                      {// Render the cell contents
                        cell.column.Header === 'Avatar' ?
                        <Avatar url={cell.value} /> :
                        cell.value
                      }
                    </td>
                  )
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default Table