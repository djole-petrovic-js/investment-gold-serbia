/**
 * Next.js Core.
 */
import { Suspense } from "react"
import { NextIntlClientProvider } from "next-intl"
import { Metadata } from "next"
import { getLocale, getTranslations } from "next-intl/server"
/**
 * Components.
 */
import CurrentPricesData from "@/trade/components/CurrentPricesData/CurrentPricesData"
import CurrentPricesDataLoader from "@/trade/components/CurrentPricesData/Loader"
import TradeClientUi from "@/trade/components/TradeClientUi"
/**
 * Providers.
 */
import tradeProvider from "@/lib/providers/trade/provider"
/**
 * Types.
 */
import { PageContextType } from "@/lib/types/pageContext"
/**
 * Utils.
 */
import createTradeTitle from "@/trade/utils/createTradeTitle"
/**
 * Fully dynamic route.
 */
export const dynamic = "force-dynamic"
/**
 * Dynamically create the page's metadata, based on the product selected.
 *
 * @param {PageContextType} context
 *
 * @returns {Metadata}
 */
export async function generateMetadata(context: PageContextType): Promise<Metadata> {
  const t = await getTranslations("Trade.Metadata")

  return {
    title: createTradeTitle(t("Title"), context),
    description: t("Description"),
    keywords: t("Keywords"),
  }
}
/**
 * Page for helping users to find the best prices for a product they want to buy.
 */
export default async function Trade() {
  const [{ distributers, availableProducts }, locale, t] = await Promise.all([
    tradeProvider(),
    getLocale(),
    getTranslations("Trade"),
  ])

  return (
    <main className="main">
      <div className="text-white">
        <div className="p-5">
          <h1 className="mainH1">{t("Heading")}</h1>

          <div className="space-y-5">
            <p className="text-xl">{t("Main-FirstParagraph")}</p>
            <p className="text-xl">{t("Main-SecondParagraph")}</p>
            <p className="text-xl">{t("Main-ThirdParagraph")}</p>
          </div>
        </div>

        <Suspense fallback={<CurrentPricesDataLoader />}>
          <CurrentPricesData />
        </Suspense>

        <NextIntlClientProvider
          messages={{
            BestDeals: {
              ProductNotFound: t("BestDeals.ProductNotFound"),
              Buy: t("BestDeals.Buy"),
              BestBuy: t("BestDeals.BestBuy"),
              BuyFor: t("BestDeals.BuyFor"),
              BuyPremium: t("BestDeals.BuyPremium"),
              Sell: t("BestDeals.Sell"),
              BestSell: t("BestDeals.BestSell"),
              SellFor: t("BestDeals.SellFor"),
              SellPremium: t("BestDeals.SellPremium"),
            },
          }}
        >
          <TradeClientUi
            locale={locale}
            distributers={distributers}
            availableProducts={availableProducts}
          />
        </NextIntlClientProvider>
      </div>
    </main>
  )
}
