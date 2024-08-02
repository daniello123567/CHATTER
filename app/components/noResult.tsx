"use client"
import { Inter } from "next/font/google";
import { useSearchParams } from "next/navigation";
const inter = Inter({weight:"600",subsets:["latin"]})
 function Noresult() {
  const params = useSearchParams();
  const query:string|null= params.get('query');
  const category:string|null = params.get('category');
  if(query||category)return <div className={`${inter.className} border-gray-300 border rounded-[1em] mx-auto text-center px-[2em] py-[3em] w-[26.125em] h-[19.875em]`}>sorry man no result for {query} {category&&category}.Why not Join Chatter and create something about {query}{category&&category}!🤷‍♂️</div>
}

export default Noresult
