import { Inter } from "next/font/google"
import { UserProfile } from "@clerk/nextjs"
const inter = Inter({weight:"700",subsets:["latin"]})
const inter2 = Inter({weight:"400",subsets:["latin"]})
function page() {
  return (
    <div className="grid w-full place-items-center">
     <UserProfile/>
     <div className="w-full">
      <p className={`${inter.className} mt-[2em] font-bold`}>Your Posts</p>
      <div className="w-full h-[20em] bg-slate-300">

      </div>
     </div>
    </div>
  )
}

export default page
