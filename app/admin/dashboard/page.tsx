/**
 * Next.js
 */
import { Metadata } from "next"
/**
 * Page metadata
 */
export const metadata: Metadata = {
  title: "IZS - Dashboard",
  description: "Investiciono Zlato Srbija - Dashboard"
}
/**
 * This route should not be cached.
 */
export const revalidate = 0
/**
 * Admin Dashboard page
 */
export default function Dashboard() {
  return (
    <div>
      <h1>DashBoard Page!</h1>
    </div>
  )
}
