import {useState} from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faCog, faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import koalaIcon from '../assets/koala_icon.svg';
import profilePic from '../assets/profile_pic.jpg';

const NavBar = () => {
  const [navOpen, setNavOpen] = useState(false)

  return (
    <nav className='bg-gray-100 w-100 py-4'>
        <div className='flex justify-between'>
            <div className='flex'>
                <Image className='ml-4 cursor-pointer' src={koalaIcon} alt="koala_icon" width={30} height={20}/>
                <button className='flex md:hidden mt-2 ml-4'
                onClick={() => setNavOpen(true)}>
                    <FontAwesomeIcon icon={faBars}/>
                </button>
                <div className='hidden md:flex gap-6 ml-10 mt-1 text-[14px]'>
                    <Link href='/'>Live <span className='text-[11px] ml-1 bg-indigo-600 text-white px-2 py-1 rounded-full'>207</span></Link>
                    <Link href='/'>My Accounts</Link>
                    <Link className='text-purple-600 border-2 mt-[-2px] ml-[-2px] bg-blue-100 rounded-full px-2' href='/'>Accounts</Link>
                    <Link href='/'>Visitors</Link>
                    <Link href='/'>Lists</Link>
                </div>
            </div>
            <div className='flex gap-4 mr-8 cursor-pointer'>
                <FontAwesomeIcon className='mt-2' icon={faSearch}/>
                <button>
                    <FontAwesomeIcon className='mt-2' icon={faCog}/>
                </button>
                <button>
                    <Image className='rounded-full' src={profilePic} alt='koala' width={30}height={20}/>
                    <Image/> 
                </button>
            </div>
        </div>
        {/* mobile design when nav is open */}
        {navOpen ? 
        <div className='fixed inset-0 w-full h-full bg-white bg-opacity-500 z-100'>
            <button onClick={() => setNavOpen(false)}>
                <FontAwesomeIcon className='absolute top-10 right-10' icon={faTimes} size='2x'/>
            </button>
            <div className='h-screen flex flex-col gap-6 justify-center items-center'>
                <Link href='/'>Live <span className='text-[11px] ml-1 bg-indigo-600 text-white px-2 py-1 rounded-full'>207</span></Link>
                <Link href='/'>My Accounts</Link>
                <Link className='text-purple-600 border-2 mt-[-2px] ml-[-2px] bg-blue-100 rounded-full px-2' href='/'>Accounts</Link>
                <Link href='/'>Visitors</Link>
                <Link href='/'>Lists</Link>
            </div>
        </div>
        : null}
    </nav>
  )
}

export default NavBar