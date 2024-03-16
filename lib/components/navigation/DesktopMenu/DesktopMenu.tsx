/**
 * Next.js core.
 */
import Image from "next/image"
/**
 * Internationalization.
 */
import { Link } from "@/lib/internationalization/navigation"
import { messagesType } from "@/lib/internationalization/types/messagesType"
/**
 * Images.
 */
import logoImg from "@/public/images/logo.png"
/**
 * Styles.
 */
import styles from "./style.module.css"
/**
 * Props.
 */
type DesktopMenuProps = {
  messages: messagesType["Header"]
}
/**
 * Desktop Menu.
 */
export default async function DesktopMenu({ messages }: DesktopMenuProps) {
  return (
    <div className="flex">
      <div className="mr-1">
        <Link href="/">
          <Image
            src={logoImg}
            alt="Investiciono Zlato Srbija Logo"
            loading="eager"
            sizes="64px"
            priority={true}
          />
        </Link>
      </div>

      <div className="hidden md:flex md:items-center">
        <Link className={styles.lgScreenNavLink} href="/">
          {messages.GoldCoins}
        </Link>

        <Link className={styles.lgScreenNavLink} href="/gold-bars">
          {messages.GoldBars}
        </Link>

        <Link className={styles.lgScreenNavLink} href="/trade" prefetch={false}>
          {messages.Trade}
        </Link>

        <Link
          className={styles.lgScreenNavLink}
          href="/premium-calculator"
          prefetch={false}
        >
          {messages.PremiumCalculator}
        </Link>

        <Link className={styles.lgScreenNavLink} href="/about">
          {messages.About}
        </Link>
      </div>
    </div>
  )
}
