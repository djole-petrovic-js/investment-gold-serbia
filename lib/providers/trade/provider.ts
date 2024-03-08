/**
 * Next.js Core.
 */
import { unstable_cache as cache } from "next/cache"
/**
 * Database.
 */
import fetchDistributersByProductTypes from "@/lib/utils/database/fetchDistributersByProductTypes"
import sequelize from "@/lib/database/sequelize"
/**
 * Data provider for the Trade page.
 */
const tradeProvider = cache(
  async () => {
    return {
      distributers: await fetchDistributersByProductTypes([]),
      availableProducts: (
        await sequelize.models.Product.findAll({
          attributes: ["name", "slug"],
          group: ["slug", "name"]
        })
      ).map((p) => p.get({ plain: true }))
    }
  },
  ["Trade::distributers"],
  {
    tags: ["client-side-data"]
  }
)

export default tradeProvider
