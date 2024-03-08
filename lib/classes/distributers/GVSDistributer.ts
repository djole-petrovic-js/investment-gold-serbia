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
import { gvsMainUrl, gvsUrls } from "@/lib/constants/urls"
import { IProductModel } from "@/lib/database/models/Product"
/**
 * Class for managing the GVS Srbija distributer.
 */
export default class GVSDistributer extends Distributer {
  /**
   * Class constructor
   */
  constructor({ spotPriceInRsd }: { spotPriceInRsd: number }) {
    super({
      name: "GVS Srbija",
      homeUrl: gvsMainUrl,
      spotPriceInRsd
    })
  }
  /**
   * Get buy / sell HTML elements selectors, relevant for GVS buy / sell pages.
   *
   * @param {String} identifier
   *
   * @returns {Object}
   */
  private getProductHtmlSelectors(identifier: string): {
    priceSellSelector: string
    priceBuySelector: string
  } {
    switch (identifier) {
      case "austrijska-filharmonija-1oz": {
        return {
          priceSellSelector: "#product-price-1011",
          priceBuySelector: "#product-price-1423"
        }
      }
      case "austrijska-filharmonija-1-2oz": {
        return {
          priceSellSelector: "#product-price-1012",
          priceBuySelector: "#product-price-1424"
        }
      }
      case "austrijska-filharmonija-1-4oz": {
        return {
          priceSellSelector: "#product-price-1154",
          priceBuySelector: "#product-price-1425"
        }
      }
      case "austrijska-filharmonija-1-10oz": {
        return {
          priceSellSelector: "#product-price-1155",
          priceBuySelector: "#product-price-1426"
        }
      }
      case "austrijska-filharmonija-1-25oz": {
        return {
          priceSellSelector: "#product-price-1003",
          priceBuySelector: "#product-price-1427"
        }
      }
      /**
       * Bars
       */
      case "100g-argor-heraeus": {
        return {
          priceSellSelector: "#product-price-1805",
          priceBuySelector: "#product-price-1592"
        }
      }
      case "50g-argor-heraeus": {
        return {
          priceSellSelector: "#product-price-1071",
          priceBuySelector: "#product-price-1591"
        }
      }
      case "1oz-argor-heraeus": {
        return {
          priceSellSelector: "#product-price-1070",
          priceBuySelector: "#product-price-1590"
        }
      }
      case "20g-argor-heraeus": {
        return {
          priceSellSelector: "#product-price-1069",
          priceBuySelector: "#product-price-1588"
        }
      }
      case "10g-argor-heraeus": {
        return {
          priceSellSelector: "#product-price-1068",
          priceBuySelector: "#product-price-1587"
        }
      }
      case "5g-argor-heraeus": {
        return {
          priceSellSelector: "#product-price-1067",
          priceBuySelector: "#product-price-1586"
        }
      }
      case "2g-argor-heraeus": {
        return {
          priceSellSelector: "#product-price-1173",
          priceBuySelector: "#product-price-1585"
        }
      }
      default: {
        throw new Error(
          `Could not find a selector for weight identifier ${identifier}`
        )
      }
    }
  }
  /**
   * Fetch all products information, relevant for this distributer.
   *
   * @returns {Promise<void>}
   */
  async fetchProductsData(): Promise<void> {
    const [cheerioSellCoins, cheerioBuyCoins, cheerioSellBars, cheerioBuyBars] =
      await Promise.all(
        [
          gvsUrls.sellCoins,
          gvsUrls.buyCoins,
          gvsUrls.sellBars,
          gvsUrls.buyBars
        ].map(fetchAndInitCheerio)
      )
    /**
     * Now find all products in the DOM, and fetch all related data.
     */
    for (const productType of Object.keys(Distributer.products)) {
      for (const product of Distributer.products[productType]) {
        const { priceSellSelector, priceBuySelector } =
          this.getProductHtmlSelectors(product.identifier)

        const cheerioSell =
          productType === "COINS" ? cheerioSellCoins : cheerioSellBars

        const cheerioBuy =
          productType === "COINS" ? cheerioBuyCoins : cheerioBuyBars

        const priceSell = Number(
          cheerioSell(priceSellSelector).attr("data-price-amount")
        )
        const priceBuy = Number(
          cheerioBuy(priceBuySelector).attr("data-price-amount")
        )

        const urlSell = cheerioSell(priceSellSelector)
          .closest("div.product-item-details")
          .prev()
          .attr("href")

        const urlBuy = cheerioBuy(priceBuySelector)
          .closest("div.product-item-details")
          .prev()
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
          urlSell,
          urlBuy
        } as IProductModel)
      }
    }
  }
}
