"use client"
import supabase from "../utils/supabase"
import { useState,useEffect } from "react"
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import Image from "next/image";
function Bookmark({articleId,user_Id}:{articleId:string,user_Id:string|undefined}) {
const [isBookmarked,setIsbookmarked] = useState(false)
const [bookmarkCount,setBookmarksCount] = useState<number|undefined>(0)
const checkifUserhasBookmarked = async ()=>{
  const {data,error} = await supabase.from('bookmarks').select('*').eq('user_id',user_Id).eq('article_id',articleId);
  if(data?.length!=0){setIsbookmarked(true)};
}
const fetchBookmarksCount = async()=>{
  const {data,error} = await supabase.from('bookmarks').select('*').eq('article_id',articleId);
  setBookmarksCount(data?.length)
}
const handleBookmark = async ()=>{
  if(isBookmarked){
    setIsbookmarked(false);
    setBookmarksCount((prev:any)=>prev-1);
    const {data,error} = await supabase.from('bookmarks').delete().eq('user_id',user_Id).eq('article_id',articleId);
  }else{
    setIsbookmarked(true);
    setBookmarksCount((prev:any)=>prev + 1)
    const {data,error} = await supabase.from('bookmarks').insert({'user_id':user_Id,article_id:articleId});
  }
}
useEffect(()=>{setIsbookmarked(false);setBookmarksCount(0);checkifUserhasBookmarked(),fetchBookmarksCount()},[user_Id,articleId]);
return <div className="flex gap-1 items-center text-gray-400"><button type="button" onClick={handleBookmark}>{isBookmarked?
  <Image src='/bookmarked.png'  height={22} width={22} alt="unbookmark" />
  :
  <Image src='/bookmark.png'   height={22} width={22} alt="bookmark" />
}</button>{bookmarkCount}</div>
}
export default Bookmark;
