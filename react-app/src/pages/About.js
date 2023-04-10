import { useState, useEffect } from 'react';
import axios from "axios";
import Images from '../components/Images';

// About page

const About = () => {

  const locationsApi = `${process.env.REACT_APP_BACKEND_URL}/location/list`;
  const nameApi = `${process.env.REACT_APP_BACKEND_URL}/admin/name`

  const [locations, getLocations] = useState('');

  useEffect(() => {
    getAllLocations();
  }, [])

  const getAllLocations = () => {
    axios.get(locationsApi)
      .then(response => {
        const allLocations = response.data;
        getLocations(allLocations);
      })
      .catch(err => {
        console.log(err);
      })
  }

  const displayLocations = (locations) => {
    if (locations.length > 0) {
      return (
        locations.map((location, index) => {
          return (
            <>
              <p><b>{location.name}</b> | Contact: {location.admin.firstName} {location.admin.lastName} | Phone: {location.contact}</p>
            </>
          )
        })
      )
    } else {
      return (
        <h3>Unable to retrieve location data</h3>
      )
    }
  }

  const getNameFromId = (adminId) => {
    var returned = 'd';
    axios.post(nameApi, { adminId: adminId },
      {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": `${process.env.REACT_APP_BACKEND_URL}`,
          "Access-Control-Allow-Credentials": "true",
        }
      })
      .then(function (response) {
        console.log(response.data);
        returned = response.data;
      })
      // Catching axios error
      // Currently outputs to browser console (not  good)
      .catch(function (error) {
        console.log(error);
      });

      return returned;
  }

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
    <h2 class="bearhug">contact us</h2>
    <p>Please contact us about any concerns you may have or if you need to cancel an order.
      <br /><br />
      <a class="bodylink" href="tel:5558675309">Phone: 555-867-5309</a>
      <br />
      <a class="bodylink" href="mailto: firewood@example.com">Email: firewood@example.com</a>
    </p>
    <h2>Location specific contact information: </h2>
    <p>Contact specific locations if you have concerns about your order</p>
    {displayLocations(locations)}
    <br></br>
  </>
);
};

export default About;