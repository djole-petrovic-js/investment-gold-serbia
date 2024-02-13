/**
 * Abstract distributer's data.
 */
export type DistributerProductsType = {
  [key: string]: {
    name: string
    identifier: string
    weightDivider: number
  }[]
}
