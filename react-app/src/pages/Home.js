// home page
// uses  router to link

import {Link} from 'react-router-dom';
import '../css/Style.css';

function fixSize() { //Add this on load at some point
  document.querySelectorAll('.column').forEach(column => {
    column.style.height = window.innerWidth/7.8+"px";
    column.style.paddingLeft = window.innerWidth/150+"px";
  });
}
window.addEventListener('resize', function(event){fixSize();},true);
const Home = () => {
    return (
        <>


<div class = "row">
  <div class = "column">
    <img src = "firewoodPics/IMG_8859.jpeg" width="100%;" height="100%"/>
  </div>
  <div class = "column">
    <img src = "firewoodPics/IMG_9118.jpeg" width="100%;" height="100%"/>
  </div>
  <div class = "column">
    <img src = "firewoodPics/Firewood pic 2 - small.jpg" width="100%;" height="100%"/>
  </div>
  <div class = "column">
    <img src = "firewoodPics/Firewood Team.jpg" width="100%;" height="100%"/>
  </div>
  <div class = "column">
    <img src = "firewoodPics/FirewoodBags.jpg" width="100%;" height="100%"/>
  </div>
  <div class = "column">
    <img src = "firewoodPics/IMG_8688 2.jpeg" width="100%;" height="100%"/>
  </div>
  <div class = "column">
    <img src = "firewoodPics/IMG_8690.jpeg" width="100%;" height="100%"/>
  </div>
</div>


             
            <h1>welcome to the camp oac firewood fundraiser</h1>
            <br/>
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