/**
 * Next.js Core.
 */
import { unstable_cache as cache } from "next/cache"
/**
 * Database.
 */
import sequelize from "@/lib/database/sequelize"
import { IVariableModel } from "@/lib/database/models/Variable"
/**
 * Provided cached Variables values.
 */
const variablesProvider = cache(
  async () => {
    const variables = (await sequelize.models.Variable.findAll()).map(
      (variable) => variable.get({ plain: true })
    ) as IVariableModel[]

    return variables.reduce(
      (
        acc: {
          [key: string]: string
        },
        variable: IVariableModel
      ) => {
        acc[variable.key] = variable.value

        return acc
      },
      {}
    )
  },
  ["Variables"],
  {
    tags: ["client-side-data"]
  }
)

export default variablesProvider
