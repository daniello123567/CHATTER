import { Metadata } from "next"

export const metadata:Metadata = {
  title:'sign in TO CHATTER',
  icons:'/ff.svg'
}
function layout({children}:{children:React.ReactNode}) {
  return (
    <body className="bg-[url('/signUpbg.jpg')]">{children}</body>
  )
}

export default layout
