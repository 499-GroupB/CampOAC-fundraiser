import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <body class = "text-center container-fluid">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.1/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-iYQeCzEYFbKjA/T2uDLTpkwGzCiq6soy8tYaI1GyVh/UjpbCx/TYkiZhlZB6+fzT" crossorigin="anonymous"></link>
    <nav class="topbar navbar fixed-top">
      <div class="container-fluid">
        <a class="topbar navbar-brand"><b>Camp OAC Firewood Fundraiser</b></a>
        <a class="nav-link"><b>Account</b></a>
        <a class="nav-link"><b>Login</b></a>
      </div>
    </nav>
    <br/><br/><br/>
    <div class="row">
      <div class="col-sm-4">
        <div class="card">
          <img src="https://cdn.discordapp.com/attachments/754558042082639872/1036391015269015612/Wood.png" class="card-img-top" alt-text="Firewood."/>
        </div>
      </div>
      <div class="col-sm-4">
        <div class="card">
          <img src="https://dq5pwpg1q8ru0.cloudfront.net/2021/02/05/12/26/30/f13d06d2-0fd2-4548-a8ed-952742f00ff3/IMG_6329.jpeg" class="card-img-top" alt-text="People."/>
        </div>
      </div>
	    <div class="col-sm-4">
        <div class="card">
          <img src="https://dq5pwpg1q8ru0.cloudfront.net/2021/02/05/12/26/45/07d26c59-be49-4741-b027-2f9f25ca5d81/IMG_0117.jpeg" class="card-img-top" alt-text="Wow."/>
        </div>
      </div>
    </div>
    <br/>
    <div class="row">
      <div class="col-sm-4"/>
      <div class="col-sm-4">
        <div class="card">
          <button type="button" class="orderbutton btn btn-block"><b>Order Now</b></button>
        </div>
      </div>
    </div>
    <br/>
    <div class="row">
      <div class="col-sm-2"/>
      <div class="col-sm-8">
        <p class="pagetext">Insert a bunch of words here. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
      </div>
    </div>
    <br/><br/><br/>
    <h3 class="pagetext">Want to get in touch?</h3>
   



    

    <br/>

    <div class="contact">
      
  <div className="icons">
    <div className="i">
      <a href = "https://www.facebook.com/campoac/">
        
      
      <img src= "https://cdn-icons-png.flaticon.com/512/59/59439.png" width= "50" heigth = "50" alt="" className="i" />
      </a>
    </div>
  </div>

  <div className='icons'>
    <img>
    </img>
  </div>
  <div className="icons">
    <div className="i">
      <a href = "https://www.instagram.com/camp_oac/">

      
      <img src= "https://freeiconshop.com/wp-content/uploads/edd/instagram-new-outline.png" width= "50" heigth = "50"  alt="" className="i" />

      </a>
    </div>
  </div>
  
</div>
     
 
    
    
    
    
    <br/><br/><br/>
    <nav class="bottombar navbar fixed-bottom">
      <div class="container-fluid">
        <a class="nav-link">Insert Camp OAC / Rotary Club copyright info here.</a>
      </div>
    </nav>
  </body>
);