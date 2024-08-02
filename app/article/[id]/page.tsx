import { GetArticleById } from "@/app/actions/supabaseactions";
import Header from "@/app/components/header";
import Blog from "@/app/components/Blog";
import supabase from "@/app/utils/supabase";
import { currentUser } from "@clerk/nextjs/server";
import { Metadata } from "next";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
type Blogs = {
    id: string,
    created_at: string,
    user_id: string,
    Title: string,
    Description: string,
    Content: string,
    Category: string,
    Thumbnail: string,
    Tags:string|null|Array<string>,
    name:string
}
type Blog = Array<Blogs>


async function Page({params,searchParams}:{params:Params,searchParams:Params}) {
  const user = await currentUser();
  const id = params.id;
  const data = await GetArticleById(id);
  if(data){
  const {Title,Description,Content,created_at,Thumbnail,name} = data[0];

  const hasUserViewedThisArticle = async (user_id:string,article_id:string)=>{
    const {data,error}= await supabase.from('viewsOnArticles').select('*').eq('user_id',user_id).eq('article_id',article_id);
    if(data?.length!==0){return true}else return false;
  }

const CheckifuserhasViewed = await hasUserViewedThisArticle(String(user?.id),id);
if(!CheckifuserhasViewed){
  await supabase.from('viewsOnArticles').insert({
    user_id:user?.id,
    article_id:id
  });
}

  return (<div className="w-full">
    <Header/>
    <Blog user_id={user?.id} name={name} article_id={id} created_at={created_at} title={Title} description={Description} thumbnail={Thumbnail} content={Content}/>
    </div> )
  }

}

export default Page
