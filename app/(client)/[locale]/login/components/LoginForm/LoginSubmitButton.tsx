/**
 * Next.js Core.
 */
import { useTranslations } from "next-intl"
import { useFormStatus } from "react-dom"
/**
 * Login submit button.
 */
export default function LoginSubmitButton() {
  const { pending } = useFormStatus()

  const t = useTranslations("Login")

  return (
    <button
      type="submit"
      className={`mt-4 border border-white rounded-sm px-5 py-2 mx-auto ${pending ? "disabled" : ""}`}
    >
      {t("LoginButtonLabel")}
    </button>
  )
}
