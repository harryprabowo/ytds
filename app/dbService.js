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

export const _getPublicUrl = async (pathname, storageName = "media") => {
    const { data: { publicUrl }, error } = await client
        .storage
        .from(storageName)
        .getPublicUrl(pathname)

    if (error) {
        throw new Error(error.message, { cause: error.source })
    }

    return publicUrl
}

const getImages = async (image_filename) => {
    return await _getPublicUrl(`wedding/${image_filename}`)
}

const getVenues = async () => await _get('venue')
const getDiet = async () => await _get('diet')

const getVenuesByRSVP = async (rsvpId) => {
    const { data, error } = await client
        .from('party')
        .select(`
            venue (*),
            rsvp
        `)
        .eq('rsvp', rsvpId)
    
    if (error) {
        throw new Error(error.message, { cause: error.source })
    }
    return (data.reduce((o, e) => ({ ...o, [e.rsvp]: e.rsvp in o ? [...o[e.rsvp], e.venue] : [e.venue] }), {}))
}

const submitRSVP = async ({
    name,
    email,
    contact,
    notes,
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
                email: email.toLowerCase(),
                contact: contact.split(" ").join(""),
                notes
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

    if (email !== '') {
        const rsvpVenues = await getVenuesByRSVP(rsvpDetail.rsvp.id)

        await sendMail(
            rsvpDetail.rsvp.email,
            "Your RSVP for You Tien & Desy's Wedding is Confirmed!",
            {
                name: rsvpDetail.rsvp.name,
                venues: rsvpVenues[rsvpDetail.rsvp.id]
            }
        )
    }

    return rsvpDetail
}
export {
    getImages,
    getDiet,
    getVenues,
    submitRSVP
}