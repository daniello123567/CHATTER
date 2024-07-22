import Link from 'next/link'
import { Inter } from 'next/font/google'
import Image from 'next/image'
const inter = Inter({weight:'600',subsets:["latin"]})
function BackToBlogBtn() {
  return (<div className='flex hover:underline gap-[1em]'>
   <Image width={1} height={1} src="/LA.svg" className='w-[1em]' alt="left arrow icon" /> <Link className={`text-[ 1.125em] ${inter.className}`} href='/feed'>Back To Feed</Link>
    </div>
  )
}

export default BackToBlogBtn
