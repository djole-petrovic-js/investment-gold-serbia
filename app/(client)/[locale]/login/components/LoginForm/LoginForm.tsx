"use client"
/**
 * Next.js core.
 */
import { useFormState } from "react-dom"
import { useTranslations } from "next-intl"
/**
 * Actions.
 */
import authenticate from "@/client/login/actions/authenticate"
/**
 * Components.
 */
import LoginSubmitButton from "@/client/login/components/LoginForm/LoginSubmitButton"
/**
 * Login page.
 */
export default function LoginForm() {
  const [errorMessage, dispatch] = useFormState(authenticate, undefined)

  const t = useTranslations("Login")

  return (
    <form action={dispatch} className="w-5/6 sm:w-4/6 lg:w-1/3">
      <div className="mb-5">
        <h3 className="text-center text-2xl">{t("LoginToSystem")}</h3>
      </div>

      <div className="mb-5">
        <input
          className="p-2 rounded-sm w-full text-black"
          type="text"
          name="email"
          placeholder="Email"
        />
      </div>

      <div>
        <input
          className="p-2 rounded-sm w-full text-black"
          type="password"
          name="password"
          placeholder="password"
        />
      </div>

      <div className="text-center">
        <LoginSubmitButton />

        {errorMessage && <p className="text-sm text-red-500">{errorMessage}</p>}
      </div>
    </form>
  )
}
