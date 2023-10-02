import React from "react";
import './Home.css';
import Get_Events from '../API/get_events';

import { useState, useEffect } from 'react';

export default function Home(){
    const[Events, setEvents] = useState();
    
    useEffect(() => {
        async function fetchEventsAndSetState() {
            try {
                // fetch all tools to display
                const result = await Get_Events();
                setEvents(result);
            } catch (error) {
              console.error('Error fetching data:', error);
            }
        }
        fetchEventsAndSetState();

        
      }, []);

      //console.log(Events)
    return(
        
        <div className="Home">
            <h1 className="pg-title">WEEK AT A GLANCE</h1>

            {Events?.map( (eBlock, index) => (
                <div key={eBlock.block_id} className={`event-block ${index % 2 === 0 ? 'even' : 'odd'}`}>
                    <div className="block-img">
                        <img src={eBlock.img_path}></img>
                    </div>
                    <div className="block-content">
                        <h1>{eBlock.headline}</h1>
                        <ul>
                            <li><h2>{eBlock.day} {eBlock.time}</h2></li>
                            <li><p>{eBlock.description}</p></li>
                        </ul>
                    </div>
                    

                </div>

            ))}

            {}
        </div>
        
    );
};