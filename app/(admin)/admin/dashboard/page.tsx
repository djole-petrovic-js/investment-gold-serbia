/**
 * Next.js
 */
import { Metadata } from "next"
import RefreshProducts from "@/app/(admin)/admin/dashboard/components/RefreshProducts"
/**
 * Page metadata
 */
export const metadata: Metadata = {
  title: "IZS - Dashboard",
  description: "Investiciono Zlato Srbija - Dashboard"
}
/**
 * Admin Dashboard page
 */
export default function Dashboard() {
  return (
    <div>
      <h1>DashBoard Page!</h1>

      <RefreshProducts />
    </div>
  )
}
