import { SignUp } from "@clerk/nextjs"
function page() {
  return (
      <SignUp  fallbackRedirectUrl={'/personalization'}/>
  )
}

export default page
