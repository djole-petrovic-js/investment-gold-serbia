/**
 * App core
 */
// import Distributer from "@/lib/classes/abstract/Distributer";
/**
 * Components
*/
import SingleDistributer from "@/lib/components/distributers/SingleDistributer";
import { IDistributerModel } from "@/lib/database/models/Distributer";
/**
 * Props
 */
type DistributersListingProps = {
  distributers: IDistributerModel[],
}
/**
 * Display information about a distributer, and all related products.
 */
export default async function DistributersListing({ distributers } : DistributersListingProps) {
  return (
    <>
      {distributers.map((distributer) =>
        <SingleDistributer
          key={distributer.name}
          distributer={distributer}
        />
      )}
    </>
  )
}