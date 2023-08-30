import { Cinzel_Decorative } from 'next/font/google'
import Map from "./Map"
import StepperTimeline from "./Timeline"

const cinzel = Cinzel_Decorative({ subsets: ['latin'], weight: ['700'] })

const Venue = ({ venues, horizontal }) => {
    const dataSorted = venues.sort((a, b) => a.id - b.id)

    const info = dataSorted.map(({ location, time, ...rest }) => ({
        ...rest,
        time: new Date(time),
        location: JSON.parse(JSON.stringify(location)),
        // dress_code: rest.id === 3 ? <a href="https://www.pinterest.com/ideas/gatsby-dress-code/946816857572/" target="_blank" style={{color: 'blue'}}>{dress_code}</a> : dress_code
    }))

    return (
        <div className="timeline-container">
            <h1 className={cinzel.className}>Venues<br/><i>Lokasi</i><br/><span className="ch" style={{fontSize: '35pt'}}>场地</span></h1>
            <StepperTimeline data={info} horizontal={horizontal} />
        </div>
    )
}

export default Venue