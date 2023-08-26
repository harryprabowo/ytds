import client from "utils/client"
import {Landing as LandingPage} from "components"

const getImages = async(image_filename) => {
    const { data: publicUrl } = await client.storage.from('media').getPublicUrl(`wedding/${image_filename}`)
    console.log(publicUrl)
    return publicUrl
}

export const images = [
    "IMG_0148.JPG",
    "IMG_0151.JPG",
    "IMG_4481.JPG",
    "IMG_4486.JPG",
    "IMG_4487.JPG",
    "IMG_4488.JPG",
    "IMG_4490.JPG",
    "IMG_4491.JPG",
    "IMG_4493.JPG",
]

const imageByIndex = async(index) => await getImages(images[index % images.length])

const Landing = async() => {
    const images = await (imageByIndex)
    return <LandingPage images={images} />
}

export default Landing