import React from "react";
import '../Pages/Contacts.css';
import './edit_contact.css';
import get_from from "../API/get_from";
import { faPhone, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState, useEffect } from 'react';
import Loading from "../Components/loading";
import { faExternalLink } from "@fortawesome/free-solid-svg-icons";

export default function ViewContacts(){
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
            <h1 className="pg-title">EDIT CONTACTS</h1>
            { contacts !== undefined ? (
            <>
            <div className="contact-info edit-contacts">
                 {contacts?.map( (contact) => (
                <a className="contact-link" href={`EditContact/${contact.c_id}`}>
                    <h1 className="edit-banner"><FontAwesomeIcon icon={faExternalLink} className="ext"/></h1>
                    <div className="contact contact-edit" key={contact.c_id}>
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
                </a>
                ))}
            </div>
           
            
            </>):
            (
                <Loading/>
            )}

        </div>
    );
}
