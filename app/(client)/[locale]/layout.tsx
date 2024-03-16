/**
 * Next.js Core.
 */
import { Metadata } from "next"
import { Roboto } from "next/font/google"
import "@fortawesome/fontawesome-svg-core/styles.css"
import { config } from "@fortawesome/fontawesome-svg-core"
import { NextIntlClientProvider, useMessages } from "next-intl"
/**
 * Constants.
 */
import { projectGithubUrl } from "@/lib/constants/urls"
/**
 * CSS.
 */
import "@/app/globals.css"
/**
 * Components.
 */
import Header from "@/lib/components/navigation/Header"
import Footer from "@/lib/components/Footer"
import GoogleAnalytics from "@/lib/components/GoogleAnalytics"
/**
 * Metadata for the entire application.
 */
export const metadata: Metadata = {
  authors: {
    url: projectGithubUrl,
    name: "Djordje Petrovic"
  },
  applicationName: "Investment gold Serbia"
}
/**
 * Initialize Roboto fonts
 */
const roboto = Roboto({
  weight: "400",
  subsets: ["latin"],
  display: "swap"
})
/**
 * Some Fontawesome hack...
 */
config.autoAddCss = false
/**
 * Site main layout.
 */
export default function RootLayout({
  children,
  params
}: {
  children: React.ReactNode
  params: { locale: string }
}) {
  const messages = useMessages()

  return (
    <html lang={params.locale} className={roboto.className}>
      <body>
        <Header />

        <NextIntlClientProvider
          messages={{
            Error: messages.Error
          }}
        >
          {children}
        </NextIntlClientProvider>

        <Footer />
        <GoogleAnalytics />
      </body>
    </html>
  )
}
