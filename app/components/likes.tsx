"use client"
import supabase from "../utils/supabase"
import { useState,useEffect } from "react"
import Image from "next/image";
import { useRouter } from "next/navigation";
function Likes({articleId,user_Id}:{articleId:string,user_Id:string|undefined}){
  const router = useRouter();
  const [HasLiked,setHasLiked] = useState<boolean|null>(false);
  const [likesCount,setLikesCount] = useState<number|undefined|any>(0);
  const CheckIfUserHasLiked = async ()=>{
    const {data,error} = await supabase.from('likes')
    .select('*')
    .eq('user_id',user_Id)
    .eq('article_id',articleId);
    if(data?.length!=0){
      setHasLiked(true)
    }
  }
  const LikesCount = async ()=>{
    const {data,error} = await supabase.from('likes')
    .select('*')
    .eq('article_id',articleId);
    setLikesCount(data?.length)
  }
  useEffect(()=>{
    setHasLiked(false);
    CheckIfUserHasLiked();
    LikesCount();
    console.log('saka');

  },[articleId,user_Id])
const handleLike = async ()=>{
  if(user_Id!=='undefined'){
  if(HasLiked){
    setHasLiked(false);
    setLikesCount((prev:any)=>prev - 1)
    const {data,error} = await supabase.from('likes').delete().eq('user_id',user_Id).eq('article_id',articleId);
  }else{
    setHasLiked(true)
    setLikesCount((prev:any)=>prev + 1)

   const {data,error} = await supabase.from('likes').insert({user_id:user_Id,article_id:articleId});
   console.log(data,"error",error);
  }}else{
    router.push('/signUp')

  }


}
  return (
    <div className="flex items-center text-gray-400 gap-[.2em]"><button onClick={handleLike} type="button">
      {HasLiked?
      <Image src='/unlike.png'  height={30} width={30} alt="unlike image" />
      :
      <Image src='/like.png'  height={30} width={30} alt="unlike image" />
      }
      </button>{likesCount}</div>
  )
}

export default Likes;
