"use client"
import supabase from "../utils/supabase";
import { useState,useEffect } from "react"
import { Inter } from "next/font/google";
import { redirect, useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
const inter = Inter({weight:"700",subsets:["latin"]})
import convertDate from "../utils/dateConverter";
type U = {
article_id?: string;
content?: string;
created_at?: string|number;
id?: string|number;
name?: string;
user_id?: string;
}
type B = Array<U>

function Comments({article_id}:{article_id:string}) {
  const router = useRouter()
  const {user} = useUser();
  const [comments,setComments] = useState<B>([]);
  const commenter = async (formData:FormData)=>{

    const value = formData.get('content');
    const optimistic = {
      name:user?.emailAddresses[0].emailAddress,
      content:String(value),
      user_id:user?.id,
      article_id:article_id,
      created_at:Date.now(),
      id:Date.now()

    }

    if(typeof user?.id!=='undefined'){
    setComments([...comments,optimistic])

    const {data,error} = await supabase.from('comments').insert({
      name:user?.emailAddresses[0].emailAddress,
      content:value,
      user_id:user?.id,
      article_id:article_id,
    });
  }else{
   redirect('/signUp')
  }

  }


  const fetchCommentsOfarticle = async ()=>{
   const {data,error} = await supabase.from('comments').select('*').eq('article_id',article_id);

   if(data)setComments([...data]);
  }

  useEffect(()=>{fetchCommentsOfarticle()},[article_id])
  return (<>
    <form action={commenter} className='mb-[3em] mt-[6em]'>
      <input className='border  w-[30%] block px-1 rounded mb-3 h-[4em]' name="content" placeholder='comment on this post' type="text" />
      <input className='bg-blue-600 font-bold px-2 py-1 text-white rounded' type="submit" value="comment" />
    </form>
    <div>
      {comments.toReversed().map((comment:U)=>{
        return <div className="mt-[1em] mb-[2em] border-b-2" key={comment.id}>
          <div className="flex gap-2 items-center"><p className={`${inter.className} text-[1em] lg:text-[2em]`}>{comment.name}</p>
          <p className="text-gray-400">{convertDate(String(comment.created_at))}</p></div>
          <div>{comment.content}</div>
        </div>
      })}
    </div>
    </>
  )
}

export default Comments
