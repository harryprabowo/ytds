"use server"
import client from "utils/client"
import sendMail from "app/mailService"

const _get = async (table) => {
    const { data, error } = await client
        .from(table)
        .select()
    
    if (error) {
        throw new Error(error.message, { cause: error.source })
    }
    
    return data
}

const _insert = async (table, payload) => {
    const { data, error } = await client
        .from(table)
        .insert(payload)
        .select()

    if (error) {
        throw new Error(error.message, {cause: error.source})
    }

    return JSON.parse(JSON.stringify(data))
}

const getImages = async (image_filename) => {
    const { data: { publicUrl }, error } = await client
        .storage
        .from('media')
        .getPublicUrl(`wedding/${image_filename}`)

    if (error) {
        throw new Error(error.message, { cause: error.source })
    }

    return publicUrl
}

const getVenues = async () => await _get('venue')
const getDiet = async () => await _get('diet')

const submitRSVP = async ({
    name,
    email,
    contact,
    venueSelected,
    venueDetails
}) => {
    const venues = venueSelected.map((e) => ({
        venue: e,
        ...Object.entries(venueDetails).reduce((o, [k, v]) => (
            k.includes(e) ? { ...o, [k.replace(`_${e}`, "")]: parseInt(Object.hasOwn(v, 'value') ? v.value : v) } : o
        ), {})
    }))


    const rsvp = await _insert(
        "rsvp",
        [
            {
                name,
                email,
                contact,
            },
        ]
    )

    const rsvpId = rsvp[0].id
    
    const party = await _insert(
        "party",
        venues.map(({venue, partySize, diet}) => ({
            rsvp: rsvpId,
            venue,
            party_size: partySize,
            diet
        }))
    )

    const rsvpDetail = {
        rsvp: rsvp[0],
        party: party
    }

    await sendRSVPMail(rsvpDetail)
    return rsvpDetail
}

const sendRSVPMail = async (rsvpDetail) => {
    await sendMail(
        rsvpDetail.rsvp.email,
        "TEST",
        "THIS IS A TEST FOR MY MEDIUM USERS"
    )
}

export {
    getImages,
    getDiet,
    getVenues,
    submitRSVP
}