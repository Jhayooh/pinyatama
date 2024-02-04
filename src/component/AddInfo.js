import React, { useState, useRef } from 'react';

const AddInfo = () => {
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
      <button onClick={openModal} style={{ width: 'auto' }}>
        Karagdagang impormasyon
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
            style={{ width: '60%', backgroundColor: '#247027' }}
          >
            <p >
            Ang Queen Pineapple ay kilala bilang ang pinakamatamis na pinya sa buong mundo.
             Ang prutas ay may kakaibang mabangong tamis at krispi, at medyo mas maliit kaysa sa iba pang uri ng pinya dahil ito'y nagbibigay lamang ng timbang na mga 450 gramo hanggang 950 gramo.
            </p>
            
          </form>
        </div>
      )}
    </div>
  );
};

export default AddInfo;
