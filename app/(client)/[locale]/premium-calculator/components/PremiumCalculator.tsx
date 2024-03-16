"use client"
/**
 * Next.js core
 */
import { useState } from "react"
/**
 * Utils
 */
import calculatePremium from "@/lib/utils/numbers/calculatePremium"
import formatPercentage from "@/lib/utils/numbers/formatPercentage"
import { useTranslations } from "next-intl"
/**
 * Props
 */
type PremiumCalculatorProps = {
  spotPriceInRsd: number
}
/**
 * Client component, for calculating gold premiums.
 */
export default function PremiumCalculator({
  spotPriceInRsd
}: PremiumCalculatorProps) {
  const [weightInGrams, setWeightInGrams] = useState(0)
  const [paidPrice, setPaidPrice] = useState(0)

  const premium =
    weightInGrams > 0 && paidPrice > 0
      ? calculatePremium(paidPrice, weightInGrams / 31.1, spotPriceInRsd)
      : 0

  const t = useTranslations("Client")

  if (!spotPriceInRsd || spotPriceInRsd <= 0) {
    return null
  }

  return (
    <div className="m-auto w-100 lg:w-1/2 sm:w-100">
      <div className="my-16 border border-gray-50 p-3 rounded-sm">
        <h3 className="text-4xl mb-10 text-center">{t("Calculator")}</h3>
        {/* Weight input form */}
        <div className="flex justify-between mb-5">
          <div className="mr-5">
            <p>{t("WeightInGrams")}</p>
          </div>

          <div>
            <input
              onChange={(event) => setWeightInGrams(Number(event.target.value))}
              className="appearance-none bg-transparent border-b w-full text-yellow-50 mr-3 text-right focus:outline-none"
              type="text"
              placeholder="31.1"
            />
          </div>
        </div>
        {/* Paid price */}
        <div className="flex justify-between mb-5">
          <div className="mr-5">
            <p>{t("PriceToPay")}</p>
          </div>

          <div>
            <input
              onChange={(event) => setPaidPrice(Number(event.target.value))}
              className="appearance-none bg-transparent border-b w-full text-yellow-50 mr-3 text-right focus:outline-none"
              type="text"
              placeholder={spotPriceInRsd.toFixed(2)}
            />
          </div>
        </div>
        {/* Premium paid */}
        <div className="flex justify-between mb-5">
          <div className="mr-5">
            <p>{t("Premium")}</p>
          </div>

          <div>
            <span>{premium !== 0 ? formatPercentage(premium) : "0%"}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
