import EmblaCarousel from './EmblaCarousel'
import 'styles/base.scss'
import 'styles/sandbox.scss'
import 'styles/embla.scss'

const OPTIONS = { loop: true }

const Landing = ({ images }) => {
    const SLIDES = Array.from(Array(images.length).keys())
    return (
        <section className="sandbox__carousel">
            <EmblaCarousel slides={SLIDES} options={OPTIONS} images={images} />
        </section>
    )
}

export default Landing