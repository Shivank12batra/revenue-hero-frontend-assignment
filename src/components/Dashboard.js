import React from 'react';
import { useTable } from 'react-table';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBuilding, faChevronDown } from '@fortawesome/free-solid-svg-icons';

const Dashboard = ({ data }) => {
  const fitColors = {
    A: 'purple',
    B: 'blue',
    C: 'yellow',
    D: 'red',
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
          <div className='flex items-center ml-4'>
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
          <div className='text-gray-600 uppercase text-center'>Fit</div>
        ),
        accessor: 'fit',
        Cell: ({ value }) => (
          <div className={`text-center text-${fitColors[value]}-500 uppercase`}>
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
          <div className='text-center'>{value}</div>
        ),
      },
      {
        Header: (
          <div className='text-gray-600 uppercase text-center'>Last Seen</div>
        ),
        accessor: 'lastSeen',
        Cell: ({ value }) => (
          <div className='text-center'>{`${value} days ago`}</div>
        ),
      },
      {
        Header: (
          <div className='text-gray-600 uppercase text-center'>
            Session Time
          </div>
        ),
        accessor: 'sessionMins',
        Cell: ({ value, row }) => (
          <div className='text-center'>
            {value}
            <br />
            <span className='text-gray-400'>{row.original.sessionPages}</span>
          </div>
        ),
      },
      {
        Header: (
          <div className='text-gray-600 uppercase text-center'>
            Activity (Week)
          </div>
        ),
        accessor: 'weeklyActivity',
        Cell: ({ value }) => (
          <div className='text-center'>
            {/* Add your activity graph here */}
            {/* For example, you can use a charting library like Chart.js */}
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
          <div className='text-center'>
            {value.map((signal, idx) => (
              <div key={idx} className='flex items-center'>
                <div className='w-2 h-2 bg-orange-500 rounded-full'></div>
                <span className='ml-2'>{Object.keys(signal)[0]}</span>
                <span className='ml-2 text-gray-400'>{Object.values(signal)[0]}</span>
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
        <div className='inline text-purple-600 bg-blue-100 px-2 py-1'>
          <button>Past Week</button>
          <FontAwesomeIcon className='ml-1 text-xs' icon={faChevronDown} />
        </div>
      </div>
      <div className='overflow-x-hidden'>
        <table className='w-full text-xs border-collapse mt-4 ml-4' {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps()} className='text-xs text-gray-600 uppercase'>
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
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => (
                    <td {...cell.getCellProps()} className='py-2'>
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



