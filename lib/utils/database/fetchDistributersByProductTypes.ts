/**
 * Database.
 */
import sequelize from "@/lib/database/sequelize"
import { IDistributerModel } from "@/lib/database/models/Distributer"
/**
 * Fetch a distributer with some of his products (filter them by product type).
 *
 * @param {string[]} productTypes
 *
 * @returns {Promise<IDistributerModel[]>}
 */
export default async function fetchDistributersByProductTypes(
  productTypes: string[]
): Promise<IDistributerModel[]> {
  const where = productTypes.length > 0 ? { productType: productTypes } : {}

  const distributers = (
    await sequelize.models.Distributer.findAll({
      include: [
        {
          model: sequelize.models.Product,
          where
        }
      ]
    })
  ).map((distributer) =>
    distributer.get({ plain: true })
  ) as IDistributerModel[]

  return distributers
}
