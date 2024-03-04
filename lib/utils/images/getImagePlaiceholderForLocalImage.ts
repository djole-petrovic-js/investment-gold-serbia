/**
 * Next.js Core.
 */
import fs from "node:fs/promises"
import { getPlaiceholder } from "plaiceholder"
/**
 * When using Next.js Image component, use this to create the blur temp image.
 *
 * @param {String} localImageUrl
 *
 * @returns {Promise<string>}
 */
export default async function getImagePlaiceholderForLocalImage(
  localImageUrl: string
): Promise<string> {
  try {
    const imageFile = await fs.readFile(`public/images/${localImageUrl}`)

    const { base64 } = await getPlaiceholder(imageFile)

    return base64
  } catch (e) {
    return ""
  }
}
