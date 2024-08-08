import Header from '@/app/components/header'
import { Metadata } from 'next'
import React from 'react'
export const metadata:Metadata = {
  title:'😊creating magic..',
  icons:'/ff.svg'
}
function RootLayout({children}:{children:React.ReactNode}) {
  return (<>  <Header/>

    <div className="bg-[url('/signUpbg.jpg')] pb-[5em] pt-[7em]">{children}</div></>
  )
}

export default RootLayout
