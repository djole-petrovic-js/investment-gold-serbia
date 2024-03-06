/**
 * Next.js core.
 */
import Link from "next/link"
import logOut from "@/app/(admin)/admin/actions/logout"
/**
 * Styles.
 */
import "@/app/globals.css"
/**
 * This route should not be cached.
 */
export const revalidate = 0

/**
 * Props.
 */
type DashboardLayoutProps = {
  children: React.ReactNode
}
/**
 * Admin layout.
 */
export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <html lang="sr">
      <body>
        <div className="flex gap-3 p-5">
          <div className="w-1/5">
            <nav className="flex flex-col">
              <a href="/">Home</a>

              <Link href="/admin/dashboard">Dashboard</Link>
              <Link href="/admin/users">Users</Link>

              <form action={logOut}>
                <button>Log out</button>
              </form>
            </nav>
          </div>

          <div className="w-4/5">{children}</div>
        </div>
      </body>
    </html>
  )
}
