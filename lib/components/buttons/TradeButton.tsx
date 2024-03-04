/**
 * Props
 */
type TradeButtonProps = {
  label: string
}
/**
 * Button for navigation the users to the trade pade, and from there
 * to the distributers pages.
 */
export default function TradeButton({ label }: TradeButtonProps) {
  return (
    <div className="mt-5">
      <button className="text-black bg-white py-3 px-10 rounded-md">
        {label}
      </button>
    </div>
  )
}
