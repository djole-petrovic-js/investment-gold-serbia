/**
 * Next.js Core.
 */
import { getTranslations } from "next-intl/server"
/**
 * Loader component for the CurrentPricesData component.
 */
export default async function CurrentPricesDataLoader() {
  const t = await getTranslations("Trade.CurrentPricesData")

  return (
    <div className="text-center">
      <p>{t("Loading")}</p>
    </div>
  )
}
