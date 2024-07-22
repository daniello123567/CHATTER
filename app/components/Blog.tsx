import { Inter } from "next/font/google"
import BackToBlogBtn from "./BackToBlogBtn"
import convertDate from "../utils/dateConverter"
import Comments from "./comments"
const inter = Inter({ weight: "600", subsets: ["latin"] })
const inter2 = Inter({ subsets: ["latin"] })
function Blog({ title, thumbnail, article_id,content,name,created_at }: { created_at:string,article_id:string,title: string,name:string, thumbnail: string, content: string }
) {
  return (
    <div className="px-[2em] pt-[10em] lg:px-[15em]">
      <BackToBlogBtn/>
      <div className={`text-[2em] mt-[1em] tracking-tight lg:text-[2.6875em] ${inter.className}`}>
        {title}. <span className="text-[.6em] text-gray-300">By {name}</span>
      </div>
      <p className={`${inter2.className} text-gray-400`}>{convertDate(created_at)}</p>
      <img className="w-full  mt-[4em] lg:rounded-[2em] lg:h-[30em] rounded-[1em] h-[ 21.875em] object-cover" src={thumbnail} alt="thumbnail" />
      <div dangerouslySetInnerHTML={{ __html: content }} className={`${inter2.className} mt-[2em] text-[1.25em] prose`}>

      </div>
      <Comments article_id={article_id}/>
    </div>
  )
}

export default Blog
