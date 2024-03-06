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
import { IDistributerModel } from "@/lib/database/models/Distributer"
/**
 * Utils.
 */
import formatPrice from "@/lib/utils/numbers/formatPrice"
import formatPercentage from "@/lib/utils/numbers/formatPercentage"
import { IProductModel } from "@/lib/database/models/Product"
/**
 * Props.
 */
type BestDealsProps = {
  distributers: IDistributerModel[]
  selectedProductSlug: string
  scrollIntoView: boolean
}
/**
 * Types.
 */
type BestDealProductType = IProductModel & {
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
  const wrapperRef = useRef<HTMLDivElement>(null)
  const singleProductFromEachDistributer: BestDealProductType[] = []

  for (const distributer of distributers) {
    for (const product of distributer.Products ?? []) {
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
    if (wrapperRef.current && scrollIntoView) {
      const y = wrapperRef.current.getBoundingClientRect().top + window.scrollY

      window.scroll({
        top: y - 100,
        behavior: "smooth"
      })
    }
  }, [scrollIntoView])
  /**
   * Should not event happen, but just in case.
   */
  if (singleProductFromEachDistributer.length === 0) {
    return null
  }
  /**
   * This product is the best buy for the customer, because the distributers 'sell' price is the lowest.
   */
  const customersBestBuy = singleProductFromEachDistributer.sort(
    (a, b) => a.priceSell - b.priceSell
  )[0]
  /**
   * This product is the best sell for the customer, because the distributers 'buy' price is the highest.
   */
  const customersBestSell = singleProductFromEachDistributer.sort(
    (a, b) => b.priceBuy - a.priceBuy
  )[0]

  return (
    <div className="p-5" ref={wrapperRef}>
      <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-1">
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
            />
          </div>

          <div className="flex flex-col items-center w-full sm:w-8/12 m-auto p-3 sm:p-0 text-xl sm:text-sm">
            <div className="mb-5 text-center">
              <h1>Najbolja kupovina</h1>
              <h2>{customersBestBuy.distributerInfo.name}</h2>
              <h2>{customersBestBuy.name}</h2>
            </div>

            <div className="flex justify-around w-full">
              <div className="space-y-1">
                <p>Kupite za</p>
                <p>Kupovna premija</p>
              </div>

              <div className="space-y-1">
                <p>{formatPrice(customersBestBuy.priceSell)}</p>
                <p>{formatPercentage(customersBestBuy.priceSellPremium)}</p>
              </div>
            </div>

            <TradeButton label="Kupi" />
          </div>
        </a>

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
            />
          </div>

          <div className="flex flex-col items-center w-full sm:w-8/12 m-auto p-3 sm:p-0 text-xl sm:text-sm">
            <div className="mb-5 text-center">
              <h1>Najbolja prodaja</h1>
              <h2>{customersBestSell.distributerInfo.name}</h2>
              <h2>{customersBestSell.name}</h2>
            </div>

            <div className="flex justify-around w-full">
              <div>
                <p>Prodajte za</p>
                <p>Prodajna premija</p>
              </div>

              <div>
                <p>{formatPrice(customersBestSell.priceBuy)}</p>
                <p>{formatPercentage(customersBestSell.priceBuyPremium)}</p>
              </div>
            </div>

            <TradeButton label="Prodaj" />
          </div>
        </a>
      </div>
    </div>
  )
}