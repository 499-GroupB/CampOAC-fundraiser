import { useState, useEffect } from 'react';
import axios from "axios";
import Images from '../components/Images';

// Contact page

const Contact = () => {

  const locationsApi = `${process.env.REACT_APP_BACKEND_URL}/location/list`;

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
              <p><b>{location.name}</b> | {location.address} | Contact: {location.admin.firstName} {location.admin.lastName} | Phone: {location.contact}</p>
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

return (
  <>
    <Images/>
    <br />
    <h2 class="bearhug">contact us</h2>
    <p>Please contact us about any concerns you may have or if you need to cancel an order.
      <br /><br />
      <a class="bodylink" href="tel:5558675309">Phone:  555-867-5309</a>
      <br />
      <a class="bodylink" href="mailto: firewood@example.com">Email:  firewood@example.com</a>
    </p>
    <h2 class="bearhug">location specific contact information: </h2>
    <p>Contact specific locations if you have concerns about your order</p>
    {displayLocations(locations)}
    <br></br>
  </>
);
};

export default Contact;