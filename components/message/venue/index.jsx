import { Cinzel_Decorative } from 'next/font/google'
import Map from "./Map"
import StepperTimeline from "./Timeline"

const cinzel = Cinzel_Decorative({ subsets: ['latin'], weight: ['700'] })
const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

const Venue = ({ venues, horizontal }) => {
    const info = venues.map(({ location, time, timezone,...rest }) => ({
        ...rest,
        time: new Date(time).toLocaleString(undefined, {timeZone: timezone, ...options}) + ' (' + timezone +')',
        location: JSON.parse(JSON.stringify(location))
    }))

    return (
        <div className="timeline-container">
            <h1 className={cinzel.className}>Venues</h1>
            <StepperTimeline data={info} horizontal={horizontal} />
        </div>
    )
}

export default Venue