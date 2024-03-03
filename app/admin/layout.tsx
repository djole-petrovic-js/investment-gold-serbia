/**
 * Next.js core
 */
import Link from "next/link"
import logOut from "./actions/logout"
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
    <section>
      <div className="flex gap-3 p-5">
        <div className="w-1/5 pt-16">
          <nav>
            <Link href="/admin/dashboard">Dashboard</Link>

            <form action={logOut}>
              <button>Log out</button>
            </form>
          </nav>
        </div>

        <div className="w-4/5 pt-16">{children}</div>
      </div>
    </section>
  )
}
