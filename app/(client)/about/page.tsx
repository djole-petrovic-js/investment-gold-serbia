/**
 * Next.js core.
 */
import type { Metadata } from "next"
/**
 * Components.
 */
import GoogleAnalytics from "@/lib/components/GoogleAnalytics"
/**
 * Constants.
 */
import {
  gvsMainUrl,
  livePriceOfGold,
  nbsUrl,
  projectGithubUrl,
  tavexMainUrl
} from "@/lib/constants/urls"
/**
 * Page metadata.
 */
export const metadata: Metadata = {
  title: "IZS - O nama",
  description: "Investiciono zlato Srbija - O nama",
  keywords: ["informacije", "zlato", "investiranje"]
}
/**
 * Fully dynamic route.
 */
export const dynamic = "force-dynamic"
/**
 * About page.
 */
export default async function About() {
  return (
    <main className="main">
      <div className="text-white pt-5 px-5 w-full md:w-4/5 md:mx-auto">
        <h1 className="mainH1">O nama</h1>

        <div className="space-y-5 text-xl">
          <p>
            Sajt postoji sa svrhom da olaksa kupovinu i prodaju zlata u Srbiji,
            pa tako i lakse investiranje kapitala. Ovde mozete naci neke od
            distributera zlata u Srbiji, sa svim cenama koje nude.
          </p>

          <p>
            Sajt je iskljucivo informativnog karaktera, i ne daje nikakve
            finansijske savete.
          </p>

          <p>
            Svi podaci i slike o proizvodima su preuzeti od sajtova
            distributera. Sve zasluge idu njima. Sve informacije o njima, mozete
            naci ispod.
          </p>

          <div className="py-5">
            <h2 className="mb-5">Linkovi:</h2>

            <p>
              Tavex :{" "}
              <a className="underline" href={tavexMainUrl} target="_blank">
                link do sajta.
              </a>
            </p>

            <p>
              GVS Srbija :{" "}
              <a className="underline" href={gvsMainUrl} target="_blank">
                link do sajta.
              </a>
            </p>

            <p>
              Srednji kurs eura se preuzima sa stranice{" "}
              <a className="underline" href={nbsUrl} target="_blank">
                Narodne Banke Srbije
              </a>
            </p>

            <p>
              Stranicu sa trenutnom cenom zlata u evrima{" "}
              <a className="underline" href={livePriceOfGold} target="_blank">
                ovde
              </a>
            </p>

            <p>
              Projekat je otvorenog koda, i mozete ga naci{" "}
              <a className="underline" href={projectGithubUrl} target="_blank">
                ovde
              </a>
            </p>
          </div>
        </div>
      </div>

      <GoogleAnalytics />
    </main>
  )
}
