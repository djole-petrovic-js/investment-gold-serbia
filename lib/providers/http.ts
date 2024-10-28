/**
 * Next.js core
 */
import { livePriceOfGold, nbsUrl } from "@/lib/constants/urls";
/**
 * Utils
 */
import fetchAndInitCheerio from "@/lib/utils/http/fetchAndInitCheerio";
/**
 * Get the current gold spot price.
 * 
 * @returns {Promise<number>}
 */
export async function getSpotPriceInEur() : Promise<number> {
  const cheerio = await fetchAndInitCheerio(livePriceOfGold);

  const goldSpotPriceInEur = Number(
    cheerio('span[data-price="XAUUSD_EUR"]').first().text().trim().replace(',', '')
  );

  return goldSpotPriceInEur;
}
/**
 * Fetch the RSD to EUR convertion rate, from the Nation Bank site.
 * 
 * @return {Promise<number>}
 */
export async function getEurToRsdConversionRate() : Promise<number> {
  const cheerio = await fetchAndInitCheerio(nbsUrl);

  const rsdEurConvertionRate = Number(
    /**
     * NBS doesn't have exactly the best HTML structure for scraping.
     */
    cheerio('#curFullTable > tbody > tr:nth-child(1) > td:nth-child(6)').text()
  );

  return rsdEurConvertionRate;
}
/**
 * Get all information relevant for current gold prices.
 * 
 * @returns {Object}
 */
export async function getSpotPriceInfo() : Promise<{
  spotPriceInRsd: number,
  eurToRsdConversionRate: number,
}> {
  const [spotPriceInEur, eurToRsdConversionRate] = await Promise.all([
    getSpotPriceInEur(),
    getEurToRsdConversionRate()
  ]);

  return {
    spotPriceInRsd: spotPriceInEur * eurToRsdConversionRate,
    eurToRsdConversionRate,
  }
}