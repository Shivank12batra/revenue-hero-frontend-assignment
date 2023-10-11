import React from 'react';
import IntentIndicators from './IntentIndicators';
import ActivityGraph from './ActivityGraph';
import { useTable } from 'react-table';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBuilding, faChevronDown } from '@fortawesome/free-solid-svg-icons';

const Dashboard = ({ data }) => {
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
          <div className='w-[400px] min-w-[300px] flex items-center ml-4'>
              <Image className='rounded-lg' src={row.original.img} alt='Company Logo' width={60} height={40} />
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
          <div className=' text-gray-600 uppercase text-left'>
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
    []
  );
  

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({
    columns,
    data,
  });

  return (
    <main>
      <div className='flex justify-between mt-4'>
        <header className='flex ml-4'>
          <FontAwesomeIcon className='mt-1 mr-2' icon={faBuilding} />
          <h2 className='text-md font-semibold'>
            Accounts ({data.length})
          </h2>
        </header>
        <button className='text-white text-sm bg-indigo-600 px-4 py-1 mr-8 rounded'>
          + Smart List
        </button>
      </div>
      <div className='ml-4 mt-2 text-sm font-medium'>
        <button className='bg-gray-200 px-2 py-1 mr-2'>+ Filter</button>
        <span className='border-r border-gray-300'></span>
        <span className='border-l border-gray-300 mr-2'></span>
        <button className='inline text-purple-600 bg-blue-100 px-2 py-1'>
          <span>Past Week</span>
          <FontAwesomeIcon className='ml-1 text-xs' icon={faChevronDown} />
        </button>
      </div>
      <div className='md:overflow-x-hidden shrink-0'>
        <table className='w-full table-auto text-xs border-collapse mt-4 ml-4 shrink-0' {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps} className='border-b border-gray-200'>
                    {column.render('Header')}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row) => {
              prepareRow(row);
              return (
                <tr  className='border-b border-gray-200' {...row.getRowProps}>
                  {row.cells.map((cell) => (
                    <td className='py-2' {...cell.getCellProps()}>
                      {cell.render('Cell')}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </main>
  );
};

export default Dashboard;



