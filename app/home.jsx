'use client'

import ReactFullpage from "@fullpage/react-fullpage"
import { Landing, Message, Venue, RSVP, Footer } from "components"
// NOTE: if using fullpage extensions/plugins put them here and pass it as props.
const pluginWrapper = () => {
    /*
    * require('../static/fullpage.scrollHorizontally.min.js'); // Optional. Required when using the "scrollHorizontally" extension.
    */
}

export default function HomePage({ venues, images }) {
    const ele = [
        Landing,
        Venue,
        RSVP
    ]

    return (
        <div>
            <ReactFullpage
                navigation
                pluginWrapper={pluginWrapper}
                render={comp =>
                    console.log("render prop change") || (
                        <ReactFullpage.Wrapper>
                            <div key="1" id="Landing" className="section">
                                <Landing images={images} />
                            </div>
                            <div key="2" id="Message" className="section">
                                <Message venues={venues} />
                            </div>
                            <div key="3" id="RSVP" className="section">
                                <RSVP />
                            </div>
                            <div key="4" id="Footer" className="section">
                                <Footer />
                            </div>
                        </ReactFullpage.Wrapper>
                    )
                }
            />
        </div>
    )
}