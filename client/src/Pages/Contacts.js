import React from "react";
import './Contacts.css';
import get_from from "../API/get_from";
import { faPhone, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState, useEffect } from 'react';
import Loading from "../Components/loading";

export default function Contacts(){
    const [contacts, setContacts] = useState();
    const api_url = process.env.REACT_APP_API_URL;
    // retrieve contact information from the back end
    useEffect(() => {
        async function fetchContactsAndSetState() {
            try {
                // fetch all contacts to display
                const result = await get_from(api_url + "contacts/get-contacts");
                setContacts(result);
            } catch (error) {
              console.error('Error fetching data:', error);
            }
        }
        fetchContactsAndSetState();
    // eslint-disable-next-line
    }, []);

    // send user to link when button is clicked
    const goToLink = async (e) => {
        e.preventDefault();
        window.location.href = e.target.value;
    };

    return(
        <div className="Contacts">
            <h1 className="pg-title">CONTACTS</h1>
            { contacts !== undefined ? (
            <>
            <div className="contact-info">
                 {contacts?.map( (contact) => (
                    <div className="contact" key={contact.c_id}>
                        <ul>
                            <li> <img loading="lazy" src={contact.contact_img} alt={"headshot"}></img></li>
                            <li className="contact-name">{contact.name}</li>
                            <li className="contact-title"><b>{contact.title}</b></li>
                            <li>
                                <a href={'tel: ' + contact.phone}>
                                    <FontAwesomeIcon icon={faPhone} className="icon"/>{contact.phone}
                                </a>
                            </li>
                            <li>
                                <a href={'mailto: ' + contact.email}> 
                                    <FontAwesomeIcon icon={faEnvelope} className="icon"/>{contact.email}
                                </a>
                            </li>
                        </ul>
                    </div>
                ))}
            </div>
           
            <div className="meeting"> 
                <h1 className="pg-title">SCHEDULE A MEETING</h1>
                <div className="card-container">
                    <div className="card card-1">
                        <h1 className="card-title">MEET WITH CARRIE</h1>
                        <img loading="lazy" src="/images/meeting/carrie.png" alt={"carrie meeting"}></img>
                        <div className="card-body">
                            <ul className="card-text">
                                <li>Comprehensive training classes</li>
                                <li>New Agent Onboarding</li>
                                <li>Business Strategy Sessions</li>
                                <li>Coaching</li>
                            </ul>
                        </div>
                        <div className="card-footer">
                            <a href="https://calendly.com/carriemcnally">
                                <button value="https://calendly.com/carriemcnally" onClick={goToLink}>SCHEDULE NOW</button>
                            </a>
                        </div>
                    </div>

                    <div className="card card-2">
                        <h1 className="card-title">MEET WITH ERIN</h1>
                        <img loading="lazy" src="/images/meeting/erin.png" alt="erin meeting"></img>
                        <div className="card-body">
                            <ul className="card-text">
                                <li>New Agent Orientations</li>
                                <li>G.O.L.D Program</li>
                                <li>1-on-1 meetings</li>
                                <li>Introduction Meetings</li>
                                <li>Onboarding Paperwork</li>
                            </ul>
                        </div>
                        <div className="card-footer">
                            <a href="https://calendly.com/erinkaminski">
                                <button value="https://calendly.com/erinkaminski" onClick={goToLink}>SCHEDULE NOW</button>
                            </a>
                        </div>
                    </div>

                    <div className="card card-3">
                        <h1 className="card-title">MEET WITH JENNIFER</h1>
                        <img loading="lazy" src="/images/meeting/jennifer.png" alt="jennifer meeting"></img>
                        <div className="card-body">
                            <ul className="card-text">
                                <li>Headshots</li>
                                <li>Marketing Strategies</li>
                                <li>Business Card Designs</li>
                                <li>Sign Designs</li>
                            </ul>
                        </div>
                        <div className="card-footer">
                            <a href="https://calendly.com/marketingwithjenn">
                                <button value="https://calendly.com/marketingwithjenn" onClick={goToLink}>SCHEDULE NOW</button>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            </>):
            (
                <Loading/>
            )}

        </div>
    );
}
