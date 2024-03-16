/**
 * Next.js core.
 */
import Image from "next/image"
/**
 * Components.
 */
import TradeButton from "@/lib/components/buttons/TradeButton"
/**
 * Internationalization.
 */
import { Link } from "@/lib/internationalization/navigation"
/**
 * Utils.
 */
import formatPercentage from "@/lib/utils/numbers/formatPercentage"
import formatPrice from "@/lib/utils/numbers/formatPrice"
/**
 * Types.
 */
import { ProductsType } from "@/lib/database/types"
import { getTranslations } from "next-intl/server"
/**
 * Props
 */
type ProductProps = {
  product: ProductsType
}
/**
 * Display info about a single distributer's product.
 */
export default async function SingleProduct({ product }: ProductProps) {
  const t = await getTranslations("SingleProduct")

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
              {product.priceSell > 0 && (
                <p className="text-left">{t("Sell")}</p>
              )}

              {product.priceBuy > 0 && <p className="text-left">{t("Buy")}</p>}

              {product.priceSell > 0 && product.priceBuy > 0 ? (
                <p className="text-left">{t("Spread")}</p>
              ) : (
                <></>
              )}
              {product.priceSell > 0 && (
                <p className="text-left">{t("PremiumSell")}</p>
              )}
              {product.priceBuy > 0 && (
                <p className="text-left">{t("PremiumBuy")}</p>
              )}
            </div>

            <div className="space-y-1">
              {product.priceSell > 0 && (
                <p className="text-right">{formatPrice(product.priceSell)}</p>
              )}
              {product.priceBuy && (
                <p className="text-right">{formatPrice(product.priceBuy)}</p>
              )}
              {product.priceSell > 0 && product.priceBuy > 0 ? (
                <p className="text-right">
                  {formatPrice(product.priceSell - product.priceBuy)}
                </p>
              ) : (
                <></>
              )}
              {product.priceSell > 0 && (
                <p className="text-right">
                  {formatPercentage(product.priceSellPremium)}
                </p>
              )}
              {product.priceBuy > 0 && (
                <p className="text-right">
                  {formatPercentage(product.priceBuyPremium)}
                </p>
              )}
            </div>
          </div>

          <TradeButton label={t("Trade")} />
        </div>
      </div>
    </Link>
  )
}
