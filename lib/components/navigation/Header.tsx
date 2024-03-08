/**
 * Components.
 */
import MobileMenu from "@/lib/components/navigation/MobileMenu"
import DataUpdatedStripe from "@/lib/components/navigation/DataUpdatedStripe"
import DesktopMenu from "@/lib/components/navigation/DesktopMenu/DesktopMenu"
/**
 * Site Header.
 */
export default function Header() {
  return (
    <nav className="fixed z-20 w-full">
      <div className="flex p-1 justify-between bg-white">
        <DesktopMenu />
        <MobileMenu />
      </div>

      <DataUpdatedStripe />
    </nav>
  )
}
