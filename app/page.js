import client from "utils/client"
import HomePage from './home'

export const IMAGES = [
  // "IMG_0148.JPG", out of place
  "IMG_4488.JPG",
  "IMG_4486.JPG",
  "IMG_4490.JPG",
  "IMG_4487.JPG",
  // "IMG_4493.JPG", below
]

const getImages = async (image_filename) => {
  const { data: { publicUrl } } = await client.storage.from('media').getPublicUrl(`wedding/${image_filename}`)
  return publicUrl
}

async function getVenues() {
  const {data: venues} = await client.from('venue').select()
  return venues
}

export default async function Page() {
  // Fetch data directly in a Server Component
  const venues = await getVenues()
  const images = await Promise.all(IMAGES.map(async(e) => await getImages(e)))
  // Forward fetched data to your Client Component
  return (
    <HomePage venues={venues} images={images} />
  )
}