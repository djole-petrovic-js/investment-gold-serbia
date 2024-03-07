/**
 * Next.js core.
 */
import { Metadata } from "next"
/**
 * Components.
 */
import GoogleAnalytics from "@/lib/components/GoogleAnalytics"
/**
 * UI Components.
 */
import PremiumCalculatorClientComponent from "@/app/(client)/premium-calculator/components/PremiumCalculator"
/**
 * Providers.
 */
import variablesProvider from "@/lib/providers/variables/provider"
/**
 * To keep the view data fresh.
 */
export const dynamic = "force-dynamic"
/**
 * Page metadata
 */
export const metadata: Metadata = {
  title: "Kalkulator premija",
  description: "Kalkulator premija za laksu kupovinu.",
  keywords: ["zlato", "investiciono zlato", "premija", "Kalkulator premija"]
}
/**
 * Page for displaying all current prices information, and premium calculator client component.
 */
export default async function PremiumCalculator() {
  const variables = await variablesProvider()

  return (
    <main className="main">
      <div className="m-auto w-full md:w-4/5 p-5">
        <h1 className="mainH1">Kalkulator premija za investiciono zlato</h1>

        <div className="space-y-5 text-xl">
          <div className="space-y-1">
            <p>
              Izracunajte koliko bi vas kostali zlatni investicioni proizvodi, u
              odnosu na berzansku cenu zlata.
            </p>
            <p>
              Premija je podrazumevani element kad je kupovina u pitanju, ali ne
              treba da bude prevelika. Neke od postojecih su:
            </p>
          </div>

          <div className="italic">
            <p>Becka filharmonija 1oz (31.1gr) zlatnik - Oko 5 %</p>
            <p>Becka filharmonija 1/4oz (7.8gr) zlatnik - Oko 12 %</p>
          </div>
        </div>

        <PremiumCalculatorClientComponent
          spotPriceInRsd={Number(variables.SPOT_PRICE_IN_RSD)}
        />
      </div>

      <GoogleAnalytics />
    </main>
  )
}
