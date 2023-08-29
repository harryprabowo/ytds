import { Cinzel_Decorative, Limelight } from 'next/font/google'
import { useForm, Controller } from "react-hook-form"
import { ErrorMessage } from "@hookform/error-message"
import { Form, Row, Col, Button, Tab, Nav, Card, Modal } from 'react-bootstrap'
import Select from 'react-select'
import makeAnimated from 'react-select/animated'
import { useEffect, useState } from 'react'
import { FaCog, FaChevronRight } from "react-icons/fa";
import "styles/rsvp.scss"

const greatVibes = Cinzel_Decorative({ subsets: ['latin'], weight: ['700'] })
const limelight = Limelight({ subsets: ['latin'], weight: ['400'] })

const ConfirmModal = ({ show, setShow }) => {
    return (
        <Modal
            size="xl"
            show={show}
            onHide={() => setShow(false)}
            backdrop="static"
            keyboard={false}
            centered
        >
            <Modal.Header>
                <Modal.Title>
                    <h1>Thank you for your RSVP!</h1>
                </Modal.Title>
                <super>Terima kasih telah mengisi RSVP!</super>
                <br />
                <sub>
                    <span className='ch'> 感谢您的回复！</span>
                </sub>
            </Modal.Header>
            <Modal.Body>
                <Row>
                    <Col lg={4} md={12}>
                        We are so excited to have you join us on our special day. Your presence will truly make it a celebration to remember.
                        <br />
                        <br />
                        In the meantime, if you have any questions or need to update your RSVP, please don&quot;t hesitate to get in touch with us.
                        <br />
                        <br />
                        Thank you again, and see you soon!
                    </Col>
                    <Col lg={4} md={12} style={{fontStyle: 'italic'}}>
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
                <Button variant="warning" onClick={() => setShow(false)} size="lg">Done</Button>
            </Modal.Footer>
        </Modal>
    )
}

const colourStyles = {
    option: (styles, { data, isDisabled, isFocused, isSelected }) => {
        return {
            ...styles,
            backgroundColor: isDisabled
                ? undefined
                : '#222',
            color: isDisabled
                ? '#aaa'
                : '#ccc',
            cursor: isDisabled ? 'not-allowed' : 'default',

            ':hover': {
                ...styles[':hover'],
                backgroundColor: !isDisabled
                    ? '#111'
                    : undefined,
            },

            ':active': {
                ...styles[':active'],
                backgroundColor: !isDisabled
                    ? '#111'
                    : undefined,
            },
        };
    },
    multiValue: (styles, { data }) => {
        return {
            ...styles,
            backgroundColor: '#333',
        };
    },
    multiValueLabel: (styles, { data }) => ({
        ...styles,
        color: 'white',
    }),
    multiValueRemove: (styles, { data }) => ({
        ...styles,
        ':hover': {
            backgroundColor: '#222',
            color: 'white',
        },
    }),
};



