import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons'
import "../css/Style.css";

const Footer = () => {
    return (
        <footer className="footer-class">
      <div class="logo2">
    <img src="https://media.discordapp.net/attachments/931270620547784754/1045467416894902332/Camp-OAC-Logo-Primary.png" width="120px" height="120px" ></img>
    </div>
            <div class = "text">
            <a href="https://www.facebook.com/campoac/"><FontAwesomeIcon icon={faFacebook} size="lg"></FontAwesomeIcon></a>
            &nbsp;&nbsp;
            <a href = "https://www.instagram.com/camp_oac/"><FontAwesomeIcon icon={faInstagram} size="lg"></FontAwesomeIcon></a>
            <p id="footerText">Made by Camp OAC Group-B</p>
            <p id="footerText">All rights reserved CampOAC x Rotary Club of Kelowna</p>
       </div>
    <div class="logo">
       
        <img src="https://media.discordapp.net/attachments/931270620547784754/1045468871781523456/officialclublogo_rotary.png" width="150px" height="120px" ></img>
         </div>

            
        </footer>
    );
} 

export default Footer;