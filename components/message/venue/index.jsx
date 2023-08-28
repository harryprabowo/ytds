import Map from "./Map"
import StepperTimeline from "./Timeline"

const Venue = ({ venues, horizontal }) => {
    const info = venues.map(({ location, time, ...rest }) => ({
        ...rest,
        time: new Date(time),
        location: JSON.parse(JSON.stringify(location))
    }))

    return (
        <div className="timeline-container">
            <StepperTimeline data={info} horizontal={horizontal} />
        </div>
    )
}

export default Venue