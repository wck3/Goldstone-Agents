import React from "react";
import './edit_events.css';
import get_from from '../API/get_from';

import { useState, useEffect } from 'react';

export default function Edit_Events(){
    const[Events, setEvents] = useState();
    const api_url = process.env.REACT_APP_API_URL;
    useEffect(() => {
        async function fetchEventsAndSetState() {
            try {
                // fetch all tools to display
                const result = await get_from(api_url + "events/get-events");
                setEvents(result);
            } catch (error) {
              console.error('Error fetching data:', error);
            }
        }
        fetchEventsAndSetState();

        
      }, []);

      //console.log(Events)
    return(
        
        <div className="Events">
            <h1 className="pg-title">EDIT EVENTS</h1>

            {Events?.map( (eBlock, index) => (
                <div key={eBlock.block_id} className={`event-block ${index % 2 === 0 ? 'even' : 'odd'}`}>
                    <form>
                         <div className="block-img">
                            <img loading="lazy" src={eBlock.img_path} ></img>
                        </div>
                        <div className="block-content">
                            <h1>{eBlock.headline}</h1>
                            <ul>
                                <li><h2>{eBlock.day} {eBlock.time},{eBlock.location}</h2></li>
                                <li><p>{eBlock.description}</p></li>
                            </ul>
                        </div>
                    </form>
                   
                </div>

            ))}

            {}
        </div>
        
    );
};