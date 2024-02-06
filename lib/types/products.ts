/**
 * Base product type.
 */
export type ProductType = {
  name: string,
  identifier: string,
  weightDivider: number,
}
/**
 * Formated product data type.
 */
export type FormatedProductType = {
  name: string,
  priceSell: number,
  priceBuy: number,
  priceSellPremium: number,
  priceBuyPremium: number,
  productImageUrl: string,
};