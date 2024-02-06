/**
 * App core
 */
import Distributer from "@/lib/classes/abstract/Distributer";
/**
 * Utils
 */
import { calculatePremium } from "@/lib/utils/numbers/calculatePremium";
import { fetchAndInitCheerio } from "@/lib/utils/http/fetchAndInitCheerio";
/**
 * Constants
 */
import { gvsUrls } from '@/lib/constants/urls';
/**
 * Class for managing the GVS Srbija distributer.
 */
export default class GVSDistributer extends Distributer {
  private buyUrl: string = gvsUrls.buy;
  private sellUrl: string = gvsUrls.sell;
  /**
   * Class constructor
   */
  constructor({ spotPriceInRsd, } : {
    spotPriceInRsd: number,
  }) {
    super({
      name: 'GVS Srbija',
      spotPriceInRsd,
    });
  }
  /**
   * Get buy / sell HTML elements selectors, relevant for GVS buy / sell pages.
   * 
   * @param {String} weightIdentifier 
   * 
   * @returns {Object}
   */
  getProductHtmlSelectors(weightIdentifier: string) : { priceSellSelector: string, priceBuySelector: string, } {
    switch ( weightIdentifier ) {
      case '1' : { return { priceSellSelector: '#product-price-1011', priceBuySelector: '#product-price-1423'}; }
      case '1-2' : { return { priceSellSelector: '#product-price-1012', priceBuySelector: '#product-price-1424'}; }
      case '1-4' : { return { priceSellSelector: '#product-price-1154', priceBuySelector: '#product-price-1425'}; }
      case '1-10' : { return { priceSellSelector: '#product-price-1155', priceBuySelector: '#product-price-1426'}; }
      case '1-25' : { return { priceSellSelector: '#product-price-2208', priceBuySelector: '#product-price-1427'}; }
      default : { throw new Error(`Could not find a selector for weight identifier ${weightIdentifier}`) }
    }
  }
  /**
   * Fetch all products information, relevant for this distributer.
   * 
   * @returns {Promise<void>}
   */
  async fetchProductsData() : Promise<void> {
    const [cheerioBuy, cheerioSell] = await Promise.all([this.buyUrl, this.sellUrl].map(fetchAndInitCheerio));
    /**
     * Now find all products in the DOM, and fetch all related data.
     */
    for ( const product of this.products ) {
      const { priceSellSelector, priceBuySelector } = this.getProductHtmlSelectors(product.weightIdentifier);

      const priceSell = Number(cheerioBuy(priceSellSelector).attr('data-price-amount'));
      const priceBuy = Number(cheerioSell(priceBuySelector).attr('data-price-amount'));

      this.fetchedProducts.push({
        name : product.name,
        priceSell,
        priceBuy,
        priceSellPremium: calculatePremium(priceSell, product.weightDivider, this.spotPriceInRsd),
        priceBuyPremium: calculatePremium(priceBuy, product.weightDivider, this.spotPriceInRsd),
        productImageUrl: this.createProductImageUrl(product.name),
      });
    }
  }
}