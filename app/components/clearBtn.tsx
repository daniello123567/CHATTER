"use client"
import type { NextFont } from "next/dist/compiled/@next/font";
import { Inter } from "next/font/google"
import { useSearchParams,usePathname,useRouter } from "next/navigation";
const inter:NextFont = Inter({weight:"400",subsets:["latin"]});
function ClearBtn() {
  const path = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const query = searchParams.get('query');
  const category = searchParams.get('category');
  const handleClear = ()=>{
    router.push(`${path}`)
  }
  if(query||category)return (
    <button type="button" onClick={handleClear} className={`${inter.className} bg-blue-800 text-[.9em] md:ml-1 px-1 sm:h-[2.45em] text-white lg:text-sm lg:px-4 md:py-3 rounded lg:ml-2`}>Clear</button>
  )
}

export default ClearBtn
