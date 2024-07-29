import supabase from "../utils/supabase";
async function AllPosts(): Promise<any> {
  const { data: articles, error } = await supabase.from('articles').select('*');
  return articles;
}
async function GetArticleByQuery(search: string): Promise<any> {
  const { data: articles, error } = await supabase.from('articles').select('*').ilike('Title', `%${search}%`)
  return articles;
}
async function GetArticleByCategory(category: string): Promise<any> {
  category.toLowerCase();
  const { data: articles, error } = await supabase.from('articles').select('*').ilike('Category', `%${category}%`);
  return articles;
}
async function GetarticlebyCategoryQuery(query: string, category: string): Promise<any> {
  const { data: articles, error } = await supabase.from('articles').select('*').ilike('Title', `%${query}%`).ilike('Category', `%${category}%`);
  return articles;
}
async function GetArticleById(articleId: string): Promise<any> {
  const { data, error } = await supabase.from('articles').select('*').eq('id', articleId);
  return data;
}
 async function fetchUsersArticles(user_id:string){
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
