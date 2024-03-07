/**
 * Next.js Core.
 */
import { unstable_cache as cache } from "next/cache"
/**
 * Database.
 */
import fetchDistributersByProductTypes from "@/lib/utils/database/fetchDistributersByProductTypes"
/**
 * Data provider for the Trade page.
 */
const tradeProvider = cache(
  async () => {
    return fetchDistributersByProductTypes([])
  },
  ["Trade::distributers"],
  {
    tags: ["client-side-data"]
  }
)

export default tradeProvider
