'use client'
import { ErrorBoundary } from 'react-error-boundary'

import ReactFullpage from "@fullpage/react-fullpage"
import { Landing, Message, RSVP, Footer, Venue } from "components"

// NOTE: if using fullpage extensions/plugins put them here and pass it as props.
const pluginWrapper = () => {
    /*
    * require('../static/fullpage.scrollHorizontally.min.js'); // Optional. Required when using the "scrollHorizontally" extension.
    */
}


const HomePage = ({ venues, images, diets, submitRSVP }) => {

    return (
        <>
            <ReactFullpage
                navigation
                pluginWrapper={pluginWrapper}
                render={comp => (
                        <ReactFullpage.Wrapper>
                            <div key="1" id="Landing" className="section">
                                <Landing images={images} />
                            </div>
                            <div key="2" id="Message" className="section">
                                <Message venues={venues} />
                            </div>
                            <div key="3" id="Venue" className="section">
                                <Venue venues={venues} />
                            </div>
                            <div key="4" id="RSVP" className="section dark-section">
                                <RSVP venues={venues} diets={diets} submitRSVP={submitRSVP}  />
                            </div>
                            <div key="5" id="Footer" className="section" style={{height: '30vh'}}>
                                <Footer />
                            </div>
                        </ReactFullpage.Wrapper>
                    )
                }
            />
            
        </>
    )
}

export default HomePage