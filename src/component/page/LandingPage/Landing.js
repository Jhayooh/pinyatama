import React from 'react'
import './css/style.css'
import SmoothScroll from "smooth-scroll";
import { Typography } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../../firebase/Config';
import { useAuthState } from 'react-firebase-hooks/auth';


import Login from './Login';
import Navbar from './Navbar';
import Header from './Header';
import About from './About';
import Contact from '../Contact';
import Gallery from './Gallery';
import Agencies from './Agencies';
import { useEffect } from 'react';

export const scroll = new SmoothScroll('a[href*="#"]', {
    speed: 1000,
    speedAsDuration: true,
});

function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://queenpineapple.lesterintheclouds.com/">
                Queen Pineapple Farming
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}
const Landing = () => {
    const [user] = useAuthState(auth);
    const navigate = useNavigate()
  
    useEffect(() => {
      if (user) {
        navigate('/')
      }
  
    }, []);
    return (
        <div>
            <Navbar />
            <Header />
            <About />
            <Gallery />
            <Agencies />
            <div className="section-title">
                <h2 style={{ textAlign: 'center' }}>Get In Touch</h2>
                <p style={{ textAlign: 'center' }}>
                    Please fill free to Contact
                </p>
                <Contact />
            </div>
            <div style={{paddingBottom:50}}>
                <Copyright  />
            </div>
        </div>
    )
}

export default Landing