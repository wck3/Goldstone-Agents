import React from "react";
import {Link} from 'react-router-dom';
import logo from '../Media/Gold_Nav.png'
import './nav.css';

export default function Navbar(){

    return(
        <div className="nav">
            <div className="main-logo">
                <Link to="/">
                    <img  className="nav-logo" src={logo} alt="fireSpot"/>
                </Link>
            </div>
          
            <div className="nav-content">
                
                <div className="nav-link">
                    <Link to="/">HOME</Link>
                </div>
                <div className="nav-link">
                    <Link to="/Tools">TOOLS</Link>
                </div>
                <div className="nav-link">
                    <Link to="/Documents">DOCS</Link>
                </div>
                <div className="nav-link">
                    <Link to="/Contacts">CONTACTS</Link>
                </div>
                <div className="nav-link">
                    <Link to="/Account">ACCOUNT</Link>
                </div>
                <div className="nav-link">
                    <Link to="/Logout">LOGOUT</Link>
                </div> 
            </div> 
            
            <div className="nav-wave wave-2">
                <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="30 0 1200 120" preserveAspectRatio="none">
                    <path d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z" class="shape-fill-2"></path>
                </svg>   
            </div>
            <div className="nav-wave">
                <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="30 0 1200 120" preserveAspectRatio="none">
                    <path d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z" class="shape-fill"></path>
                </svg>   
            </div>
        </div>
    );



};


