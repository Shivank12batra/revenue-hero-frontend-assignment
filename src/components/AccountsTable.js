import React from 'react';
import IntentIndicators from './IntentIndicators';
import ActivityGraph from './ActivityGraph';
import { useTable, usePagination } from 'react-table';
import Image from 'next/image';

const AccountsTable = ({filteredData}) => {
    const fitColors = {
        a: '#5E02F5',
        b: '#8952E3',
        c: '#C6D82C',
        d: '#D04A65',
    };

    const columns = React.useMemo(
        () => [
          {
            Header: (
              <div className='text-gray-600 uppercase text-left ml-4'>
                Company
              </div>
            ),
            accessor: 'name',
            Cell: ({ row }) => (
              <div className='md:w-[400px] min-w-[300px] flex items-center ml-4'>
                <Image className='rounded-lg' alt='company_logo' src={row.original.img} loading={`${row.index < 5 ? 'eager' : 'lazy'}`} width={60} height={40}/>
                <div className='ml-2 text-left'>
                    <span className='text-sm font-semibold'>{row.original.name}</span>
                  <br />
                  <span className='text-gray-400 text-xs'>{row.original.name}.com</span>
                </div>
              </div>
            ),
          },
          {
            Header: (
              <div className='text-gray-600 uppercase text-center mx-4'>Fit</div>
            ),
            accessor: 'fit',
            Cell: ({ value }) => (
              <div className='min-w-[50px] text-center text-sm font-bold uppercase' style={{'color' : `${fitColors[value]}`}}>
                {value}
              </div>
            ),
          },
          {
            Header: (
              <div className='text-gray-600 uppercase text-center'>Intent</div>
            ),
            accessor: 'intent',
            Cell: ({ value }) => (
              <div className='min-w-[50px] text-center'>
                <IntentIndicators value={value}/>
              </div>
            ),
          },
          {
            Header: (
              <div className='text-gray-600 uppercase text-center'>Last Seen</div>
            ),
            accessor: 'lastSeen',
            Cell: ({ value }) => (
              <div className='min-w-[50px] text-xs text-center'>{`${value} days ago`}</div>
            ),
          },
          {
            Header: (
              <div className='text-gray-600 uppercase'>
                Session Time
              </div>
            ),
            accessor: 'sessionMins',
            Cell: ({ value, row }) => (
              <div className='min-w-[75px] text-xs text-right mr-2'>
                {value} minutes
                <br />
                <span className='text-gray-400'>{row.original.sessionPages} pages</span>
              </div>
            ),
          },
          {
            Header: (
              <div className='text-gray-600 text-left ml-2 uppercase'>
                Activity (Week)
              </div>
            ),
            accessor: 'weeklyActivity',
            Cell: ({ value }) => (
              <div className=' ml-4 w-[150px]'>
                <ActivityGraph data={value}/>
              </div>
            ),
          },
          {
            Header: (
              <div className='text-gray-600 uppercase text-left'>
                Intent Signals
              </div>
            ),
            accessor: 'intentSignals',
            Cell: ({ value }) => (
                <div className='w-[250px] h-full text-center'>
                    {value.map((signal, idx) => (
                    <div key={idx} className='flex justify-between items-center py-1'>
                        <div className='flex items-center'>
                            <div className='w-2 h-2 bg-orange-500 rounded-full'></div>
                            <span className='ml-1'>{Object.keys(signal)[0]}</span>                                      
                        </div>
                            <span className='text-gray-400'>{Object.values(signal)[0]} days ago</span>
                    </div>
                    ))}
                </div>
            ),
          },
        ],
        [filteredData]
    )

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        page,
        prepareRow,
        previousPage,
        nextPage,
        canPreviousPage,
        canNextPage,
      } = useTable(
        {
          columns,
          data: filteredData || [],
          initialState: { pageIndex: 0, pageSize: 10 }, // Initial page index and size
        },
        usePagination
      );

  return (
    <div className='md:overflow-x-hidden overflow-x-auto'>
        <table className='w-full table-auto text-xs border-collapse mt-4 ml-4' {...getTableProps()}>
            <thead>
            {headerGroups.map((headerGroup) => (
                <tr key={headerGroup.id} {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                    <th key={column.id} {...column.getHeaderProps()} className='border-b border-gray-200'>
                    {column.render('Header')}
                    </th>
                ))}
                </tr>
            ))}
            </thead>
            <tbody {...getTableBodyProps()}>
                {page.map((row) => {
                    prepareRow(row);
                    return (
                    <tr key={row.id} className='border-b border-gray-200' {...row.getRowProps()}>
                        {row.cells.map((cell) => (
                        <td key={cell.column.id} className='py-2' {...cell.getCellProps()}>
                            {cell.render('Cell')}
                        </td>
                        ))}
                    </tr>
                    );
                })}
            </tbody>
        </table>
        {/* page control buttons */}
        <div className='my-4 flex justify-center items-center text-xs'>
            <button
                onClick={() => previousPage()}
                disabled={!canPreviousPage}
                className={`${
                !canPreviousPage ? 'bg-gray-300 text-gray-500  cursor-not-allowed' : 'bg-blue-100 text-purple-500'
                } px-2 py-1`}
            >
                Prev
            </button>{' '}
            <button
                onClick={() => nextPage()}
                disabled={!canNextPage}
                className={`${
                !canNextPage ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-blue-100 text-purple-500'
                } px-2 py-1`}
            >
                Next
            </button>
        </div>
    </div>
  )
}

export default AccountsTable