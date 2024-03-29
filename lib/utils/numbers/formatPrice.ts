/**
 * Format a price with a currency.
 *
 * @param {Number} price
 *
 * @returns {String}
 */
export default function formatPrice(price: number): string {
  return new Intl.NumberFormat("sr", {
    style: "currency",
    currency: "RSD",
    minimumFractionDigits: 2
  }).format(price)
}
