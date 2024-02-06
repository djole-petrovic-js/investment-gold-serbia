/**
 * Calculate premium.
 * 
 * @param {Number} price
 * @param {Number} weightDivider
 * @param {Number} spotPrice
 * 
 * @returns number
 */
export function calculatePremium(price: number, weightDivider: number, spotPrice: number): number {
  /**
   * (coin price / troy weight in decimal form) - spot price / spot price
   */
  return ((price / weightDivider) - spotPrice) / spotPrice * 100;
}