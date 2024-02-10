/**
 * Components
 */
import SingleProduct from "@/lib/components/distributers/SingleProduct";
/**
 * Types
 */
import type { FormatedProductType } from "@/lib/types/products";
import type { DistributerData } from "@/lib/types/distributerData";
/**
 * Props
 */
type SingleDistributerProps = {
  distributerData: DistributerData,
}
/**
 * Show information about a specific distributer, with all of his products.
 */
export default async function SingleDistributer({ distributerData } : SingleDistributerProps) {
  return (
    <div className="p-5">
      <h1 className="text-5xl mb-5 text-white">{distributerData.name}</h1>

      <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-1">
        {distributerData.products.map((product: FormatedProductType) =>
          <SingleProduct key={product.name} product={product} />
        )}
      </div>
    </div>
  )
}