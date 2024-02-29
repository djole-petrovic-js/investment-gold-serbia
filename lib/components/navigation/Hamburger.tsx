"use client"
/**
 * Next.js Core.
 */
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import { faBars, faClose } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
/**
 * Handle mobile menu.
 */
export default function Hamburger() {
  const [showMenu, setShowMenu] = useState<boolean>(false)
  const pathname = usePathname()
  /**
   * Prevent page scrolling if the mobile menu is showing.
   */
  useEffect(() => {
    document.body.style.overflow = showMenu ? "hidden" : "auto"
  }, [showMenu])
  /**
   * If navigation occurs, close the mobile menu.
   */
  useEffect(() => {
    setShowMenu(false)
  }, [pathname])

  return (
    <>
      <div
        className={`
          ${showMenu ? "w-5/6" : "w-0"} transition-all duration-300
          ease-in-out fixed h-screen bg-black text-white top-0 right-0 space-y-5
        `}
      >
        <div
          className="text-right mr-2 mt-2"
          onClick={() => setShowMenu(false)}
        >
          <FontAwesomeIcon
            size="3x"
            className="cursor-pointer"
            icon={faClose}
          />
        </div>

        <div className="text-center">
          <h2 className="whitespace-nowrap text-3xl border-t-2 border-b-2 border-b-white border-t-white py-2">
            Investiciono zlato Srbija
          </h2>
        </div>

        <nav className="whitespace-nowrap text-center text-2xl space-y-4 flex flex-col">
          <Link href="/">Kovanice</Link>
          <Link href="/gold-bars">Poluge</Link>
          <Link href="/premium-calculator">Kalkulator Premija</Link>
          <Link href="/about">O nama</Link>
        </nav>
      </div>

      <div
        onClick={() => setShowMenu(true)}
        className="flex items-center justify-center mr-1 md:invisible"
      >
        <FontAwesomeIcon size="2xl" className="cursor-pointer" icon={faBars} />
      </div>
    </>
  )
}
