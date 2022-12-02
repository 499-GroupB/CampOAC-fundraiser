// About page


const styleSma = {
  width: "10.3%"
}
const styleMed = {
  width: "17.55%"
}
const styleLar = {
  width: "22.3%"
}

const About = () => {
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
<br/>
<h2 class="bearhug">rotary club of kelowna ogopogo</h2>
<p>We accomplish service projects in the local community and internationally through the fellowship and efforts of our club members.  More information is available <a class="bodylink" href="https://portal.clubrunner.ca/824">here.</a></p>
<br/>
<h2 class="bearhug">camp oac</h2>
<p>Camp OAC is a children's summer camp located just north of Kelowna on Okanagan lake. More information is available <a class="bodylink" href="https://www.campoac.com/">here.</a></p>
<br/>
<h2 class="bearhug">contact us</h2>
<p>Please contact us about any concerns you may have or if you need to cancel an order.
<br/><br/>Phone: 555-867-5309
<br/>Email: firewood@example.com</p>
        </>
    );
  };
  
  export default About;