import React from 'react'
import { Box } from '@mui/material';

const agencyList = [
    {
        name: "Camarines Norte",
        logo: "POCN_logo.png",
        url: 'https://www.camsnorte.com'
    },
    {
        name: "OPAG - Cam Norte",
        logo: "OPAG_logo.png",
        url: 'https://www.opagcamnorte.com'

    },
    {
        name: "DA - CNLRRS",
        logo: "DOA_logo.png",
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
                <div style={{display:'flex', flexDirection:'row', justifyContent:'space-between' }}>
                    {agencyList.map((agency, index) => (

                        <Box onClick={() => handleClick(agency.url)} 
                        sx={{display:'flex',
                         flexDirection:'column', 
                         justifyContent:'space-between',
                         backgroundColor:'#93d6b0',
                         padding:10,
                         borderRadius:10}}>
                            <img
                                src={require(`../../image_src/${agency.logo}`)}
                                alt={agency.name}
                                className="logo-image"
                                style={{ width: 200, height: 200, backgroundColor:'white', padding:10, borderRadius:10 }}
                            />
                            <h3 style={{ marginTop: 5 }}>{agency.name}</h3>
                        </Box>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Agencies