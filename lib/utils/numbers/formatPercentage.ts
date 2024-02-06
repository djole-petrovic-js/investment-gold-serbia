/**
 * Format a percentage number.
 * 
 * @param {Number} number 
 * 
 * @returns {String}
 */
export default function formatPercentage(number: number): string {
  return number.toFixed(2) + '%';
}