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
  matcher: [
    /**
     * /(first two chars) are multi-lang routes.
     */
    "/([a-z]{2})/:path*",
    /**
     * Non-Internationalized routes will redirect to internationalized ones.
     */
    "/",
    "/gold-bars",
    "/trade",
    "/premium-calculator",
    "/about",
    "/login",
    /**
     * Protected admin routes.
     */
    "/admin/:path*"
  ]
}
/**
 * Middleware.
 */
export default NextAuth(authConfig).auth
