import { PostgrestError } from "@supabase/supabase-js";
import supabase from "../utils/supabase";
 type articleType = {
  id: string;
  created_at: string;
  user_id: string;
  Title: string;
  Description: string;
  Content: string;
  Category: string;
  Thumbnail: string;
  Tags: Array<string | null>;
  name: string;
}
async function AllPosts(): Promise<Array<articleType>|null> {
  const { data: articles, error } = await supabase.from('articles').select('*');
  return articles;
}
async function GetArticleByQuery(search: string): Promise<null|articleType[]> {
  const { data: articles, error } = await supabase.from('articles').select('*').ilike('Title', `%${search}%`)
  return articles;
}
async function GetArticleByCategory(category: string):Promise<null|articleType[]>  {
  category.toLowerCase();
  const { data: articles, error } = await supabase.from('articles').select('*').ilike('Category', `%${category}%`);
  return articles;
}
async function GetarticlebyCategoryQuery(query: string, category: string): Promise<null|articleType[]>  {
  const { data: articles, error } = await supabase.from('articles').select('*').ilike('Title', `%${query}%`).ilike('Category', `%${category}%`);
  return articles;
}
async function GetArticleById(articleId:string){
  const { data, error } = await supabase.from('articles').select('*').eq('id', articleId);
  return data ;
}

 async function fetchUsersArticles(user_id:string):Promise<{data:articleType[]|null,error:string|null|PostgrestError}>{
  const { data,error} = await supabase.from("articles").select('*').eq('user_id',user_id)
 return {data,error};
 }
export {
  GetArticleById,
  AllPosts,
  GetArticleByCategory,
  GetArticleByQuery,
  GetarticlebyCategoryQuery,
  fetchUsersArticles
}
