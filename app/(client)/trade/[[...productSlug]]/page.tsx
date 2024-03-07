/**
 * Components.
 */
import TradeClientUi from "@/app/(client)/trade/[[...productSlug]]/components/TradeClientUi"
import GoogleAnalytics from "@/lib/components/GoogleAnalytics"
/**
 * Types
 */
import { PageContextType } from "@/lib/types/pageContext"
/**
 * Utils.
 */
import fetchDistributersByProductTypes from "@/lib/utils/database/fetchDistributersByProductTypes"
import createTradeTitle from "@/app/(client)/trade/[[...productSlug]]/utils/createTradeTitle"
/**
 * To keep the view data fresh.
 */
export const dynamic = "force-dynamic"

import { unstable_cache as cache } from "next/cache"

const fetchProductsTrade = cache(
  async () => {
    return fetchDistributersByProductTypes(["COINS"])
  },
  ["Trade::fetch"],
  {
    tags: ["client-side-data"]
  }
)
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
  const distributers = await fetchProductsTrade()

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

        <TradeClientUi distributers={distributers} />
      </div>

      <GoogleAnalytics />
    </main>
  )
}
