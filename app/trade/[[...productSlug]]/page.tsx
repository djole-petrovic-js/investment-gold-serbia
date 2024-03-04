/**
 * App Core.
 */
import DistributerAbstract from "@/lib/classes/abstract/DistributerAbstract"
/**
 * Components.
 */
import TradeClientUi from "@/app/trade/[[...productSlug]]/components/TradeClientUi"
/**
 * Types
 */
import { DistributerProductsType } from "@/lib/types/distributerData"
/**
 * Utils.
 */
import fetchDistributersByProductTypes from "@/lib/utils/database/fetchDistributersByProductTypes"
/**
 * Generate an initial static page for each product slug.
 */
export async function generateStaticParams() {
  const productsSlugs: string[] = []
  const availableProducts: DistributerProductsType =
    DistributerAbstract.getAvailableProducts()

  Object.keys(availableProducts).forEach((key) =>
    productsSlugs.push(...availableProducts[key].map((x) => x.identifier))
  )

  return productsSlugs.map((slug: string) => ({
    slug
  }))
}
/**
 * Page for helping users to find the best prices for a product they want to buy.
 */
export default async function Trade() {
  const distributers = await fetchDistributersByProductTypes([])

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
    </main>
  )
}
