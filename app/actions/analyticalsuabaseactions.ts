import supabase from "../utils/supabase";
const viewsOfArtcle = async (article_id: string) => {
  const { data, error } = await supabase.from('viewsOnArticles').select('*').eq('article_id', article_id)
  return data?.length;
}
const LikesOfArticle = async (article_id: string) => {
  const { data } = await supabase.from('likes').select('*').eq('article_id', article_id);
  return data?.length;
}
const Bookmarks = async (article_id: string) => {
  const { data } = await supabase.from('bookmarks').select('*').eq('article_id', article_id);
  return data?.length
}
const comments = async (article_id: string) => {
  const { data } = await supabase.from('comments').select('*').eq('article_id', article_id);
  return data?.length
}
export  {viewsOfArtcle,LikesOfArticle,Bookmarks,comments}
