"use client"
/**
 * Next.js Core.
 */
import { useState } from "react"
/**
 * Types.
 */
import type { RefreshProductsType } from "@/lib/types/http/refreshProductsType"
/**
 * Client component for handling database refreshing.
 */
export default function RefreshData() {
  const [isLoading, setIsLoading] = useState(false)
  const [ajaxData, setAjaxData] = useState<RefreshProductsType | null>(null)

  function refreshData() {
    setIsLoading(true)
    setAjaxData(null)

    fetch("/admin/api/refresh-products")
      .then((response) => response.json())
      .then((response: RefreshProductsType) => {
        setAjaxData(response)
      })
      .catch(() => {
        setAjaxData({
          success: false
        })
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  return (
    <div>
      {isLoading && (
        <div>
          <p>Loading...</p>
        </div>
      )}

      {ajaxData && (
        <div>
          <p>Success : {ajaxData.success ? "Yes" : "No"}</p>
          {ajaxData.success && (
            <p>Refreshed in {ajaxData.timePassedInSeconds} seconds.</p>
          )}
        </div>
      )}

      <button
        onClick={refreshData}
        disabled={isLoading}
        className={`border border-black p-2 rounded-md ${isLoading ? "disabled" : ""}`}
      >
        Refresh products
      </button>
    </div>
  )
}
