import Article from "../components/Article";
import { AllPosts,GetArticleByQuery,GetArticleByCategory,GetarticlebyCategoryQuery } from "../actions/supabaseactions";
import Noresult from "../components/noResult";
import { currentUser } from "@clerk/nextjs/server";
type articleType = {
  id:string;
  created_at:string;
  user_id:string;
  Title:string;
  Description:string;
  Content:string;
  Category:string;
  Thumbnail:string;
  Tags:Array<string|null>;
  name:string;
}

async function Feed({searchParams}:any) {
  let article:Array<articleType>;
  const query = searchParams?.query;
  const category = searchParams?.category;

  const user = await currentUser()
  console.log(user?.id);


  if(query&&!category){
    article = await GetArticleByQuery(query)
  }
  else if(category&&!query){
    article = await GetArticleByCategory(category)
  }
  else if(category&&query){
    article = await GetarticlebyCategoryQuery(query,category)
  }
  else if(!category&&!query){
    article = await AllPosts()
  }
  const Arts = ()=>{
    return <>{article?.length !== 0 ?
      <div className="flex flex-wrap items-center justify-between">
      {article?.map((art:articleType)=>{
       return <Article user_id={String(user?.id)} articleId={art?.id} category={art?.Category} name={art.name}  Title={art.Title} date={art.created_at} key={art.id} imageUrl={art.Thumbnail}/>
      }
      )}

     </div>
       :
       <Noresult/>}</>




  }
  return (
    <div className="px-[1em] lg:mt-[2em] lg:px-[3em]">
     <Arts/>
    </div>
  )
}

export default Feed;
export const revalidate = 100;
