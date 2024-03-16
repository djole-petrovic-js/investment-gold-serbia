/**
 * Next.js Core.
 */
import { getTranslations } from "next-intl/server"
/**
 * Providers.
 */
import variablesProvider from "@/lib/providers/variables/provider"
/**
 * Utils.
 */
import formatPrice from "@/lib/utils/numbers/formatPrice"
/**
 * Display all relevant trade prices.
 */
export default async function CurrentPricesData() {
  const [{ SPOT_PRICE_IN_RSD, EUR_TO_RSD_CONVERTION_RATE }, t] =
    await Promise.all([
      variablesProvider(),
      getTranslations("Trade.CurrentPricesData")
    ])

  return (
    <div className="flex justify-center px-5 divide-x-2 border-t border-b border-t-white">
      <p className="px-2 text-center">
        {t("SpotPrice")} : {formatPrice(Number(SPOT_PRICE_IN_RSD))}
      </p>

      <p className="px-2 text-center">
        {t("EuroExchangeRate")} :{" "}
        {formatPrice(Number(EUR_TO_RSD_CONVERTION_RATE))}
      </p>
    </div>
  )
}
