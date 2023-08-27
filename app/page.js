import client from "utils/client"
import HomePage from './home'

class Image {
  constructor(name, style = null) {
    this.name = name
    this.style = style
  }
}

export const IMAGES = [
  // "IMG_0148.JPG", out of place
  new Image("IMG_4488.JPG", true),
  new Image("IMG_4486.JPG"),
  new Image("IMG_4490.JPG"),
  new Image("IMG_4487.JPG"),
  // "IMG_4493.JPG", below
]

const getImages = async (image_filename) => {
  const { data: { publicUrl } } = await client.storage.from('media').getPublicUrl(`wedding/${image_filename}`)
  return publicUrl
}

const getVenues = async () => {
  const { data: venues } = await client.from('venue').select()
  return venues
}

const getDiet = async () => {
  const { data: diets } = await client.from('diet').select()
  return diets
}

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
    <HomePage venues={venues} images={images} diets={diets} />
  )
}