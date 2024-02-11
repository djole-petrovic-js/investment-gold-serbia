/**
 * Next.js core
 */
import Link from "next/link"
/**
 * Site Header
 */
export default function Header() {
  return (
    <nav className="flex p-5 gap-6 bg-white relative z-10">
      <div>IZS</div>

      <div className="flex gap-5">
        <Link href="/">Kovanice</Link>
        <Link href="/premium-calculator">Kalkulator Premija</Link>
        <Link href="/gold-bars">Poluge</Link>
      </div>
    </nav>
  )
}
