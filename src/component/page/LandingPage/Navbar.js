import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 0);
        };
        
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav
            id='menu'
            className="navbar navbar-expand-lg fixed-top"
            style={{
                backgroundColor: isScrolled ? '#ffffff' : 'transparent',
                backdropFilter: isScrolled ? 'none' : 'blur(8px)',
                boxShadow: isScrolled ? '0px 2px 4px rgba(0, 0, 0, 0.1)' : 'none',
                transition: 'background-color 0.3s, backdrop-filter 0.3s, box-shadow 0.3s',
            }}
        >
            <div className="container">
                <div className="navbar-header">
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-toggle="collapse"
                        data-target="#navbarTogglerDemo01"
                        aria-controls="navbarTogglerDemo01"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
                        <div>
                            <a className="navbar-brand page-scroll" href="#page-top">
                                <img src={require('../../image_src/pinyatamap-logo.png')} width={50} height={50} alt="Logo" />
                            </a>
                            <a className="navbar-brand page-scroll" href="#page-top">
                                QUEEN PINEAPPLE FARMING
                            </a>
                        </div>
                    </div>
                </div>
                <div>
                    <ul className="nav navbar-nav navbar-right">
                        <li><a href="#about" className="page-scroll">About</a></li>
                        <li><a href="#portfolio" className="page-scroll">Screenshots</a></li>
                        <li><a href="#team" className="page-scroll">Agencies</a></li>
                        <li><a href="#contact" className="page-scroll">Contact</a></li>
                        <Link to="/login" className="btn btn-custom btn-lg page-scroll">Login</Link>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
