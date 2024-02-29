/**
 * Components
 */
import SingleProduct from "@/lib/components/distributers/SingleProduct"
/**
 * Types
 */
import { IDistributerModel } from "@/lib/database/models/Distributer"
import { IProductModel } from "@/lib/database/models/Product"
/**
 * Props
 */
type SingleDistributerProps = {
  distributer: IDistributerModel
}
/**
 * Show information about a specific distributer, with all of his products.
 */
export default async function SingleDistributer({
  distributer
}: SingleDistributerProps) {
  return (
    <div className="p-5">
      <h1 className="text-5xl mb-5 text-white">{distributer.name}</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-1">
        {distributer.Products?.map((product: IProductModel) => (
          <SingleProduct key={product.name} product={product} />
        ))}
      </div>
    </div>
  )
}
