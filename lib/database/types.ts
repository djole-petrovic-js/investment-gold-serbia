import { Distributers, Products, Variables } from "./schema"
/**
 * Distributers Types.
 */
export type DistributersType = typeof Distributers.$inferSelect
/**
 * Products Types.
 */
export type ProductsType = typeof Products.$inferSelect
export type ProductsTypeInsert = typeof Products.$inferInsert
export type ProductsNameAndSlugType = Pick<ProductsType, "name" | "slug">
/**
 * Variables Types.
 */
export type VariablesType = typeof Variables.$inferSelect
