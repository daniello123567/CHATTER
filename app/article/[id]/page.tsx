import { GetArticleById } from "@/app/actions/supabaseactions";
import Blog from "@/app/components/Blog";
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
async function page({params}:{params:any}) {
  const id = params.id;
  const data = await GetArticleById(id);
  const {Title,Description,Content,created_at,Thumbnail,name} = data[0]

  return (
    <Blog name={name} created_at={created_at} title={Title} thumbnail={Thumbnail} content={Content}/>
  )
}

export default page
