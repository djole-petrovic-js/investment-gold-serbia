/**
 * Database.
 */
import sequelize from "@/lib/database/sequelize"
import { IVariableModel } from "@/lib/database/models/Variable"

import { unstable_cache as cache } from 'next/cache';

const fetchProductsDataUpdatedStripe = cache(async () => {
  return (await sequelize.models.Variable.findOne({
    where: { key: "DATA_UPDATED_TIMESTAMP" }
  })) as IVariableModel
}, ['DataUpdatedStripe::fetch'], {
  tags: ['client-side-data']
})

/**
 * Display the time when the prices data was last updated.
 */
export default async function DataUpdatedStripe() {
  const dataUpdatedTimestamp = await fetchProductsDataUpdatedStripe();

  if (!dataUpdatedTimestamp) {
    return null
  }

  return (
    <div className="w-full bg-black text-white border-b-white border-b">
      <p className="text-center text-lg">
        Cene azurirane : {dataUpdatedTimestamp.value.split(" ")[1]}
      </p>
    </div>
  )
}
