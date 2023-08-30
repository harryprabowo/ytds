'use client';

import { Timeline } from 'flowbite-react';
import { TbMapPinSearch, TbBrandWaze } from "react-icons/tb";
import { Badge, Button, ButtonGroup, Col, Row } from "react-bootstrap"
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
                data.map(({ id, label, name, desc, location, time, timezone: timeZone, dress_code }) => (
                    <Timeline.Item key={id}>
                        <Timeline.Point />
                        <Timeline.Content>
                            <Timeline.Time style={{color: '#333'}}>
                                <table style={{verticalAlign: 'middle'}}>
                                    <td>
                                        <h1>{time.getDate()}</h1>
                                    </td>
                                    <td style={{ padding: '0 3pt' }}>
                                        <b>{time.toLocaleDateString('default', { month: 'short' })}</b>
                                        <br/>
                                        <b>{time.toLocaleDateString('zh-CN', { month: 'short' })}</b>
                                        <br />
                                        {time.toLocaleDateString('default', { year: 'numeric' })}
                                    </td>
                                    <td style={{ padding: '0 10pt' }}>
                                        <strong style={{ fontSize: '16pt' }}>{time.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', timeZone })}</strong>&nbsp;
                                        <strong className="ch" >({time.toLocaleTimeString('zh-CN', { hour12: true, hourCycle: 'h12', timeZone }).substring(0,2)})</strong>
                                        <br />
                                        <small>local time/waktu setempat/当地时间</small>
                                    </td>
                                </table>
                            </Timeline.Time>
                            <br/>
                            <Timeline.Title>
                                <h1 style={{color: 'goldenrod', }}>{label}</h1>@{name}
                            </Timeline.Title>
                            <Timeline.Body>
                                <ButtonGroup className="map-buttons">
                                    <Button variant="outline-primary" size="sm" href={location.gmaps.link} target="_blank" rel="noopener noreferrer" style={{display: 'inline-flex'}}>
                                        <TbMapPinSearch style={{height: '14pt',width: '2em'}} /> Google Maps
                                    </Button>
                                    <Button variant="outline-primary" size="sm" href={location.waze.link} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex' }}>
                                        <TbBrandWaze style={{ height: '14pt', width: '2em' }} /> Waze
                                    </Button>
                                </ButtonGroup>
                                {desc}
                                <br />
                                <code>Dress code /<span className="ch">着装要求</span>: {id === 3 ? <a style={{color: 'blue', textDecoration: 'underline'}}  href="https://www.infogrades.com/arts-infographics/great-gatsby-dress-code/">Gatsby theme</a> : 'Smart casual'}</code>

                                
                            </Timeline.Body>
                            
                        </Timeline.Content>
                    </Timeline.Item>
                ))
            }
        </Timeline>
    )
}