/**
 * Cache duration in seconds for fetch requests, used for scraping other pages.
 */
export const SCRAPING_URLS_CACHE = 15 * 60;
/**
 * Tag for fetch scraping, so it can be revalidated.
 */
export const SCRAPING_URLS_TAG = 'scraping-requests';