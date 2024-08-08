import React from 'react'
import type { Metadata } from 'next'
export const metadata:Metadata={
  title:'Personalized feed',
  icons:'/ff.svg'
}
function RootLayout({children}:{children:React.ReactNode}) {
  return (
    <div>{children}</div>
  )
}

export default RootLayout
