import Header from "../components/header2"
import FeedHero from "../components/FeedHero"
function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="px-2">
      <Header />
      <FeedHero />
        {children}

    </div>
  )
}

export default RootLayout
