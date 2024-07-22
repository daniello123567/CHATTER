import { Poppins } from 'next/font/google'
import WhiteBox from './whiteBox'
import Link from 'next/link'
const pop = Poppins({subsets:["latin"],weight:'500'})
async function Intro() {
  const contents = ["#1 place for Blog", "#Bloggers", "#Become an author", "#Share your works", "Number one place for authors", "#Readers", "JOIN NOW", "Readers are leaders"]
  return (
    <div className='bg-[#EDEDED] pb-4 pt-[1em] h-[30em] overflow-x-hidden w-full'>
      <div className="overflow-hidden whitespace-nowrap w-full h-32 relative">
        <div className="flex animate-scroll">
          <div className="flex-shrink-0 gap-x-5 flex items-center">
            <WhiteBox Arrayofcontents={contents} />
          </div>

        </div>
      </div>
      <div className=' pt-[3em] mt-[-1em] rounded w-[60%] shadow-sm h-[20em] mx-auto'>
        <p className={`${pop.className} bg-gradient-to-r from-red-600 via-purple-800 to-slate-900 bg-clip-text text-transparent text-[4em] text-center`}>Become a writer now!</p>
        <div className='w-[50%] flex items-center justify-center gap-[2em] mt-[6em] mx-auto'>
        <Link href='/feed' className=' bg-purple-700 px-[.9em] py-4 rounded-full hover:bg-purple-800 font-bold text-white' type='button'>Get Started</Link>
        <Link href='/feed' className=' bg-purple-700 px-[.9em] py-4 rounded-full hover:bg-purple-800 font-bold text-white' type='button'>Go To Field</Link>
        </div>

      </div>
    </div>
  )
}

export default Intro
