import React from "react";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import './loading.css';

export default function Loading(){
    return( 
        <div className="Loading">
            <FontAwesomeIcon icon={faSpinner} spinPulse/>
        </div>
    );
};