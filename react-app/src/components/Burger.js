import React from 'react';
import { Link } from 'react-router-dom';
import '../css/Nav.css';

//<Link class="bearhug" to="/admin" onClick={() => closey()}><li>admin</li></Link>
//<Link class="bearhug" to="/admin"><li>admin</li></Link>

function closey() {
  document.getElementById("burgControl").checked = false;
}

const Burger = () => {
  return (
    <>
      <input type="checkbox" id="burgControl"/>
      <label id="burg" for="burgControl">
        <div class="split" id="split1"/>
        <div class="split" id="split2"/>
        <div class="split" id="split3"/>
        <ul id="split4">
          <Link class="bearhug" to="/about" onClick={() => closey()}><li>about</li></Link>
          <Link class="bearhug" to="/contact" onClick={() => closey()}><li>contact</li></Link>
          <Link class="bearhug" to="/order" onClick={() => closey()}><li>order</li></Link>
          <Link class="bearhug" to="/orderInfo" onClick={() => closey()}><li>track order</li></Link>
          
        </ul>
      </label>
      <ul>
          <Link class="bearhug" to="/about"><li>about</li></Link>
          <Link class="bearhug" to="/contact"><li>contact</li></Link>
          <Link class="bearhug" to="/order"><li>order</li></Link>
          <Link class="bearhug" to="/orderInfo"><li>track order</li></Link>
      </ul>
    </>
  )
}

export default Burger