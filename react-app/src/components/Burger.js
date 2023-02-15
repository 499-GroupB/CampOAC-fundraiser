import React, { useState } from 'react';
import RightNav from './RightNav';
import '../css/Nav.css';

const Burger = () => {
  const [open, setOpen] = useState(false)

  return (
    <>
      <input type="checkbox" id="burgControl"/>
      <label id="burg" for="burgControl" open={open} onClick={() => setOpen(!open)}>
        <div class="split" id="split1"/>
        <div class="split" id="split2"/>
        <div class="split" id="split3"/>
      </label>
      <RightNav open={open} />
    </>
  )
}

export default Burger