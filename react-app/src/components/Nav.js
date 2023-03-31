import React from 'react';
import Burger from './Burger';
import { Link } from "react-router-dom";
import '../css/Nav.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <Link to="/"><p id="logo"><img class="topleftlogo tllshown" src="RotaryWhite.png"/><img class="topleftlogo tllhide" src="RotatingRotary.gif"/>&nbsp;camp oac <b>&times;</b> rotary club firewood</p></Link>
      <Burger />
    </nav>
  )
}

export default Navbar