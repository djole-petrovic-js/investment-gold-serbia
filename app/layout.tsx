/**
 * CSS
 */
import '@/app/globals.css'
/**
 * Components
 */
import Header from '@/lib/components/Header'
import Footer from '@/lib/components/Footer'
/**
 * Site main layout.
 * 
 */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="sr">
      <body>
        <Header/>
        {children}
        <Footer/>
      </body>
    </html>
  )
}
