/**
 * Next.js core
 */
import Link from "next/link"
/**
 * Site Header
 */
export default function Header() {
	return (
		<nav  className="flex p-5 gap-6">
			<div>
				IZS
			</div>

			<div className="flex gap-2">
				<Link href="/">Distributeri</Link>
				<Link href="/premium-calculator">Kalkulator Premija</Link>
			</div>
		</nav>
	)
}