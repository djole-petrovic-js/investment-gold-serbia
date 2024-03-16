"use client"
/**
 * Next.js Core.
 */
import Image from "next/image"
import { useEffect, useRef } from "react"
/**
 * Components.
 */
import TradeButton from "@/lib/components/buttons/TradeButton"
/**
 * Database.
 */
import { DistributersType, ProductsType } from "@/lib/database/types"
/**
 * Utils.
 */
import formatPrice from "@/lib/utils/numbers/formatPrice"
import formatPercentage from "@/lib/utils/numbers/formatPercentage"
import { useTranslations } from "next-intl"
/**
 * Props and Types.
 */
type BestDealsProps = {
  distributers: (DistributersType & {
    Products: ProductsType[]
  })[]
  selectedProductSlug: string
  scrollIntoView: boolean
}

type BestDealProductType = ProductsType & {
  distributerInfo: {
    name: string
  }
}
/**
 * Client component for showing the best price / sell deals for a particular product.
 */
export default function BestDeals({
  distributers,
  selectedProductSlug,
  scrollIntoView
}: BestDealsProps) {
  const t = useTranslations("BestDeals")

  const wrapperRef = useRef<HTMLDivElement>(null)
  const singleProductFromEachDistributer: BestDealProductType[] = []

  for (const distributer of distributers) {
    for (const product of distributer.Products) {
      if (product.slug === selectedProductSlug) {
        singleProductFromEachDistributer.push(
          Object.assign({}, product, {
            distributerInfo: {
              name: distributer.name
            }
          })
        )
      }
    }
  }
  /**
   * Scroll this component into view.
   */
  useEffect(() => {
    if (scrollIntoView && wrapperRef.current) {
      const topY =
        wrapperRef.current.getBoundingClientRect().top + window.scrollY

      window.scroll({
        top: topY - 100,
        behavior: "smooth"
      })
    }
  }, [scrollIntoView])
  /**
   * Should not event happen, but just in case.
   */
  if (singleProductFromEachDistributer.length === 0) {
    return (
      <div className="flex items-center justify-center w-full pt-10 pb-5 text-2xl">
        <p>{t("ProductNotFound")}</p>
      </div>
    )
  }
  /**
   * This product is the best buy for the customer, because the distributers 'sell' price is the lowest.
   */
  const customersBestBuy = singleProductFromEachDistributer
    .filter((product) => product.priceSell > 0)
    .sort((a, b) => a.priceSell - b.priceSell)[0]
  /**
   * This product is the best sell for the customer, because the distributers 'buy' price is the highest.
   */
  const customersBestSell = singleProductFromEachDistributer
    .filter((product) => product.priceBuy > 0)
    .sort((a, b) => b.priceBuy - a.priceBuy)[0]

  return (
    <div className="p-5" ref={wrapperRef}>
      <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-1">
        {customersBestBuy && (
          <a
            href={customersBestBuy.urlSell}
            target="_blank"
            className="
            flex flex-col sm:flex-row justify-between 
            bg-black p-5 border border-green-700 text-white rounded-md cursor-pointer
            lg:hover:bg-opacity-20 lg:hover:bg-white
          "
          >
            <div className="flex mr-4 w-full sm:w-4/12 justify-center">
              <Image
                src={`/images/${customersBestBuy.slug}.jpg`}
                width={300}
                height={300}
                alt={customersBestBuy.name}
                priority={true}
              />
            </div>

            <div className="flex flex-col items-center w-full sm:w-8/12 m-auto p-3 sm:p-0 text-xl sm:text-sm">
              <div className="mb-5 text-center">
                <h1>{t("BestBuy")}</h1>
                <h2>{customersBestBuy.distributerInfo.name}</h2>
                <h2>{customersBestBuy.name}</h2>
              </div>

              <div className="flex justify-around w-full">
                <div className="space-y-1">
                  <p className="text-left">{t("BuyFor")}</p>
                  <p className="text-left">{t("BuyPremium")}</p>
                </div>

                <div className="space-y-1">
                  <p className="text-right">
                    {formatPrice(customersBestBuy.priceSell)}
                  </p>
                  <p className="text-right">
                    {formatPercentage(customersBestBuy.priceSellPremium)}
                  </p>
                </div>
              </div>

              <TradeButton label={t("Buy")} />
            </div>
          </a>
        )}

        {customersBestSell && (
          <a
            href={customersBestSell.urlBuy}
            target="_blank"
            className="
            flex flex-col sm:flex-row justify-between
            bg-black p-5 border border-green-700 text-white rounded-md cursor-pointer
            lg:hover:bg-opacity-20 lg:hover:bg-white
          "
          >
            <div className="flex mr-4 w-full sm:w-4/12 justify-center">
              <Image
                src={`/images/${customersBestSell.slug}.jpg`}
                width={300}
                height={300}
                alt={customersBestSell.name}
                priority={true}
              />
            </div>

            <div className="flex flex-col items-center w-full sm:w-8/12 m-auto p-3 sm:p-0 text-xl sm:text-sm">
              <div className="mb-5 text-center">
                <h1>{t("BestSell")}</h1>
                <h2>{customersBestSell.distributerInfo.name}</h2>
                <h2>{customersBestSell.name}</h2>
              </div>

              <div className="flex justify-around w-full">
                <div>
                  <p className="text-left">{t("SellFor")}</p>
                  <p className="text-left">{t("SellPremium")}</p>
                </div>

                <div>
                  <p className="text-right">
                    {formatPrice(customersBestSell.priceBuy)}
                  </p>
                  <p className="text-right">
                    {formatPercentage(customersBestSell.priceBuyPremium)}
                  </p>
                </div>
              </div>

              <TradeButton label={t("Sell")} />
            </div>
          </a>
        )}
      </div>
    </div>
  )
}
