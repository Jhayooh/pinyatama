import React, { useRef, useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import NavDashboard from '../NavDashboard';
import Contact from "./Contact";
import './Dashboard.css';
import ImageGal from "./ImageGal";

function Dashboard() {
  const navArray = ["Tungkol", "Screenshots", "Ahensiya", "Kontak"]


  return (
    <div className='dashboard'>
      <NavDashboard navItems={navArray} style={{ fontFamily: "Arial" }} />
      <img src={require("../image_src/bg.jpg")} alt='pineapple' className='pineapple-image' style={{ flex: 1 }} />
      <About />
      <ScreenShots />
      <AgencySec />
      <ContactSec />
    </div>
  )
} {/* <h1 className='dash-title' style={{ fontFamily: 'Arial Black, sans-serif'}}>QUEEN PINEAPPLE</h1>
      <h1 className='dash-title-two' style={{ fontFamily: 'Arial Black, sans-serif'}}>FARM</h1> */}

function Information({ cName }) {
  return <span className={cName} style={{ fontFamily: 'Helvetica, sans-serif ', fontSize: '25px', fontWeight: 'bold' }}>

    Kilala bilang "Queen Pineapple," masigla ang pag-usbong ng Formosa sa Bicol.
    Dahil dito, naging isa ang Camarines Norte sa mga pangunahing tagapagluwas ng pinya sa Pilipinas.
    Kinikilala rin ang Formosa bilang pinakamatamis na pinya sa Pilipinas, na may laman ng sukrosa na mas
    mataas kaysa sa karaniwang itinatanim na mga uri ng pinya sa bansa.</span>
}

function Images({ imagesList }) {
  return (
    <Carousel>
      {imagesList.map(image => (
        <Carousel.Item>
          <img src={require(`../image_src/${image}`)} alt='pineapple' style={{ width: '600px', height: '408px' }} />
        </Carousel.Item>
      ))}
    </Carousel>
  )
}

const imagesList = [
  "p1.jpg",
  "p2.jpg",
  "p3.jpg",
  "p5.jpg",
]


function About() {
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
    <div className='about' id='Tungkol'>
      <div className='about-col-one'>
        <Information cName='about-text' />
        <div>
          <button
            className="btn btn-outline-warning"
            type="button"
            onClick={openModal}
            style={{ width: 'auto', marginLeft: 60, fontFamily: 'Arial' }}
          >
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
                style={{ width: '50%', backgroundColor: 'green' }}
              >
                <Tabs
                  defaultActiveKey="info"
                  transition={false}
                  id="noanim-tab-example"
                  className="mb-3"
                >
                  <Tab eventKey="info" title="Klasipikasyon" style={{color:'white'}}>
                    Ang Bureau of Agricyltural Fishery Products Standards ay nagpalabas sa sumusunod na Klasipikasyon
                    base sa timbang ng pinyang queen kasama ang korona.<br/>
                    Extra large: mahigit 1,000g <br/>
                    Large: 850-1,000g  <br/>
                    Medium: 700-850g  <br/>
                    Small: 550-700  <br/> Butterball: below 550g
                  </Tab>
                  <Tab eventKey="profile" title="Uri" style={{color:'white'}}>
                    Tab content for Profile
                  </Tab>
                  <Tab eventKey="contact" title="Contact" style={{color:'white'}}>
                    Tab content for Contact
                  </Tab>
                </Tabs>
                {/* <img src={require('../image_src/p5.jpg' )}/>
                <p style={{fontFamily:'Arial',}}>
                  Ang Queen Pineapple ay kilala bilang ang pinakamatamis na pinya sa buong mundo. Ang prutas ay may
                  kakaibang mabangong tamis at krispi, at medyo mas maliit kaysa sa iba pang uri ng pinya dahil ito'y
                  nagbibigay lamang ng timbang na mga 450 gramo hanggang 950 gramo.
                </p> */}
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
    <div className='screenshot' id="Screenshots" style={{ fontFamily: 'Arial' }}>
      <span>SCREENSHOTS</span>
      <ImageGal />
    </div>
  )
}

const agencyList = [
  {
    name: "Camarines Norte",
    logo: "POCN_logo.png"
  },
  {
    name: "OPAG - Cam Norte",
    logo: "OPAG_logo.png"
  },
  {
    name: "DA - CNLRRS",
    logo: "DOA_logo.png"
  }
]

function Agencies({ agencyList }) {
  return (
    <div className='agencies' id='Ahensiya' style={{ fontFamily: 'Arial' }}>
      {agencyList.map(agency => (
        <div className='agency'>
          <img src={require(`../image_src/${agency.logo}`)} alt={agency.name} className="logo-image" />
          <span>{agency.name}</span>
        </div>
      ))}
    </div>
  )
}

function AgencySec() {
  return (
    <div className='agency-sec'>
      <span>MGA AHENSIYA</span>
      <Agencies agencyList={agencyList} />
    </div>
  )
}

// const contactList = [
//   {
//     name: "Person One",
//     logo: "profile.png"
//   },
//   {
//     name: "Person Two",
//     logo: "profile.png"
//   },
//   {
//     name: "Person Three",
//     logo: "profile.png"
//   }
// ]

// function Contacts({ props}) {
//   return (
//     <div className='contacts' id='Kontak' style={{fontFamily:'Arial'}}>
//       {contactList.map(contact => (
//         <div className='contact'>
//             <img src={require(`../image_src/${contact.logo}`)} alt={contact.name} className="logo-image"/>
//           <span>{contact.name}</span>
//         </div>
//       ))}
//     </div>
//   )
// }

function ContactSec() {
  return (
    <div className='contact-sec' id='Kontak'>
      <span>GET IN TOUCH</span>
      <Contact />
    </div>
    //   <Contacts contactList={contactList} />
    // </div>
  )
}


export default Dashboard