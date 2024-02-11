/**
 * Next.js core
 */
import NextAuth from "next-auth"
/**
 * App config.
 */
import { authConfig } from "@/auth.config"
/**
 * Only /admin routes are protected for now.
 */
export const config = {
  matcher: "/admin/:path*"
}

export default NextAuth(authConfig).auth
