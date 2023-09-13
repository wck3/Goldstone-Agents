import React from "react";
import {Link} from 'react-router-dom';
import logo from '../Media/Gold_Nav.png'
import { useRef } from 'react';
import './nav.css';
import {FaBars, FaTimes} from "react-icons/fa"

export default function Navbar(){

    const navRef = useRef();

    const showNav = () => {
        navRef.current.classList.toggle("show_nav");

    }

    const hideNav = () => {
        navRef.current.classList.remove("show_nav");

    }
        
    return(
        <div className="nav">
            <Link to="/" className="nav-link">
                <img  className="nav-logo" src={logo} alt="Goldstone Hub"/>
            </Link>
            <nav className="nav-content">
                <Link to="/">HOME</Link>
                <Link to="/Tools">TOOLS</Link>
                <Link to="/Documents">DOCS</Link>
                <Link to="/Contacts">CONTACTS</Link>
                <Link to="/Account">ACCOUNT</Link>
                <Link to="/Logout">LOGOUT</Link>
            </nav> 
            <button className="nav-btn nav-bars" onClick={showNav}>
            <FaBars size={50}/>
            </button> 
            <nav className="nav-content-mobile" ref={navRef}>
                <button className="nav-btn nav-close-btn" onClick={hideNav}>
                    <FaTimes size={30}/>
                </button>
                <Link to="/" onClick={hideNav}>HOME</Link>
                <Link to="/Tools" onClick={hideNav}>TOOLS</Link>
                <Link to="/Documents" onClick={hideNav}>DOCS</Link>
                <Link to="/Contacts" onClick={hideNav}>CONTACTS</Link>
                <Link to="/Account" onClick={hideNav}>ACCOUNT</Link>
                <Link to="/Logout" onClick={hideNav}>LOGOUT</Link>
            </nav> 
            <div className="nav-wave wave-2 ">
                <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="30 0 1200 120" preserveAspectRatio="none">
                    <path d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z" class="shape-fill-2"></path>
                </svg>   
            </div>
            <div className="nav-wave wave-1" >
                <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="30 0 1200 120" preserveAspectRatio="none">
                    <path d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z" class="shape-fill"></path>
                </svg>   
            </div>
        </div>
    );



};


