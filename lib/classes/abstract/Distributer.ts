/**
 * Types
 */
import { DistributerData } from "@/lib/types/distributerData";
import { FormatedProductType, ProductType } from "@/lib/types/products";
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

  protected products: ProductType[] = [{
    name : 'Becka filharmonija 1 oz',
    weightIdentifier : '1',
    weightDivider : 1 / 1,
  }, {
    name : 'Becka filharmonija 1/2 oz',
    weightIdentifier : '1-2',
    weightDivider : 1 / 2,
  }, {
    name : 'Becka filharmonija 1/4 oz',
    weightIdentifier : '1-4',
    weightDivider : 1 / 4,
  }, {
    name : 'Becka filharmonija 1/10 oz',
    weightIdentifier : '1-10',
    weightDivider : 1 / 10,
  }, {
    name : 'Becka filharmonija 1/25 oz',
    weightIdentifier : '1-25',
    weightDivider : 1 / 25,
  }];
  /**
   * Class constructor
   */
  constructor({ name, spotPriceInRsd, }: {
    name: string,
    spotPriceInRsd: number,
  }) {
    this.name = name;
    this.spotPriceInRsd = spotPriceInRsd;
  }
  /**
   * Fetch all products for a specific publisher
   * 
   * @returns {Promise<void>}
   */
  abstract fetchProductsData() : Promise<void>;
  /**
   * DEBUGGG - Fali ovo. Mada morace verovatno da se refaktoruje na jako, al ono.
   * Neka ga za sad ovako.
   * 
   * @param productName 
   * @returns 
   */
  protected createProductImageUrl(productName: string): string {
    return `/images/${productName.replaceAll('/', '-').replaceAll(' ', '_')}.jpg`;
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