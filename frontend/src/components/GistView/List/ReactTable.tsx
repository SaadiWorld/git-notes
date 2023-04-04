import { useMemo } from "react";
import { useSelector } from "react-redux";
import { Column, useTable } from 'react-table';
import { getGists } from "../../../store/selectors/app";
import { format } from "date-fns";
import Avatar from "../../Avatar";
import { useNavigate } from "react-router-dom";
// import StarFork from "../../StarFork";
// import { GIST_UPDATE_ACTIONS } from "../../../types/common";

interface IGistInfo {
  avatar: string;
  name: string;
  date: string;
  time: string;
  description: string;
  notebook_name: string;
  // star: string;
  // fork: string;
}

function Table() {
  const navigate = useNavigate();
  const gists = useSelector(getGists);
  const columns = useMemo<Column<IGistInfo>[]>(
    () => [
      {
        Header: 'Avatar',
        accessor: 'avatar',
        Cell: ({ cell }) => (
         <Avatar url={cell.value}/>
        )
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
        maxWidth: 400,
        minWidth: 400,
      },
      {
        Header: 'Notebook Name',
        accessor: 'notebook_name',
      },
      // {
      //   Header: '',
      //   accessor: 'star',
      //   Cell: ({ cell }) => (
      //     <StarFork variant={GIST_UPDATE_ACTIONS.STAR} />
      //   )
      // },
      // {
      //   Header: '',
      //   accessor: 'fork',
      //   Cell: ({ cell }) => (
      //     <StarFork variant={GIST_UPDATE_ACTIONS.FORK} />
      //   )
      // }
    ],
    []
  );

  const data = useMemo(() => gists?.map(gist => ({
      avatar: gist.owner.avatar_url || '',
      name: gist.owner.login || '',
      date: gist.updated_at ? format(new Date(gist.updated_at), "dd/MM/yyyy") : '',
      time: gist.updated_at ? format(new Date(gist.updated_at), "p") : '',
      description: gist.description || '-',
      notebook_name: gist.id || '',
      // star: gist.id || '',
      // fork: gist.id || '',
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
    <div data-testid="list-view" className="overflow-x-auto w-full">
      <table className="table w-full" {...getTableProps()}>
        <thead id="table-header">
          { headerGroups.map(headerGroup => (
              // Apply the header row props
              <tr {...headerGroup.getHeaderGroupProps()}>
                {// Loop over the headers in each row
                headerGroup.headers.map(column => (
                  // Apply the header cell props
                  <th
                    {...column.getHeaderProps({
                      style: { minWidth: column.minWidth, maxWidth: column.maxWidth },
                    })}
                  >
                    <span>{column.render('Header')}</span>
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
              <tr 
                {...row.getRowProps()}
                onClick={() => navigate(`/gist/${row.original.notebook_name}`)}
                className='cursor-pointer'
              >
                {// Loop over the rows cells
                row.cells.map(cell => {
                  // Apply the cell props
                  return (
                    <td {...cell.getCellProps({
                        style: { minWidth: cell.column.minWidth, maxWidth: cell.column.maxWidth },
                      })}
                      className={`overflow-hidden text-ellipsis whitespace-nowrap`}
                    >
                      {
                        cell.render('Cell')
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