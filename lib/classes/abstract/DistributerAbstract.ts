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

    for (const product of this.fetchedProducts) {
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

      await createOrUpdateRecord(
        sequelize.models.Product,
        { slug: product.slug, distributerId },
        productData
      )
    }
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
