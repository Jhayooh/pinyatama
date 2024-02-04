import React, { useState, useRef } from 'react';
import './Login.css';

const LoginNew = () => {
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
    <div>
      <h2>Modal Login Form</h2>

      <button onClick={openModal} style={{ width: 'auto' }}>
        Login
      </button>

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
            style={{width:'60%', backgroundColor:'#247027'}}
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
                style={{fontFamily:'Righteous'}}
              />

           
              <input
                type="password"
                placeholder="Password"
                name="psw"
                required
              />

              <button type="submit">MAG-LOGIN</button>
              
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default LoginNew;