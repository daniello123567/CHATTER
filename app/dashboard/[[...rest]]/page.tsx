"use client"
import { UserProfile } from "@clerk/nextjs"
import { Outfit } from "next/font/google"
import { useUser } from "@clerk/nextjs";
import { useState,useEffect } from "react";
import Notfound from "@/app/components/error";
import Link from "next/link";
import { fetchUsersArticles } from "@/app/actions/supabaseactions";
import { useRouter } from "next/navigation";
import Myarts from "@/app/components/myarts";
import supabase from "@/app/utils/supabase";
import { Plus } from "lucide-react";
import Image from "next/image";
const outfit = Outfit({weight:'400',subsets:["latin"]});
type U = {
  id?: string;
  created_at?: string;
  user_id?: string;
  Title?: string;
  Description?: string;
  Content?: string;
  Category?: string;
  Thumbnail?: string;
  Tags?: Array<string | null>;
  name?: string;
}
function Page() {
  const [loading,setisLoading] = useState<boolean>(false)
  const [myarticles,setmyarticles] = useState<Array<U>>([]);
  const [error,isThereerror] = useState<boolean>(false)
  const [visibility,setVisibilty] = useState(false);
  const [deleteid,setDeleteid] = useState<string|undefined>('')
  const {user,isLoaded} = useUser();
  const router = useRouter();


  const fetchdata = async ()=>{
    setisLoading(true)
   if(user?.id){
    const {data,error} = await fetchUsersArticles(user.id)
    if(error){
      console.log(error);

    }
    if(data)setmyarticles([...data])
      setisLoading(false)

   }
  }

useEffect(()=>{
  fetchdata()
   },[user,isLoaded])
   const handleDelete = async ()=>{
     const newArts = myarticles.filter((arts)=>{
           return arts.id !== deleteid
     });
     setmyarticles([...newArts])
     setVisibilty(false)
     const ff = await supabase.from('articles').delete().eq('id',deleteid);
   }

  return (
    <div className={`${outfit.className} pt-[5em] h-full`}>
      <div className="w-[max-content] lg:pt-[7em] h-[max-content] mx-auto"><UserProfile/></div>
      {visibility&&<div className="fixed bottom-2 right-[3em] z-50 bg-red-600 w-[19em] rounded text-center text-white font-semibold h-[8em]">
        Are You sure You want to delete artice with id {deleteid}?
        <button onClick={handleDelete} type="button" className="w-[4em] py-3 bg-red-300 text-white">Yes</button>
        <button type="button" onClick={()=>setVisibilty(false)} className="w-[4em] py-3 bg-green-600 text-white">No</button>
        </div>}

      <div className="w-full px-[1.3em] p-[1.6em]  mt-[2em] bg-[#101112]">
        <div className="flex lg:flex-row flex-col justify-between items-center">

          <Link className="text-white border px-[1em] py-[.6em] rounded-full" href='dashboard/bookmarks'>My Bookmarks</Link>
          <p className="text-white text-[4.25em]">My Articles</p>
        <Link href="/dashboard/new" className="bg-white p-[1em] rounded-full"><Plus/></Link></div>

        <div  className="sm:flex flex-wrap">
         {isLoaded ? myarticles.map((art:U)=>{
           return <Myarts id={art.id} onClick={()=>{
            setVisibilty(!visibility);
            setDeleteid(art.id)
           }} thumbnail={art.Thumbnail} key={art.id} date={art.created_at} description={art.Description} title={art.Title}/>
         }):
         <>
         <p className="md:text-[3em] text-[1.3em] text-center text-white">You dont an article yet. Click on the + sign to get started! </p>
         <Image alt="no articles" className="w-[20em] mx-auto mt-3 object-contain" src='/presentation.gif' width={200} height={1}/></>}
        </div>
      </div>
    </div>
  )
}

export default Page
