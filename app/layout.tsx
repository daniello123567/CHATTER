import '@/app/globals.css'
import { ClerkProvider } from '@clerk/nextjs'
export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return <ClerkProvider>
    <html>
    <body>
      {children}
    </body>
  </html>
  </ClerkProvider>
}
