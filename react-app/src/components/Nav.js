import React from 'react';
import Burger from './Burger';
import { Link } from "react-router-dom";
import '../css/Nav.css';

const Navbar = () => {
  return (
    <nav className="navbar">
        <Link to="/"><p id="logo">CampOAC Wood Fundraiser</p></Link>
      <Burger/>
    </nav>
  )
}

export default Navbar