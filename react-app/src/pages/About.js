import { useState, useEffect } from 'react';
import axios from "axios";
import Images from '../components/Images';

// About page

const About = () => {

return (
  <>
    <Images/>
    <br />
    <h2 class="bearhug">rotary club of kelowna ogopogo</h2>
    <p>We accomplish service projects in the local community and internationally through the fellowship and efforts of our club members. <a class="bodylink" href="https://my.rotary.org/en/">More information is available here.</a></p>
    <br />
    <h2 class="bearhug">camp oac</h2>
    <p>Camp OAC is a children's summer camp located just north of Kelowna on Okanagan lake. <a class="bodylink" href="https://www.campoac.com/">More information is available here.</a></p>
    <br />
  </>
);
};

export default About;