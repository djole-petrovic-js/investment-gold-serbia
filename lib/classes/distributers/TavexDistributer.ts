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
      spotPriceInRsd,
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
      priceSellSelector: `a.product__overlay-link[href*="${identifier}"]`,
      priceBuySelector: `a.product__overlay-link[href*="${identifier}"]`,
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
        const { priceSellSelector, priceBuySelector } = this.getProductHtmlSelectors(
          product.identifier,
        )

        const priceSellSelectorWrapper = cheerio(priceSellSelector).next().next().find('.product__price--single .product__price-value');
        const priceBuySelectorWrapper = cheerio(priceBuySelector).next().next().find('.product__price--buy .price-amount-whole');

        const priceSell: number = Number(
          priceSellSelectorWrapper.text().trim().replace("din", "").replace(" ", ""),
        )
        const priceBuy: number = Number(
          priceBuySelectorWrapper.text().trim().replace("din", "").replace(" ", ""),
        )
        /**
         * Buy and Sell pages are the same
         */
        const urlSell = priceSellSelectorWrapper.closest("a.product").attr("href")
        const urlBuy = urlSell;

        const priceSellPremium = calculatePremium(
          priceSell,
          product.weightDivider,
          this.spotPriceInRsd,
        )

        const priceBuyPremium = calculatePremium(
          priceBuy,
          product.weightDivider,
          this.spotPriceInRsd,
        )

        this.fetchedProducts.push({
          name: product.name,
          slug: product.identifier,
          productType: productType,
          priceSell: isNaN(priceSell) ? 0 : priceSell,
          priceBuy: isNaN(priceBuy) ? 0 : priceBuy,
          priceSellPremium: isNaN(priceSellPremium) ? 0 : priceSellPremium,
          priceBuyPremium: isNaN(priceBuyPremium) ? 0 : priceBuyPremium,
          urlSell,
          urlBuy,
        })
      }
    }
  }
}
