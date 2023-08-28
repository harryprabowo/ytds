'use client';

import { Timeline } from 'flowbite-react';
import { TbMapPinSearch, TbBrandWaze } from "react-icons/tb";
import { CustomFlowbiteTheme } from 'flowbite-react';
import {Button, ButtonGroup} from "react-bootstrap"
import "styles/timeline.scss"

export default function StepperTimeline({ data, horizontal = false }) {
    return (
        <Timeline horizontal={horizontal}>
            {
                data.map(({id, label, name, desc, location, time}) => (
                    <Timeline.Item key={id}>
                        <Timeline.Point />
                        <Timeline.Content>
                            <Timeline.Title>
                                {label} | <strong>{name}</strong> 
                            </Timeline.Title>
                            <Timeline.Time>
                                {time.toString()}
                            </Timeline.Time>
                            <Timeline.Body>
                                {desc}
                                <br />
                                <ButtonGroup>
                                    <Button variant="outline-primary" size="sm" href={location.gmaps.link} target="_blank" rel="noopener noreferrer">
                                        <TbMapPinSearch/>
                                    </Button>
                                    <Button variant="outline-primary" size="sm" href={location.waze.link} target="_blank" rel="noopener noreferrer">
                                        <TbBrandWaze />
                                    </Button>
                                </ButtonGroup>
                            </Timeline.Body>
                        </Timeline.Content>
                    </Timeline.Item>
                ))
            }
        </Timeline>
    )
}