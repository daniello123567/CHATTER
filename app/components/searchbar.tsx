"use client"
import { Inter } from "next/font/google"
import { useRouter,usePathname, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
const inter2 = Inter({weight:"400",subsets:["latin"]});
function SearchBar() {
  const params = new URLSearchParams();
  const currentPath = usePathname();
  const {replace} = useRouter();
  const searchParams = useSearchParams();
  const handleQuery = useDebouncedCallback((query:string)=>{
    const category = searchParams.get('category');
    if(!query){
      params.delete('query')
    }
    params.set('query',query);
    if(category){
      replace(`${currentPath}?${params}&category=${category}`)
    }
   replace(`${currentPath}?${params}`);

  },300)

  return (
     <div className="lg:h-[2.85em] h-[2.25em] lg:w-[20em]"><input onChange={(e)=>handleQuery(e?.target.value)} className="h-full rounded-[0.5em] lg:rounded-[0.85em] px-4 w-full outline-none border-2" placeholder="search.." type="text" /></div>
  )
}

export default SearchBar
