/**
 * Next.js core.
 */
import { Metadata } from "next"
import { getTranslations } from "next-intl/server"
import { NextIntlClientProvider } from "next-intl"
/**
 * Components.
 */
import PremiumCalculatorClientComponent from "@/client/premium-calculator/components/PremiumCalculator"
/**
 * Providers.
 */
import variablesProvider from "@/lib/providers/variables/provider"
/**
 * Fully dynamic route.
 */
export const dynamic = "force-dynamic"
/**
 * Page metadata.
 */
export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("PremiumCalculator.Metadata")

  return {
    title: t("Title"),
    description: t("Description"),
    keywords: t("Keywords").split(",")
  }
}
/**
 * Page for displaying all current prices information, and premium calculator client component.
 */
export default async function PremiumCalculator() {
  const [variables, t] = await Promise.all([
    variablesProvider(),
    getTranslations("PremiumCalculator")
  ])

  return (
    <main className="main">
      <div className="m-auto w-full md:w-4/5 p-5">
        <h1 className="mainH1">{t("Heading")}</h1>

        <div className="space-y-5 text-xl">
          <div className="space-y-1">
            <p>{t("Main-FirstParagraph")}</p>
            <p>{t("Main-SecondParagraph")}</p>
          </div>

          <div className="italic">
            <p>{t("Italic-FirstParagraph")}</p>
            <p>{t("Italic-SecondParagraph")}</p>
          </div>
        </div>

        <NextIntlClientProvider
          messages={{
            Client: {
              Calculator: t("Client.Calculator"),
              WeightInGrams: t("Client.WeightInGrams"),
              PriceToPay: t("Client.PriceToPay"),
              Premium: t("Client.Premium")
            }
          }}
        >
          <PremiumCalculatorClientComponent
            spotPriceInRsd={Number(variables.SPOT_PRICE_IN_RSD)}
          />
        </NextIntlClientProvider>
      </div>
    </main>
  )
}
