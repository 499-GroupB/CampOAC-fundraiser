import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons'
import "../css/Style.css";

const Footer = () => {
    return (
        <footer className="footer-class">
            <div class="logo2">
                <a href="https://www.campoac.com/"><img src="Camp-OAC-Logo-Primary.png" width="120px" height="120px" ></img></a>
            </div>
            <div class="text">
                <a href="https://www.facebook.com/campoac/"><FontAwesomeIcon icon={faFacebook} size="lg"></FontAwesomeIcon></a>
                &nbsp;&nbsp;
                <a href="https://www.instagram.com/camp_oac/"><FontAwesomeIcon icon={faInstagram} size="lg"></FontAwesomeIcon></a>
                <p id="footerText">Made by Camp OAC Group-B</p>
                <p id="footerText">All rights reserved CampOAC x Rotary Club of Kelowna</p>
            </div>
            <div class="logo">

                <a href="https://portal.clubrunner.ca/824"><img src="officialclublogo_rotary.png" width="150px" height="120px" ></img></a>
            </div>


        </footer>
    );
}

export default Footer;