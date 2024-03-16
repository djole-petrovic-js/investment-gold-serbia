"use client"
/**
 * Next.js Core.
 */
import { useEffect, useState } from "react"
import { faBars, faClose } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
/**
 * Components.
 */
import LanguageSwitcher from "@/lib/components/navigation/LanguageSwitcher"
/**
 * Internationalization.
 */
import { messagesType } from "@/lib/internationalization/types/messagesType"
import { Link, usePathname } from "@/lib/internationalization/navigation"
/**
 * Styles.
 */
import styles from "@/lib/components/navigation/MobileMenu/style.module.css"
/**
 * Props.
 */
type MobileMenuProps = {
  messages: messagesType["Header"]
}
/**
 * Mobile menu.
 */
export default function MobileMenu({ messages }: MobileMenuProps) {
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
          ease-in-out fixed h-screen bg-black text-white top-0 right-0 space-y-5 border-l-2
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
            {messages.SiteTitle}
          </h2>
        </div>

        <nav className="whitespace-nowrap text-center text-2xl space-y-4 flex flex-col">
          <Link
            href="/"
            prefetch={false}
            className={
              pathname === "/" ? styles.mobileLinkHighlight : "no-underline"
            }
          >
            {messages.GoldCoins}
          </Link>

          <Link
            href="/gold-bars"
            prefetch={false}
            className={
              pathname === "/gold-bars"
                ? styles.mobileLinkHighlight
                : "no-underline"
            }
          >
            {messages.GoldBars}
          </Link>

          <Link
            href="/trade"
            prefetch={false}
            className={
              pathname.startsWith("/trade")
                ? styles.mobileLinkHighlight
                : "no-underline"
            }
          >
            {messages.Trade}
          </Link>

          <Link
            href="/premium-calculator"
            prefetch={false}
            className={
              pathname === "/premium-calculator"
                ? styles.mobileLinkHighlight
                : "no-underline"
            }
          >
            {messages.PremiumCalculator}
          </Link>

          <Link
            href="/about"
            prefetch={false}
            className={
              pathname === "/about"
                ? styles.mobileLinkHighlight
                : "no-underline"
            }
          >
            {messages.About}
          </Link>
        </nav>

        <LanguageSwitcher />
      </div>

      <div
        onClick={() => setShowMenu(true)}
        className="flex items-center justify-center mr-1 md:hidden"
      >
        <FontAwesomeIcon size="2xl" className="cursor-pointer" icon={faBars} />
      </div>
    </>
  )
}
