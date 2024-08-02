"use client"
import Image from 'next/image';
import SearchBar from './searchbar';
import ClearBtn from './clearBtn';
import Link from 'next/link';
import { useUser,UserButton } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { User } from '@clerk/nextjs/server';
function Header() {
  const { isLoaded, isSignedIn, user }= useUser();
  const router = useRouter();
  const redirectToHome = () =>{
    router.push('/feed')
  }
  return (
    <div className='h-[4em] z-50 fixed  lg:h-[5em] justify-between flex items-center p-[1em] border-b border-b-[#C2C2C2] bg-[#FFFFFF] w-full'>
      <Image alt='design' className='cursor-pointer' onClick={redirectToHome} src='/ff.svg' width={40} height={40} />
      <div className='flex items-center'>
        <SearchBar />
        <ClearBtn />
      </div>
      {!isSignedIn ? <Link href='/signUp' className={`text-[0.75em] border border-[#282828] px-2 py-2 hover:bg-[#282828] hover:text-white transform transition duration-75 ease-in rounded-full `} type="button">Who are you?</Link> :
       <div className='flex gap-x-[1em]'>
       <Link className='text-[0.75em] border border-[#282828] px-2 py-2 hover:bg-[#282828] hover:text-white transform transition duration-75 ease-in rounded-full ' href='/dashboard'>Dashboard</Link>
       <UserButton userProfileUrl='/dashboard'/>
 </div>
      }
    </div>
  )
}

export default Header
