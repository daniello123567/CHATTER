import { SignUp } from "@clerk/nextjs"
function page() {
  return (
    <div className="grid pt-[1em] place-items-center"><SignUp fallbackRedirectUrl={'/personalization'}/></div>
  )
}

export default page
