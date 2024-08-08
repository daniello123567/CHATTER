import { Metadata } from 'next'
import React from 'react'
export const metadata:Metadata = {
  title:'sign up to chatter',
  icons:'/ff.svg',
  description:'this is the sign up page. Tell us who you are'
}
function RootLayout({children}:{children:React.ReactNode}) {
  return (
  <div className="bg-[url('/signUpbg.jpg')] grid pt-[1em] place-items-center w-full h-max">
  {children}
  </div>
  )
}

export default RootLayout
