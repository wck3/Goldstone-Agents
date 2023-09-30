import React from "react";
import './Contacts.css';
import get_contacts from '../API/get_contacts';
import { faPhone, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Pagination_Pages from "../Components/pagination_pgs";

import { useState, useEffect } from 'react';

export default function Contacts(){
    const [contacts, setContacts] = useState();
    const [contactsPerPage] = useState(4);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        async function fetchContactsAndSetState() {
            try {
                // fetch all contacts to display
                const result = await get_contacts();
                setContacts(result);
            } catch (error) {
              console.error('Error fetching data:', error);
            }
        }
        fetchContactsAndSetState();
    }, []);

    // Get current posts
    const indexOfLastPost = currentPage * contactsPerPage;
    const indexOfFirstPost = indexOfLastPost - contactsPerPage;
    
    // Change page
    const paginate = (pageNumber) => { setCurrentPage(pageNumber) };
    const currentContacts = contacts?.slice(indexOfFirstPost, indexOfLastPost);
  
    return(
        <div className="Contacts">
            <h1 className="pg-title">CONTACTS</h1>
            <div className="contact-info">
                 {contacts?.map( (contact) => (
                    <div className="contact">
                        <ul>
                            <li> <img src={contact.contact_img}></img></li>
                            <li className="contact-name">{contact.name}</li>
                            <li className="contact-title"><b>{contact.title}</b></li>
                            <li>
                                <FontAwesomeIcon icon={faPhone} className="icon"/>
                                <a href={'tel: ' + contact.phone}>{contact.phone}</a>
                            </li>
                            <li>
                                <FontAwesomeIcon icon={faEnvelope} className="icon"/>
                                <a href={'mailto: ' + contact.email}>{contact.email}</a>
                            </li>
                        </ul>
                    </div>
                ))}
            </div>
           
            {/*<div className="meeting"> 
                <h1 className="pg-title">SCHEDULE A MEETING</h1>
                <div className="card-container">
                    
                    <div className="card card-1">
                        <h1 className="card-title">MEET WITH CARRIE</h1>
                    </div>
                    
                    <div className="card card-2">
                        <h1 className="card-title">MEET WITH ERIN</h1>

                    </div>
                    
                    <div className="card card-3">
                        <h1 className="card-title">MEET WITH JENNIFER</h1>

                    </div>
                
                </div>
                 </div>*/}

            <div className="socials">
                <h1 className="pg-title">SOCIALS</h1>
                <ul>
                    <li>
                        <a href="https://www.instagram.com/goldstonerealestate/">
                            <img src="/images/socials/instagram.png"></img> 
                            @goldstonerealestate
                        </a>
                    </li>

                    <li>
                        <a href="https://www.facebook.com/GoldstoneNewJersey">
                           <img src="/images/socials/facebook.png"></img>
                            @GoldstoneNewJersey
                        </a>
                    </li>
                    <li>
                        <a href="https://www.linkedin.com/company/goldstone-real-estate-co/">
                            <img src="/images/socials/LinkedIn.png"></img>
                            @goldstone-real-estate
                        </a>
                    </li>
                    <li>
                        <a href="https://www.tiktok.com/@goldstonerealtynj">  
                            <img src="/images/socials/tikTok.png"></img>
                            @goldstonerealtynj
                        </a>
                    </li>
                    <li>
                        <a href="https://www.youtube.com/@goldstonerealtynj"> 
                            <img src="/images/socials/youTube.png"></img>
                            @goldstonerealtynj
                        </a>
                    </li>
                </ul>
            </div>
    
        </div>

    );

}