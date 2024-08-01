import { Metadata } from 'next'
import React from 'react'
export const metadata:Metadata = {
  title:'sign up to chatter',
  icons:'/ff.svg',
  description:'this is the sign up page. Tell us who you are'
}
function RootLayout({children}:{children:React.ReactNode}) {
  return (<html>
  <body  className="bg-[url('/signUpbg.jpg')] w-full h-full">
  <div>{children}</div>
  </body>
  </html>
  )
}

export default RootLayout
