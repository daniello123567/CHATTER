import { SignIn, useAuth } from "@clerk/nextjs"
import { Inter } from "next/font/google"
const inter = Inter({subsets:["latin"]})
function Page() {
  return (<div className={`${inter.className} h-[100vh]  grid pt-[1em] place-items-center`}>
    <SignIn signUpUrl="/signUp"  fallbackRedirectUrl='/feed'/>
    </div>
  )
}

export default Page
