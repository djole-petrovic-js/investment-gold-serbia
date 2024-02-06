/**
 * Types
 */
import type { DistributerData, DistributerProductsType } from "@/lib/types/distributerData";
import type { FormatedProductType } from "@/lib/types/products";
/**
 * Instantiate all Distributers from this class.
 */
export default abstract class Distributer {
  /**
   * @type FormatedProductType[]
   */
  protected fetchedProducts: FormatedProductType[] = [];

  protected name: string;
  protected spotPriceInRsd: number;
  protected productTypes: string[];

  protected products: DistributerProductsType = {
    'COINS' : [{
      name : 'Becka filharmonija 1 oz',
      identifier : 'austrijska-filharmonija-1oz',
      weightDivider : 1 / 1,
    }, {
      name : 'Becka filharmonija 1/2 oz',
      identifier : 'austrijska-filharmonija-1-2oz',
      weightDivider : 1 / 2,
    }, {
      name : 'Becka filharmonija 1/4 oz',
      identifier : 'austrijska-filharmonija-1-4oz',
      weightDivider : 1 / 4,
    }, {
      name : 'Becka filharmonija 1/10 oz',
      identifier : 'austrijska-filharmonija-1-10oz',
      weightDivider : 1 / 10,
    }, {
      name : 'Becka filharmonija 1/25 oz',
      identifier : 'austrijska-filharmonija-1-25oz',
      weightDivider : 1 / 25,
    }],
    'BARS' : [{
      name : 'Argor Heraeus 10g',
      identifier : '10g-argor-heraeus',
      weightDivider : 10 / 31.1,
    }]
  };
  /**
   * Class constructor
   */
  constructor({ name, spotPriceInRsd, productTypes }: {
    name: string,
    spotPriceInRsd: number,
    productTypes: string[],
  }) {
    this.name = name;
    this.spotPriceInRsd = spotPriceInRsd;
    this.productTypes = productTypes;
  }
  /**
   * Fetch all products for a specific publisher
   * 
   * @returns {Promise<void>}
   */
  abstract fetchProductsData() : Promise<void>;
  /**
   * Create a product image url.
   * 
   * @param productName 
   * @returns 
   */
  protected createProductImageUrl(productName: string): string {
    return `/images/${productName}.jpg`;
  }
  /**
   * Prepare scraped data for displaying.
   * 
   * @returns {DistributerData}
   */
  formatDistributerData(): DistributerData {
    return {
      name : this.name,
      products: this.fetchedProducts,
    }
  }
}