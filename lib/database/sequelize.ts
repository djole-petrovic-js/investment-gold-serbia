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
 * Database connection.
 */
const sequelize = new Sequelize(DB_NAME, DB_USERNAME, DB_PASSWORD, {
  logging: IS_DEV_ENV ? console.log : false,
  host: DB_HOST,
  dialect: "mysql",
  dialectModule: mysql2
})

export default sequelize
