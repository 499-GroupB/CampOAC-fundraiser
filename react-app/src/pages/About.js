// About page

function modd(srcc, altt){
  document.getElementById("myModal").style.display = "block";
  document.getElementById("img01").src = srcc;
  document.getElementById("caption").innerHTML = altt;
}

function close(){
  document.getElementById("myModal").style.display = "none";
}

const About = () => {
    return (
        <>
<div class = "row">
  <div class = "column imgSma">
    <img id="img1" src = "firewoodPics/IMG_8859.jpeg" width="100%" alt="It takes a team."
    onClick={() => modd(document.getElementById("img1").src,document.getElementById("img1").alt)}/>
  </div>
  <div class = "column imgSma">
    <img id="img2" src = "firewoodPics/IMG_9118.jpeg" width="100%" alt="Proud of our firewood."
    onClick={() => modd(document.getElementById("img2").src,document.getElementById("img2").alt)}/>
  </div>
  <div class = "column imgMed">
    <img id="img3" src = "firewoodPics/Firewood_pic_2_-_small.jpg" width="100%" alt="Heavy machinery moving wood."
    onClick={() => modd(document.getElementById("img3").src,document.getElementById("img3").alt)}/>
  </div>
  <div class = "column imgMed">
    <img id="img4" src = "firewoodPics/Firewood_Team.jpg" width="100%" alt="The team. &nbsp : )"
    onClick={() => modd(document.getElementById("img4").src,document.getElementById("img4").alt)}/>
  </div>
  <div class = "column imgLar">
    <img id="img5" src = "firewoodPics/FirewoodBags.jpg" width="100%" alt="Some bags of firewood we sold in a previous fundraiser."
    onClick={() => modd(document.getElementById("img5").src,document.getElementById("img5").alt)}/>
  </div>
  <div class = "column imgSma">
    <img id="img6" src = "firewoodPics/IMG_8688_2.jpeg" width="100%" alt="Cutting the firewood."
    onClick={() => modd(document.getElementById("img6").src,document.getElementById("img6").alt)}/>
  </div>
  <div class = "column imgSma">
    <img id="img7" src = "firewoodPics/IMG_8690.jpeg" width="100%" alt="It takes two."
    onClick={() => modd(document.getElementById("img7").src,document.getElementById("img7").alt)}/>
  </div>
</div>
<div id="myModal" class="modal">
  <span class="close" onClick={() => close()}>&times;</span>
  <img class="modal-content" id="img01"/>
  <div id="caption"></div>
</div>
<br/>
<h2 class="bearhug">rotary club of kelowna ogopogo</h2>
<p>We accomplish service projects in the local community and internationally through the fellowship and efforts of our club members.  More information is available <a class="bodylink" href="https://my.rotary.org/en/"><b><u>here.</u></b></a></p>
<br/>
<h2 class="bearhug">camp oac</h2>
<p>Camp OAC is a children's summer camp located just north of Kelowna on Okanagan lake. More information is available <a class="bodylink" href="https://www.campoac.com/"><b><u>here.</u></b></a></p>
<br/>
<h2 class="bearhug">contact us</h2>
<p>Please contact us about any concerns you may have or if you need to cancel an order.
<br/><br/>Phone: 555-867-5309
<br/>Email: firewood@example.com</p>
        </>
    );
  };
  
  export default About;