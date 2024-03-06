/**
 * Next.js
 */
import { Metadata } from "next"
/**
 * Page metadata
 */
export const metadata: Metadata = {
  title: "IZS - Users",
  description: "Investiciono Zlato Srbija - Users"
}
/**
 * Admin Dashboard page
 */
export default function Users() {
  return (
    <div>
      <h1>Users page!</h1>

      <p>{new Date().toISOString()}</p>
    </div>
  )
}
