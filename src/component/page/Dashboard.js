import React from 'react'
import './Dashboard.css'
import NavDashboard from '../NavDashboard'
import Carousel from 'react-bootstrap/Carousel'
import ImageGal from "../ImageGal";

function Dashboard() {
  const navArray = ["Tungkol", "Screenshots", "Ahensiya", "Kontak"]
  
  return (
    <div className='dashboard'>
      <NavDashboard navItems={navArray} />
      <img src={require("../image_src/PineappleBackground.png")} alt='pineapple' className='pineapple-image' />
      
      <h1 className='dash-title' style={{ fontFamily: 'Bold'}}>QUEEN PINEAPPLE</h1>
      <h1 className='dash-title-two' style={{ fontFamily: 'Bold'}}>FARM</h1>
      <About />
      <ScreenShots />
      <AgencySec />
      <Contact />
    </div>
  )
}

function Information({ cName}) {
  return <span className={cName} style={{ fontFamily: 'SemiBold', fontSize: '28px', fontWeight: 'bold' }}>
  
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
          <img src={require(`../image_src/${image}`)} alt='pineapple'/>
        </Carousel.Item>
      ))}
    </Carousel>
  )
}

const imagesList = [
  "pinya1.png",
  "pinya2.png",
  "pinya3.png",
  "pinya4.png",
]

function About() {
  return (
    <div className='about' id="Tungkol">
      <div className='about-col-one'>
        <Information cName="about-text" />
        <button type="button" class="btn btn-success" style={{fontFamily:'Righteous'}}>Karagdagang impormasyon</button>
      </div>
      <div className='about-col-two'>
      <Images imagesList={imagesList} />
      </div>
    </div>
  )
}

function ScreenShots() {
    return (
      <div className='screenshot' id="Screenshots">
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
    <div className='agencies' id='Ahensiya'>
      {agencyList.map(agency => (
        <div className='agency'>
            <img src={require(`../image_src/${agency.logo}`)} alt={agency.name} className="logo-image"/>
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

function Contact() {
  return (
    <div className='contact' id='Kontak'>
      <span>KONTAKIN KAMI</span>
    </div>
  )
}

export default Dashboard