import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons'
import "../css/Style.css";

const Footer = () => {
    return (
        <footer className="footer-class">
            <div class="bottomlogos">
                <a href="https://www.campoac.com/"><img class="logo" src="Camp-OAC-Logo-Primary.png"></img></a>
            </div>
            <div>
                <a class="footericons" href="https://www.facebook.com/campoac/"><FontAwesomeIcon icon={faFacebook}></FontAwesomeIcon></a>
                &nbsp;&nbsp;
                <a class="footericons" href="https://www.instagram.com/camp_oac/"><FontAwesomeIcon icon={faInstagram}></FontAwesomeIcon></a>
                <p id="footerText">Made by Camp OAC Group-B</p>
                <p id="footerText">All rights reserved CampOAC x Rotary Club of Kelowna</p>
            </div>
            <div class="bottomlogos">
                <a href="https://portal.clubrunner.ca/824"><img class="logo" src="officialclublogo_rotary.png"></img></a>
            </div>


        </footer>
    );
}

export default Footer;