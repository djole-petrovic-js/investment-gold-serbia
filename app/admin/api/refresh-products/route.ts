import { auth } from "@/auth"
import { revalidatePath } from "next/cache"
/**
 * This route should not be cached.
 */
export const revalidate = 0
/**
 * Use this route to refresh the view components, that are otherwise static.
 *
 * /admin/api/refresh-products
 */
export async function GET() {
  const session = await auth()

  if (!session?.user) {
    throw new Error("Not authorized")
  }

  revalidatePath("/")
  revalidatePath("/gold-bars")
  revalidatePath("/premium-calculator")

  return Response.json({ success: true })
}
