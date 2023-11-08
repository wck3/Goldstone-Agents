import React from "react";
import './Events.css';
import get_from from '../API/get_from.js';

import { useState, useEffect } from 'react';

export default function Events(){
    const[Events, setEvents] = useState();
    
    // fetch events from basck end
    useEffect(() => {
        async function fetchEventsAndSetState() {
            try {
                // fetch all tools to display
                const result = await get_from("http://localhost:4000/events/get-events");
                setEvents(result);
            } catch (error) {
              console.error('Error fetching data:', error);
            }
        }
        fetchEventsAndSetState();
    }, []);

    return(
        
        <div className="Events">
            <h1 className="pg-title">OUR UPCOMING EVENTS</h1>
            {Events?.map( (eBlock, index) => (
                <div key={eBlock.block_id} className={`event-block ${index % 2 === 0 ? 'even' : 'odd'}`}>
                    <div className="block-img">
                        <img src={eBlock.img_path}></img>
                    </div>
                    <div className="block-content">
                        <h1>{eBlock.headline}</h1>
                        <ul>
                            <li><h2>{eBlock.day} {eBlock.time}, {eBlock.location}</h2></li>
                            <li><p>{eBlock.description}</p></li>
                        </ul>
                    </div>
                </div>
            ))}
            <h1 className="pg-title"><a href="/#">CLICK HERE TO VIEW THE MONTHLY CALENDAR</a></h1>

            {}
        </div>
        
    );
};