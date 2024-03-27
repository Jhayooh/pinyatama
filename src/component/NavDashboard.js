import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import './Login.css';

function NavDashboard({ navItems }) {
  const [modalDisplay, setModalDisplay] = useState(false);
  const modalRef = useRef(null);

  const openModal = () => {
    setModalDisplay(true);
  };

  const closeModal = () => {
    setModalDisplay(false);
  };

  const handleOutsideClick = (event) => {
    if (event.target === modalRef.current) {
      closeModal();
    }
  };

  return (
    <nav className="navbar  navbar-expand-lg " style={{ background: 'green' ,fontFamily: 'Arial'}}>
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
        <img src={require('./image_src/pinyatamap-logo.png')} style={{width:50, height: 50}}/>
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="d-flex" id="navbarSupportedContent">
          <ul className="navbar-nav ">
            {navItems.map((item, index) => (
              <li key={index} className="nav-item">
                <HashLink smooth to={`#${item}`} className="nav-link">
                  {item}
                </HashLink>
              </li>
            ))}
            <button
              className="btn btn-outline-warning"
              type="button"
              onClick={openModal}
              style={{ width: 'auto' }}
            >
              Login
            </button>
          </ul>

          {modalDisplay && (
            <div
              ref={modalRef}
              className="modal"
              onClick={handleOutsideClick}
              style={{ display: 'block' }}
            >
              <form
                className="modal-content animate"
                action="/action_page.php"
                method="post"
                style={{ width: '60%', backgroundColor: '#247027' }}
              >
                <div className="imgcontainer">
                  <span
                    onClick={closeModal}
                    className="close"
                    title="Close Modal"
                  >
                    &times;
                  </span>
                </div>
                <h1>MALIGAYANG PAGDATING!</h1>
                <h5>Mag-login sa iyong account</h5>
                <div className="container">
                  <input
                    type="text"
                    placeholder="Username"
                    name="uname"
                    required
                    style={{ fontFamily: 'Righteous' }}
                  />
                  <input
                    type="password"
                    placeholder="Password"
                    name="psw"
                    required
                  />
                  <Link to="/admin">
                    <button type="submit">MAG-LOGIN</button>
                  </Link>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default NavDashboard;
