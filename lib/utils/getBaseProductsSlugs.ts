/**
 * App Core.
 */
import DistributerAbstract from "@/lib/classes/abstract/DistributerAbstract"
/**
 * Types.
 */
import { DistributerProductsType } from "@/lib/types/distributerData"
/**
 * Get slugs from all available products.
 *
 * @returns {string[]} productsSlugs
 */
export default function getBaseProductsSlugs(): string[] {
  const productsSlugs: string[] = []

  const availableProducts: DistributerProductsType =
    DistributerAbstract.getAvailableProducts()

  Object.keys(availableProducts).forEach((key) =>
    productsSlugs.push(
      ...availableProducts[key].map((product) => product.identifier)
    )
  )

  return productsSlugs
}
