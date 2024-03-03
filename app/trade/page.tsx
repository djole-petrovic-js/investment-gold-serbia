/**
 * Components.
 */
import TradeClientUi from "@/app/trade/components/TradeClientUi"
/**
 * Utils.
 */
import fetchDistributersByProductTypes from "@/lib/utils/database/fetchDistributersByProductTypes"
/**
 * Page for helping users to find the best prices for a product they want to buy.
 */
export default async function Trade() {
  const distributers = await fetchDistributersByProductTypes([])

  return (
    <main className="main">
      <div className="text-white">
        <div className="p-5">
          <h1 className="text-4xl mb-5">Trgovina</h1>

          <p className="text-xl">
            Ovde mozete naci najbolje kupovne i prodajne cene za svaki proizvod
            izlistan ispod.
          </p>

          <p className="text-xl">
            Distributeri mogu naravno imati i druge proizvode sem ovih, ali ovi
            su zajednicki, tako da jedino njih mozemo uporedjivati
          </p>

          <p className="text-xl">
            Kada odaberete proizvod, klikom na onaj sa najboljom kupovnom /
            prodajnom cenom, bicete preusmereni na sajt distributera.
          </p>
        </div>

        <TradeClientUi distributers={distributers} />
      </div>
    </main>
  )
}
