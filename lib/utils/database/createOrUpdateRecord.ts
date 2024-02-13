/**
 * Next.js core
 */
import { ModelStatic, Model, WhereOptions, Optional } from "sequelize"
/**
 * Create a DB record if it doesn't exists, or update the existing one.
 *
 * @param {ModelStatic<Model>} sequelizeModel
 * @param {WhereOptions} condition
 * @param {Optional<any, string>} values
 *
 * @returns
 */
export default async function createOrUpdateRecord(
  sequelizeModel: ModelStatic<Model>,
  condition: WhereOptions,
  values: Optional<any, string>
) {
  const record = await sequelizeModel.findOne({ where: condition })

  if (record) {
    return record.update(values)
  }

  return sequelizeModel.create(values)
}
