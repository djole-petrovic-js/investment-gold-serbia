/**
 * Next.js Core.
 */
import { Suspense } from "react"
/**
 * Components.
 */
import CurrentPricesData from "@/app/(client)/trade/[[...productSlug]]/components/CurrentPricesData"
import TradeClientUi from "@/app/(client)/trade/[[...productSlug]]/components/TradeClientUi"
import GoogleAnalytics from "@/lib/components/GoogleAnalytics"
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
import createTradeTitle from "@/app/(client)/trade/[[...productSlug]]/utils/createTradeTitle"
/**
 * Fully dynamic route.
 */
export const dynamic = "force-dynamic"
/**
 *
 * Dynamically create the page's metadata, based on the product selected.
 *
 * @param {PageContextType} context
 *
 * @returns {Metadata}
 */
export async function generateMetadata(context: PageContextType) {
  return {
    title: createTradeTitle(context),
    description: "Trgovina investicionim zlatom",
    keywords: ["trgovina", "proizvodi", "zlato", "investiranje"]
  }
}
/**
 * Page for helping users to find the best prices for a product they want to buy.
 */
export default async function Trade() {
  const { distributers, availableProducts } = await tradeProvider()

  return (
    <main className="main">
      <div className="text-white">
        <div className="p-5">
          <h1 className="mainH1">Trgovina</h1>

          <div className="space-y-5">
            <p className="text-xl">
              Ovde mozete naci najbolje kupovne i prodajne cene za svaki
              proizvod izlistan ispod.
            </p>

            <p className="text-xl">
              Distributeri mogu naravno imati i druge proizvode sem ovih, ali
              ovi su zajednicki, tako da jedino njih mozemo uporedjivati.
            </p>

            <p className="text-xl">
              Kada odaberete proizvod, klikom na onaj sa najboljom kupovnom /
              prodajnom cenom, bicete preusmereni na sajt distributera.
            </p>
          </div>
        </div>

        <Suspense fallback={<p>Ucitavanje cena...</p>}>
          <CurrentPricesData />
        </Suspense>

        <TradeClientUi
          distributers={distributers}
          availableProducts={availableProducts}
        />
      </div>

      <GoogleAnalytics />
    </main>
  )
}
