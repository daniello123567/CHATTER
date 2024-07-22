import Header from "@/app/components/header"
function RootLayout({children}:{children:React.ReactNode}) {
  return (
    <><Header/>
      {children}</>
  )
}

export default RootLayout
