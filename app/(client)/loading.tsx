import { faSpinner } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
/**
 * Client loading component.
 */
export default function Loading() {
  return (
    <div className="h-screen w-full flex items-center justify-center z-30 bg-black text-white bg-opacity-90">
      <FontAwesomeIcon size="3x" className="fa-spin" icon={faSpinner} />
    </div>
  )
}
