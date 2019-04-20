import React from 'react';
import logo from './eveningSky.png';

function Header() {
  return (
    <div id='header'>
      <img src={logo} className="logo" alt="logo" />
    </div>
  );
}

export default Header;
