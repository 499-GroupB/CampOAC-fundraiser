import { useState, useEffect } from 'react';
import axios from "axios";

// About page

function modd(srcc, altt) {
  document.getElementById("myModal").style.display = "block";
  document.getElementById("img01").src = srcc;
  document.getElementById("caption").innerHTML = altt;
}

function close() {
  document.getElementById("myModal").style.display = "none";
}

const About = () => {

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
              <p>{location.name} | Phone: {location.contact}</p>
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
      <div class="row">
        <div class="column imgSma">
          <img id="img1" src="firewoodPics/IMG_8859.jpeg" width="100%" alt="It takes a team."
            onClick={() => modd(document.getElementById("img1").src, document.getElementById("img1").alt)} />
        </div>
        <div class="column imgSma">
          <img id="img2" src="firewoodPics/IMG_9118.jpeg" width="100%" alt="Proud of our firewood."
            onClick={() => modd(document.getElementById("img2").src, document.getElementById("img2").alt)} />
        </div>
        <div class="column imgMed">
          <img id="img3" src="firewoodPics/Firewood_pic_2_-_small.jpg" width="100%" alt="Heavy machinery moving wood."
            onClick={() => modd(document.getElementById("img3").src, document.getElementById("img3").alt)} />
        </div>
        <div class="column imgMed">
          <img id="img4" src="firewoodPics/Firewood_Team.jpg" width="100%" alt="The team with the wood splitter."
            onClick={() => modd(document.getElementById("img4").src, document.getElementById("img4").alt)} />
        </div>
        <div class="column imgLar">
          <img id="img5" src="firewoodPics/FirewoodBags.jpg" width="100%" alt="Some bags of firewood we sold in a previous fundraiser."
            onClick={() => modd(document.getElementById("img5").src, document.getElementById("img5").alt)} />
        </div>
        <div class="column imgSma">
          <img id="img6" src="firewoodPics/IMG_8688_2.jpeg" width="100%" alt="Cutting the firewood."
            onClick={() => modd(document.getElementById("img6").src, document.getElementById("img6").alt)} />
        </div>
        <div class="column imgSma">
          <img id="img7" src="firewoodPics/IMG_8690.jpeg" width="100%" alt="Moving some wood."
            onClick={() => modd(document.getElementById("img7").src, document.getElementById("img7").alt)} />
        </div>
      </div>
      <div id="myModal" class="modal">
        <span class="close" onClick={() => close()}>&times;</span>
        <img class="modal-content" id="img01" />
        <div id="caption"></div>
      </div>
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