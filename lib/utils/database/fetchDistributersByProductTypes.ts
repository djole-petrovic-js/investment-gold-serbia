/**
 * Database.
 */
import { db } from "@/lib/database/db"
import { desc, sql } from "drizzle-orm"
/**
 * Fetch a distributer with some of his products (filter them by product type).
 *
 * @param {string[]} productTypes
 *
 * @returns {Promise<Distributers[]>}
 */
export default async function fetchDistributersByProductTypes(
  productTypes: string[]
) {
  return db.query.Distributers.findMany({
    with: {
      Products: {
        orderBy: [
          desc(sql.identifier("productType")),
          desc(sql.identifier("priceSell"))
        ],
        where: (Products, { inArray }) =>
          inArray(Products.productType, productTypes)
      }
    }
  })
}
