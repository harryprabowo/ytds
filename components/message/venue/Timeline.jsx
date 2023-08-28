'use client';

import { Timeline } from 'flowbite-react';
import { TbMapPinSearch, TbBrandWaze } from "react-icons/tb";
import { Button, ButtonGroup } from "react-bootstrap"
import { useWindowDimensions } from 'utils/window';
import {useState, useEffect} from 'react'
import "styles/timeline.scss"


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
                            <Timeline.Title>
                                {label} | <strong>{name}</strong>
                                <ButtonGroup className="map-buttons">
                                    <Button variant="outline-primary" size="sm" href={location.gmaps.link} target="_blank" rel="noopener noreferrer">
                                        <TbMapPinSearch />
                                    </Button>
                                    <Button variant="outline-primary" size="sm" href={location.waze.link} target="_blank" rel="noopener noreferrer">
                                        <TbBrandWaze />
                                    </Button>
                                </ButtonGroup>
                            </Timeline.Title>
                            <Timeline.Time>
                                <strong style={{ color: 'black', fontWeight: '1000' }}>{time}</strong>
                            </Timeline.Time>
                            <Timeline.Body>
                                {desc}
                                <br />
                                <code>Dress code: {dress_code}</code>
                            </Timeline.Body>
                        </Timeline.Content>
                    </Timeline.Item>
                ))
            }
        </Timeline>
    )
}