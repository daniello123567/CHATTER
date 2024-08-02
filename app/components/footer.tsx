import type { NextFont } from "next/dist/compiled/@next/font"
import { Inter } from "next/font/google"
import Link from "next/link"
const inter:NextFont = Inter({subsets:["latin"],weight:"600"})
function footer() {
  return (
    <div className={`${inter.className} mb-[1em]  bg-black py-[4em] px-[1em] w-full h-[34.0625em] lg:h-[40.3em] rounded-[2.5em] mx-auto`}>
      <div className={`text-center text-[3em]  tracking-tighter leading-[1.1em] md:text-[5.25em] text-white`}>Let&apos;s create your <br className="hidden lg:block" /> next big idea.</div>
      <div className="px-[1em] mx-auto mt-[1.5em] text-[1.125em]  rounded-full cursor-pointer bg-white w-[max-content] py-[.7em]">Get Started</div>
      <div className=" w-[max-content] mt-[7em] flex-wrap text-center mx-auto flex gap-[1em]">
        <Link href='/' className="text-[0.875em] text-white">Home</Link>
        <Link href='/signIn' className="text-[0.875em] cursor-pointer text-white">get started</Link>
        <Link href='/signUp' className="text-[0.875em] cursor-pointer  text-white">Become an author</Link>
      </div>
      <p className="text-[0.875em] text-center mt-[5em]  text-white">© Built by Daniel Adetaiwo 2024</p>

    </div>
  )
}

export default footer
