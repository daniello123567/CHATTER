import Image from "next/image"
import { Inter } from "next/font/google"
const inter = Inter({subsets:["latin"]})
function intro({nameOfFeature,imageOfFeature,featureOfFeature}:{nameOfFeature:string,imageOfFeature:string,featureOfFeature:Array<string>}) {

  return (
    <div className={`${inter.className} gap-[1.5em] flex flex-col px-[1em]`}>
      <div className='w-full lg:h-[30.5em] lg:w-[38.46875em] px-[1em] py-[1.2em] rounded-[2em] bg-[#F2F4F7] h-[29.9em]'>
        <h1 className={`tracking-tight font-bold text-[3em]`}>{nameOfFeature}</h1>
        <Image className="w-[90%]  md:object-contain shadow-lg  mt-[.9em] mx-auto ro h-[70%] object-cover" alt={`image of`} src={imageOfFeature} width={400} height={50} />
        <div className="flex lg:flex-row flex-wrap mt-[1em] gap-x-[1em]">
          {featureOfFeature.map((feauture:string)=>{
            return<div key={feauture} className="py-[.75em] hover:bg-black hover:text-white font-bold px-[.8em] text-[0.75em] w-[max-content] rounded-full border border-black">{feauture}</div>

          })}
        </div>
      </div>
    </div>
  )
}

export default intro
