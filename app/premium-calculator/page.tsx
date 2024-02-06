/**
 * Next.js core
 */
import { Metadata } from "next";
/**
 * UI Components
 */
import PremiumCalculatorClientComponent from "@/app/premium-calculator/components/PremiumCalculator";
/**
 * Providers
 */
import { getSpotPriceInfo } from "@/lib/providers/http";
/**
 * Utils
 */
import { formatPrice } from "@/lib/utils/numbers/formatPrice";
/**
 * Page metadata
 */
export const metadata: Metadata = {
  title: 'Premium calculator',
  description: 'Calculate gold premiums for easier purchases',
}
/**
 * Page for displaying all current prices information, and premium calculator client component.
 */
export default async function PremiumCalculator() {
  const { spotPriceInRsd, eurToRsdConversionRate } = await getSpotPriceInfo();

  return (
    <div className="text-white" style={{background: 'linear-gradient(90deg, rgba(123,128,68,1) 0%, rgba(0,0,0,1) 100%)'}}>
      <div className="m-auto w-4/5 py-5">
        <h1 className="text-4xl">Kalkulator premija za zlatne proizvode</h1>

        <div className="my-4">
          <p>Izracunajte koliko bi vas kostali zlatni investicioni proizvodi, u odnosu na berzansku cenu zlata.</p>
          <p>Premija je podrazumevani element kad je kupovina u pitanju, ali ne treba da bude prevelika. Neke od postojecih su:</p>
        </div>

        <div className="my-4">
          <p className="italic">Becka filharmonija 1oz (31.1gr) zlatnik - Oko 5 %</p>
          <p className="italic">Becka filharmonija 1/4oz (7.8gr) zlatnik - Oko 12 %</p>
        </div>

        <h2>Trenutna cena zlata za jednu uncu : {formatPrice(spotPriceInRsd)}</h2>
        <h2>Trenutni kurs eura : {formatPrice(eurToRsdConversionRate)}</h2>

        <PremiumCalculatorClientComponent spotPriceInRsd={spotPriceInRsd}/>
      </div>
    </div>
  )
}