const RSVPForm = ({ venues, diets, submitRSVP }) => {
    // const [dietsSelected, setDietsSelected] = useState([])
    const [show, setShow] = useState(false)
    const [nav, setNav] = useState(venues.map(e => false))
    const [whichActive, setWhichActive] = useState()
    const [loading, setLoading] = useState(false)
    const [venueSelected, setVenueSelected] = useState([])
    const { register, handleSubmit, formState: { errors }, control, setError, clearErrors } = useForm();
    const onSubmit = async ({
        fullName: name,
        email,
        contact,
        ...data
    }) => {
        setLoading(true)
        const payload = {
            name,
            email,
            contact,
            venueSelected,
            venueDetails: data
        }

        try {
            const res = await submitRSVP(payload)
            console.log(res)
            setShow(true)
        } catch (err) {
            console.error(err)

            alert("Looks like you have submitted your RSVP before. If you believe you haven't, please contact You Tien/Desy :)")

        } finally {
            setLoading(false)
        }
    }

    const venueOptions = venues.map(({ id, label }) => ({
        value: id,
        label
    }))

    const dietOptions = [
        ...diets.map(({ id, name, desc }) => ({
            value: id,
            label: name,

        })),
    ]

    const dietDetails = (_dietsSelected) => {
        return (
            <ul>
                {_dietsSelected.map((e, i) => (
                    <li key={i}>{diets.find(({ name }) => name === e).desc}</li>
                ))}
            </ul>
        )
    }

    const handleCheckVenue = (e, id) => {
        setNav(nav.map((j, i) => (i === id - 1 ? e.target.checked : j)))

        if (e.target.checked) {
            setWhichActive(id)
        } else {
            clearErrors(`diet_${id}`)
            clearErrors(`partySize_${id}`)
        }
    }

    useEffect(() => {
        if (!nav[whichActive - 1]) {
            setWhichActive(null)
        }
    }, [nav])

    useEffect(() => {
        let bro = nav.reduce(
            (out, bool, i) => bool ? out.concat(i + 1) : out,
            []
        )
        setVenueSelected(bro)
    }, [nav])

    useEffect(() => {
        if (!nav.some(e => e)) {
            setError('venues', { type: "custom", message: "Are you coming?" }, { shouldFocus: true })
        } else {
            clearErrors('venues')
        }
    }, [nav, setError])

    return (
        <>
            <Form onSubmit={handleSubmit(onSubmit)} >
                <Row>
                    <Tab.Container id="left-tabs-example" activeKey={whichActive} onSelect={e => setWhichActive(parseInt(e))}>
                        <Col lg={4} xs={12}>
                            <Form.Group controlId="fullName">
                                <Form.Label>Full name<br/>Nama lengkap<br/>姓名</Form.Label>
                                <Form.Control className="css-13cymwt-control" type="text" name="Full name" {...register("fullName", { required: 'We would love to know our esteemed guest' })} />
                                <Form.Text muted>
                                    <ErrorMessage errors={errors} name="fullName" />
                                </Form.Text>
                            </Form.Group>
                            <Form.Group controlId="email">
                                <Form.Label>Email<br/>Surel<br/>电子邮箱</Form.Label>
                                <Form.Control className="css-13cymwt-control" type="email" name="Email" {...register("email", { required: 'We would love to send our invitation card', pattern: /^\S+@\S+$/i })} />
                                <Form.Text muted>
                                    <ErrorMessage errors={errors} name="email" />
                                </Form.Text>
                            </Form.Group>
                            <Form.Group controlId="contact">
                                <Form.Label>Contact<br/>Kontak<br/>联络号码</Form.Label>
                                <Form.Control className="css-13cymwt-control" type="tel" name="Contact" {...register("contact", { required: 'We require your contact to confirm your RSVP', minLength: 6, maxLength: 12 })} />
                                <Form.Text muted>
                                    <ErrorMessage errors={errors} name="contact" />
                                </Form.Text>
                            </Form.Group>
                        </Col>
                        <Col lg={1} xs={0} />
                        <Col>
                            <Form.Label>Venue<br/>Lokasi<br/>地点</Form.Label>
                            <Form.Control className="custom-form-control" type="hidden" value={venueSelected} {...register("venues")} />
                            <Nav variant="pills" className="flex-column">
                                <Row>
                                    <Col lg={4} md={5} sm={4} xs={12}>
                                        {
                                            venues.map(({ label, id }) => (
                                                <div key={id} className="inline-venue">
                                                    <Form.Group controlId={label} className="inline-venue-checkbox">
                                                        <Form.Check type="checkbox" className={errors[`diet_${id}`] ? "error" : ""} isValid onChange={e => handleCheckVenue(e, id)} label={
                                                            `${(errors[`diet_${id}`] ? '* ' : '')}${label}`
                                                        } />
                                                    </Form.Group>
                                                    <Nav.Item>
                                                        <Nav.Link eventKey={id} disabled={!nav[id - 1]} variant="warning" >
                                                            <FaCog />
                                                            <FaChevronRight className="to-the-right" />
                                                        </Nav.Link>
                                                    </Nav.Item>
                                                </div>
                                            ))
                                        }
                                        <ErrorMessage errors={errors} name="venues" />
                                    </Col>
                                    <Col>
                                        <Tab.Content>
                                            {
                                                venues.map(({ id, label }) => {
                                                    return (
                                                        <Tab.Pane eventKey={id} key={id}>
                                                            <Card bg="dark" >
                                                                <Card.Header><label>{label}</label></Card.Header>
                                                                <Card.Body>
                                                                    <Form.Group controlId={`partySize_${id}`}>
                                                                        <Form.Label>Party size<br/>Jumlah Tamu<br/>人数</Form.Label>
                                                                        <Form.Control className="css-13cymwt-control" type="number" name={`partySize_${id}`} defaultValue={1} min={1} max={10} {...register(`partySize_${id}`, { required: nav[id - 1] ? 'We would love to know your party size' : false, min: 1, max: 10 })} />
                                                                        <Form.Text muted>
                                                                            <ErrorMessage errors={errors} name={`partySize_${id}`} />
                                                                        </Form.Text>
                                                                    </Form.Group>
                                                                    <br />
                                                                    <Form.Group controlId={`diet_${id}`}>
                                                                        <Form.Label>Diet<br/>Diet<br/>饮食</Form.Label>
                                                                        <Controller
                                                                            name={`diet_${id}`}
                                                                            control={control}
                                                                            rules={{ required: nav[id - 1] ? "We'd love to cater to your tastes" : false }}
                                                                            render={({ field }) => (
                                                                                <Select
                                                                                    {...field}
                                                                                    classNamePrefix="addl-class"
                                                                                    options={dietOptions}
                                                                                    styles={colourStyles}
                                                                                // onChange={e => {
                                                                                //     setDietsSelected(e.map(f => f.label))
                                                                                // }}
                                                                                />
                                                                            )}
                                                                        />
                                                                        <Form.Text muted>
                                                                            {/* {dietDetails(dietsSelected)} */}
                                                                            <ErrorMessage errors={errors} name={`diet_${id}`} />
                                                                        </Form.Text>
                                                                    </Form.Group>
                                                                </Card.Body>
                                                            </Card>
                                                        </Tab.Pane>
                                                    )
                                                })
                                            }
                                        </Tab.Content>
                                    </Col>
                                </Row>
                            </Nav>
                        </Col>
                    </Tab.Container>
                </Row>
                <br />
                <Row>
                    <Col style={{ textAlign: 'center' }}>
                        <Button type="submit" variant="warning" size="lg"  disabled={loading || Object.keys(errors).length !== 0}>
                            {loading ? 'Submitting...' : 'SUBMIT'}
                        </Button>
                    </Col>
                </Row>
            </Form>
            <ConfirmModal show={show} setShow={setShow} />
        </>
    );
}

const RSVP = (props) => {

    return (
        <div className="rsvp-container">
            <h1 className={limelight.className}>꧁Répondez s&apos;il vous plaît꧂</h1>
            <br />
            <Row style={{ margin: 0 }}>
                <Col />
                <Col md={9} xs={12}>
                    <div className="rsvp-form-container" >
                        <RSVPForm {...props} />
                    </div>
                </Col>
                <Col />
            </Row>
        </div>
    )
}

export default RSVP