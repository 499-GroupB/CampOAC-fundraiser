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
            <p>Rotary Club of Kelowna Ogopogo
                <br/>We accomplish service projects in the local community and internationally through the fellowship and efforts of our club members.  More information is available here.
                <br/><br/>Camp OAC
                <br/>Camp OAC is a children's summer camp located just north of Kelowna on Okanagan lake.  More information is available here.</p>
            <br/>
            <Link to="/order"><button>Place Order</button></Link>

            </>


          
    );
  };
  
  export default Home;