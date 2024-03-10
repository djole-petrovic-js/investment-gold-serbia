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

  const [date, time] = DATA_UPDATED_TIMESTAMP.split(" ")
  const [year, month, day] = date.split("-")
  /**
   * If the prices are updated today, then just display the time.
   * Otherwise, display the full date.
   */
  const finalTimestampToDisplay =
    Number(new Date().getDate()) !== Number(day)
      ? `${time} ${day}.${month}.${year}`
      : `${time}`

  return (
    <div className="w-full bg-black text-white border-b-white border-b">
      <p className="text-center text-lg">
        Cene azurirane : {finalTimestampToDisplay}
      </p>
    </div>
  )
}
