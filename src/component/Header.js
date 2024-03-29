import React from 'react';
import './Header.css';
import icon from './image_src/pinyatamap-logo.png';

function Header() {
  return (
    <div className='header'>
      <img className='header-icon' src={icon} alt='icon' />
      <h1 className='title'>QUEEN PINEAPPLE FARMING</h1>
    </div>
  );
}

export default Header;
