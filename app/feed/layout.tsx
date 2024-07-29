import Header from "../components/header2"
import FeedHero from "../components/FeedHero"
import Footer from "../components/footer"
function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="px-2">
      <Header />
      <FeedHero />
        {children}
      <Footer/>
    </div>
  )
}

export default RootLayout
