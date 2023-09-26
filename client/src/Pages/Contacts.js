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
                 {currentContacts?.map( (contact) => (
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
            <div className="pagination">
                <Pagination_Pages
                    postsPerPage={contactsPerPage}
                    totalPosts={contacts?.length}
                    paginate={paginate}
                />
            </div>

        </div>

    );

}