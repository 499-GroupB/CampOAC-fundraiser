import '../css/Style.css';

const imagearray = ["firewoodPics/IMG_8859.jpeg","firewoodPics/IMG_9118.jpeg","firewoodPics/Firewood_pic_2_-_small.jpg","firewoodPics/Firewood_Team.jpg","firewoodPics/FirewoodBags.jpg","firewoodPics/IMG_8688_2.jpeg","firewoodPics/IMG_8690.jpeg"];
const altarray = ["It takes a team.","Proud of our firewood.","Heavy machinery moving wood.","The team with the wood splitter.","Some bags of firewood we sold in a previous fundraiser.","Cutting the firewood.","Moving some wood."];

var curimage = 0;

function modd(i) {
  document.getElementById("myModal").style.display = "block";
  document.getElementById("img01").src = imagearray[i];
  document.getElementById("truecaption").innerHTML = altarray[i];
  curimage = i;
}

function close() {
  document.getElementById("myModal").style.display = "none";
}

function changeimage(i, j) {
  if(j) {
    i--;
    if(i<0) {
      i = 6;
    }
  }
  else {
    i++;
    if(i>6) {
      i = 0;
    }
  }
  curimage = i;
  document.getElementById("img01").src = imagearray[i];
  document.getElementById("truecaption").innerHTML = altarray[i];
}

const Images = () => {
  return (
    <>
      <div class="row">
        <div class="column imgSma">
          <img id="img1" src="firewoodPics/IMG_8859.jpeg" width="100%" alt="It takes a team."
            onClick={() => modd(0)} />
        </div>
        <div class="column imgSma">
          <img id="img2" src="firewoodPics/IMG_9118.jpeg" width="100%" alt="Proud of our firewood."
            onClick={() => modd(1)} />
        </div>
        <div class="column imgMed">
          <img id="img3" src="firewoodPics/Firewood_pic_2_-_small.jpg" width="100%" alt="Heavy machinery moving wood."
            onClick={() => modd(2)} />
        </div>
        <div class="column imgMed">
          <img id="img4" src="firewoodPics/Firewood_Team.jpg" width="100%" alt="The team with the wood splitter."
            onClick={() => modd(3)} />
        </div>
        <div class="column imgLar">
          <img id="img5" src="firewoodPics/FirewoodBags.jpg" width="100%" alt="Some bags of firewood we sold in a previous fundraiser."
            onClick={() => modd(4)} />
        </div>
        <div class="column imgSma">
          <img id="img6" src="firewoodPics/IMG_8688_2.jpeg" width="100%" alt="Cutting the firewood."
            onClick={() => modd(5)} />
        </div>
        <div class="column imgSma">
          <img id="img7" src="firewoodPics/IMG_8690.jpeg" width="100%" alt="Moving some wood."
            onClick={() => modd(6)} />
        </div>
      </div>

      <div id="myModal" class="modal">
        <span class="modalbackground" onClick={() => close()}/>
        <span id="close" class="imagesymbols" onClick={() => close()}>&times;</span>
        <img class="modal-content" id="img01"/>
        <div id="caption">
          <span class="imagesymbols moveimages" onClick={() => changeimage(curimage, true)}>&lt;</span>
          <span id="truecaption"/>
          <span class="imagesymbols moveimages" onClick={() => changeimage(curimage, false)}>&gt;</span>
        </div>
      </div>
    </>
  );
};

export default Images;