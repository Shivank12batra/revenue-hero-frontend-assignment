import React from 'react';
import IntentIndicators from './IntentIndicators';
import ActivityGraph from './ActivityGraph';
import AccountsTable from './AccountsTable';
import { useQuery } from 'react-query';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBuilding, faChevronDown } from '@fortawesome/free-solid-svg-icons';

const Dashboard = () => {
  const fetchData = async () => {
    const response = await fetch(process.env.NEXT_PUBLIC_API_KEY);
    console.log(response)
    return response.json();
  }

  const { data, isLoading, error } = useQuery('accounts-table', fetchData, {
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  });

  return (
    <main>
      <div className='flex justify-between mt-4'>
        <header className='flex ml-4'>
          <FontAwesomeIcon className='mt-1 mr-2' icon={faBuilding} />
          <h2 className='text-md font-semibold'>
            Accounts ({data?.length})
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
      <AccountsTable data={data} isLoading={isLoading} error={error}/>
    </main>
  );
};

export default Dashboard;



