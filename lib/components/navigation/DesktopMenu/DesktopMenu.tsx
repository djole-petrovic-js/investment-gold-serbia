/**
 * Next.js core.
 */
import Link from "next/link"
import Image from "next/image"
/**
 * Images.
 */
import logoImg from "@/public/images/logo.png"
/**
 * Styles.
 */
import styles from "./style.module.css"
/**
 * Desktop Menu.
 */
export default function DesktopMenu() {
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
          Kovanice
        </Link>

        <Link className={styles.lgScreenNavLink} href="/gold-bars">
          Poluge
        </Link>

        <Link className={styles.lgScreenNavLink} href="/trade" prefetch={false}>
          Trgovina
        </Link>

        <Link
          className={styles.lgScreenNavLink}
          href="/premium-calculator"
          prefetch={false}
        >
          Kalkulator Premija
        </Link>

        <Link className={styles.lgScreenNavLink} href="/about" prefetch={false}>
          O nama
        </Link>
      </div>
    </div>
  )
}
