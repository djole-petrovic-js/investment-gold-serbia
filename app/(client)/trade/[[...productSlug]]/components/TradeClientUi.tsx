"use client"
/**
 * Next.js Core.
 */
import Image from "next/image"
import { useState } from "react"
/**
 * Components
 */
import BestDeals from "@/app/(client)/trade/[[...productSlug]]/components/BestDeals"
/**
 * Database.
 */
import { IProductModel } from "@/lib/database/models/Product"
import { IDistributerModel } from "@/lib/database/models/Distributer"
import { useParams } from "next/navigation"
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
  const pageParams = useParams()

  const [selectedProductSlug, setSelectedProductSlug] = useState<string | null>(
    pageParams.productSlug && pageParams.productSlug[0]
      ? pageParams.productSlug[0]
      : null
  )

  const [scrollIntoView, setScrollIntoView] = useState<boolean>(
    !(pageParams.productSlug && pageParams.productSlug[0])
  )
  /**
   * Change the url with the product slug, but do NOT navigate.
   * Also, every time that the state is set, the BestDeals component should scroll into view,
   * but not if the product slug is present in the URL.
   *
   * @param productSlug
   */
  function showBestDeals(productSlug: string) {
    setSelectedProductSlug(productSlug)
    setScrollIntoView(true)

    window.history.replaceState(null, "", `/trade/${productSlug}`)
  }
  /**
   * Since all products have the same format, just take the first distributor.
   */
  const availableProducts = distributers[0]
  /**
   * Do not render the component at all, if for some reason no distributes exist.
   */
  if (!availableProducts) {
    return null
  }

  return (
    <div>
      {selectedProductSlug && (
        <BestDeals
          key={selectedProductSlug}
          distributers={distributers}
          selectedProductSlug={selectedProductSlug}
          scrollIntoView={scrollIntoView}
        />
      )}

      <div className="p-5">
        <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-1">
          {availableProducts.Products?.map(
            (product: IProductModel, index: number) => (
              <div
                key={product.name}
                onClick={() => {
                  showBestDeals(product.slug)
                }}
                className={`
                ${product.slug === selectedProductSlug ? "bg-opacity-20 bg-white" : "bg-black"}
                flex flex-col sm:flex-row justify-between
                p-5 border border-white text-white rounded-md cursor-pointer lg:hover:bg-opacity-20 lg:hover:bg-white`}
              >
                <div className="flex mr-4 w-full sm:w-4/12 justify-center">
                  <Image
                    src={`/images/${product.slug}.jpg`}
                    width={300}
                    height={300}
                    alt={product.name}
                    /**
                     * On mobile devices, the first image on this page is visible.
                     * So try to load it asap.
                     */
                    loading={index === 0 ? "eager" : "lazy"}
                    priority={index === 0 ? true : false}
                  />
                </div>

                <div className="flex flex-col items-center w-full sm:w-8/12 m-auto p-3 sm:p-0">
                  <div className="mb-5">
                    <h2>{product.name}</h2>
                  </div>
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  )
}