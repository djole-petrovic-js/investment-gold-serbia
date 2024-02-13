/**
 * Next.js core
 */
import { CheerioAPI, load } from "cheerio"
/**
 * Fetch a source content from an URL, and return an initialized Cheerio instance.
 *
 * @param {String} url
 *
 * @returns {Promise<CheerioAPI>}
 */
export default async function fetchAndInitCheerio(
  url: string
): Promise<CheerioAPI> {
  const response = await fetch(url, {
    next: {
      revalidate: 0
    }
  })

  const cheerio = load(await response.text())

  return cheerio
}
