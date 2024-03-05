/**
 * Utils.
 */
import capitalizeFirstLetter from "@/lib/utils/strings/capitalizeFirstLetter"
/**
 * Types.
 */
import { PageContextType } from "@/lib/types/pageContext"
/**
 * Form the trade's page title, based on the context.
 *
 * @param {PageContextType} context
 *
 * @returns {string}
 */
export default function createTradeTitle({ params }: PageContextType) {
  let title = "Trgovina"

  if (params.productSlug && params.productSlug[0]) {
    const productTitle = capitalizeFirstLetter(
      params.productSlug[0]
    ).replaceAll("-", " ")

    title += ` | ${productTitle}`
  }

  return title
}
