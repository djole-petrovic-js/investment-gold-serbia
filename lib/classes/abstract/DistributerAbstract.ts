/**
 * Next.js Core.
 */
import { Model } from "sequelize"
/**
 * Constants.
 */
import { baseProducts } from "@/lib/constants/baseProducts"
/**
 * Database
 */
import sequelize from "@/lib/database/sequelize"
import { IProductModel } from "@/lib/database/models/Product"
import { IDistributerModel } from "@/lib/database/models/Distributer"
/**
 * Types
 */
import type { DistributerProductsType } from "@/lib/types/distributerData"
/**
 * Utils.
 */
import createOrUpdateRecord from "@/lib/utils/database/createOrUpdateRecord"
/**
 * Instantiate all Distributers from this class.
 */
export default abstract class DistributerAbstract {
  protected fetchedProducts: IProductModel[] = []

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
    const distributerSlug: string = this.name
      .toLocaleLowerCase()
      .replace(" ", "-")

    const distributer: Model<IDistributerModel> = await createOrUpdateRecord(
      sequelize.models.Distributer,
      { slug: distributerSlug },
      {
        name: this.name,
        homeUrl: this.homeUrl,
        slug: distributerSlug
      }
    )

    const distributerId: number = distributer.get("id") as number
    /**
     * Separate products into two groups:
     *
     * Ones to be deleted, since the data is missing.
     * Products to insert / product.
     */
    const productGroups = this.fetchedProducts.reduce(
      (
        acc: { toDelete: IProductModel[]; toInsert: IProductModel[] },
        product: IProductModel
      ) => {
        if (!product.priceSell || !product.priceBuy) {
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
      const existingProduct: Model<IProductModel> | null =
        await sequelize.models.Product.findOne({
          where: {
            slug: product.slug,
            distributerId: distributerId
          }
        })

      if (existingProduct) {
        return existingProduct.destroy()
      }
    })
    /**
     * Update products with new data.
     */
    const toInsertPromises = productGroups.toInsert.map(async (product) => {
      const productData = {
        name: product.name,
        slug: product.slug,
        productType: product.productType,
        priceSell: product.priceSell,
        priceBuy: product.priceBuy,
        priceSellPremium: product.priceSellPremium,
        priceBuyPremium: product.priceBuyPremium,
        urlSell: product.urlSell,
        urlBuy: product.urlBuy,
        distributerId
      }

      return createOrUpdateRecord(
        sequelize.models.Product,
        { slug: product.slug, distributerId },
        productData
      )
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
