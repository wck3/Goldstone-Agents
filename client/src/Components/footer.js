import React from "react";
import "./footer.css";
import GoldLogo from '../Media/Gold_Nav.png';
import {Link} from 'react-router-dom';
import { faInstagram, faFacebookF,faLinkedin, faTiktok, faYoutube } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


export default function Footer(){
    return(
        <div className="Footer">
                <div className="foot-1">
                    <div className="foot-socials">
                        <a href='/'><img className="logo" alt="GOLDSTONE REALTY" src={GoldLogo}/></a>
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
                    </div>
                    
                    <div className="foot-goto">
                        <h3>NAVIGATE</h3>
                        <Link to="/" >EVENTS</Link>
                        <Link to="/Tools">TOOLS</Link>
                        <Link to="/Documents" >GOLDSTONE DOCS</Link>
                        <Link to="/Contacts" >CONTACTS</Link>
                        <Link to="/Account" >ACCOUNT</Link>
                    </div>
                
                <div className="foot-contact">
                    <h3>LOCATIONS</h3>
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
                            <p><a href='tel:7328983400'>732-898-3400</a></p>
                        </li>
                    </ul>
                </div>
            </div>

            <div className="foot-2">

                <ul>
                    <li>
                        <a href="https://www.goldstonerealty.com/">PUBLIC SITE</a>
                    </li>
                  
                    <li>
                        <a href="https://forms.gle/WHrMePq4pPsPKfg5A">FEEDBACK</a>
                    </li>
                    <li>
                        <a href="/#">GOLDSTONE LOGOS</a>
                    </li>
                    <li>
                        <a href="/#">TERMS OF SERVICE</a>
                    </li>
                </ul>

                <p>© GOLDSTONE REALTY (2023)</p>
              
               
            </div>
            
         
         
        </div>
    );
}