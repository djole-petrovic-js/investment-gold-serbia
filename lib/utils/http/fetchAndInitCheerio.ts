/**
 * Next.js core
 */
import { CheerioAPI, load } from "cheerio";
/**
 * Constants
 */
import { SCRAPING_URLS_CACHE, SCRAPING_URLS_TAG } from "@/lib/constants/app";
/**
 * Fetch a source content from an URL, and return an initialized Cheerio instance.
 * 
 * @param {String} url
 * 
 * @returns {Promise<CheerioAPI>}
 */
export default async function fetchAndInitCheerio(url: string) : Promise<CheerioAPI> {
  const response = await fetch(url, {
    next: {
      revalidate: SCRAPING_URLS_CACHE,
      tags: [SCRAPING_URLS_TAG]
    }
  });

  const cheerio = load(await response.text());

  return cheerio;
}