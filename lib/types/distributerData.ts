import { FormatedProductType } from "@/lib/types/products"
/**
 * Distributer data type.
 */
export type DistributerData = {
  name: string,
  products: FormatedProductType[],
}