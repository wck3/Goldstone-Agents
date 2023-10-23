import React from "react";
import "./footer.css";
import {Link} from 'react-router-dom';
import { faInstagram, faFacebookF,faLinkedin, faTiktok, faYoutube } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


export default function Footer(){
    return(
        <div className="Footer">
            <ul className="foot-content">

                <li className="foot-contact">
                    <h3>CONTACTS</h3>
                    <ul>
                        <li>
                            <p>101 CRAWFORDS CORNER RD</p>
                            <p>HOLMDEL, NJ 07733</p>
                        
                        </li>
                        <li>
                            <p>2446 CHURCH RD</p>
                            <p>TOMS RIVER, NJ 08753</p>
                        
                        </li>
                        <li>
                            <p>732-898-3400</p>
                        </li>
                    </ul>
                </li>
                
                <li className="foot-goto">
                    <h3>GO TO</h3>
                    <Link to="/" >EVENTS</Link>
                    <Link to="/Tools">TOOLS</Link>
                    <Link to="/Documents" >GOLDSTONE DOCS</Link>
                    <Link to="/Contacts" >CONTACTS</Link>
                    <Link to="/Account" >ACCOUNT</Link>
                </li>

                <li className="foot-socials">
                    <h3>SOCIALS</h3>
                    <ul>
                        <li>
                            <a href="https://www.instagram.com/goldstonerealestate/">
                                <FontAwesomeIcon icon={faInstagram}/> 
                            </a>
                        </li>
                        <li>
                            <a href="https://www.facebook.com/GoldstoneNewJersey">
                                <FontAwesomeIcon icon={faFacebookF}/> 
                            </a>
                        </li>
                        <li>
                            <a href="https://www.linkedin.com/company/goldstone-real-estate-co/">
                                <FontAwesomeIcon icon={faLinkedin}/> 
                            </a>
                        </li>
                        <li>
                            <a href="https://www.tiktok.com/@goldstonerealtynj">  
                                <FontAwesomeIcon icon={faTiktok}/> 
                            </a>
                        </li>
                        <li>
                            <a href="https://www.youtube.com/@goldstonerealtynj"> 
                                <FontAwesomeIcon icon={faYoutube}/> 
                            </a>
                        </li>
                    </ul>
                </li>

                <li className="foot-other">
                    <h3>OTHER</h3>
                    <a>FEEDBACK</a>
                    <a>GOLDSTONE LOGOS</a>
                </li>
            
            </ul>
         
        </div>
    );
}