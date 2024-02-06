/**
 * Components
 */
import Product from "@/lib/components/HomePage/Product"
/**
 * Styles
 */
import styles from "@/app/style.module.css"
/**
 * Types
 */
import { DistributerData } from "@/lib/types/distributerData"
import { FormatedProductType } from "@/lib/types/products"
/**
 * Props
 */
type DistributerProps = {
  distributerData: DistributerData,
}
/**
 * Display information about a distributer, and all related products.
 */
export default function Distributer({ distributerData } : DistributerProps) {
  return (
    <div className={`${styles['distributer-wrapper']} p-5`} key={distributerData.name}>
      <h1 className="text-5xl mb-5 text-white">{distributerData.name}</h1>

      <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-1">
        {distributerData.products.map((product: FormatedProductType) =>
          <Product key={product.name} product={product} />
        )}
      </div>
    </div>
  )
}