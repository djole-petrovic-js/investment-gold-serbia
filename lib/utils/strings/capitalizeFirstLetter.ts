/**
 * Capitalize first letter of any string.
 *
 * @param {string} string
 *
 * @returns {string}
 */
export default function capitalizeFirstLetter(string: string): string {
  return string.charAt(0).toUpperCase() + string.slice(1)
}
