import Hero from './components/hero'
import Header from './components/header'
import Intro from './components/intro'
import Footer from './components/footer'
import { Inter } from 'next/font/google'
import Image from 'next/image'
import type { Metadata } from 'next'
export const metadata:Metadata = {
  title: 'Chatter for everyone 😊',
  icons:'/ff.svg',
  description:'Chatter is a place for writers to thrive. With a built in rich text-editor,writers are unstoppable😊. sign up and experience life',
  keywords:["blog","chatter","chat","writer","writing","blogging","like","chatter","writing","medium"],
  authors:[{name:"daniel adetaiwo"}]

}
type feautures = {
  name:string,
  image:string,
  feautures:Array<string>
}
const inter = Inter({subsets:["latin"]})
const features:Array<feautures> = [{
  name:'Dashboard.',
  image:'/dashboard.png',
  feautures:["track your progess"]
},
{name:'Markdown.',
  image:'/markdown.png',
  feautures:['Write what you feel','author']
},
{name:'Feed.',
  image:'/feed.png',
  feautures:['Chatter contents']
}
]
function Page() {
  return (
    <div className='overflow-hidden'>
      <Header/>
      <Hero/>
      <div className='flex items-center mb-[1.9em] gap-[.3em]'>
        <Image alt='bro' className='w-[2em] h-[2em]' src='/side.svg' width={1} height={1} />
        <p className={`${inter.className} tracking-[.3em]  text-[1em]`}>These Feautures make chatter more fun 😊.</p>
      </div>
      <div className='flex flex-col lg:flex-row md:gap-[2.3em] lg:animate-scroll gap-[1em]'>{features.map((feauture)=>{
        return <Intro key={feauture.image} nameOfFeature={feauture.name} imageOfFeature={feauture.image} featureOfFeature={feauture.feautures} />
      })}</div>
      <div className='px-[1em] w-full h-[max-content] mt-[3em]'>
      <Footer/>
      </div>
    </div>
  )
}

export default Page
