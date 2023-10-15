import React, {useState} from 'react';
import AccountsTable from './AccountsTable';
import { useQuery } from 'react-query';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBuilding, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { filterData } from '@/utils/filterData';

const Dashboard = ({data}) => {
  const [filterOpen, setFilterOpen] = useState(false)
  const [filterDate, setFilterDate] = useState('Past Month')

  const days = filterDate === 'Past Month' ? 30 : 7
  const filteredData = filterData([...data], days)

  const toggleDropdown = (e) => {
    e.stopPropagation();
    setFilterOpen(!filterOpen);
  }

  const selectFilter = (filter) => {
    setFilterDate(filter)
    setFilterOpen(false)
  }
//   const fetchData = async () => {
//     const response = await fetch(process.env.NEXT_PUBLIC_API_KEY);
//     console.log(response)
//     return response.json();
//   }

//   const { data, isLoading, error } = useQuery('accounts-table', fetchData, {
//     refetchOnMount: false,
//     refetchOnWindowFocus: false,
//     staleTime: Infinity,
//   });

  return (
    <main onClick={() => setFilterOpen(false)}>
      <div className='flex justify-between mt-4'>
        <header className='flex ml-4'>
          <FontAwesomeIcon className='mt-1 mr-2' icon={faBuilding} />
          <h2 className='text-md font-semibold'>
            {data ? `Accounts (${filteredData.length})` : 'Accounts'}
          </h2>
        </header>
        <button className='text-white text-sm bg-indigo-600 px-4 py-1 mr-8 rounded'>
          + Smart List
        </button>
      </div>
      <div className='ml-4 mt-2 text-sm font-medium'>
        <button className='bg-gray-200 px-2 py-1 mr-2'>
            + Filter
        </button>
        <span className='border-r border-gray-300'></span>
        <span className='border-l border-gray-300 mr-2'></span>
        <div className='relative inline-block text-purple-600 bg-blue-100'>
            <button className='px-2 py-1' onClick={(e) => toggleDropdown(e)}>
            <span>{filterDate}</span>
            <FontAwesomeIcon className='ml-1 text-xs' icon={faChevronDown} />
            </button>
            {filterOpen && (
            <div className='absolute z-10 mt-[-2px] right-0 w-30 bg-blue-100 border rsounded-md shadow-md'>
                <button className='w-full px-2 py-1 text-left hover:bg-blue-200'
                onClick={() => selectFilter('Past Week')}>
                Past Week
                </button>
                <button className='w-full px-2 py-1 text-left hover:bg-blue-200'
                onClick={() => {
                    selectFilter('Past Month')}}>
                Past Month
                </button>
            </div>
            )}
        </div>
      </div>
      {/* <AccountsTable data={data} isLoading={isLoading} error={error}/> */}
      <AccountsTable filteredData={filteredData}/>
    </main>
  );
};

export default Dashboard;



