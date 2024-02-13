/**
 * Make sure to have this table ready.
 * 
 * 
  create table Distributers (
    id int(10) unsigned not null AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL UNIQUE,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    primary key (id)
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
import { IProductModel } from "@/models/Product"
/**
 * Model Interface
 */
export interface IDistributerModel
  extends Model<
    InferAttributes<IDistributerModel>,
    InferCreationAttributes<IDistributerModel>
  > {
  /**
   * Some fields are optional when calling .create() or .build()
   */
  id: CreationOptional<number>
  name: string
  slug: string
  Products?: IProductModel[]
}
/**
 * Model definer function.
 *
 * @param {Sequelize} sequelize
 *
 * @returns {void}
 */
export default function DistributerModelInit(sequelize: Sequelize): void {
  /**
   * Model definition.
   */
  sequelize.define<IDistributerModel>(
    "Distributer",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      slug: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    {
      timestamps: true
    }
  )
}
