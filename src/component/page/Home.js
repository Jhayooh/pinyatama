import React from "react";
import Login from '../Login';
import DOA from "../image_src/DOA_logo.png";
import OPAG from "../image_src/OPAG_logo.png";
import POCN from "../image_src/POCN_logo.png";
import AboutBackground from "../image_src/about-background.png";
import BannerBackground from "../image_src/home-banner-background.png";
import HomeImage from "../image_src/p1.jpg";
import AboutImage from "../image_src/p2.jpg";
import ImageGal from "./ImageGal";
import './Home.css';

function Home() {
  const navArray = ["Home", "About", "Screenshots", "Agencies"]
  
  return (
    <div className="home-container">
      <Login navItems={navArray} />
      <div className="home-banner-container">
        <div className="home-bannerImage-container">
          <img src={BannerBackground} alt="" />
        </div>
        <div className="home-text-section">
          <h1 className="primary-heading">
            Queen Pineapple Farming
          </h1>
          <p className="primary-text">
            Ang Queen ang pinakamatamis na uri ng pinya sa Pilipinas
          </p>

          <button className="secondary-button"style={{backgroundColor:'#22b14c'}}>
            More Info {" "}</button>


        </div>
        <div className="home-image-section">
          <img src={HomeImage} style={{ borderRadius: '20px' }} />
        </div>
      </div>
      <About />
      <Screenshots />
      <Agencies />
    </div>
  )
};
function About() {
  return (
    <div className="about-section-container" id='About'>
      <div className="about-background-image-container">
        <img src={AboutBackground} alt="" />
      </div>
      <div className="about-section-image-container">
        <img src={AboutImage} style={{ borderRadius: '100px' }} />
      </div>
      <div className="about-section-text-container">
        <p className="primary-subheading" style={{color:'#22b14c'}}>About</p>
        <h1 className="primary-heading">
          Kilala bilang "Queen Pineapple"
        </h1>
        <p className="primary-text">
          masigla ang pag-usbong ng Formosa sa Bicol. Dahil dito, naging isa ang Camarines Norte sa mga pangunahing tagapagluwas ng pinya sa
          Pilipinas. Kinikilala rin ang Formosa bilang pinakamatamis na pinya sa Pilipinas, na may laman ng sukrosa na mas mataas kaysa sa
          karaniwang itinatanim na mga uri ng pinya sa bansa.
        </p>
      </div>
    </div>
  )
};
function Screenshots() {
  return (
    <div>
      <>
       <div className="work-section-top" style={{marginTop:100}}>
        <p className="primary-subheading" style={{color:'#22b14c'}}>Web Dashboard Screenshots</p>
        <h1 className="primary-heading">Check it Out</h1>
      </div>
        <ImageGal />
      </>
    </div>
  )
};
function Agencies() {
  const workInfoData = [
    {
      image: OPAG,
      title: "OPAG CN",

    },
    {
      image: DOA,
      title: "DA- CLNRRS",

    },
    {
      image: POCN,
      title: "CAMARINE NORTE",
    },
  ];
  return (
    <div className="home-banner-container">
        <div className="home-bannerImage-container">
          <img src={BannerBackground} alt="" />
        </div>
    <div className="work-section-wrapper" id="Agencies">
      <div className="work-section-top">
        <p className="primary-subheading" style={{color:'#22b14c'}}>Concern Agencies</p>
        <h1 className="primary-heading">Check it Out</h1>

      </div>
      <div className="work-section-bottom" id='Agencies' style={{ flex: 1, }}>
        {workInfoData.map((data) => (
          <div className="work-section-info"
            key={data.title}
            style={{ border: '1px solid #22b14c', padding: '10px' }}>
            <div className="info-boxes-img-container">
              <img src={data.image} alt="" />
            </div>
            <h2>{data.title}</h2>
          </div>
        ))}
      </div>
    </div>
    </div>
  )
};



export default Home;
