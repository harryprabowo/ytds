import Map from "./Map"
import StepperTimeline from "./Timeline"

const Venue = ({ venues, horizontal }) => {
    const info = venues.map(({ location, time, ...rest }) => ({
        ...rest,
        time: new Date(time),
        location: JSON.parse(JSON.stringify(location))
    }))

    return (
        <div>
            <div style={{paddingLeft: '2em'}}>
                <StepperTimeline data={info} horizontal={horizontal} />
            </div>
            {/* <ul>
                {venues.map(({ id, label, name, location }) => (
                    <li key={id}>
                        {label} | {name}
                        <div style={{ width: '100em', height: '30vh' }}>
                            <Map location={JSON.parse(JSON.stringify(location)).gmaps} />
                        </div>
                    </li>
                ))}
            </ul> */}
        </div>
    )
}

export default Venue