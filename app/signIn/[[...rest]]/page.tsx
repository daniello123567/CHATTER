import { SignIn, useAuth } from "@clerk/nextjs"
import { Inter } from "next/font/google"
const inter = Inter({subsets:["latin"]})
function Page() {
  return (<div className={`${inter.className} mt-[2em] grid place-items-center`}>
    <SignIn signUpUrl="/signUp"  fallbackRedirectUrl='/feed'/>
    </div>
  )
}

export default Page
