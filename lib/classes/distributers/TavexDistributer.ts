/**
 * App core
 */
import Distributer from "@/lib/classes/abstract/Distributer";
/**
 * Utils
 */
import calculatePremium from "@/lib/utils/numbers/calculatePremium";
import fetchAndInitCheerio from "@/lib/utils/http/fetchAndInitCheerio";
/**
 * Constants
 */
import { tavexUrl } from '@/lib/constants/urls';
/**
 * Class for managing the Tavex distributer.
 */
export default class TavexDistributer extends Distributer {
  private mainUrl: string = tavexUrl;
  /**
   * Class constructor
   */
  constructor({ spotPriceInRsd, productTypes } : {
    spotPriceInRsd: number,
    productTypes: string[],
  }) {
    super({
      name: 'Tavex',
      spotPriceInRsd,
      productTypes,
    });
  }
  /**
   * Get buy / sell HTML elements selectors, relevant for Tavex page.
   * 
   * @param {String} identifier
   * 
   * @returns {Object}
   *
   */
  getProductHtmlSelectors(identifier: string) : { priceSellSelector: string, priceBuySelector: string, } {
    return {
      priceSellSelector : `.h-container a[data-id][href*="${identifier}"] .product__price--single .product__price-value`,
      priceBuySelector : `.h-container a[data-id][href*="${identifier}"] .product__price--buy .price-amount-whole`,
    };
  }
  /**
   * Fetch all products information, relevant for this distributer.
   * 
   * @returns {Promise<void>}
   */
  async fetchProductsData() : Promise<void> {
    const cheerio = await fetchAndInitCheerio(this.mainUrl);

    for ( const productType of this.productTypes ) {
      for ( const product of this.products[productType] ) {
        const { priceSellSelector, priceBuySelector } = this.getProductHtmlSelectors(product.identifier);

        const priceSell: number = Number(cheerio(priceSellSelector).text().trim().replace('din', '').replace(' ', ''));
        const priceBuy: number = Number(cheerio(priceBuySelector).text().trim().replace('din', '').replace(' ', ''));
  
        this.fetchedProducts.push({
          name : product.name,
          priceSell,
          priceBuy,
          priceSellPremium: calculatePremium(priceSell, product.weightDivider, this.spotPriceInRsd),
          priceBuyPremium: calculatePremium(priceBuy, product.weightDivider, this.spotPriceInRsd),
          productImageUrl: this.createProductImageUrl(product.identifier),
        });
      }
    }
  }
}