import type { Params } from "next/dist/shared/lib/router/utils/route-matcher"
import { viewsOfArtcle,LikesOfArticle,Bookmarks,comments } from "@/app/actions/analyticalsuabaseactions";
import LineChart from "@/app/components/Analytics";
async function page({ params,searchParams }: {searchParams:any, params: Params }) {
  const articleId = params.id;
  const nameOfArticle = searchParams.title;
  console.log(nameOfArticle);

  const bro = await Promise.all([viewsOfArtcle(articleId), Bookmarks(articleId), comments(articleId), LikesOfArticle(articleId)]).then((res) => { return res });
  const viewsCount = Number(bro[0])
  const BookmarkCount = Number(bro[1])
  const CommentsCount = Number(bro[2])
  const LikesCount = Number(bro[3])


  return (<div className="flex flex-col">
    <LineChart articlename={nameOfArticle} LikesCount={LikesCount} viewsCount={viewsCount} BookmarkCount={BookmarkCount} CommentsCount={CommentsCount}/>
    <div className="flex flex-col gap-y-[1em] lg:flex-row gap-x-[1em] rounded mb-[7em] bg-slate-200 px-[.7em] py-[.6em] mx-auto">
      <div className="h-[3em] text-center font-bold text-[6em] w-[3em] bg-white">{viewsCount}<span className="text-sm">Views</span></div>
      <div className="h-[3em] text-center font-bold text-[6em] w-[3em] bg-white">{BookmarkCount}<span className="text-sm">Bookmarks</span></div>
      <div className="h-[3em] text-center font-bold text-[6em] w-[3em] bg-white">{LikesCount}<span className="text-sm">Likes</span></div>
      <div className="h-[3em] text-center font-bold text-[6em] w-[3em] bg-white">{CommentsCount}<span className="text-sm">Comments</span></div>
    </div>
    </div>
  )
}

export default page
