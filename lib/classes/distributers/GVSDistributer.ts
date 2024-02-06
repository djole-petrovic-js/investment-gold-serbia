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
import { gvsUrls } from '@/lib/constants/urls';
/**
 * Class for managing the GVS Srbija distributer.
 */
export default class GVSDistributer extends Distributer {
  /**
   * Class constructor
   */
  constructor({ spotPriceInRsd, productTypes } : {
    spotPriceInRsd: number,
    productTypes: string[],
  }) {
    super({
      name: 'GVS Srbija',
      spotPriceInRsd,
      productTypes,
    });
  }
  /**
   * Get buy / sell HTML elements selectors, relevant for GVS buy / sell pages.
   * 
   * @param {String} identifier 
   * 
   * @returns {Object}
   */
  getProductHtmlSelectors(identifier: string) : { priceSellSelector: string, priceBuySelector: string, } {
    switch ( identifier ) {
      case 'austrijska-filharmonija-1oz' : { return { priceSellSelector: '#product-price-1011', priceBuySelector: '#product-price-1423'}; }
      case 'austrijska-filharmonija-1-2oz' : { return { priceSellSelector: '#product-price-1012', priceBuySelector: '#product-price-1424'}; }
      case 'austrijska-filharmonija-1-4oz' : { return { priceSellSelector: '#product-price-1154', priceBuySelector: '#product-price-1425'}; }
      case 'austrijska-filharmonija-1-10oz' : { return { priceSellSelector: '#product-price-1155', priceBuySelector: '#product-price-1426'}; }
      case 'austrijska-filharmonija-1-25oz' : { return { priceSellSelector: '#product-price-2208', priceBuySelector: '#product-price-1427'}; }
      case '10g-argor-heraeus' : { return { priceSellSelector: '#product-price-1068', priceBuySelector: '#product-price-1587'}; }
      default : { throw new Error(`Could not find a selector for weight identifier ${identifier}`) }
    }
  }
  /**
   * Fetch all products information, relevant for this distributer.
   * 
   * @returns {Promise<void>}
   */
  async fetchProductsData() : Promise<void> {
    const [
      cheerioSellCoins, 
      cheerioBuyCoins, 
      cheerioSellBars,
      cheerioBuyBars
    ] = await Promise.all([
      gvsUrls.sellCoins,
      gvsUrls.buyCoins,
      gvsUrls.sellBars,
      gvsUrls.buyBars,
    ].map(fetchAndInitCheerio));
    /**
     * Now find all products in the DOM, and fetch all related data.
     */
    for ( const productType of this.productTypes ) {
      for ( const product of this.products[productType] ) {
        const { priceSellSelector, priceBuySelector } = this.getProductHtmlSelectors(product.identifier);
        const cheerioSell = productType === 'COINS' ? cheerioSellCoins : cheerioSellBars;
        const cheerioBuy = productType === 'COINS' ? cheerioBuyCoins : cheerioBuyBars;

        const priceSell = Number(cheerioSell(priceSellSelector).attr('data-price-amount'));
        const priceBuy = Number(cheerioBuy(priceBuySelector).attr('data-price-amount'));

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