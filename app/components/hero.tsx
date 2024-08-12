import type { NextFont } from "next/dist/compiled/@next/font";
import { Inter } from "next/font/google"
import Image from "next/image"
import Link from "next/link";
const inter:NextFont = Inter({ weight: '600', subsets: ["latin"] });

function Hero() {
  return (
    <div id="hero" className={` bg-[#ffffff] ${inter.className} text-black px-[1em]  py-[5.8em] w-full`}>
      <div className="lg:flex lg:gap-x-3 w-full lg:mt-4 items-start">
        <p className={`lg:w-[50%]  lg:text-[5.375rem] tracking-tighter text-[3.125em]`}>Writing.  Meets. Talent.</p>
        <div className="lg:w-[50%]">
          <p className={`mt-[.4em] lg:w-[100%] leading-[1.3em] tracking-tighter  text-[1.75em]`}>
            Chatter  is a multi-functional platform for authors and readers to create and access content. Chatter seeks to knock off competition from Hashnode and Medium.
          </p>
          <div className="flex  items-center mt-[1em] gap-[0.75em]">
            <Link href="/signUp" className={`text-[0.75em] border border-[#282828] px-2 py-2 hover:bg-[#282828] hover:text-white transform transition duration-75 ease-in rounded-full `} type="button">Become an author</Link>
            <Link href="/signIn" className={`text-[0.75em] border border-[#282828] px-2 py-2 hover:bg-[#282828] hover:text-white transform transition duration-75 ease-in rounded-full `} type="button">Sign In</Link>
            <Link href="/feed" className={`text-[0.75em] border border-[#282828] px-2 py-2 hover:bg-[#282828] hover:text-white transform transition duration-75 ease-in rounded-full `} type="button">Explore Blog</Link>
          </div>

        </div>

      </div>

      <div className="mt-[1em] w-full">
        <Image src='/imagey.svg' alt="designs" className="rounded-[1em]  outline-none h-[7.5em]  lg:h-[8.75em] w-full" width={1} height={1} />
        <div className="flex mt-[1em] outline-none gap-x-3 w-full overflow-hidden">
          <Image className="rounded-[1em] outline-none w-[8.375em] h-[7.5em] lg:h-[8.75em]" src="/vim.gif" height={1} width={1} alt="design" />
          <Image className="rounded-[1em] outline-none w-[89%] lg:w-[89%] lg:h-[8.75em]  h-[7.5em]" src='/one.svg' alt="designs" width={1} height={1} />
        </div>
        <Image src='/two.svg' alt="designs" className="rounded-[1em] outline-none lg:h-[8.75em] mt-[1em] h-[7.5em] w-full" width={1} height={1} />
        <div className="flex mt-[1em] gap-x-3 w-full overflow-hidden">
          <Image className="rounded-[1em] outline-none w-[8.375em] h-[7.5em] lg:h-[8.75em]"  src="/three.svg" height={1} width={1} alt="design" />
          <Image className="rounded-[1em] outline-none w-[70%] sm:w-[90%] lg:h-[8.75em]  h-[7.5em]" src='/four.gif' alt="designs" width={1} height={1} />
        </div>
      </div>
    </div>
  )
}

export default Hero
