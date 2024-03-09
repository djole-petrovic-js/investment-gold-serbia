/**
 * Database.
 */
import { db } from "@/lib/database/db"
import { Products } from "@/lib/database/schema"
import { ProductsNameAndSlugType } from "@/lib/database/types"
import { desc, sql } from "drizzle-orm"
/**
 * Fetch unique products that were actually scraped and populated.
 *
 * @returns {ProductsNameAndSlugType[]}
 */
export default async function fetchAvailableProducts() {
  return (
    await db
      .select({
        name: Products.name,
        slug: Products.slug
      })
      .from(Products)
      .orderBy(
        desc(sql.identifier("productType")),
        desc(sql.identifier("priceSell"))
      )
  ).reduce((acc: ProductsNameAndSlugType[], product) => {
    if (!acc.some((p) => product.slug === p.slug)) {
      acc.push(product)
    }

    return acc
  }, [])
}
