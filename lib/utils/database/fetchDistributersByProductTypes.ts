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
  const distributers = (
    await sequelize.models.Distributer.findAll({
      order: [
        [sequelize.col("Products.productType"), "DESC"],
        [sequelize.col("Products.priceSell"), "DESC"]
      ],
      include: [
        {
          model: sequelize.models.Product,
          where: {
            ...(productTypes.length > 0 ? { productType: productTypes } : {})
          }
        }
      ]
    })
  ).map((distributer) =>
    distributer.get({ plain: true })
  ) as IDistributerModel[]

  return distributers
}
