/**
 * Next.js core.
 */
import { Metadata } from "next"
/**
 * Database.
 */
import sequelize from "@/lib/database/sequelize"
import { IVariableModel } from "@/lib/database/models/Variable"
/**
 * UI Components.
 */
import PremiumCalculatorClientComponent from "@/app/premium-calculator/components/PremiumCalculator"
/**
 * Utils
 */
import formatPrice from "@/lib/utils/numbers/formatPrice"
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
    sequelize.models.Variable.findOne({ where: { key: "SPOT_PRICE_IN_RSD" } }),
    sequelize.models.Variable.findOne({
      where: { key: "EUR_TO_RSD_CONVERTION_RATE" }
    }),
    sequelize.models.Variable.findOne({
      where: { key: "DATA_UPDATED_TIMESTAMP" }
    })
  ])) as IVariableModel[]

  const [
    spotPriceInRsdString,
    eurToRsdConversionRateString,
    dataUpdatedTimestamp
  ] = variables.map(({ value }) => value)

  const spotPriceInRsd = Number(spotPriceInRsdString)
  const eurToRsdConversionRate = Number(eurToRsdConversionRateString)

  return (
    <main className="main">
      <div className="m-auto w-4/5 py-5">
        <h1 className="text-4xl">Kalkulator premija za investiciono zlato</h1>

        <div className="my-4">
          <p>
            Izracunajte koliko bi vas kostali zlatni investicioni proizvodi, u
            odnosu na berzansku cenu zlata.
          </p>
          <p>
            Premija je podrazumevani element kad je kupovina u pitanju, ali ne
            treba da bude prevelika. Neke od postojecih su:
          </p>
        </div>

        <div className="my-4">
          <p className="italic">
            Becka filharmonija 1oz (31.1gr) zlatnik - Oko 5 %
          </p>
          <p className="italic">
            Becka filharmonija 1/4oz (7.8gr) zlatnik - Oko 12 %
          </p>
        </div>

        <p>Podaci azurirani : {dataUpdatedTimestamp}</p>

        <p>
          Trenutna cena zlata za jednu uncu :{" "}
          {formatPrice(Number(spotPriceInRsd))}
        </p>

        <p>Trenutni kurs eura : {formatPrice(eurToRsdConversionRate)}</p>

        <PremiumCalculatorClientComponent spotPriceInRsd={spotPriceInRsd} />
      </div>
    </main>
  )
}
