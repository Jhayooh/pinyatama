import React from 'react'
import { Link } from 'react-router-dom'
import { HashLink } from 'react-router-hash-link';

function NavDashboard({ navItems }) {

  return (
    <nav className="navbar fixed-top navbar-expand-lg">
      <div className="container-fluid">
          <a className="navbar-brand" href="#">Logo</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
        <div className="d-flex" id="navbarSupportedContent">
          <ul className="navbar-nav ">                    
            {navItems.map(item => (
              <li className="nav-item">
                <HashLink smooth to={`#${item}`} className='nav-link'>{item}</HashLink>
              </li>                                   
            ))}
            <Link to="/admin">
              <button className="btn btn-outline-warning" type="submit">Login</button>
            </Link>
          </ul>  
        </div>
      </div>
    </nav>
  )
}

export default NavDashboard