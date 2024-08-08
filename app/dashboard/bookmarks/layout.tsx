import { Metadata } from 'next'
import React from 'react'
export const metadata:Metadata = {
  title:'my chatter bookmarks',
  description:'this is where you can view all your bookmarked articles',
  icons:'/ff.svg'
}
function RootLayout({ children }: { children: React.ReactNode }) {

  return (
    <div className='bg-black w-full h-screen'>
      {children}
    </div>
  )
}

export default RootLayout
