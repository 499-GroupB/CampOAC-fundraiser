// home page
// uses  router to link

import {Link} from 'react-router-dom';
import '../css/Style.css';

const styleSma = {
  width: "10.3%"
}
const styleMed = {
  width: "17.55%"
}
const styleLar = {
  width: "22.3%"
}
const Home = () => {
    return (
        <>


<div class = "row">
  <div class = "column" id="image1" style={styleSma}>
    <img src = "firewoodPics/IMG_8859.jpeg" width="100%"/>
  </div>
  <div class = "column" id="image2" style={styleSma}>
    <img src = "firewoodPics/IMG_9118.jpeg" width="100%"/>
  </div>
  <div class = "column" id="image3" style={styleMed}>
    <img src = "firewoodPics/Firewood_pic_2_-_small.jpg" width="100%"/>
  </div>
  <div class = "column" id="image4" style={styleMed}>
    <img src = "firewoodPics/Firewood_Team.jpg" width="100%"/>
  </div>
  <div class = "column" id="image5" style={styleLar}>
    <img src = "firewoodPics/FirewoodBags.jpg" width="100%"/>
  </div>
  <div class = "column" id="image6" style={styleSma}>
    <img src = "firewoodPics/IMG_8688_2.jpeg" width="100%"/>
  </div>
  <div class = "column" id="image7" style={styleSma}>
    <img src = "firewoodPics/IMG_8690.jpeg" width="100%"/>
  </div>
</div>
<h1>welcome to the camp oac firewood fundraiser</h1>
<p>Camp OAC is a childrens summer camp located just north of Kelowna on the beautiful Okanagan lake! Since 1950, Camp OAC has had thousands of campers attend their summer camps. In the offseason, the amazing property is available for rentals to host family reunions, get togethers, weddings and even school group rentals. Camp OAC is a place that everyone can enjoy.
<br/><br/>On this website you can purchase firewood to support Camp OAC!</p>
<Link to="/order"><button>Place Order</button></Link>
        </>


          
    );
  };
  
  export default Home;