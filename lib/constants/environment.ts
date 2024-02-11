/**
 * Application base URL.
 */
export const SITE_BASE_URL: string = process.env.SITE_BASE_URL || ""
/**
 * Database host URL.
 */
export const DB_HOST: string = process.env.DB_HOST || ""
/**
 * Database name.
 */
export const DB_NAME: string = process.env.DB_NAME || ""
/**
 * Database username.
 */
export const DB_USERNAME: string = process.env.DB_USERNAME || ""
/**
 * Database password.
 */
export const DB_PASSWORD: string = process.env.DB_PASSWORD || ""
/**
 * Check if development environment.
 */
export const IS_DEV_ENV: boolean = SITE_BASE_URL.includes("localhost")
