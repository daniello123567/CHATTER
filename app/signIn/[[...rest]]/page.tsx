import { SignIn, useAuth } from "@clerk/nextjs"
import { Inter } from "next/font/google"
const inter = Inter({subsets:["latin"]})
function Page() {
  return (
    <SignIn signUpUrl="/signUp"  fallbackRedirectUrl='/feed'/>
  )
}

export default Page
