/**
 * Constants.
 */
import { baseProducts } from "@/lib/constants/baseProducts"
/**
 * Database
 */
import { eq, and } from "drizzle-orm"
import { db } from "@/lib/database/db"
import { ProductsTypeInsert } from "@/lib/database/types"
import { Distributers, Products } from "@/lib/database/schema"
/**
 * Types.
 */
import type { DistributerProductsType } from "@/lib/types/distributerData"
/**
 * Instantiate all Distributers from this class.
 */
export default abstract class DistributerAbstract {
  protected fetchedProducts: ProductsTypeInsert[] = []

  protected name: string
  protected homeUrl: string
  protected spotPriceInRsd: number

  protected static products: DistributerProductsType = baseProducts
  /**
   * Class constructor
   */
  constructor({
    name,
    homeUrl,
    spotPriceInRsd
  }: {
    name: string
    homeUrl: string
    spotPriceInRsd: number
  }) {
    this.name = name
    this.homeUrl = homeUrl
    this.spotPriceInRsd = spotPriceInRsd
  }
  /**
   * Fetch all products for a specific publisher
   *
   * @returns {Promise<void>}
   */
  abstract fetchProductsData(): Promise<void>
  /**
   * Save all scraped data to the database.
   *
   * @returns {Promise<void>}
   */
  async saveFormatedDistributerData(): Promise<void> {
    let distributerId: number = 0

    const distributerSlug: string = this.name
      .toLocaleLowerCase()
      .replace(" ", "-")

    const [distributer] = await db
      .select()
      .from(Distributers)
      .where(eq(Distributers.slug, distributerSlug))

    if (distributer) {
      await db
        .update(Distributers)
        .set({ name: this.name, homeUrl: this.homeUrl, slug: distributerSlug })
        .where(eq(Distributers.slug, distributerSlug))

      distributerId = distributer.id
    } else {
      const [result] = await db.insert(Distributers).values({
        name: this.name,
        homeUrl: this.homeUrl,
        slug: distributerSlug
      })

      distributerId = result.insertId
    }
    /**
     * Separate products into two groups:
     *
     * Ones to be deleted, since the data is missing.
     * Products to insert / update.
     */
    const productGroups = this.fetchedProducts.reduce(
      (
        acc: { toDelete: ProductsTypeInsert[]; toInsert: ProductsTypeInsert[] },
        product: ProductsTypeInsert
      ) => {
        if (!product.priceSell && !product.priceBuy) {
          acc.toDelete.push(product)
        } else {
          acc.toInsert.push(product)
        }

        return acc
      },
      {
        toDelete: [],
        toInsert: []
      }
    )
    /**
     * This products have no buy or sell prices, which means something went wrong.
     * So just remove them for this distributer.
     */
    const toDeletePromises = productGroups.toDelete.map(async (product) => {
      const [existingProduct] = await db
        .select()
        .from(Products)
        .where(
          and(
            eq(Products.slug, product.slug),
            eq(Products.distributerId, distributerId)
          )
        )
        .limit(1)

      if (existingProduct) {
        return db.delete(Products).where(eq(Products.id, existingProduct.id))
      }
    })
    /**
     * Update products with new data.
     */
    const toInsertPromises = productGroups.toInsert.map(async (product) => {
      const [existingProduct] = await db
        .select()
        .from(Products)
        .where(
          and(
            eq(Products.slug, product.slug),
            eq(Products.distributerId, distributerId)
          )
        )
        .limit(1)

      if (existingProduct) {
        return db
          .update(Products)
          .set(Object.assign(product, { distributerId: distributerId }))
          .where(
            and(
              eq(Products.slug, product.slug),
              eq(Products.distributerId, distributerId)
            )
          )
      }

      return db
        .insert(Products)
        .values(Object.assign(product, { distributerId: distributerId }))
    })

    await Promise.all([...toDeletePromises, ...toInsertPromises])
  }
  /**
   * Get the list of all base products.
   *
   * @returns {DistributerProductsType}
   */
  public static getAvailableProducts(): DistributerProductsType {
    return DistributerAbstract.products
  }
}
