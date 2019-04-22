import React from 'react';
import logo from './eveningSky.200x150.png';

function Header() {
  const backgroundColor = '#527086'

  const styles = {
    width: 200,
    height: 100,
    background: `url(${logo})`,
    boxShadow: 'inset 0 0 10 #527086',
    borderRadius: 10,
    borderStyle: 'solid',
    borderColor: backgroundColor,
    borderwidth: 3
  }

  return (
    <div id='header'>
      <div alt='Logo' className='logo' style={styles}>
        <h1>Jay D. McHugh</h1>
        <h2>Developer</h2>
      </div>
    </div >
  );
}

export default Header;
