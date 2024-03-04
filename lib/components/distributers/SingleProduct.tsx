/**
 * Next.js core.
 */
import Image from "next/image"
import Link from "next/link"
/**
 * Components.
 */
import TradeButton from "@/lib/components/buttons/TradeButton"
/**
 * Database
 */
import { IProductModel } from "@/lib/database/models/Product"
/**
 * Utils.
 */
import formatPercentage from "@/lib/utils/numbers/formatPercentage"
import formatPrice from "@/lib/utils/numbers/formatPrice"
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
    <Link href={`/trade/${product.slug}`}>
      <div
        key={product.name}
        className="flex flex-col sm:flex-row justify-between
          bg-black p-5 border border-white text-white rounded-md
          lg:hover:bg-opacity-20 lg:hover:bg-white"
      >
        <div className="flex mr-4 w-full sm:w-4/12 justify-center">
          <Image
            src={`/images/${product.slug}.jpg`}
            width={300}
            height={300}
            alt={product.name}
            loading="lazy"
          />
        </div>

        <div className="flex flex-col items-center w-full sm:w-8/12 m-auto p-3 pb-0 sm:p-0">
          <div className="mb-5">
            <h2>{product.name}</h2>
          </div>

          <div className="flex justify-around w-full text-xl sm:text-sm">
            <div className="space-y-1">
              <p>Prodajna cena</p>
              <p>Kupovna cena</p>
              <p>Razlika</p>
              <p>Kupovna premija</p>
              <p>Prodajna premija</p>
            </div>

            <div className="space-y-1">
              <p>{formatPrice(product.priceSell)}</p>
              <p>{formatPrice(product.priceBuy)}</p>
              <p>{formatPrice(product.priceSell - product.priceBuy)}</p>
              <p>{formatPercentage(product.priceSellPremium)}</p>
              <p>{formatPercentage(product.priceBuyPremium)}</p>
            </div>
          </div>

          <TradeButton label="Trgovina" />
        </div>
      </div>
    </Link>
  )
}
