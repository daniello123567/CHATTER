import { Metadata } from 'next'
import React from 'react'
export const metadata:Metadata = {
  title:'Choose Your Fun On Chatter'
}
function RootLayout({children}:{children:React.ReactNode}) {
  return (
    <div className='w-full h-full'>{children}</div>
  )
}

export default RootLayout
