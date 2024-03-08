/**
 * Next.js Core.
 */
import { unstable_cache as cache } from "next/cache"
/**
 * Database.
 */
import fetchDistributersByProductTypes from "@/lib/utils/database/fetchDistributersByProductTypes"
/**
 * Data provider for the index / coins page.
 */
const coinsDataProvider = cache(
  async () => {
    return fetchDistributersByProductTypes(["COINS"])
  },
  ["Home::fetch"],
  {
    tags: ["client-side-data"]
  }
)

export default coinsDataProvider
