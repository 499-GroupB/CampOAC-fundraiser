// home page
// uses  router to link

import { Link } from 'react-router-dom';
import '../css/Style.css';

function modd(srcc, altt) {
  document.getElementById("myModal").style.display = "block";
  document.getElementById("img01").src = srcc;
  document.getElementById("caption").innerHTML = altt;
}

function close() {
  document.getElementById("myModal").style.display = "none";
}

const Home = () => {
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
        <span class="modalbackground" onClick={() => close()}/>
        <span class="close" onClick={() => close()}>&times;</span>
        <img class="modal-content" id="img01"/>
        <div id="caption"></div>
      </div>

      <h1>welcome to the camp oac <b>&times;</b> rotary club ogopogo firewood fundraiser</h1>
      <Link id="orderbtn" to="/order"><button class="rounded">Place Order</button></Link>
      <p>Camp OAC is a childrens summer camp located just north of Kelowna on the beautiful Okanagan lake! Since 1950, Camp OAC has had thousands of campers attend their summer camps. In the offseason, the amazing property is available for rentals to host family reunions, get togethers, weddings and even school group rentals. Camp OAC is a place that everyone can enjoy.
        <br/><br/>The Rotary Club of Kelowna Ogopogo, chartered in 1993, is a group of 52 men and women, and is one of eight Rotary clubs in our area. In addition to providing support to our own community, our club has an active focus on programs involving youth. As well, both directly and through our involvement with Rotary International's Foundation, we assist with major international projects including disaster relief, fresh water development projects, and health programs such as PolioPlus.
        <br/><br/>On this website you can purchase firewood to support us!</p>
    </>
  );
};

export default Home;