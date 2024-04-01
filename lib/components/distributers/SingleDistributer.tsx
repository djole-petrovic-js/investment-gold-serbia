/**
 * Next.js Core.
 */
import Link from "next/link"
/**
 * Components
 */
import SingleProduct from "@/lib/components/distributers/SingleProduct"
/**
 * Types
 */
import { DistributersType, ProductsType } from "@/lib/database/types"
/**
 * Props
 */
type SingleDistributerProps = {
  distributer: DistributersType & {
    Products: ProductsType[]
  }
}
/**
 * Show information about a specific distributer, with all of his products.
 */
export default async function SingleDistributer({
  distributer
}: SingleDistributerProps) {
  return (
    <div className="p-5">
      <Link href={distributer.homeUrl} target="_blank">
        <h3 className="underline text-5xl mb-5 text-white">
          {distributer.name}
        </h3>
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-1">
        {distributer.Products.map((product: ProductsType) => (
          <SingleProduct key={product.name} product={product} />
        ))}
      </div>
    </div>
  )
}
