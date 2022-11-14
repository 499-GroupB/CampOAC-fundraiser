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
    padding: 20px 30px;
    margin: 0px 15px;
    text-decoration: none;
    color: white;
    transition: 0.3s;
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
      <Link to="/about" onClick={open}><li>About</li></Link>
      <Link to="/order" onClick={open}><li>Order</li></Link>
      <Link to="/admin" onClick={open}><li>Admin</li></Link>
    </Ul>
  )
}

export default RightNav