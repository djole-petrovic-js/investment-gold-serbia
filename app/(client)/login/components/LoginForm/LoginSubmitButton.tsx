import { useFormStatus } from "react-dom"

export default function LoginSubmitButton() {
  const { pending } = useFormStatus()

  return (
    <button
      type="submit"
      className={`mt-4 border border-white rounded-sm px-5 py-2 mx-auto ${pending ? "disabled" : ""}`}
    >
      Log in
    </button>
  )
}
