import { Inter } from "next/font/google"
import convertDate from "../utils/dateConverter";
import Link from "next/link";
import Likes from "./likes";
import Bookmark from "./Bookmark";
import { NextFont } from "next/dist/compiled/@next/font";
const inter2: NextFont = Inter({ weight: '400', subsets: ["latin"] })
const inter1: NextFont = Inter({ weight: '600', subsets: ["latin"] })
type U = string;
function Article({ imageUrl, date, Title, name, category, articleId, user_id }: { user_id: string, imageUrl: U | any, date: U, Title: U, name: U, category: U, articleId: U }) {
  return (
    <div className="xl:w-[25.1041875em] relative mt-[2em] lg:mb-[9em] w-full h-[max-content] md:h-[max-content]  xl:h-[max-content] gap-y-[1em] flex flex-col">
      <div className="w-full h-full relative">
        <Link href={`/article/${articleId}`}>
        <img src={imageUrl} alt={Title} className="md:h-[22.6600625em] lg:h-[24em] xl:h-[23em] w-full object-cover rounded-[2em]" /></Link>
        <div className="absolute top-4 left-7 bg-slate-200 px-3 py-2 rounded text-lg font-semibold">{category}</div>
      </div>
      <div className="w-full h-[max-content] mb-[1em] md:h-[max-content] lg:h-[2.444125em] flex flex-col">
        <div className="flex pr-2 items-center mb-[1em] gap-[1em]"><Likes articleId={articleId} user_Id={user_id} />
          <Bookmark articleId={articleId} user_Id={user_id} />
        </div>
        <p className={`text-[0.875em] w-full text-[#5F6980] py-2 font-[400] ${inter2.className}`}>{convertDate(date)}. By {name}</p>
        <p className={`w-full pb-2 ${inter1.className} text-[1.75em]`}>{Title}</p>

      </div>

    </div>
  )
}
export const revalidate = 100;
export default Article
