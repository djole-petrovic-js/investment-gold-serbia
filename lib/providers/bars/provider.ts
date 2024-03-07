/**
 * Next.js Core.
 */
import { unstable_cache as cache } from "next/cache"
/**
 * Database.
 */
import fetchDistributersByProductTypes from "@/lib/utils/database/fetchDistributersByProductTypes"
/**
 * Data provider for the Gold Bars page.
 */
const goldBardsDataProvider = cache(
  async () => {
    return fetchDistributersByProductTypes(["BARS"])
  },
  ["GoldBars::fetch"],
  {
    tags: ["client-side-data"]
  }
)

export default goldBardsDataProvider
