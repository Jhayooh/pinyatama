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
            id="menu"
            className="navbar navbar-expand-lg fixed-top"
            style={{
                backgroundColor: isScrolled ? '#ffffff' : 'transparent',
                backdropFilter: isScrolled ? 'none' : 'blur(8px)',
                boxShadow: isScrolled ? '0px 2px 4px rgba(0, 0, 0, 0.1)' : 'none',
                transition: 'background-color 0.3s, backdrop-filter 0.3s, box-shadow 0.3s',
            }}
        >
            <div className="container">
                <a
                    className="navbar-brand page-scroll d-flex align-items-center"
                    href="#page-top"
                    style={{ gap: '8px' }} // Adds space between the logo and text
                >
                    <img
                        src={require('../../image_src/pinyatamap-logo.png')}
                        width={40}
                        height={40}
                        alt="Logo"
                        style={{ display: 'block' }}
                    />
                    <span
                        style={{
                            fontSize: 'clamp(16px, 2.5vw, 24px)', // Dynamically adjusts text size
                            whiteSpace: 'nowrap', // Prevents text wrapping
                        }}
                    >
                        QUEEN PINEAPPLE FARMING
                    </span>
                </a>

                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto text-center">
                        <li className="nav-item">
                            <a href="#about" className="nav-link page-scroll">
                                About
                            </a>
                        </li>
                        <li className="nav-item">
                            <a href="#portfolio" className="nav-link page-scroll">
                                Gallery
                            </a>
                        </li>
                        <li className="nav-item">
                            <a href="#team" className="nav-link page-scroll">
                                Agencies
                            </a>
                        </li>
                        <li className="nav-item">
                            <a href="#contact" className="nav-link page-scroll">
                                Contact
                            </a>
                        </li>
                    </ul>
                </div>

                {/* Login Button */}
                <Link
                    to="/login"
                    className="btn btn-custom btn-lg ms-3"
                    style={{
                        fontSize: 'clamp(14px, 2vw, 18px)', // Responsive text size for the button
                    }}
                >
                    Login
                </Link>
            </div>
        </nav>
    );
};

export default Navbar;
