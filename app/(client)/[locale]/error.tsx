"use client"

/**
 * Next.js core
 */
import Link from "next/link"
import { useEffect } from "react"
import { useTranslations } from "next-intl"
/**
 * Props
 */
type ErrorProps = {
  error: Error & { digest?: string }
  reset: () => void
}
/**
 * Show a friendly Error page.
 * Allow user to recover from the error, and also to go back to the home page.
 */
export default function Error({ error, reset }: ErrorProps) {
  const t = useTranslations("Error")

  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="flex flex-col items-center justify-center bg-black text-white h-screen">
      <h1 className="text-3xl mb-5">500 | {t("ErrorOccured")}</h1>

      <button
        className="border border-white p-2 mb-5 rounded-sm hover:text-black hover:bg-white"
        onClick={() => reset()}
      >
        {t("TryAgain")}
      </button>

      <h2 className="text-2xl">
        {t("ReturnToHome")}{" "}
        <Link className="underline" href="/">
          {t("Here")}
        </Link>
      </h2>
    </div>
  )
}
