import Header from "@/app/components/header"
import { Metadata } from "next"
export const metadata:Metadata = {
  title:'My dashboard',
  icons:'/ff.svg',
  description:'this is a dashboard for a chatter author'
}
function RootLayout({children}:{children:React.ReactNode}) {


  return (
    <div className="bg-[url('/dash.jpg')]">
      <Header/>
      {children}
      </div>
  )
}

export default RootLayout
