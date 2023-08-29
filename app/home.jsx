'use client'
import { useState } from 'react'
import { ErrorBoundary } from 'react-error-boundary'

import ReactFullpage from "@fullpage/react-fullpage"
import { Landing, Message, RSVP, Footer, Venue } from "components"
import { Alert } from "react-bootstrap"
// NOTE: if using fullpage extensions/plugins put them here and pass it as props.
const pluginWrapper = () => {
    /*
    * require('../static/fullpage.scrollHorizontally.min.js'); // Optional. Required when using the "scrollHorizontally" extension.
    */
}

import { Modal, Button, Row, Col } from 'react-bootstrap'

const ErrorFallback = ({ error, resetErrorBoundary }) => {
    return (
        <Alert variant="danger" onClose={() => setShow(false)} dismissible>
            <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
            <p>
                Change this and that and try again. Duis mollis, est non commodo
                luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit.
                Cras mattis consectetur purus sit amet fermentum.
            </p>
        </Alert>
    )
}

const HomePage = ({ venues, images, diets, submitRSVP }) => {
    const [show, setShow] = useState(false)

    return (
        <ErrorBoundary
            FallbackComponent={ErrorFallback}
            onReset={() => {
                // reset the state of your app so the error doesn't happen again
            }}
        >
            {console.log(venues)}
            <ReactFullpage
                navigation
                pluginWrapper={pluginWrapper}
                render={comp => (
                        <ReactFullpage.Wrapper>
                            <div key="1" id="Landing" className="section">
                                <Landing images={images} />
                            </div>
                            <div key="2" id="Message" className="section">
                                <Message venues={venues} />
                            </div>
                            <div key="3" id="Venue" className="section">
                                <Venue venues={venues} />
                            </div>
                            <div key="4" id="RSVP" className="section dark-section">
                                <RSVP venues={venues} diets={diets} submitRSVP={submitRSVP} show={show} setShow={setShow}  />
                            </div>
                            <div key="5" id="Footer" className="section" style={{height: '30vh'}}>
                                <Footer />
                            </div>
                        </ReactFullpage.Wrapper>
                    )
                }
            />
            <Modal
                size="xl"
                show={show}
                onHide={() => setShow(false)}
                backdrop="static"
                keyboard={false}
                centered
            >
                <Modal.Header>
                    <Row>
                        <Col>
                            <Modal.Title>
                                Thank you for your RSVP!
                            </Modal.Title>
                        </Col>
                        <Col>
                            <Modal.Title>
                                Terima kasih telah mengisi RSVP!
                            </Modal.Title>
                        </Col>
                        <Col>
                            <Modal.Title>
                                <span className='ch' style={{ fontSize: '24pt' }}>感谢您的回复！</span>
                            </Modal.Title>
                        </Col>
                    </Row>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col>
                            We are so excited to have you join us on our special day. Your presence will truly make it a celebration to remember.
                            <br />
                            <br />
                            In the meantime, if you have any questions or need to update your RSVP, please don&quot;t hesitate to get in touch with us.
                            <br />
                            <br />
                            Thank you again, and see you soon!
                        </Col>
                        <Col>
                            Kami sangat senang bisa merayakan hari istimewa kami bersama Anda. Kehadiran Anda akan membuat perayaan ini menjadi sangat berkesan.
                            <br />
                            <br />
                            Sementara itu, jika Anda memiliki pertanyaan atau perlu mengubah RSVP Anda, jangan sungkan untuk menghubungi kami.
                            <br />
                            <br />
                            Terima kasih sekali lagi, dan sampai bertemu!
                        </Col>
                        <Col className='ch'>
                            我们非常期待您能在我们特别的日子里加入我们。您的出席将使这个庆祝活动变得更加难忘。
                            <br />
                            <br />
                            同时，如果您有任何问题或需要更新您的回复，请随时与我们联系。
                            <br />
                            <br />
                            再次感谢您，期待很快见到您！
                        </Col>
                    </Row>
                    <br />
                    <br />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="warning" onClick={()=>setShow(false)} size="lg">Done</Button>
                </Modal.Footer>
            </Modal>
        </ErrorBoundary>
    )
}

export default HomePage