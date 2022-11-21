// home page
// uses  router to link

import {Link} from 'react-router-dom';
import '../css/Style.css';

const Home = () => {
    return (
        <>


<div class = "row">
 <div class = "column">
  <img src = "https://media.discordapp.net/attachments/931270620547784754/1044383934399660033/Firewood_pic_2_-_small.jpg" width="100%;" height= "400" >
</img>
 </div>
 <div class = "column">
  <img src = "https://media.discordapp.net/attachments/931270620547784754/1044383862010163302/Firewood_Team.jpg" width="100%;  " height= "400"  >
 </img>
 </div>
 <div class = "column">
  <img src = "https://media.discordapp.net/attachments/931270620547784754/1044383820541083679/Firewood_Bags.jpg" width="100%;" height = "400" >
</img>
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