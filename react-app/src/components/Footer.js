import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons'
import "../css/Style.css";

const Footer = () => {
    return (
        <footer className="footer-class">
            <FontAwesomeIcon icon={faFacebook} size="lg"></FontAwesomeIcon>
            <FontAwesomeIcon icon={faTwitter} size="lg"></FontAwesomeIcon>
            <FontAwesomeIcon icon={faInstagram} size="lg"></FontAwesomeIcon>
            <p id="footerText">Made by CampOAC group b</p>
            <p id="footerText">All rights reserved CampOAC x Rotary Club of Kelowna</p>
        </footer>
    );
} 

export default Footer;