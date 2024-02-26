/**
 * Next.js core
 */
import Link from "next/link"
import Hamburger from "./Hamburger"
/**
 * Site Header
 */
export default function Header() {
  return (
    <nav className="flex p-1 justify-between bg-white relative z-20">
      <div className="flex">
        <div className="mr-10">IZS - Treba logo ovde</div>

        <div className="hidden md:flex">
          <Link
            className="hover:bg-black hover:text-white py-3 px-3 rounded-md"
            href="/"
          >
            Kovanice
          </Link>

          <Link
            className="hover:bg-black hover:text-white py-3 px-3 rounded-md"
            href="/premium-calculator"
          >
            Kalkulator Premija
          </Link>

          <Link
            className="hover:bg-black hover:text-white py-3 px-3 rounded-md"
            href="/gold-bars"
          >
            Poluge
          </Link>
        </div>
      </div>

      <Hamburger />
    </nav>
  )
}
