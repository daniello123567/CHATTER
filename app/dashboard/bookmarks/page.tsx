"use client"
import supabase from "@/app/utils/supabase"
import { useUser } from "@clerk/nextjs"
import { useEffect, useState } from "react";
import convertDate from "@/app/utils/dateConverter";
import { useRouter } from "next/navigation";
type U = {articles:{
  Category?:string,
  Content?:string,
  Description?:string,
  Tags?:string,
  Thumbnail?:string,
  Title?:string,
  created_at?:string,
  id?:string,
   name?:string,
   user_id?:string
}}
function Page() {
  const { user ,isLoaded} = useUser();
  const [optimisticBookmarkedArticles,setoptimisticBookmarkedarticles] = useState<any>([]);
  const fetchBookmarks = async ()=>{
      if(!isLoaded && !user)return;

    const {data,error} = await supabase.from('bookmarks').select().eq('user_id',user?.id).select('*, articles(*)')
    if(data)

    setoptimisticBookmarkedarticles([...data])
  }
  useEffect(()=>{
    fetchBookmarks()
  },[user])
  console.log(optimisticBookmarkedArticles);
 const router = useRouter();
  return (<>
  <p className="text-white text-[3em] sm:text-center sm:font-bold">My Bookmarks</p>
    <div className="w-full h-full">{
      optimisticBookmarkedArticles.length !== 0 && optimisticBookmarkedArticles.map((art:U)=>{
   return <div onClick={()=>router.push(`/article/${art.articles.id}`)} key={art.articles.id} className="bg-[#2C2D2F] hover:cursor-pointer mx-auto mb-[1em] flex gap-[1em] p-[1em] text-white font-[600] overflow-hidden w-[27.25em] h-[10em] rounded-[1em] ">
   <div className="w-[40%] h-full overflow-hidden rounded-[inherit] bg-yellow-300">
     <img src={art.articles.Thumbnail} className="w-full object-cover h-full" alt="image of" />
   </div>
   <div className="w-[50%]">
     <p>{art.articles.Title}</p>
     <p>{art.articles.Description}</p>
     <p>{convertDate(art.articles.created_at)}</p>

   </div>
 </div>
      })
    }</div></>
  )
}

export default Page
