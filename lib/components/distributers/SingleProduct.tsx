/**
 * Next.js core
 */
import Image from "next/image"
/**
 * Utils
 */
import formatPercentage from "@/lib/utils/numbers/formatPercentage"
import formatPrice from "@/lib/utils/numbers/formatPrice"
import { IProductModel } from "@/lib/database/models/Product"
/**
 * Props
 */
type ProductProps = {
  product: IProductModel
}
/**
 * Display info about a single distributer's product.
 */
export default function SingleProduct({ product }: ProductProps) {
  return (
    <div
      key={product.name}
      className="flex flex-col sm:flex-row justify-between bg-black p-5 border border-white text-white rounded-md"
    >
      <div className="flex mr-4 w-full sm:w-4/12 justify-center">
        <Image
          src={product.createProductImageUrl()}
          width={300}
          height={300}
          alt={product.name}
          loading="lazy"
        />
      </div>

      <div className="flex flex-col items-center w-full sm:w-8/12 m-auto p-3 sm:p-0">
        <div className="mb-5">
          <h2>{product.name}</h2>
        </div>

        <div className="flex justify-around w-full text-xl sm:text-sm">
          <div>
            <p>Prodajna cena</p>
            <p>Kupovna cena</p>
            <p>Razlika</p>
            <p>Premija na prodaju</p>
            <p>Premija na kupovinu</p>
          </div>

          <div>
            <p>{formatPrice(product.priceSell)}</p>
            <p>{formatPrice(product.priceBuy)}</p>
            <p>{formatPrice(product.priceSell - product.priceBuy)}</p>
            <p>{formatPercentage(product.priceSellPremium)}</p>
            <p>{formatPercentage(product.priceBuyPremium)}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
