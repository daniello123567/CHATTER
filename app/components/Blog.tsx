import { Inter } from "next/font/google"
import BackToBlogBtn from "./BackToBlogBtn"
import convertDate from "../utils/dateConverter"
import Comments from "./comments"
import Likes from "./likes"
import Bookmark from "./Bookmark"
const inter = Inter({ weight: "600", subsets: ["latin"] })
const inter2 = Inter({ subsets: ["latin"] })
function Blog({ user_id, title, thumbnail, article_id,content,name,created_at ,description}: {user_id:string|undefined, description:string,created_at:string,article_id:string,title: string,name:string, thumbnail: string, content: string }
) {
  return (
    <div className="px-[2em] mx-auto lg:px-[10em] w-full pt-[10em]">
      <BackToBlogBtn/>
      <div className={`text-[2em] mt-[1em] w-full tracking-tight lg:text-[2.6875em] ${inter.className}`}>
        {title}. <span className="text-[.6em] text-gray-300">By {name}</span>
      </div>
      <p className={`${inter2.className}  text-gray-400`}>{convertDate(created_at)}</p>
      <img className="w-full font-bold  mt-[4em] lg:rounded-[2em] lg:h-[30em] rounded-[1em] h-[ 21.875em] object-cover" src={thumbnail} alt="thumbnail" />
      <div className={`${inter2.className} mt-[1em] rounded-[1em] grid place-items-center bg-slate-200 w-full h-[max-content] py-[3em]`}>
        <div className="prose" ><blockquote >{description}</blockquote></div>
        </div>
      <div dangerouslySetInnerHTML={{ __html: content }} className={`${inter2.className} mt-[2em] text-[1.25em] prose`}>

      </div>
      <div className="flex mt-[3em] gap-x-[2em]">
      <Likes articleId={article_id} user_Id={user_id}/>
       <Bookmark articleId={article_id} user_Id={user_id}/>
       </div>
      <Comments article_id={article_id}/>
    </div>
  )
}

export default Blog
