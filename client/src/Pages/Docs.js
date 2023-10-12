import React from "react";
import "./Docs.css"
import { useState } from "react";

export default function Docs(){
    const [url, setURL] = useState('/forms/WK_Resume.pdf');
    const [name, setName] = useState('BUSINESS CARDS');

    const handlePDF = (e) => {
        e.preventDefault();
        setURL(e.target.href);
        setName(e.target.innerText);
    }
    
    return(
        <div className="Docs">
            <h1 className="pg-title">DOCUMENTS</h1>
            <div className="pdf-view">
                <div className="pdf-links">
                    <ul>
                        <li><a href='/forms/WK_Resume.pdf' value="BUSINESS CARDS" onClick={handlePDF}>BUSINESS CARDS</a></li>
                        <li><a href='/forms/sample.pdf' value="SIGNS" onClick={handlePDF}>SIGNS</a></li>
                        <li><a href='/forms/sample.pdf' value="MLS APPLICATION" onClick={handlePDF}>MLS APPLICATION</a></li>
                    </ul>
                </div>
                <div className="pdf-render">
                    <object type="application/pdf" data={url}>
                        <a href={url}>VIEW {name}</a>
                    </object>
                </div>
            </div>
            <div className="commission">
                <h1 className="pg-title">MONEY MATTERS</h1>
                <p>Click the button below to request your commission statement from our Execute Manager, Erin. 
                    The button will send a request to Erin, and she will send your commission statement back via email as soon as possible.
                </p>
                <button>REQUEST STATEMENT</button>
            </div>
        </div>
    )  
}