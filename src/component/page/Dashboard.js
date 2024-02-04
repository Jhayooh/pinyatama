import React, { useState, useRef } from 'react';
import './Dashboard.css';
import NavDashboard from '../NavDashboard';
import Carousel from 'react-bootstrap/Carousel';
import ImageGal from '../ImageGal';
import { Link } from 'react-router-dom';

function Dashboard() {
  const navArray = ["Tungkol", "Screenshots", "Ahensiya", "Kontak"];
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
    <div className='dashboard'>
      <NavDashboard navItems={navArray} />
      <img
        src={require('../image_src/PineappleBackground.png')}
        alt='pineapple'
        className='pineapple-image'
      />
      <h1 className='dash-title'>QUEEN PINEAPPLE</h1>
      <h1 className='dash-title-two'>FARM</h1>
      <About openModal={openModal} modalDisplay={modalDisplay} modalRef={modalRef} handleOutsideClick={handleOutsideClick} />
      <ScreenShots />
      <AgencySec />
      <ContactSec />
    </div>
  );
}

function Information({ cName }) {
  return (
    <span className={cName}>
      Kilala bilang "Queen Pineapple," masigla ang pag-usbong ng Formosa sa Bicol. Dahil dito, naging isa ang Camarines Norte
      sa mga pangunahing tagapagluwas ng pinya sa Pilipinas. Kinikilala rin ang Formosa bilang pinakamatamis na pinya sa
      Pilipinas, na may laman ng sukrosa na mas mataas kaysa sa karaniwang itinatanim na mga uri ng pinya sa bansa.
    </span>
  );
}

function Images({ imagesList }) {
  return (
    <Carousel>
      {imagesList.map((image, index) => (
        <Carousel.Item key={index}>
          <img src={require(`../image_src/${image}`)} alt='pineapple' />
        </Carousel.Item>
      ))}
    </Carousel>
  );
}

const imagesList = ["pinya1.png", "pinya2.png", "pinya3.png", "pinya4.png"];

function About({ openModal, modalDisplay, modalRef ,handleOutsideClick}) {
  return (
    <div className='about' id='Tungkol'>
      <div className='about-col-one'>
        <Information cName='about-text' />
        <div>
          <button onClick={openModal} style={{ width: 'auto' }}>
            Karagdagang impormasyon
          </button>

          {modalDisplay && (
            <div
              ref={modalRef}
              className='modal'
              onClick={handleOutsideClick}
              style={{ display: 'block' }}
            >
              <form
                className='modal-content animate'
                action='/action_page.php'
                method='post'
                style={{ width: '60%', backgroundColor: '#247027' }}
              >
                <p>
                  Ang Queen Pineapple ay kilala bilang ang pinakamatamis na pinya sa buong mundo. Ang prutas ay may
                  kakaibang mabangong tamis at krispi, at medyo mas maliit kaysa sa iba pang uri ng pinya dahil ito'y
                  nagbibigay lamang ng timbang na mga 450 gramo hanggang 950 gramo.
                </p>
              </form>
            </div>
          )}
        </div>
      </div>
      <div className='about-col-two'>
        <Images imagesList={imagesList} />
      </div>
    </div>
  );
}

function ScreenShots() {
  return (
    <div className='screenshot' id='Screenshots'>
      <span>SCREENSHOTS</span>
      <ImageGal />
    </div>
  );
}

const agencyList = [
  {
    name: 'Camarines Norte',
    logo: 'POCN_logo.png',
  },
  {
    name: 'OPAG - Cam Norte',
    logo: 'OPAG_logo.png',
  },
  {
    name: 'DA - CNLRRS',
    logo: 'DOA_logo.png',
  },
];

function Agencies({ agencyList }) {
  return (
    <div className='agencies' id='Ahensiya'>
      {agencyList.map((agency, index) => (
        <div key={index} className='agency'>
          <img src={require(`../image_src/${agency.logo}`)} alt={agency.name} className='logo-image' />
          <span>{agency.name}</span>
        </div>
      ))}
    </div>
  );
}

function AgencySec() {
  return (
    <div className='agency-sec'>
      <span>MGA AHENSIYA</span>
      <Agencies agencyList={agencyList} />
    </div>
  );
}

const contactList = [
  {
    name: 'Person 1',
    logo: 'profile.png',
  },
  {
    name: 'Person 2',
    logo: 'profile.png',
  },
  {
    name: 'Person 3',
    logo: 'profile.png',
  },
];

function Contacts({ contactList }) {
  return (
    <div className='contacts' id='Kontak'>
      {contactList.map((contact, index) => (
        <div key={index} className='contact'>
          <img src={require(`../image_src/${contact.logo}`)} alt={contact.name} className='logo-image' />
          <span>{contact.name}</span>
        </div>
      ))}
    </div>
  );
}

function ContactSec() {
  return (
    <div className='contact-sec'>
      <span>KONTAKIN KAMI</span>
      <Contacts contactList={contactList} />
    </div>
  );
}


export default Dashboard;
