/**
 * Next.js Core.
 */
import { Metadata } from "next"
import "@fortawesome/fontawesome-svg-core/styles.css"
import { config } from "@fortawesome/fontawesome-svg-core"
/**
 * CSS.
 */
import "@/app/globals.css"
/**
 * Components.
 */
import Header from "@/lib/components/navigation/Header"
import Footer from "@/lib/components/Footer"
/**
 * Metadata for the entire application.
 */
export const metadata: Metadata = {
  authors: {
    url: "https://github.com/djole-petrovic-js/investment-gold-serbia",
    name: "Djordje Petrovic"
  },
  applicationName: "Investment gold Serbia"
}
/**
 * Some Fontawesome hack...
 */
config.autoAddCss = false
/**
 * Site main layout.
 */
export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="sr">
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  )
}
