/**
 * Make sure to have this table ready.
 * 
 * 
  create table Variables (
    `key` VARCHAR(255) NOT NULL,
    `value` VARCHAR(255) NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    primary key (`key`)
  );
 */
/**
 * Next.js core
 */
import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  Sequelize
} from "sequelize"
/**
 * Model Interface
 */
export interface IVariableModel
  extends Model<
    InferAttributes<IVariableModel>,
    InferCreationAttributes<IVariableModel>
  > {
  /**
   * Some fields are optional when calling create() or build()
   */
  key: CreationOptional<string>
  value: string
}
/**
 * Model definer function.
 *
 * @param {Sequelize} sequelize
 *
 * @returns {void}
 */
export default function VariableModelInit(sequelize: Sequelize): void {
  /**
   * Model definition.
   */
  sequelize.define<IVariableModel>(
    "Variable",
    {
      key: {
        type: DataTypes.STRING,
        autoIncrement: true,
        primaryKey: true
      },
      value: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    {
      timestamps: true
    }
  )
}
