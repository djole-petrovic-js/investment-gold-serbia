/**
 * Database
 */
import { IProductModel } from "@/lib/database/models/Product"
import { IDistributerModel } from "@/lib/database/models/Distributer"
import sequelize from "@/lib/database/sequelize"
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
  protected spotPriceInRsd: number

  protected products: DistributerProductsType = {
    COINS: [
      {
        name: "Becka filharmonija 1 oz",
        identifier: "austrijska-filharmonija-1oz",
        weightDivider: 1 / 1
      },
      {
        name: "Becka filharmonija 1/2 oz",
        identifier: "austrijska-filharmonija-1-2oz",
        weightDivider: 1 / 2
      },
      {
        name: "Becka filharmonija 1/4 oz",
        identifier: "austrijska-filharmonija-1-4oz",
        weightDivider: 1 / 4
      },
      {
        name: "Becka filharmonija 1/10 oz",
        identifier: "austrijska-filharmonija-1-10oz",
        weightDivider: 1 / 10
      },
      {
        name: "Becka filharmonija 1/25 oz",
        identifier: "austrijska-filharmonija-1-25oz",
        weightDivider: 1 / 25
      }
    ],
    BARS: [
      {
        name: "Argor Heraeus 10g",
        identifier: "10g-argor-heraeus",
        weightDivider: 10 / 31.1
      }
    ]
  }
  /**
   * Class constructor
   */
  constructor({
    name,
    spotPriceInRsd
  }: {
    name: string
    spotPriceInRsd: number
  }) {
    this.name = name
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
    const slug = this.name.toLocaleLowerCase().replace(" ", "-")

    const findResult = await sequelize.models.Distributer.findOrCreate({
      where: { slug },
      defaults: {
        slug,
        name: this.name
      }
    })

    const distributer: IDistributerModel = findResult[0] as IDistributerModel

    for (const product of this.fetchedProducts) {
      const productData = {
        name: product.name,
        slug: product.slug,
        productType: product.productType,
        priceSell: product.priceSell,
        priceBuy: product.priceBuy,
        priceSellPremium: product.priceSellPremium,
        priceBuyPremium: product.priceBuyPremium,
        distributerId: distributer.id
      }

      await createOrUpdateRecord(
        sequelize.models.Product,
        { slug: product.slug, distributerId: distributer.id },
        productData
      )
    }
  }
}