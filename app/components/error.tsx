"use client"
import type { NextFont } from "next/dist/compiled/@next/font";
import { Inter } from "next/font/google"
import { useRouter,usePathname } from "next/navigation"
const interBold:NextFont = Inter({subsets:["latin"]})
function Notfound() {
  const router = useRouter();
  const pathname = usePathname();
  return (
    <div className={`${interBold.className} py-[2em] px-[1em] shadow-2xl text-center bg-slate-100 w-[18em] absolute top-[50%] ml-[3em] rounded h-[18em]`}>
      <p className="text-red-600 text-[3em] font-bold ">Error</p>
      <p className="text-[1.2em] font-bold">An Error Has Ocurred. Please Check your internet</p>
       <button onClick={()=>router.push(pathname)} type="button" className="bg-blue-600 font-bold text-white px-[1em] py-[.6em] rounded mt-[.5em]">Try Again!</button>
    </div>
  )
}

export default Notfound
