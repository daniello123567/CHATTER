import Article from "../components/Article";
import { AllPosts, GetArticleByQuery, GetArticleByCategory, GetarticlebyCategoryQuery } from "../actions/supabaseactions";
import Noresult from "../components/noResult";
import { currentUser } from "@clerk/nextjs/server";
import { Metadata } from "next";
import type { Params } from "next/dist/shared/lib/router/utils/route-matcher";
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

export const metadata: Metadata = {
  title: 'feeds page',
  icons: '/ff.svg',
  description: 'this is where all your contents live',
  keywords: ["articles", "learn", "blogs", "cool", "chatter", "altschoolafrica"],
}
async function Feed({ searchParams }:{searchParams:Params}) {
  let article: Array<articleType>|null;
  const query:string|null = searchParams?.query;
  const category:string|null = searchParams?.category;
  metadata.title = category || query || 'where chatter contents lives';

  const user = await currentUser();

  if (query && !category) {
    article = await GetArticleByQuery(query);
  }
  else if (category && !query) {
    article = await GetArticleByCategory(category)
  }
  else if (category && query) {
    article = await GetarticlebyCategoryQuery(query, category)
  }
  else if (!category && !query) {

    article = await AllPosts()

  }
  const Arts = () => {
    return <>{article?.length !== 0 ?
      <div className="flex flex-wrap items-center justify-between">
        {article?.map((art: articleType) => {
          return <Article user_id={String(user?.id)} articleId={art.id} category={art.Category} name={art.name} Title={art.Title} date={art.created_at} key={art.id} imageUrl={art.Thumbnail} />
        }
        )}
      </div>
      :
      <Noresult />}</>




  }
  return (
    <div className="px-[1em] lg:mt-[2em] lg:px-[3em]">
      <Arts />
    </div>
  )
}

export default Feed;
export const revalidate = 50;
