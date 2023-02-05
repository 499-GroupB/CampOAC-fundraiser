import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

// Styled-components to allow for variable changes
// in navbar when opened
const Ul = styled.ul`
  list-style: none;
  display: flex;
  flex-flow: row nowrap;
  li {
    padding: 2vh 1.5vw;
    text-decoration: none;
    color: white;
  }
  li:hover {
    background-color: #fff;
    color: black;
    transition: transform 0.3s ease-in-out;
  }
  @media (max-width: 837px) {
    flex-flow: column nowrap;
    background-color: #0D2538;
    position: fixed;
    transform: ${({ open }) => open ? 'translateX(0)' : 'translateX(100%)'};
    top: 0;
    right: 0;
    height: 100vh;
    width: 300px;
    padding-top: 3.5rem;
    transition: transform 0.3s ease-in-out;
    li {
      color: #fff;
      text-decoration: none;
      color: white;
    }
  }
`;

const RightNav = ({ open }) => {
  return (
    <Ul open={open}>
      <Link class="bearhug" to="/about" onClick={open}><li>about</li></Link>
      <Link class="bearhug" to="/order" onClick={open}><li>order</li></Link>
      <Link class="bearhug" to="/orderInfo" onClick={open}><li>view order</li></Link>
      <Link class="bearhug" to="/admin" onClick={open}><li>admin</li></Link>
    </Ul>
  )
}

export default RightNav