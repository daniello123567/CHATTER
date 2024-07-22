"use client"
import Image from 'next/image';
import SearchBar from './searchbar';
import ClearBtn from './clearBtn';
import Link from 'next/link';
import { useUser,UserButton } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
function Header() {
  const { isLoaded, isSignedIn, user } = useUser();
  const router = useRouter();
  console.log(user?.id);

  const handleDashboard = ()=>{
    router.push('/dashboard')
  }
  return (
    <div className='h-[4em] z-50 fixed  lg:h-[5em] justify-between flex items-center p-[1em] border-b border-b-[#C2C2C2] bg-[#FFFFFF] w-full'>
      <Image alt='design' src='/ff.svg' width={40} height={40} />
      <div className='flex items-center'>
        <SearchBar />
        <ClearBtn />
      </div>
      {!isSignedIn ? <Link href='/signIn' className={`text-[0.75em] border border-[#282828] px-2 py-2 hover:bg-[#282828] hover:text-white transform transition duration-75 ease-in rounded-full `} type="button">Who are you?</Link> :
       <div className='flex gap-x-[1em]'>
       <Link className='text-[0.75em] border border-[#282828] px-2 py-2 hover:bg-[#282828] hover:text-white transform transition duration-75 ease-in rounded-full ' href='/dashboard'>Dashboard</Link>
       <UserButton/>
 </div>
      }
    </div>
  )
}

export default Header
