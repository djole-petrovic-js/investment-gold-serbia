/**
 * Components.
 */
import SingleDistributer from "@/lib/components/distributers/SingleDistributer"
/**
 * Database.
 */
import { DistributersType, ProductsType } from "@/lib/database/types"
/**
 * Props.
 */
type DistributersListingProps = {
  distributers: (DistributersType & {
    Products: ProductsType[]
  })[]
}
/**
 * Display information about a distributer, and all related products.
 */
export default async function DistributersListing({
  distributers
}: DistributersListingProps) {
  return (
    <>
      {distributers.map(
        (distributer) =>
          distributer.Products.length && (
            <SingleDistributer
              key={distributer.name}
              distributer={distributer}
            />
          )
      )}
    </>
  )
}
