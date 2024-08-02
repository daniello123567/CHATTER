import {Inter,Poppins } from "next/font/google"
import Image from "next/image"
const pop = Poppins({subsets:["latin"],weight:"600"})
function Loading() {
  return (
    <div className={`${pop.className} w-[100vw] h-[100vh] bg-yellow-500`}>
          <div className='w-max flex px-[1em] py-[.8em] rounded-full items-center gap-[.4em]  absolute text-[1.4em] text-black font-bold right-[40%] top-[50%] h-max'>chatter
            <Image src='/Rocket.gif' width={30} height={30} className="rounded" alt="loading"/>
          </div>
    </div>
  )
}

export default Loading
