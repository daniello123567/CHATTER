import Header from '@/app/components/header'
import React from 'react'

function RootLayout({children}:{children:React.ReactNode}) {
  return (<>  <Header/>

    <div className="bg-[url('/signUpbg.jpg')] pb-[5em] pt-[7em]">{children}</div></>
  )
}

export default RootLayout
