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
                const session = await get_from("http://localhost:4000/users/login");
                setRole(session.user.role);
            } catch (error) {
              console.error('Error fetching data:', error);
            }
        }
        fetchSession();
    }, []);

    if(window.location.pathname !== "/Login"){
        return(
            <div className="nav">
                <Link to="/" className="nav-link">
                    <img  className="nav-logo" src={logo} alt="Goldstone Hub"/>
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
                            <Link id="dropdown-title" to='/#'>ADMIN <FontAwesomeIcon icon={faCaretDown}/></Link>
                            <div class="dropdown-content">
                                <Link to="/Admin/Edit-Events" onClick={hideNav}>EDIT EVENTS</Link>
                                <Link to="Admin/Edit-Tools"  onClick={hideNav}>EDIT TOOLS</Link>
                                <Link to="Admin/Edit-Docs" onClick={hideNav}>EDIT DOCS</Link>
                                <Link to="Admin/Edit-Contacts" onClick={hideNav}>EDIT CONTACTS</Link>
                                <Link to="Admin/View-Users" onClick={hideNav}>VIEW USERS</Link>
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


