"use client"
import Image from 'next/image';
import {UserButton,useUser } from '@clerk/nextjs';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
function Header() {
  const pathname = usePathname();

  const {isSignedIn} = useUser()
  return (
    <div className='h-[4em] z-50 fixed  lg:h-[5em] justify-between flex items-center p-[1em] border-b border-b-[#C2C2C2] bg-[#FFFFFF] w-full'>
      <Image alt='design' src='/ff.svg' width={40} height={40}/>

      {!isSignedIn ?<Link href='/signUp' className={`text-[0.75em] border border-[#282828] px-2 py-2 hover:bg-[#282828] hover:text-white transform transition duration-75 ease-in rounded-full `} type="button">Who are you?</Link>
    :
    <div className='flex gap-x-[1em]'>
      {!pathname.includes('/dashboard') &&<Link className='text-[0.75em] border border-[#282828] px-2 py-2 hover:bg-[#282828] hover:text-white transform transition duration-75 ease-in rounded-full ' href='/dashboard'>Dashboard</Link>}
      <UserButton/>
</div>
    }

      </div>
  )
}

export default Header
