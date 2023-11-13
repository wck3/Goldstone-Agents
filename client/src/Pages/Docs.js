import React from "react";
import "./Docs.css"
import { useState } from "react";


export default function Docs(){
    const [url, setURL] = useState('/forms/business_card_form.pdf');
    const [name, setName] = useState('BUSINESS CARDS');

    const handlePDF = (e) => {
        e.preventDefault();
        setURL(e.target.href);
        setName(e.target.innerText);
    }

  

    return(
        <div className="Docs">
            <h1 className="pg-title">GOLDSTONE DOCUMENTS</h1>
            <div className="pdf-view">
                <div className="pdf-links">
                    <ul>
                        <li><a href='/forms/business_card_form.pdf' value="BUSINESS CARDS" onClick={handlePDF}>BUSINESS CARDS</a></li>
                        <li><a href='/forms/sign_order_form.pdf' value="SIGNS" onClick={handlePDF}>SIGNS</a></li>
                        <li><a href='/forms/mls_application.pdf' value="MLS APPLICATION" onClick={handlePDF}>MLS APPLICATION</a></li>
                    </ul>
                </div>
                <div className="pdf-render">
                    <object id="pdf-object" type="application/pdf" data={url}>
                        <h2>PDF PREVIEWS NOT SUPPORTED ON MOBILE DEVICES</h2>
                        <br/>
                        <a href={url}>VIEW {name} HERE</a>
                    </object>
                </div>
            </div>
            {/*
            
            const [address, setAddress] = useState(''); 
            const [percentage, setPercentage] = useState('');
            const [fee, setFee] = useState('');
            const [price, setPrice] = useState('');
            const [license, setLicense] = useState('');
            const [etc, setEtc] = useState('');
            <div className="commission">
                <h1 className="pg-title">MONEY MATTERS</h1>
                <p>Fill out the form below to request your commission statement from our Execute Manager, Erin. 
                    The button will send a request to Erin, and she will send your commission statement back via email as soon as possible.
                </p>
                <form onSubmit={handleSubmit}>
                        
                        <input 
                            type="text"
                            id="address" 
                            autoComplete="off" 
                            onChange={(e) => setAddress(e.target.value)} 
                            value={address}
                            placeholder="ADDRESS"
                            required
                        />
                        <input 
                            type="number" 
                            id="percentage"
                            min="0"
                            max="100"
                            autoComplete="off"   
                            onChange={(e) => setPercentage(e.target.value)} 
                            value={percentage}
                            placeholder={"PERCENTAGE %"}
                            required
                        /> 
                        <input 
                            type="number" 
                            id="fee"
                            min="0"
                            max="100"
                            autoComplete="off"   
                            onChange={(e) => setFee(e.target.value)} 
                            value={fee}
                            placeholder={"FEE $"}
                            required
                        />
                        <input 
                            type="number" 
                            id="price"
                            min="0"
                            autoComplete="off"   
                            onChange={(e) => setPrice(e.target.value)} 
                            value={price}
                            placeholder={"SALE PRICE $"}
                            required
                        />
                         <input 
                            type="number" 
                            id="price"
                            min="0"
                            autoComplete="off"   
                            onChange={(e) => setLicense(e.target.value)} 
                            value={license}
                            placeholder={"LICENSE NUMBER"}
                            required
                        />

                        <textarea
                            type="textarea" 
                            id="price"
                            min="0"
                            autoComplete="off"   
                            onChange={(e) => setEtc(e.target.value)} 
                            value={etc}
                            placeholder={"REIMBURSMENT FOR CO / OTHER INFO"}
                            required
                        />

 


                        <button>REQUEST STATEMENT</button>
                    </form>
               
        </div>*/}
        </div>
    )  
}