import TextScramble from "@twistezo/react-text-scramble"
import { Row, Col, Container } from "react-bootstrap"
import "styles/message.scss"
import Venue from "./venue"

const Text = ({venue, date}) => {
    const texts = [
        "friends",
        "family",
        "colleagues",
    ]

    return (
        <blockquote >
            <div>
                <span className="bolding super">Dearest&nbsp;<TextScramble className="text-scramble" texts={texts} />,</span>
            </div>
            <br />
            <div>
                In the tapestry of life, there are moments that shimmer with an ethereal brilliance, and amidst this grand tapestry, our wedding day emerges as a jewel of unparalleled significance. We invite you to join us in weaving this exquisite thread into the fabric of our journey.

            </div>
            <br />
            <div>
                Underneath the stars and amidst the whispers of time, our souls will unite as one. The date shall mark the beginning of a chapter where two lives blend like colors on an artist's canvas. We would be truly honored by your presence.

                At the enchanted venues, where every corner echoes with the melodies of a bygone era, we shall dance and celebrate amidst the charm of the 1920s. This era of elegance, of Gatsby dreams and moonlit serenades, will be our backdrop as we take steps towards forever.
            </div>
            <br/>
            <div>
                Your response, a stroke of the pen, holds the power to shape our gathering. Kindly grace us with your intention to attend by [RSVP Deadline]. Every word, every gesture, will be etched into the memory of this day.

                Visit our digital scroll, our RSVP website, and let us know if the stars align for you to join. If fate has other plans, your blessings will reach us just the same.

                As we embark on this poetic journey, we eagerly await the verses of your response.
            </div>
            <br />
            <br />
        </blockquote>
    )
}

const Message = ({venues}) => {
    return (
        <Container fluid className="message">
            <Row>
                <Col md={8} xs={12}>
                    <Text date={"date"} venue={"venue"} />

                    <div className="suffix suffix-in">
                        <div>
                            With love and anticipation,
                        </div>
                        <br />
                        <div>
                            You Tien Hoe & Desy Indahsari
                        </div>
                    </div>
                </Col>
                <Col>
                    <Venue venues={venues} />
                </Col>
                <Col md={1} xs={0}/>
            </Row>
            <Row>
                <Col className="suffix suffix-out">
                    <div>
                        With love and anticipation,
                    </div>
                    <br />
                    <div>
                        You Tien Hoe & Desy Indahsari
                    </div>
                </Col>
            </Row>

        </Container>
    )
}

export default Message