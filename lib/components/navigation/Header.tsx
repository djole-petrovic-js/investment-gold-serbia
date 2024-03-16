/**
 * Next.js Core.
 */
import { useMessages } from "next-intl"
/**
 * Components.
 */
import MobileMenu from "@/lib/components/navigation/MobileMenu/MobileMenu"
import DataUpdatedStripe from "@/lib/components/navigation/DataUpdatedStripe"
import DesktopMenu from "@/lib/components/navigation/DesktopMenu/DesktopMenu"
/**
 * Internationalization.
 */
import { messagesType } from "@/lib/internationalization/types/messagesType"
import LanguageSwitcher from "@/lib/components/navigation/LanguageSwitcher"
/**
 * Site Header.
 */
export default function Header() {
  const messages: messagesType = useMessages() as messagesType

  return (
    <header>
      <nav className="fixed z-20 w-full">
        <div className="flex p-1 justify-between bg-white">
          <DesktopMenu messages={messages.Header} />

          <div className="flex items-center justify-center">
            <div className="hidden md:flex">
              <LanguageSwitcher />
            </div>

            <MobileMenu messages={messages.Header} />
          </div>
        </div>

        <DataUpdatedStripe />
      </nav>
    </header>
  )
}
