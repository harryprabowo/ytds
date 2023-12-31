import { Great_Vibes, Playfair_Display, Playfair_Display_SC, Cinzel_Decorative, Bodoni_Moda } from 'next/font/google'
import EmblaCarousel from './EmblaCarousel'
import { Container, Row, Col } from 'react-bootstrap'
import 'styles/sandbox.scss'
import 'styles/embla.scss'
import 'styles/landing.scss'
import Image from 'next/image'
import TextScramble from '@twistezo/react-text-scramble'
import { Typewriter } from 'react-simple-typewriter'

const OPTIONS = { loop: true }
const bodoni = Bodoni_Moda({ subsets: ['latin'], weight: ['700'] })
const cinzel = Cinzel_Decorative({ subsets: ['latin'], weight: ['900'] })
const playfair = Playfair_Display({ subsets: ['latin'], weight: ['400'] })

const theText = [
    // "The wedding of",
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
    <div className="landing-text">
        <Image alt="divider" src="https://static.vecteezy.com/system/resources/previews/012/634/581/non_2x/art-deco-outline-stroke-in-golden-color-for-classy-and-luxury-style-premium-vintage-line-art-design-element-free-png.png" height={0} width={300} />
        <h1 className={playfair.className} style={{ fontSize: '12pt' }}>
            <Typewriter
                words={theText}
                loop={false}
                cursor
                cursorStyle='_'
                typeSpeed={70}
                deleteSpeed={30}
                delaySpeed={1000}
            />
        </h1>
        <br/>
        <h1 className={cinzel.className} style={{ fontSize: '24pt' }}>
            
            <TextScramble
                autoStart
                className="text-scramble"
                texts={[
                    "You Tien Hoe",
                    "何猷钿"
                ]}
                letterSpeed={50}
                nextLetterSpeed={50}
                steps={[
                    {
                        roll: 20,
                        action: '+',
                        type: 'all',
                    },
                    {
                        action: '-',
                        type: 'forward',
                    },
                ]}
                pauseTime={3000}
            />
            &
            <TextScramble
                autoStart
                className="text-scramble"
                texts={[
                    "Desy Indahsari",
                    "黄詩佳"
                ]}
                letterSpeed={50}
                nextLetterSpeed={50}
                steps={[
                    {
                        roll: 20,
                        action: '+',
                        type: 'all',
                    },
                    {
                        action: '-',
                        type: 'forward',
                    },
                ]}
                pauseTime={3000}
            />
        </h1>
        <br/>
        <h2 style={{ fontSize: '20pt' }}>꧁The Wedding꧂</h2>
        <h2 className='ch' style={{ fontSize: '25pt' }}>婚礼</h2>
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