import { Cinzel_Decorative } from 'next/font/google'
import Map from "./Map"
import StepperTimeline from "./Timeline"

const cinzel = Cinzel_Decorative({ subsets: ['latin'], weight: ['700'] })
const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

const Venue = ({ venues, horizontal }) => {
    console.log(venues)
    const dataSorted = venues.sort((a, b) => a.id - b.id)

    const info = dataSorted.map(({ location, time, timezone, dress_code,...rest }) => ({
        ...rest,
        time: new Date(time).toLocaleString(undefined, {timeZone: timezone, ...options}) + ' (' + timezone +')',
        location: JSON.parse(JSON.stringify(location)),
        dress_code: rest.id === 3 ? <a href="https://www.pinterest.com/ideas/gatsby-dress-code/946816857572/" target="_blank" style={{color: 'blue'}}>{dress_code}</a> : dress_code
    }))

    return (
        <div className="timeline-container">
            <h1 className={cinzel.className}>Venues</h1>
            <StepperTimeline data={info} horizontal={horizontal} />
        </div>
    )
}

export default Venue