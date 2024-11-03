import React from 'react'
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav id='menu' class="navbar navbar-expand-lg navbar-light bg-light fixed-top " >
            <div className="container">
                <div className="navbar-header">
                    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarTogglerDemo01">
                        <div>
                            <a className="navbar-brand page-scroll" href="#page-top">
                                <img src={require('../../image_src/pinyatamap-logo.png')} width={50} height={50} />
                            </a>
                            <a className="navbar-brand page-scroll" href="#page-top">
                                QUEEN PINEAPPLE FARMING
                            </a>
                        </div>
                    </div>
                </div>
                <div >
                    <ul className="nav navbar-nav navbar-right" >
                        <li>
                            <a href="#about" className="page-scroll">
                                About
                            </a>
                        </li>
                        <li>
                            <a href="#portfolio" className="page-scroll">
                                Screenshots
                            </a>
                        </li>
                        <li>
                            <a href="#team" className="page-scroll">
                                Agencies
                            </a>
                        </li>
                        <li>
                            <a href="#contact" className="page-scroll">
                                Contact
                            </a>
                        </li>

                        <Link to="/login" className="btn btn-custom btn-lg page-scroll">
                            Login
                        </Link>
                    </ul>

                </div>
            </div>
        </nav >
        // <nav id="menu" className="navbar navbar-default navbar-fixed-top">
        //     <div className="container">
        //         <div className="navbar-header">
        //             <button
        //                 type="button"
        //                 className="navbar-toggle collapsed"
        //                 data-toggle="collapse"
        //                 data-target="#bs-example-navbar-collapse-1"
        //             >
        //                 {" "}
        //                 <span className="sr-only">Toggle navigation</span>{" "}
        //                 <span className="icon-bar"></span>{" "}
        //                 <span className="icon-bar"></span>{" "}
        //                 <span className="icon-bar"></span>{" "}
        //             </button>
        //             <a className="navbar-brand page-scroll" href="#page-top">
        //                 QUEEN PINEAPPLE FARMING
        //             </a>{" "}
        //         </div>

        //         <div
        //             className="collapse navbar-collapse"
        //             id="bs-example-navbar-collapse-1"
        //         >
        //             <ul className="nav navbar-nav navbar-right">
        //                 <li>
        //                     <a href="#about" className="page-scroll">
        //                        About
        //                     </a>
        //                 </li>
        //                 <li>
        //                     <a href="#portfolio" className="page-scroll">
        //                         Gallery
        //                     </a>
        //                 </li>
        //                 <li>
        //                     <a href="#team" className="page-scroll">
        //                         Agencies
        //                     </a>
        //                 </li>
        //                 <li>
        //                     <a href="#contact" className="page-scroll">
        //                         Contact
        //                     </a>
        //                 </li>
        //             </ul>
        //         </div>
        //     </div>
        // </nav>
    );
}

export default Navbar