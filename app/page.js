import {
  getImages,
  getDiet,
  getVenues,
  submitRSVP
} from "./dbService"
import HomePage from './home'

class Image {
  constructor(name, style = null) {
    this.name = name
    this.style = style
  }
}

export const IMAGES = [
  // "IMG_0148.JPG", out of place
  new Image("1.jpeg", true),
  new Image("2.jpeg"),
  new Image("3.jpeg"),
  new Image("4.jpeg", true),
  // "IMG_4493.4", below
]

export default async function Page() {
  // Fetch data directly in a Server Component
  const venues = await getVenues()
  const images = await Promise.all(IMAGES.map(async ({ name, style }) => {
    let src = await getImages(name)
    return {
      name,
      src,
      style
    }
  }))
  const diets = await getDiet()

  // Forward fetched data to your Client Component
  return (
    <HomePage venues={venues} images={images} diets={diets} submitRSVP={submitRSVP} />
  )
}