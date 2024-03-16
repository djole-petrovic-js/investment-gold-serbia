/**
 * Next.js Core.
 */
import { createSharedPathnamesNavigation } from "next-intl/navigation"
/**
 * Variables.
 */
export const locales = ["sr", "en"] as const
export const localePrefix = "always" // Default
/**
 * next-intl helpers and wrappers
 */
export const { Link, redirect, usePathname, useRouter } =
  createSharedPathnamesNavigation({ locales, localePrefix })
