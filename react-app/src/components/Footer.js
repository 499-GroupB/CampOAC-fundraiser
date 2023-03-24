import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons'
import "../css/Style.css";

const Footer = () => {
    return (
        <footer className="footer-class">
            <div class="widefoot">
                <div id="campoac1" class="bottomlogos">
                    <a href="https://www.campoac.com/"><img class="logo" src="Camp-OAC-Logo-Primary.png"></img></a>
                </div>
                <div class="bottomlogos">
                    <div class="socials">
                        <span class="footerText">Visit us:&nbsp;</span><a class="footericons" href="https://www.facebook.com/campoac/"><FontAwesomeIcon icon={faFacebook}></FontAwesomeIcon></a>
                        &nbsp;&nbsp;
                        <a class="footericons" href="https://www.instagram.com/camp_oac/"><FontAwesomeIcon icon={faInstagram}></FontAwesomeIcon></a>
                    </div>
                    <div class="socials">
                        <span class="footericons fb-share-button" data-href="http://capstone.bstang.ca:3000/" data-layout="" data-size=""><a target="_blank" href="https://www.facebook.com/sharer/sharer.php?u=http%3A%2F%2Fcapstone.bstang.ca%3A3000%2F&amp;src=sdkpreparse" class="fb-xfbml-parse-ignore"><FontAwesomeIcon icon={faFacebook}></FontAwesomeIcon>&nbsp;Share</a></span>
                    </div>
                    <p id="footerText">Made by Camp OAC Group-B</p>
                    <p id="footerText">All rights reserved CampOAC &times; Rotary Club of Kelowna</p>
                </div>
                <div id="rotary1" class="bottomlogos">
                    <a href="https://portal.clubrunner.ca/824"><img class="logo" src="officialclublogo_rotary.png"></img></a>
                </div>
            </div>
            <div id="lowerlogos" class="widefoot">
                <div class="bottomlogos">
                    <a href="https://www.campoac.com/"><img class="logo2" src="Camp-OAC-Logo-Primary.png"></img></a>
                </div>
                <div class="bottomlogos">
                    <a href="https://portal.clubrunner.ca/824"><img class="logo2" src="officialclublogo_rotary.png"></img></a>
                </div>
            </div>
        </footer>
    );
}

export default Footer;