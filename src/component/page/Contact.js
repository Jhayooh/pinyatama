import EmailIcon from '@mui/icons-material/Email';
import FacebookIcon from '@mui/icons-material/Facebook';
import LanguageIcon from '@mui/icons-material/Language';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import emailjs from "emailjs-com";
import Heatmap from './Heatmap.js'
import React, { useState } from "react";

// const initialState = {
//     name: "",
//     email: "",
//     message: "",
// };

export const Contact = () => {
    // const [{ name, email, message }, setState] = useState(initialState);

    // const handleChange = (e) => {
    //     const { name, value } = e.target;
    //     setState((prevState) => ({ ...prevState, [name]: value }));
    // };

    // const clearState = () => setState({ ...initialState });

    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     console.log(name, email, message);

    //     // Replace below with your own Service ID, Template ID, and Public Key from your EmailJS account
    //     emailjs
    //         .sendForm("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", e.target, "YOUR_PUBLIC_KEY")
    //         .then(
    //             (result) => {
    //                 console.log(result.text);
    //                 clearState();
    //             },
    //             (error) => {
    //                 console.log(error.text);
    //             }
    //         );
    // };

    return (
        <div id="contact" style={{ fontFamily: 'Arial', borderColor: 'green' }}>
            <div className="container" style={{ alignContent: 'center', alignItems: 'center' }}>
                <div className="row">
                    {/* <div className="col-md-6">
                        <div className="section-title">
                            <p style={{ fontFamily: 'Arial', fontSize: 20 }}>
                                Please fill out the form below to send us an email and we will get back to you as soon as possible.
                            </p>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className="row">
                                <div className="col-md-6">
                                    <div>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            className="form-control"
                                            placeholder="Name"
                                            required
                                            onChange={handleChange}
                                            style={{borderColor:'green'}}
                                        />
                                        <p className="help-block text-danger"></p>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            className="form-control"
                                            placeholder="Email"
                                            required
                                            onChange={handleChange}
                                            style={{borderColor:'green'}}
                                        />
                                        <p className="help-block text-danger"></p>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <textarea
                                    name="message"
                                    id="message"
                                    className="form-control"
                                    rows="4"
                                    placeholder="Message"
                                    required
                                    onChange={handleChange}
                                    style={{borderColor:'green'}}
                                ></textarea>
                                <p className="help-block text-danger"></p>
                            </div>
                            <div id="success"></div>
                            <button type="submit" className="btn btn-outline-warning">
                                Send Message
                            </button>
                        </form>
                    </div> */}
                        <div className="contact-info">
                            <div className="row">
                                <div className="col-md-6">
                                <p style={{ color: 'black' }}>
                                    <span style={{ color: 'green' }}>
                                    <LocationOnIcon /> Address: <br />
                                    </span>
                                    2nd Floor Provincial Capitol Annex Building <br />
                                    Brgy. III, Daet Camarines Norte
                                </p>
                                <Heatmap />
                                </div>
                                <div className="col-md-6">
                                <p style={{ color: 'black' }}>
                                    <span style={{ color: 'green' }}>
                                    <PhoneIcon /> Telephone Number: <br />
                                    </span>
                                    054 721-0291
                                </p>
                                <p style={{ color: 'black' }}>
                                    <span style={{ color: 'green' }}>
                                    <EmailIcon /> Email Address:<br />
                                    </span>
                                    opagcamnorte@yahoo.com <br /> opagcamsnorte@gmail.com
                                </p>
                                <p style={{ color: 'black' }}>
                                    <span style={{ color: 'green' }}>
                                    <FacebookIcon /> Facebook:<br />
                                    </span>
                                    OPAg Camarines Norte
                                </p>
                                <p style={{ color: 'black' }}>
                                    <span style={{ color: 'green' }}>
                                    <LanguageIcon /> Website:<br />
                                    </span>
                                    <a href="https://opagcamnorte.com">https://opagcamnorte.com</a>
                                </p>
                                </div>
                            </div>
                            </div>  
                </div>
            </div>
        </div>
    );
};

export default Contact;
