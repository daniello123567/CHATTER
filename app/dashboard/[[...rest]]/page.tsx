"use client"
import { UserProfile } from "@clerk/nextjs"
import { Outfit } from "next/font/google"
import { useUser } from "@clerk/nextjs";
import { useState,useEffect } from "react";
import { fetchUsersArticles } from "@/app/actions/supabaseactions";
import { useRouter } from "next/navigation";
import Myarts from "@/app/components/myarts";
import supabase from "@/app/utils/supabase";
const outfit = Outfit({weight:'400',subsets:["latin"]});
type U = {
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
}
function Page() {
  const [myarticles,setmyarticles] = useState<Array<U>>([]);
  const [visibility,setVisibilty] = useState(false);
  const [deleteid,setDeleteid] = useState<string|undefined>('')
  const {user,isLoaded} = useUser();
  const router = useRouter();


  const fetchdata = async ()=>{
   if(user?.id){
    const {data,error} = await fetchUsersArticles(user.id)
    if(data)setmyarticles([...data])
   }
  }

useEffect(()=>{
  fetchdata()

   },[user])
   const handleDelete = async ()=>{
     const newArts = myarticles.filter((arts)=>{
           return arts.id !== deleteid
     });
     setmyarticles([...newArts])
     setVisibilty(false)
     const ff = await supabase.from('articles').delete().eq('id',deleteid);
   }
   console.log(myarticles);

  return (
    <div className={`${outfit.className} pt-[5em] h-full`}>
      <div className="w-[max-content] lg:pt-[7em] h-[max-content] mx-auto"><UserProfile/></div>
      {visibility&&<div className="fixed top-2 right-3 z-50 bg-red-600 w-[19em] rounded text-center text-white font-semibold h-[8em]">
        Are You sure You want to delete artice with id {deleteid}?
        <button onClick={handleDelete} type="button" className="w-[4em] py-3 bg-red-300 text-white">Yes</button>
        <button type="button" onClick={()=>setVisibilty(false)} className="w-[4em] py-3 bg-green-600 text-white">No</button>
        </div>}

      <div className="w-full px-[1.3em]  mt-[2em] bg-[#101112]">
        <p className="text-white text-[4.25em]">My Articles</p>
        <div className="sm:flex flex-wrap">
         {myarticles.length != 0 ? myarticles.map((art:U)=>{
           return <Myarts id={art.id} onClick={()=>{
            setVisibilty(!visibility);
            setDeleteid(art.id)
           }} thumbnail={art.Thumbnail} key={art.id} date={art.created_at} description={art.Description} title={art.Title}/>
         }):'no articles'}
        </div>
      </div>
    </div>
  )
}

export default Page
