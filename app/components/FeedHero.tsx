"use client"
import { Inter } from "next/font/google"
import { useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import type { NextFont } from "next/dist/compiled/@next/font";
const inter:NextFont = Inter({ weight: "600", subsets: ["latin"] });
const inter2:NextFont = Inter({ weight: "400", subsets: ["latin"] });

function FeedHero() {
  const [categoryisloading,setCategoryisLoading] = useState<boolean>(false);
  const { isLoaded,isSignedIn } = useUser();
  const searchParams = useSearchParams()
  const path = usePathname();
  const { replace } = useRouter()
  const handleCategory = (e: any) => {
    const query:string|null = searchParams.get('query');
    const params = new URLSearchParams();
    params.set('category', e.target.innerText)
    if(query) {
      replace(`${path}?query=${query}&${params}`)
    }
    else replace(`${path}?${params}`);

  }
  const category:string|null = searchParams.get('category')

  return (<>
    <div className='w-full justify-between px-[1em] py-[4.5em] h-[max-content] lg:h-[22em] gap-x-[6em] flex flex-col lg:flex-row lg:py-[9em] lg:px-[3em]'>
      <div className="w-full">
        <p className={`${inter.className} text-[2.75em] tracking-tighter lg:text-[5.375em]`}>Articles</p>
        <p className={`lg:text-[1.125em] mt-[1em] text-[1.125em] leading-[1.5em] ${inter2.className}`}>This articles are written by authors here on chatter. Enjoy!</p>
      </div>
      <div className="lg:w-[50%] mr-[12.25em] w-full pt-[2em]">
        <div className="flex justify-between"><p className={`text-[1.25em] ${inter.className}`}>Categories
        </p>
        {isSignedIn&&<Link href='/foryou' className="bg-slate-50 px-[1em] py-[.6em] hover:bg-slate-100 rounded-full">For You</Link>}
        </div>
        <div className={`${inter2.className} mt-[1em] md:mx-auto w-full flex text-[0.875em]`}>
          <p onClick={handleCategory} className={`w-[12.25em]   border-b hover:border-b-black ${category?.includes('inspiration') && ' border-b-2 border-b-black '}  hover:cursor-pointer`}>inspiration</p>
          <p onClick={handleCategory} className={`w-[12.25em]  border-b hover:border-b-black ${category?.includes('Coding') && ' border-b-2 border-b-black '}  hover:cursor-pointer`}>Coding</p>
          <p onClick={handleCategory} className={`  border-b hover:border-b-black ${category?.includes('Cooking') && ' border-b-2 border-b-black '}  hover:cursor-pointer`}>Cooking</p>
        </div>
        <div className={`${inter2.className} mt-[1em] w-full flex text-[0.875em]`}>
          <p onClick={handleCategory} className={`w-[12.25em]  border-b hover:border-b-black ${category?.includes('Entertainment') && ' border-b-2 border-b-black '}  hover:cursor-pointer`}>Entertainment</p>
          <p onClick={handleCategory} className={`w-[12.25em]  border-b hover:border-b-black ${category?.includes('Sports') && ' border-b-2 border-b-black '}  hover:cursor-pointer`}>Sports</p>
          <p onClick={handleCategory} className={`  border-b hover:border-b-black ${category?.includes('Politics') && ' border-b-2 border-b-black '}  hover:cursor-pointer`}>Politics</p>
        </div>
        <div className={`${inter2.className}  mt-[1em] w-full flex text-[0.875em]`}>
          <p onClick={handleCategory} className={`w-[12.25em]  border-b hover:border-b-black ${category?.includes('Artificial Inteligence') && ' border-b-2 border-b-black '}  hover:cursor-pointer`}>Artificial Inteligence</p>
          <p onClick={handleCategory} className={`w-[12.25em]  border-b hover:border-b-black ${category?.includes('Movies') && ' border-b-2 border-b-black '}  hover:cursor-pointer`}>Movies</p>
          <p onClick={handleCategory} className={`  border-b hover:border-b-black ${category?.includes('Lifestyle') && ' border-b-2 border-b-black '}  hover:cursor-pointer`}>Lifestyle</p>
        </div>

      </div>
    </div>
  </>
  )
}

export default FeedHero
