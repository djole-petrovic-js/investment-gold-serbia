/**
 * Next.js core.
 */
import { Metadata } from "next"
/**
 * Components.
 */
import GoogleAnalytics from "@/lib/components/GoogleAnalytics"
/**
 * Database.
 */
import sequelize from "@/lib/database/sequelize"
import { IVariableModel } from "@/lib/database/models/Variable"
/**
 * UI Components.
 */
import PremiumCalculatorClientComponent from "@/app/(client)/premium-calculator/components/PremiumCalculator"
/**
 * Utils
 */
import formatPrice from "@/lib/utils/numbers/formatPrice"
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
  const variables = (await Promise.all([
    sequelize.models.Variable.findOne({
      where: { key: "SPOT_PRICE_IN_RSD" }
    }),
    sequelize.models.Variable.findOne({
      where: { key: "EUR_TO_RSD_CONVERTION_RATE" }
    })
  ])) as IVariableModel[]

  const [spotPriceInRsdString, eurToRsdConversionRateString] = variables.map(
    ({ value }) => value
  )

  const spotPriceInRsd = Number(spotPriceInRsdString)
  const eurToRsdConversionRate = Number(eurToRsdConversionRateString)

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

          <div>
            <p>
              Trenutna cena zlata za jednu uncu :{" "}
              {formatPrice(Number(spotPriceInRsd))}
            </p>
          </div>

          <div>
            <p>Trenutni kurs eura : {formatPrice(eurToRsdConversionRate)}</p>
          </div>
        </div>

        <PremiumCalculatorClientComponent spotPriceInRsd={spotPriceInRsd} />
      </div>

      <GoogleAnalytics />
    </main>
  )
}
