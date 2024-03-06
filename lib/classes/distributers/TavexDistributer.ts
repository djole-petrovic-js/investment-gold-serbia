/**
 * App core
 */
import Distributer from "@/lib/classes/abstract/DistributerAbstract"
/**
 * Utils
 */
import calculatePremium from "@/lib/utils/numbers/calculatePremium"
import fetchAndInitCheerio from "@/lib/utils/http/fetchAndInitCheerio"
/**
 * Constants
 */
import { tavexMainUrl, tavexUrl } from "@/lib/constants/urls"
import { IProductModel } from "@/lib/database/models/Product"
/**
 * Class for managing the Tavex distributer.
 */
export default class TavexDistributer extends Distributer {
  private mainUrl: string = tavexUrl
  /**
   * Class constructor
   */
  constructor({ spotPriceInRsd }: { spotPriceInRsd: number }) {
    super({
      name: "Tavex",
      homeUrl: tavexMainUrl,
      spotPriceInRsd
    })
  }
  /**
   * Get buy / sell HTML elements selectors, relevant for Tavex page.
   *
   * @param {String} identifier
   *
   * @returns {Object}
   *
   */
  getProductHtmlSelectors(identifier: string): {
    priceSellSelector: string
    priceBuySelector: string
  } {
    return {
      priceSellSelector: `.h-container a[data-id][href*="${identifier}"] .product__price--single .product__price-value`,
      priceBuySelector: `.h-container a[data-id][href*="${identifier}"] .product__price--buy .price-amount-whole`
    }
  }
  /**
   * Fetch all products information, relevant for this distributer.
   *
   * @returns {Promise<void>}
   */
  async fetchProductsData(): Promise<void> {
    const cheerio = await fetchAndInitCheerio(this.mainUrl)

    for (const productType of Object.keys(Distributer.products)) {
      for (const product of Distributer.products[productType]) {
        const { priceSellSelector, priceBuySelector } =
          this.getProductHtmlSelectors(product.identifier)

        const priceSell: number = Number(
          cheerio(priceSellSelector)
            .text()
            .trim()
            .replace("din", "")
            .replace(" ", "")
        )
        const priceBuy: number = Number(
          cheerio(priceBuySelector)
            .text()
            .trim()
            .replace("din", "")
            .replace(" ", "")
        )
        /**
         * If price or sell is 0, something went wrong, or the page is being maintained or something.
         * All other selectors should work fine, if the price is found.
         */
        if (!priceSell) {
          this.raiseProductScapingException(
            "Price sell was empty!",
            product.identifier
          )
        }

        if (!priceBuy) {
          this.raiseProductScapingException(
            "Price buy was empty!",
            product.identifier
          )
        }

        const urlSell = cheerio(priceSellSelector)
          .closest("a.product")
          .attr("href")

        const urlBuy = cheerio(priceSellSelector)
          .closest("a.product")
          .attr("href")

        this.fetchedProducts.push({
          name: product.name,
          slug: product.identifier,
          productType: productType,
          priceSell,
          priceBuy,
          priceSellPremium: calculatePremium(
            priceSell,
            product.weightDivider,
            this.spotPriceInRsd
          ),
          priceBuyPremium: calculatePremium(
            priceBuy,
            product.weightDivider,
            this.spotPriceInRsd
          ),
          urlSell: urlSell,
          urlBuy: urlBuy
        } as IProductModel)
      }
    }
  }
}
