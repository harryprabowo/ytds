import Map from "./Map"
import StepperTimeline from "./Timeline"

const Venue = ({ venues, horizontal }) => {
    const info = venues.map(({ location, time, timezone,...rest }) => ({
        ...rest,
        time: new Date(time).toLocaleString('id-ID', {timeZone: timezone}) + ' (' + timezone +')',
        location: JSON.parse(JSON.stringify(location))
    }))

    return (
        <div className="timeline-container">
            <StepperTimeline data={info} horizontal={horizontal} />
        </div>
    )
}

export default Venue