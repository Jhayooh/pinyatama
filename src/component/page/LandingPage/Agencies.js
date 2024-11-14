import React from 'react'
import { Box } from '@mui/material';

import POCN from '../../image_src/POCN_logo.png'
import OPAG from '../../image_src/OPAG_logo.png'
import DOA from '../../image_src/DOA_logo.png'

const agencyList = [
    {
        name: "Camarines Norte",
        logo: `${POCN}`,
        url: 'https://www.camsnorte.com'
    },
    {
        name: "OPAG - Cam Norte",
        logo: `${OPAG}`,
        url: 'https://www.opagcamnorte.com'

    },
    {
        name: "DA - CNLRRS",
        logo: `${DOA}`,
        url: 'https://www.da.gov.ph'
    }
]
const Agencies = () => {

    const handleClick = (url) => {
        window.open(url, '_blank', 'noopener,noreferrer');
    };
    return (
        <div id="team" className="text-center">
            <div className="container">
                <div className="col-md-8 col-md-offset-2 section-title">
                    <h2>AGENCIES</h2>
                    <p>
                        Meet the Supported Agencies
                    </p>
                </div>
                <div className="row">
                    {agencyList.map((d, i) => (
                        <div onClick={() => handleClick(d.url)}
                            key={`${d.name}-${i}`} className="col-md-4 col-sm-12 team">
                            <div className="thumbnail">
                                {" "}
                                <img src={d.logo} alt="..." className="team-img" />
                                <div className="caption">
                                    <h4>{d.name}</h4>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Agencies