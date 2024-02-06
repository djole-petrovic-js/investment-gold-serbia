/**
 * Next.js core
 */
import Image from "next/image"
/**
 * Types
 */
import { FormatedProductType } from "@/lib/types/products"
/**
 * Utils
 */
import { formatPercentage } from "@/lib/utils/numbers/formatPercentage"
import { formatPrice } from "@/lib/utils/numbers/formatPrice"
/**
 * Props
 */
type ProductProps = {
  product: FormatedProductType,
}
/**
 * Display info about a single product.
 */
export default function Product({ product } : ProductProps) {
  return (
    <div
      key={product.name}
      className="flex justify-evenly bg-black p-5 border border-white rounded-md"
    >
      <div className="flex items-center mr-4 w-40">
        <Image src={product.productImageUrl} width={300} height={300} alt={product.name} />
      </div>

      <div className="flex flex-col items-center">
        <div className="mb-5 text-white">
          <h2>{product.name}</h2>
        </div>

        <div className="text-white text-sm">
          <h3>Prodajna cena : {formatPrice(product.priceSell)}</h3>
          <h3>Kupovna cena : {formatPrice(product.priceBuy)}</h3>
          <h4>Razlika : {formatPrice(product.priceSell - product.priceBuy)}</h4>
          <h4>Premija na prodaju : {formatPercentage(product.priceSellPremium)}</h4>
          <h4>Premija na kupovinu : {formatPercentage(product.priceBuyPremium)}</h4>
        </div>
      </div>
    </div>
  )
}