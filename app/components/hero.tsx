import { Inter } from "next/font/google"
import Image from "next/image"

const inter = Inter({ weight: '600', subsets: ["latin"] });

function Hero() {
  return (
    <div className={`bg-[#ffffff] ${inter.className} text-black px-[1em]  py-[5.8em] w-full`}>
      <div className="lg:flex lg:gap-x-3 w-full lg:mt-4 items-start">
        <p className={`lg:w-[50%]  lg:text-[5.375rem] tracking-tighter text-[3.125em]`}>Writing.  Meets. Talent.</p>
        <div className="lg:w-[50%]">
          <p className={`mt-[.4em] lg:w-[100%] leading-[1.3em] tracking-tighter  text-[1.75em]`}>
            Chatter  is a multi-functional platform for authors and readers to create and access content. Chatter seeks to knock off competition from Hashnode and Medium.
          </p>
          <div className="flex  items-center mt-[1em] gap-[0.75em]">
            <button className={`text-[0.75em] border border-[#282828] px-2 py-2 hover:bg-[#282828] hover:text-white transform transition duration-75 ease-in rounded-full `} type="button">Become an author</button>
            <button className={`text-[0.75em] border border-[#282828] px-2 py-2 hover:bg-[#282828] hover:text-white transform transition duration-75 ease-in rounded-full `} type="button">Sign up</button>
            <button className={`text-[0.75em] border border-[#282828] px-2 py-2 hover:bg-[#282828] hover:text-white transform transition duration-75 ease-in rounded-full `} type="button">Explore Blog</button>
          </div>

        </div>

      </div>

      <div className="mt-[1em] w-full">
        <Image src='/image.avif' alt="designs" className="rounded-[1em] h-[7.5em]  lg:h-[8.75em] w-full" width={1} height={1} />
        <div className="flex mt-[1em] gap-x-3 w-full overflow-hidden">
          <Image className="rounded-[1em] w-[8.375em] h-[7.5em] lg:h-[8.75em]" src="/vim.gif" height={1} width={1} alt="design" />
          <Image className="rounded-[1em] w-[70%] lg:w-[89%] lg:h-[8.75em]  h-[7.5em]" src='/one.avif' alt="designs" width={1} height={1} />
        </div>
        <Image src='/two.avif' alt="designs" className="rounded-[1em] lg:h-[8.75em] mt-[1em] h-[7.5em] w-full" width={1} height={1} />
        <div className="flex mt-[1em] gap-x-3 w-full overflow-hidden">
          <Image className="rounded-[1em] w-[8.375em] h-[7.5em] lg:h-[8.75em]"  src="/three.avif" height={1} width={1} alt="design" />
          <Image className="rounded-[1em] w-[70%] sm:w-[90%] lg:h-[8.75em]  h-[7.5em]" src='/four.gif' alt="designs" width={1} height={1} />
        </div>
      </div>
    </div>
  )
}

export default Hero
