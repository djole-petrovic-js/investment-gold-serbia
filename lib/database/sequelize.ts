/**
 * Next.js core.
 */
import { Sequelize } from "sequelize"
import mysql2 from "mysql2"
/**
 * Environment.
 */
import {
  DB_HOST,
  DB_NAME,
  DB_PASSWORD,
  DB_USERNAME,
  IS_DEV_ENV
} from "@/lib/constants/environment"
/**
 * Models.
 */
import UserModelInit from "@/models/User"
import DistributerModelInit from "@/models/Distributer"
import ProductModelInit from "@/models/Product"
import VariableModelInit from "@/models/Variable"
/**
 * Database connection.
 */
const sequelize = new Sequelize(DB_NAME, DB_USERNAME, DB_PASSWORD, {
  logging: IS_DEV_ENV ? console.log : false,
  host: DB_HOST,
  dialect: "mysql",
  dialectModule: mysql2,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
})
/**
 * Code bellow is used basically to associate models, since they are not in the same files.
 * Sequelize should provide a better API.
 */
const modelDefiners = [
  DistributerModelInit,
  ProductModelInit,
  UserModelInit,
  VariableModelInit
]

for (const modelDefiner of modelDefiners) {
  modelDefiner(sequelize)
}

sequelize.models.Distributer.hasMany(sequelize.models.Product, {
  foreignKey: "distributerId",
  onDelete: "CASCADE",
  onUpdate: "CASCADE"
})

sequelize.models.Product.belongsTo(sequelize.models.Distributer)

export default sequelize
