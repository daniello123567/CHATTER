import Hero from './components/hero'
import Header from './components/header'
import Intro from './components/intro'
import type { Metadata } from 'next'
export const metadata:Metadata = {
  title: 'Chatter for everyone 😊',
  icons:'/ff.svg',
  description:'Chatter is a place for writers to thrive. With a built in rich text-editor,writers are unstoppable😊. sign up and experience life',
  keywords:["blog","chatter","chat","writer","writing","blogging","like","chatter","writing","medium"],
  authors:[{name:"daniel adetaiwo"}]

}

function Page() {
  return (
    <div>
      <Header/>
      <Hero/>
      <Intro/>
    </div>
  )
}

export default Page
