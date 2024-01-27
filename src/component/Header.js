import React from 'react'
import './Header.css'

function Header() {
  return (
    <div className='header'>
        <img src={require('./image_src/icon.png')} alt='icon' />
        <h1 className='title'>QUEEN PINEAPPLE FARMING</h1>
    </div>
  )
}

export default Header