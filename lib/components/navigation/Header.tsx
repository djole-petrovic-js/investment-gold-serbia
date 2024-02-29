/**
 * Next.js core.
 */
import Link from "next/link"
import Image from "next/image"
/**
 * Components.
 */
import Hamburger from "@/lib/components/navigation/Hamburger"
/**
 * Images.
 */
import logoImg from "@/public/images/logo.png"
/**
 * Site Header
 */
export default function Header() {
  return (
    <nav className="flex p-1 justify-between bg-white relative z-20">
      <div className="flex">
        <div className="mr-1">
          <Link href="/">
            <Image
              src={logoImg}
              alt="Investiciono Zlato Srbija Logo"
              loading="eager"
              sizes="64px"
            />
          </Link>
        </div>

        <div className="hidden md:flex md:items-center">
          <Link
            className="hover:bg-black hover:text-white py-3 px-3 rounded-md"
            href="/"
          >
            Kovanice
          </Link>

          <Link
            className="hover:bg-black hover:text-white py-3 px-3 rounded-md"
            href="/gold-bars"
          >
            Poluge
          </Link>

          <Link
            className="hover:bg-black hover:text-white py-3 px-3 rounded-md"
            href="/premium-calculator"
          >
            Kalkulator Premija
          </Link>

          <Link
            className="hover:bg-black hover:text-white py-3 px-3 rounded-md"
            href="/about"
          >
            O nama
          </Link>
        </div>
      </div>

      <Hamburger />
    </nav>
  )
}
