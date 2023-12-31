import TextScramble from "@twistezo/react-text-scramble"
import { Row, Col, Container } from "react-bootstrap"
import "styles/message.scss"
import Venue from "./venue"

const TextEN = () => {
    const texts = [
        "friends",
        "family",
        "colleagues",
    ]

    return (
        <blockquote >
            <div>
                <span className="bolding super">
                    Dearest&nbsp;
                    <TextScramble
                        autoStart
                        className="text-scramble"
                        texts={texts}
                        letterSpeed={50}
                        nextLetterSpeed={100}
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
                        pauseTime={2000}
                    />
                    ,
                </span>
            </div>
            <br />
            <div>
                As the joyful bells of happiness ring, we are thrilled to invite you to share in a momentous occasion in our lives – our wedding day. It is with great delight that we extend this invitation to witness and celebrate our love story with you.
            </div>
            <br />
            <div>
                Our journey of love started with a single glance, and over time, our bond has grown stronger with shared moments and cherished memories. Now, with hearts full of love and commitment, we are embarking on this beautiful journey of marriage, creating a new chapter in our lives.
            </div>
            <br />
            <div>
                We warmly invite you to join us on this special day, as we exchange vows and mark the beginning of a new phase. Your presence and blessings will make our joy complete and memorable.
            </div>
        </blockquote>
    )
}

const TextCN = () => {
    const texts = [
        "朋友",
        "家人",
        "同事",
    ]

    return (
        <blockquote className="ch" >
            <div>
                <span className="bolding super">
                    亲爱的
                    <TextScramble
                        autoStart
                        className="text-scramble"
                        texts={texts}
                        letterSpeed={100}
                        nextLetterSpeed={100}
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
                        pauseTime={1000}
                    />
                    ,
                </span>
            </div>
            <br />
            <div>
                在欢乐的钟声中，我们非常激动地邀请您与我们共同分享生命中一个重要的时刻——我们的婚礼日。我们怀着无比的喜悦，诚挚地邀请您与我们一同见证并庆祝我们的爱情故事。
            </div>
            <br />
            <div>
                我们的爱情之旅始于一个眼神的交汇，随着时间的推移，我们的情感更加深厚，共同的时刻和珍贵的回忆使我们的羁绊更加坚固。如今，怀揣着满满的爱与承诺，我们迈向美好的婚姻之路，书写生命中新的篇章。
            </div>
            <br />
            <div>
                我们诚挚地邀请您在这特殊的日子里与我们共同度过，与我们一同交换誓言，标志着新阶段的开始。您的出席和祝福将使我们的喜悦更加圆满和难忘。
            </div>
            <br />
            <div>
                期待您的光临，与我们共创美好回忆。
            </div>
        </blockquote>
    )
}


const TextID = () => {
    const texts = [
        "sahabat",
        "keluarga",
        "rekan-rekan",
    ]

    return (
        <blockquote style={{ fontStyle: 'italic' }}>
            <div >
                <span className="bolding super">
                    Yang terkasih&nbsp;
                </span>  
                <br/>
                <span className="bolding super">
                    <TextScramble
                        autoStart
                        className="text-scramble"
                        texts={texts}
                        letterSpeed={100}
                        nextLetterSpeed={100}
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
                        pauseTime={1000}
                    />
                    ,
                </span>
            </div>
            <br />
            <div>
                Dengan hangat dalam hati, kami ingin berbagi momen istimewa dalam hidup kami – pernikahan kami, dan mengundang Anda untuk menjadi bagian dari cerita ini. Dari kilasan pertama yang menggetarkan, perjalanan cinta kami tumbuh menjadi ikatan yang kuat, diberkahi dengan kenangan tak ternilai. Kini, kami dengan keyakinan dan cinta yang mendalam, memasuki babak baru ini.
            </div>
            <br />
            <div>
                Kehadiran Anda adalah cahaya di setiap langkah kami. Doa dan dukungan Anda akan menjadi hiasan berharga dalam galeri kenangan kami. Semoga Anda dapat bergabung dengan kami untuk merayakan kebahagiaan ini. 
            </div>
            <br />
            <div>
                Terima kasih, sahabat, atas doa dan kebersamaan yang telah mengukir cerita indah ini.
            </div>
        </blockquote>
    )
}

const Message = ({venues}) => {
    return (
        <Container fluid className="message">
            <Row>
                <Col lg={4}  xs={12}>
                    <TextEN date={"date"} venue={"venue"} />
                    <br />

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
                <Col lg={4} xs={12}>
                    <TextID date={"date"} venue={"venue"} />
                    <br />

                    <div className="suffix suffix-in">
                        <div style={{ fontStyle: 'italic' }}>
                            Dengan penuh apresiasi,
                        </div>
                        <br />
                        <div style={{ fontStyle: 'italic' }}>
                            You Tien Hoe & Desy Indahsari
                        </div>
                    </div>
                </Col>
                <Col>
                    <TextCN date={"date"} venue={"venue"} />
                    <br />

                    <div className="suffix suffix-in ch">
                        <div>
                            诚挚祝福与期待,
                        </div>
                        <div>
                            何猷钿 & 黄詩佳
                        </div>
                    </div>
                </Col>
            </Row>
            <Row>
                <Col className="suffix suffix-out">
                    <div>
                        With love and anticipation,
                    </div>
                    <div style={{ fontStyle: 'italic' }}>
                        Dengan penuh apresiasi,
                    </div>
                    <div className="ch">
                        诚挚祝福与期待，
                    </div>
                    <br />
                    <div>
                        You Tien Hoe & Desy Indahsari
                    </div>
                    <div className="ch">
                        何猷钿 & 黄詩佳
                    </div>
                </Col>
            </Row>

        </Container>
    )
}

export default Message