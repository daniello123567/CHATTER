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
export {
  GetArticleById,
  AllPosts,
  GetArticleByCategory,
  GetArticleByQuery,
  GetarticlebyCategoryQuery
}
