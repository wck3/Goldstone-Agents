import React from "react";
import {Link} from 'react-router-dom';
import logo from '../Media/Gold_White.png'
import { useRef, useState, useEffect } from 'react';
import './nav.css';
import {FaBars, FaTimes} from "react-icons/fa"
import Logout from "../API/logout"
import get_from from "../API/get_from";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';

export default function Navbar(){
    const api_url = process.env.REACT_APP_API_URL;
    const [role, setRole] = useState('');
    const navRef = useRef();

    // responsive classes for hamburger button
    const showNav = () => {
        navRef.current.classList.toggle("show_nav");
    }
    const hideNav = () => {
        navRef.current.classList.remove("show_nav");
    }
    
    useEffect(() => {
        async function fetchSession() {
            try {
                // fetch session data to retrieve user role
                const session = await get_from(api_url + "users/login");
                if(session.user){
                    setRole(session.user.role);
                }
                
            } catch (error) {
              console.error('Error fetching data:', error);
            }
        }
        fetchSession();
     // eslint-disable-next-line
    }, []);

    if(window.location.pathname !== "/Login"){
        return(
            <div className="nav">
                <Link to="/" className="nav-link">
                    <img loading="lazy" className="nav-logo" src={logo} alt="Goldstone Hub" />
                </Link> 
                
                <button className="nav-btn nav-bars" onClick={showNav}>
                    <FaBars size={50}/>
                </button>
                <div className="nav-content" ref={navRef}> 
                    <button className="nav-btn nav-close-btn"  onClick={hideNav}>
                            <FaTimes size={30}/>
                    </button>
        
                    <Link to="/" onClick={hideNav}>EVENTS</Link>
                    <Link to="/Tools"onClick={hideNav}>TOOLS</Link>
                    <Link to="/Documents" onClick={hideNav}>GOLDSTONE DOCS</Link>
                    <Link to="/Contacts" onClick={hideNav}>CONTACTS</Link>
                    <Link to="/Account" onClick={hideNav} >ACCOUNT</Link>
                    {role === "Admin" && (
                        <div className="dropdown">
                            <Link id="dropdown-title" to='/#'>EDIT <FontAwesomeIcon icon={faCaretDown}/></Link>
                            <div className="dropdown-content">
                                <Link to="/Admin/EditEvents" onClick={hideNav}>EVENTS</Link>
                                <Link to="/Admin/ViewTools"  onClick={hideNav}>TOOLS</Link>
                                <Link to="/Admin/EditDocs" onClick={hideNav}>DOCS</Link>
                                <Link to="/Admin/EditContacts" onClick={hideNav}>CONTACTS</Link>
                                <Link to="/Admin/ViewUsers" onClick={hideNav}>USERS</Link>
                            </div>
                        </div>
                    )}
                    <Link to="/Login" onClick={Logout}>LOGOUT</Link>
                </div> 
                
                <div className="nav-wave wave-2 ">
                    <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="30 0 1200 120" preserveAspectRatio="none">
                        <path d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z" className="shape-fill-2"></path>
                    </svg>   
                </div>
                <div className="nav-wave wave-1" >
                    <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="30 0 1200 120" preserveAspectRatio="none">
                        <path d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z" className="shape-fill"></path>
                    </svg>   
                </div>
            </div>
        );
    }
};


