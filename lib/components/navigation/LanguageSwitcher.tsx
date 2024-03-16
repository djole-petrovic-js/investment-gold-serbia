"use client"
/**
 * Next.js Core.
 */
import Image from "next/image"
/**
 * Internationalization.
 */
import { usePathname, useRouter } from "@/lib/internationalization/navigation"
/**
 * Images.
 */
import svgRs from "@/public/images/rs.svg"
import svgUs from "@/public/images/us.svg"
/**
 * Language Switcher component.
 */
export default function LanguageSwitcher() {
  const pathname = usePathname()
  const router = useRouter()

  return (
    <div className="flex flex-row justify-center items-center gap-5">
      <div
        onClick={() => router.replace(pathname, { locale: "en" })}
        className="w-10 cursor-pointer"
      >
        <Image src={svgUs} alt="English language" />
      </div>

      <div
        onClick={() => router.replace(pathname, { locale: "sr" })}
        className="w-10 cursor-pointer"
      >
        <Image src={svgRs} alt="Srpski jezik" />
      </div>
    </div>
  )
}
