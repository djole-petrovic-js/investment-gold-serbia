/**
 * Providers.
 */
import variablesProvider from "@/lib/providers/variables/provider"
/**
 * Display the time when the prices data was last updated.
 */
export default async function DataUpdatedStripe() {
  const { DATA_UPDATED_TIMESTAMP } = await variablesProvider()

  if (!DATA_UPDATED_TIMESTAMP) {
    return null
  }

  return (
    <div className="w-full bg-black text-white border-b-white border-b">
      <p className="text-center text-lg">
        Cene azurirane : {DATA_UPDATED_TIMESTAMP.split(" ")[1]}
      </p>
    </div>
  )
}
