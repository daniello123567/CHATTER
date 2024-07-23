import { Inter } from "next/font/google"
import supabase from "@/app/utils/supabase"
import { UserProfile } from "@clerk/nextjs"
import { currentUser } from "@clerk/nextjs/server"
import Image from "next/image"
import convertDate from "@/app/utils/dateConverter"
import Link from "next/link"
import { Plus } from "lucide-react"
const inter = Inter({ weight: "700", subsets: ["latin"] })
const inter2 = Inter({ weight: "400", subsets: ["latin"] });
const inter3 = Inter({ subsets: ["latin"] });
type artiClesType = {
  id: string,
  created_at: string,
  user_id: string,
  Title: string,
  Description: string,
  Content: string,
  Category: string,
  Thumbnail: string,
  Tags: string | null,
  name: string
}






async function page() {
  const user = await currentUser();
  const fetchArticlesByUserId = async (user_id: string | undefined) => {
    const { data, error } = await supabase.from('articles').select('*').eq('user_id', user_id);
    return data;
  }
  const usersArticles = await fetchArticlesByUserId(user?.id);
  console.log(usersArticles);

  const UserArts = () => {
    if (usersArticles?.length === 0) return;
    return <div>{usersArticles?.map((arts: artiClesType) => {
      return <div className={`${inter3.className} mb-[1em] w-full bg-slate-200 flex items-center justify-between h-[8em] rounded p-[1em]`} key={arts.id}>
        <div className="w-[30%] rounded bg-red-600 h-full">
          <img src={arts.Thumbnail} className="w-full h-full object-cover" alt="image of a blog post" />
        </div>
        <div className="w-[60%] font-bold text-[1em]">
          <p>Title:<span className="font-normal">{arts.Title}</span></p>
          <p>Category:<span className="font-normal">{arts.Category}</span></p>
          <p>Description:<span className="font-normal">{arts.Description}</span></p>
          <p>Date Created:<span className="font-normal">{convertDate(arts.created_at)}</span></p>
        </div>
        <div className="w-[5%] flex flex-col gap-1">
          <div className="bg-slate-300 hover:bg-slate-400 w-[max-content] px-2 rounded h-[max-content]">
            <Image className="w-[2em] lg:w-[1.5em] h-[2em]" src='/analyse.svg' alt="analytics" width={1} height={1} />
          </div>
          <div className="bg-slate-300 hover:bg-slate-400 w-[max-content] px-2 rounded h-[max-content]">
            <Image className="w-[2em] lg:w-[1.5em] h-[2em]" src='/edit.svg' alt="analytics" width={1} height={1} />
          </div>
          <div className="bg-slate-300 hover:bg-slate-400 w-[max-content] px-2 rounded h-[max-content]">
            <Image className="w-[2em] lg:w-[1.5em] h-[2em]" src='/delete.svg' alt="analytics" width={1} height={1} />
          </div>
        </div>
      </div>
    })}</div>
  }
  return (
    <div className="grid pt-[10em] w-full place-items-center">
      <UserProfile />
      <div className="w-full">
        <div className="lg:w-[65%] w-full mt-[1em] pt-3 px-[1em] mx-auto h-[20em] bg-slate-50">
          <div className={`${inter.className} border-b-2 text-[3em] flex items-center justify-between`}>
            <p>My Article(s)</p>
            <Link href="/dashboard/new" className="text-[1em] bg-slate-300 p-2 rounded-full"><Plus /></Link>

          </div>
          <div>
            {usersArticles?.length !== 0 ? <UserArts /> : 'no articles man'}
          </div>
        </div>
      </div>
    </div>
  )
}

export default page
