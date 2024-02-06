import type { FormatedProductType, ProductType } from "@/lib/types/products"
/**
 * Abstract distributer's data.
 */
export type DistributerProductsType = {
  [key: string]: ProductType[],
}
/**
 * Distributer data type.
 */
export type DistributerData = {
  name: string,
  products: FormatedProductType[],
}