"use client"
/**
 * Next.js core
 */
import { useFormState, useFormStatus } from "react-dom"
/**
 * Actions
 */
import authenticate from "@/app/login/actions/authenticate"
/**
 * Login page.
 */
export default function LoginForm() {
  const { pending } = useFormStatus()
  const [errorMessage, dispatch] = useFormState(authenticate, undefined)

  return (
    <form action={dispatch} className="w-1/3">
      <div className="mb-5">
        <h3 className="text-center text-2xl">Prijava na sistem</h3>
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
        <button
          type="submit"
          className="mt-4 border border-white rounded-sm px-5 py-2 mx-auto"
          aria-disabled={pending}
        >
          Log in
        </button>

        {errorMessage && <p className="text-sm text-red-500">{errorMessage}</p>}
      </div>
    </form>
  )
}
