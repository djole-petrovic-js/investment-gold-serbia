/**
 * Next.js Core.
 */
import { unstable_cache as cache } from "next/cache"
/**
 * Database.
 */
import { db } from "@/lib/database/db"
import { VariablesType } from "@/lib/database/types"
import { Variables } from "@/lib/database/schema"
/**
 * Provided cached Variables values.
 */
const variablesProvider = cache(
  async () => {
    const variables = await db.select().from(Variables)

    return variables.reduce(
      (
        acc: {
          [key: string]: string
        },
        variable: VariablesType
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
