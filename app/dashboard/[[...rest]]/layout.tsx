import Header from "@/app/components/header"
import { Metadata } from "next"
export const metadata:Metadata = {
  title:'My dashboard',
  icons:'/ff.svg',
  description:'this is a dashboard for a chatter author'
}
function RootLayout({children}:{children:React.ReactNode}) {
  return (
    <><Header/>
      {children}</>
  )
}

export default RootLayout
