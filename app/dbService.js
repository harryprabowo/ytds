"use server"
import client from "utils/client"

const getImages = async (image_filename) => {
    const { data: { publicUrl }, error } = await client
        .storage
        .from('media')
        .getPublicUrl(`wedding/${image_filename}`)

    console.error(error)
    return publicUrl
}

const getVenues = async () => {
    const { data: venues, error } = await client
        .from('venue')
        .select()
    console.error(error)
    return venues
}

const getDiet = async () => {
    const { data: diets, error } = await client
        .from('diet')
        .select()

    console.error(error)
    return diets
}

const createParty = async ({
    party_size,
    diet
}) => {
    const { data, error } = await client
        .from('party')
        .insert([
            {
                party_size,
                diet
            },
        ])
        .select()
    
    console.error(error)
    return data[0]
}

const insert = async (table, payload) => {
    const { data, error } = await client
        .from(table)
        .insert(payload)
        .select()

    console.error(error)
    return JSON.parse(JSON.stringify(data))
}

const submitRSVP = async ({
    name,
    email,
    contact,
    party_size,
    venues,
    diet
}) => {
    const party = await insert(
        "party",
        [
            {
                party_size,
                diet
            }
        ]
    )

    const partyId = party[0].id
    
    const partyVenue = await insert(
        "party_venue",
        venues.map(venue => ({
            party: partyId,
            venue
        }))
    )

    const rsvp = await insert(
        "rsvp",
        [
            {
                party: partyId,
                name,
                email,
                contact,
            },
        ]
    )

    return {
        party: party[0],
        partyVenue,
        rsvp: rsvp[0]
    }
}

export {
    getImages,
    getDiet,
    getVenues,
    submitRSVP
}