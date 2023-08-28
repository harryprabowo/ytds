import { Great_Vibes, Playfair_Display, Playfair_Display_SC, Cinzel_Decorative } from 'next/font/google'
import { useForm, Controller } from "react-hook-form"
import { ErrorMessage } from "@hookform/error-message"
import { Form, FloatingLabel, Row, Col, Button } from 'react-bootstrap'
import Select, { StylesConfig } from 'react-select'
import makeAnimated from 'react-select/animated';
import { useEffect, useState } from "react";
import "styles/rsvp.scss"

const greatVibes = Cinzel_Decorative({ subsets: ['latin'], weight: ['700'] })

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
    const { register, handleSubmit, formState: { errors }, control } = useForm();
    const onSubmit = async(data) => {
        const { partySize, diet, fullName, venue, ...rest } = data
        const payload = {
            ...rest,
            party_size: parseInt(partySize),
            diet: diet.value,
            name: fullName,
            venues: venue.map(e => e.value)
        }

        const res = await submitRSVP(payload)
        console.log(res)
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

    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
            <Row>
                <Col>
                    <Form.Group controlId="fullName">
                        <Form.Label>Full name</Form.Label>
                        <Form.Control className="css-13cymwt-control" type="text" name="Full name" {...register("fullName", { required: 'We would love to know our esteemed guest' })} />
                        <Form.Text muted>
                            <ErrorMessage errors={errors} name="fullName" />
                        </Form.Text>
                    </Form.Group>
                    <Form.Group controlId="email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control className="css-13cymwt-control" type="email" name="Email" {...register("email", { required: 'We would love to send our invitation card', pattern: /^\S+@\S+$/i })} />
                        <Form.Text muted>
                            <ErrorMessage errors={errors} name="email" />
                        </Form.Text>
                    </Form.Group>
                    <Form.Group controlId="contact">
                        <Form.Label>Contact</Form.Label>
                        <Form.Control className="css-13cymwt-control" type="tel" name="Contact" {...register("contact", { required: 'We require your contact to confirm your RSVP', minLength: 6, maxLength: 12 })} />
                        <Form.Text muted>
                            <ErrorMessage errors={errors} name="contact" />
                        </Form.Text>
                    </Form.Group>
                </Col>
                <Col md={4} xs={12}>
                    <Form.Group controlId="partySize">
                        <Form.Label>Party size</Form.Label>
                        <Form.Control className="css-13cymwt-control" type="number" name="Party" defaultValue={1} min={1} max={10} {...register("partySize", { required: 'We would love to know your party size', min: 1, max: 10 })} />
                        <Form.Text muted>
                            <ErrorMessage errors={errors} name="partySize" />
                        </Form.Text>
                    </Form.Group>
                    <Form.Group controlId="venue">
                        <Form.Label>Venues</Form.Label>
                        <Controller
                            name="venue"
                            control={control}
                            rules={{ required: 'Are you not coming?' }}
                            render={({ field }) => (
                                <Select
                                    {...field}
                                    isClearable
                                    isMulti
                                    closeMenuOnSelect={false}
                                    classNamePrefix="addl-class"
                                    components={makeAnimated()}
                                    options={venueOptions}
                                    styles={colourStyles}
                                />
                            )}
                        />
                        <Form.Text muted>
                            <ErrorMessage errors={errors} name="venue" />
                        </Form.Text>
                    </Form.Group>
                    <Form.Group controlId="diet">
                        <Form.Label>Diet</Form.Label>
                        <Controller
                            name="diet"
                            control={control}
                            rules={{ required: "We'd love to cater to your tastes" }}
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
                            <ErrorMessage errors={errors} name="diet" />
                        </Form.Text>
                    </Form.Group>
                    <br />
                </Col>
            </Row>
            <br />
            <br />
            <Row>
                <Col style={{textAlign:'center'}}>
                    <Button type="submit" variant="warning" size="lg" block>SUBMIT</Button>
                </Col>
            </Row>

        </Form>
    );
}

const RSVP = (props) => {
    return (
        <div className="rsvp-container">
            <h1 className={greatVibes.className}>꧁Répondez s&apos;il vous plaît꧂</h1>
            <br/>
            <Row style={{margin: 0}}>
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