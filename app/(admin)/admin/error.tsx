"use client"
/**
 * Next.js core
 */
import { useEffect } from "react"
/**
 * Props
 */
type ErrorProps = {
  error: Error & { digest?: string }
  reset: () => void
}
/**
 * Show the actuall error message, and the call stack.
 */
export default function Error({ error }: ErrorProps) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className=" text-black h-screen">
      <h1 className="text-3xl mb-5">500 | Error</h1>

      <p className="mb-5">{error.message}</p>

      <p>{error.stack}</p>
    </div>
  )
}
