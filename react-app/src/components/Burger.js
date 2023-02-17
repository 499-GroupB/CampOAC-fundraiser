import React from 'react';
import { Link } from 'react-router-dom';
import '../css/Nav.css';

const Burger = () => {
  return (
    <>
      <input type="checkbox" id="burgControl"/>
      <label id="burg" for="burgControl">
        <div class="split" id="split1"/>
        <div class="split" id="split2"/>
        <div class="split" id="split3"/>
        <ul id="split4">
          <Link class="bearhug" to="/about"><li>about</li></Link>
          <Link class="bearhug" to="/order"><li>order</li></Link>
          <Link class="bearhug" to="/orderInfo"><li>view order</li></Link>
          <Link class="bearhug" to="/admin"><li>admin</li></Link>
        </ul>
      </label>
      <ul>
          <Link class="bearhug" to="/about"><li>about</li></Link>
          <Link class="bearhug" to="/order"><li>order</li></Link>
          <Link class="bearhug" to="/orderInfo"><li>view order</li></Link>
          <Link class="bearhug" to="/admin"><li>admin</li></Link>
      </ul>
    </>
  )
}

export default Burger