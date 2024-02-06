/**
 * Next.js core
 */
import { CheerioAPI, load } from "cheerio";
/**
 * Constants
 */
import { scrapingUrlsCache } from "@/lib/constants/app";
/**
 * Fetch a source content from an URL, and return an initialized Cheerio instance.
 * 
 * @param {String} url
 * 
 * @returns {Promise<CheerioAPI>}
 */
export async function fetchAndInitCheerio(url: string) : Promise<CheerioAPI> {
  const response = await fetch(url, {
    next: {
      revalidate: scrapingUrlsCache,
    }
  });

  const cheerio = load(await response.text());

  return cheerio;
}