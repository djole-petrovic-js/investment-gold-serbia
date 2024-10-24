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
 * @param {string} title
 * @param {PageContextType} context
 *
 * @returns {string}
 */
export default function createTradeTitle(title: string, { params }: PageContextType): string {
  if (params.productSlug && params.productSlug[0]) {
    const productTitle = capitalizeFirstLetter(params.productSlug[0]).replaceAll("-", " ")

    title += ` | ${productTitle}`
  }

  return title
}
