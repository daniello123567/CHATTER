import React from 'react'

function RootLayout({children}:{children:React.ReactNode}) {
  return (
    <html >
<body className='bg-black'>
{children}
</body>
      </html>
  )
}

export default RootLayout
