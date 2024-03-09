/**
 * Next.js Core.
 */
import { unstable_cache as cache } from "next/cache"
/**
 * Utils.
 */
import fetchDistributersByProductTypes from "@/lib/utils/database/fetchDistributersByProductTypes"
import fetchAvailableProducts from "@/lib/utils/database/fetchAvailableProducts"
/**
 * Data provider for the Trade page.
 */
const tradeProvider = cache(
  async () => {
    const [distributers, availableProducts] = await Promise.all([
      fetchDistributersByProductTypes(["COINS", "BARS"]),
      fetchAvailableProducts()
    ])

    return {
      distributers,
      availableProducts
    }
  },
  ["Trade::distributers"],
  {
    tags: ["client-side-data"]
  }
)

export default tradeProvider
