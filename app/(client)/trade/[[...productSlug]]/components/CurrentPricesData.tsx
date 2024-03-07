/**
 * Providers.
 */
import variablesProvider from "@/lib/providers/variables/provider"
/**
 * Utils.
 */
import formatPrice from "@/lib/utils/numbers/formatPrice"
/**
 * Display all relevant trade prices
 */
export default async function CurrentPricesData() {
  const variables = await variablesProvider()

  if (!variables.SPOT_PRICE_IN_RSD || !variables.EUR_TO_RSD_CONVERTION_RATE) {
    return null
  }

  return (
    <div className="flex justify-center px-5 divide-x-2 border-t border-b border-t-white">
      <p className="px-2">
        Spot cena : {formatPrice(Number(variables.SPOT_PRICE_IN_RSD))}
      </p>

      <p className="px-2">
        Kurs evra : {formatPrice(Number(variables.EUR_TO_RSD_CONVERTION_RATE))}
      </p>
    </div>
  )
}
