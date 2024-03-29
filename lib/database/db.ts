/**
 * Next.js Core.
 */
import { drizzle } from "drizzle-orm/mysql2"
import mysql from "mysql2/promise"
/**
 * Constants.
 */
import {
  DB_HOST,
  DB_NAME,
  DB_PASSWORD,
  DB_USERNAME,
  DB_PORT,
  IS_DEV_ENV
} from "@/lib/constants/environment"
/**
 * Drizzle Schema.
 */
import * as schema from "@/lib/database/schema"
/**
 * Create connection.
 */
const poolConnection = mysql.createPool({
  host: DB_HOST,
  user: DB_USERNAME,
  database: DB_NAME,
  password: DB_PASSWORD,
  port: DB_PORT,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
})
/**
 * Initialize Drizzle.
 */
export const db = drizzle(poolConnection, {
  schema,
  mode: "default",
  logger: IS_DEV_ENV
})
