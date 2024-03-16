/**
 * Next.js Core.
 */
import { getTranslations } from "next-intl/server"
/**
 * Site Footer.
 */
export default async function Footer() {
  const t = await getTranslations("Footer")

  return (
    <footer>
      <div className="flex flex-col items-center gap-2 py-5 text-xs">
        <p>{t("CopyRight")}</p>
        <p>{t("AllRightsReserved")}</p>
      </div>
    </footer>
  )
}
