import { Metadata } from "next"

export const metadata:Metadata = {
  title:'sign in TO CHATTER',
  icons:'/ff.svg'
}
function layout({children}:{children:React.ReactNode}) {
  return (
    <div className="bg-[url('/signUpbg.jpg')] grid place-items-center py-[2em] w-full h-max">{children}</div>
  )
}

export default layout
