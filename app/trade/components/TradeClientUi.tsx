"use client"
/**
 * Next.js Core.
 */
import Image from "next/image"
import { useState } from "react"
/**
 * Components
 */
import BestDeals from "@/app/trade/components/BestDeals"
/**
 * Database.
 */
import { IProductModel } from "@/lib/database/models/Product"
import { IDistributerModel } from "@/lib/database/models/Distributer"
/**
 * Props
 */
type BestDealProps = {
  distributers: IDistributerModel[]
}
/**
 * Client component for finding the best prices for a particular product.
 */
export default function TradeClientUi({ distributers }: BestDealProps) {
  const [selectedProductSlug, setSelectedProductSlug] = useState<string | null>(
    null
  )
  /**
   * Since all products have the same format, just take the first distributor.
   */
  const availableProducts = distributers[0]

  return (
    <div>
      {selectedProductSlug && (
        <BestDeals
          key={selectedProductSlug}
          distributers={distributers}
          selectedProductSlug={selectedProductSlug}
        />
      )}

      <div className="p-5">
        <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-1">
          {availableProducts.Products?.map((product: IProductModel) => (
            <div
              key={product.name}
              onClick={() => {
                setSelectedProductSlug(product.slug)
              }}
              className={`
                ${product.slug === selectedProductSlug ? "bg-opacity-20 bg-white" : "bg-black"}
                flex flex-col sm:flex-row justify-between
                p-5 border border-white text-white rounded-md cursor-pointer hover:bg-opacity-20 hover:bg-white`}
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

              <div className="flex flex-col items-center w-full sm:w-8/12 m-auto p-3 sm:p-0">
                <div className="mb-5">
                  <h2>{product.name}</h2>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
