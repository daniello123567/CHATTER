"use client"
import { Poppins } from "next/font/google"
import supabase from "../utils/supabase"
import { useEffect, useState } from "react"
import { useUser } from "@clerk/nextjs"
import Link from "next/link"
import Image from "next/image"
import Article from "../components/Article"
const pop = Poppins({weight:"600",subsets:["latin"]})
type U =  {
  id: string,
  created_at: string,
  user_id: string,
  Title: string,
  Description: string,
  Content: string,
  Category: string,
  Categories?:string;
  Thumbnail: string,
  Tags:string|null|Array<string>,
  name:string
}

function Page() {
const [categorys,setCategory] = useState<Array<U>>([])
const[isLoading,setisloading] = useState<boolean>(false)
const {user} = useUser()
const getCategories = async ()=>{
  setisloading(true)
   const {data,error} = await supabase.from('personalized').select().eq('user_id',user?.id);
   if(data&&data?.length!==0){
   const dataObj = data[0]
   const response = await supabase.from('articles').select().ilikeAnyOf('Category',[...dataObj.Categories]);
      if(response.data)setCategory([...response.data])
   }
  setisloading(false)
}

useEffect(()=>{
  getCategories()
},[user])

  return (
    <div className="px-[2em] mt-[2em]">
      <p className={`${pop.className} text-[3em]`}>Articles For You</p>
      <Link href='/feed' className={`${pop.className} `}>Back to Feeds.</Link>
      {isLoading?<div className="flex gap-[.5em]"><Image src='/Rocket.gif' alt="loading" width={30} height={30}/>Loading Articles For You😊...</div>:<>
         <div className="flex flex-wrap gap-[1em] px-[2em]">
          {categorys.length!==0&& categorys.map((art:U)=>{
          return <Article user_id={String(user?.id)} articleId={art?.id} category={art?.Category} name={art.name} Title={art.Title} date={art.created_at} key={art.id} imageUrl={art.Thumbnail} />
        })}
         </div></>}
    </div>
  )
}

export default Page
