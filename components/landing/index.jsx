import { Great_Vibes, Playfair_Display, Playfair_Display_SC, Cinzel_Decorative } from 'next/font/google'
import EmblaCarousel from './EmblaCarousel'
import { Container, Row, Col } from 'react-bootstrap'
import 'styles/sandbox.scss'
import 'styles/embla.scss'
import 'styles/landing.scss'
import Image from 'next/image'
import TextScramble from '@twistezo/react-text-scramble'
import { Typewriter } from 'react-simple-typewriter'

const OPTIONS = { loop: true }
const greatVibes = Cinzel_Decorative({ subsets: ['latin'], weight: ['700'] })
const cinzel = Playfair_Display({ subsets: ['latin'], weight: ['400'] })

const theText = [
    "The wedding of",
    "The unfolding of forever for",
    "Capturing Eternity",
    "Celestial Bonds",
    "Harmony United",
    "Love's Embrace",
    "Destined Hearts",
    "A Tale of Two Souls",
    "Everlasting Vows",
    "Radiant Love",
    "Eternal Unity",
    "Infinite Promises",
    "Joined in Love"
]

const Text = () => (
    <div class="landing-text">
        <Image alt="divider" src="https://static.vecteezy.com/system/resources/previews/012/634/581/non_2x/art-deco-outline-stroke-in-golden-color-for-classy-and-luxury-style-premium-vintage-line-art-design-element-free-png.png" height={0} width={300} />
        <h1 className={cinzel.className} style={{ fontSize: '12pt' }}>
            <Typewriter
                words={theText}
                loop={5}
                cursor
                cursorStyle='_'
                typeSpeed={70}
                deleteSpeed={30}
                delaySpeed={1000}
            />
        </h1>
        <br/>
        <h1 className={greatVibes.className} style={{ fontSize: '24pt' }}>You Tien Hoe<br className="brbr" /> & <br className="brbr" />Desy Indahsari</h1>
        <Image alt="divider" src="https://static.vecteezy.com/system/resources/previews/012/634/581/non_2x/art-deco-outline-stroke-in-golden-color-for-classy-and-luxury-style-premium-vintage-line-art-design-element-free-png.png" height={0} width={300} />
    </div>
)

const Landing = ({ images }) => {
    const SLIDES = Array.from(Array(images.length).keys())

    return (
        <Container fluid>
            <Row>
                <Col md={{ span: 8 }} xs={{ span: 12 }}>
                    <section className="sandbox__carousel">
                        <EmblaCarousel slides={SLIDES} options={OPTIONS} images={images} />
                    </section>
                </Col>
                <Col >
                    <Text/>
                </Col>
            </Row>
        </Container>
    )
}

export default Landing