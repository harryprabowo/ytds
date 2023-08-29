'use client';

import { Timeline } from 'flowbite-react';
import { TbMapPinSearch, TbBrandWaze } from "react-icons/tb";
import { Button, ButtonGroup, Col, Row } from "react-bootstrap"
import { useWindowDimensions } from 'utils/window';
import {useState, useEffect} from 'react'
import "styles/timeline.scss"

const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };

export default function StepperTimeline({ data }) {
    const [isMobile, setIsMobile] = useState(false)

    //choose the screen size 
    const handleResize = () => {
        if (window.innerWidth < 1024) {
            setIsMobile(true)
        } else {
            setIsMobile(false)
        }
    }

    // create an event listener
    useEffect(() => {
        window.addEventListener("resize", handleResize)
    })
        
    return (
        <Timeline horizontal={!isMobile}>
            {
                data.map(({ id, label, name, desc, location, time, dress_code }) => (
                    <Timeline.Item key={id}>
                        <Timeline.Point />
                        <Timeline.Content>
                            <Timeline.Time>
                                <table>
                                    <td>
                                        <h1>{time.getDate()}</h1>
                                    </td>
                                    <td>
                                        {time.toLocaleDateString('default', { month: 'short' })}
                                        <br />
                                        {time.toLocaleDateString('default', { year: 'numeric' })}
                                    </td>
                                    <td>
                                        {time.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric' })}
                                    </td>
                                </table>
                            </Timeline.Time>
                            <Timeline.Title>
                                <span style={{color: 'goldenrod'}}>{label}</span> {name}
                            </Timeline.Title>
                            <Timeline.Body>
                                <ButtonGroup className="map-buttons">
                                    <Button variant="outline-primary" size="sm" href={location.gmaps.link} target="_blank" rel="noopener noreferrer">
                                        <TbMapPinSearch />
                                    </Button>
                                    <Button variant="outline-primary" size="sm" href={location.waze.link} target="_blank" rel="noopener noreferrer">
                                        <TbBrandWaze />
                                    </Button>
                                </ButtonGroup>
                                {desc}
                                <br />
                                <code>Dress code: {id === 3 ? <a style={{color: 'blue'}}  href="https://www.infogrades.com/arts-infographics/great-gatsby-dress-code/">Gatsby theme</a> : 'Smart casual'}</code>

                                
                            </Timeline.Body>
                            
                        </Timeline.Content>
                    </Timeline.Item>
                ))
            }
        </Timeline>
    )
}