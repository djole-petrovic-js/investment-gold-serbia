/**
 * Next.js core
 */
import { livePriceOfGold, nbsUrl } from "@/lib/constants/urls"
/**
 * Utils
 */
import fetchAndInitCheerio from "@/lib/utils/http/fetchAndInitCheerio"
/**
 * Get the current gold spot price.
 *
 * @returns {Promise<number>}
 */
export async function getSpotPriceInEur(): Promise<number> {
  const cheerio = await fetchAndInitCheerio(livePriceOfGold)

  const goldSpotPriceInEur = Number(
    cheerio('span[data-price="XAUUSD_EUR"]').first().text().trim().replace(",", ""),
  )

  return goldSpotPriceInEur
}
/**
 * Fetch the RSD to EUR convertion rate, from the Nation Bank site.
 *
 * @return {Promise<number>}
 */
export async function getEurToRsdConversionRate(): Promise<number> {
  /**
   * Refactor this, so it reliably fetches the conversion rate.
   */
  return 117.3
  // const cheerio = await fetchAndInitCheerio(nbsUrl);

  // const rsdEurConvertionRate = Number(
  //   /**
  //    * NBS doesn't have exactly the best HTML structure for scraping.
  //    */
  //   cheerio('#boxCourse > div.boxContent > table:nth-child(1) > tbody > tr > td:nth-child(1)').text()
  // );

  // return rsdEurConvertionRate;
}
/**
 * Get all information relevant for current gold prices.
 *
 * @returns {Object}
 */
export async function getSpotPriceInfo(): Promise<{
  spotPriceInRsd: number
  eurToRsdConversionRate: number
}> {
  const [spotPriceInEur, eurToRsdConversionRate] = await Promise.all([
    getSpotPriceInEur(),
    getEurToRsdConversionRate(),
  ])

  return {
    spotPriceInRsd: spotPriceInEur * eurToRsdConversionRate,
    eurToRsdConversionRate,
  }
}
