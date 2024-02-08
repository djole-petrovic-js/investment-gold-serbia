/**
 * Next.js core.
 */
import Link from "next/link"
/**
 * Show a friendly 404 page.
 * Allow user to go back to the home page.
 */
export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center bg-black text-white h-screen">
      <h1 className="text-3xl mb-5">404 | Stranica nije pronadjena</h1>

      <h2 className="text-2xl">
        Ova stranica vise ne postoji. Vratite se na pocetak <Link className="underline" href="/">ovde</Link>
      </h2>
    </div>
  )
}