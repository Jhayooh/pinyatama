import React, { useEffect, useState } from 'react';
import { AppBar, Box, Container, Tab, Tabs, Toolbar, Typography } from '@mui/material';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase/Config';
import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import CostAndReturn from '../CostAndReturn';
import Farm from '../Farm';
import FarmsSchedule from '../FarmsSchedule1';
import { useCollectionData } from 'react-firebase-hooks/firestore';

function CustomTabPanel({ children, value, index }) {
    
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
        >
            {value === index && (
                <Box sx={{ p: 4 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export default function FarmTabs({ farm }) {
    var farm = farm[0]
    const roundToTwoDecimals = (num) => {
        return Math.round(num * 100) / 100;
    };
    const [value, setValue] = useState(0);
    const eventsColl = collection(db, `farms/${farm.id}/events`)
  const [events] = useCollectionData(eventsColl)
  const roiColl = collection(db, `farms/${farm.id}/roi`)
  const [roi] = useCollectionData(roiColl)
  const totalPine = roi ? roi.reduce((total, roiItem) => total + roiItem.grossReturn, 0) : 0;
  const totalPriceLabor = roi ? roi.reduce((total, roiItem) => total + roiItem.laborTotal, 0) : 0;
  const totalPriceMaterial = roi ? roi.reduce((total, roiItem) => total + roiItem.materialTotal, 0) : 0;
  const totalPriceAll = roi ? roi.reduce((total, roiItem) => total + roiItem.costTotal, 0) : 0;
  const totalBat = roi ? roi.reduce((total, roiItem) => total + roiItem.batterBall, 0) : 0;
  const numRoi = roi ? roi.reduce((total, roiItem) => total + roiItem.roi, 0) : 0;
  const totalBats = totalBat/2
  const totalPines = totalPine/8
const totalPines1 = totalPines+ totalBats
const priceBat = (totalBat / 2) ;
const pricePine = (totalPine / 8) ;
const totalSale = (priceBat + pricePine);
const numRoi1 = roundToTwoDecimals(numRoi);
const numRoi2 = (numRoi1 +"%")
const numIor = (100- numRoi1);
// Calculate percentages
const percentageMaterial = roundToTwoDecimals((totalPriceMaterial / totalPriceAll) * 100);
const percentageLabor = roundToTwoDecimals((totalPriceLabor / totalPriceAll) * 100);
let markers = [
    { name: 'totalPines', totalPine: 0 }
    
  ];
  
  

const percentageBut = roundToTwoDecimals((priceBat / totalSale) * 100);
const percentagePine = roundToTwoDecimals((pricePine / totalSale) * 100);
const totalSale1 = "₱" + (totalBat + totalPine).toLocaleString();
  // si 3
  console.log(farm);
  console.log(events);
  console.log("test"+totalSale);

  console.log("this is "+ totalPines);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    markers = markers.map(marker => {
        switch (marker.name) {
          case 'totalPines':
            return { ...marker, totalPine: pricePine,
                totalPriceMaterial: totalPriceMaterial,
                totalPriceLabor: totalPriceLabor,
                totalSale1: totalSale1,
                priceBut: priceBat,
                numRoi1:numRoi1,
                numIor: numIor,
                numbut: totalBat,
                numpine: totalPine,
                numRoi2: numRoi2,

              };
          
          default:
            return marker;
        }
      });
      console.log(markers);
 
    
  
    // Custom rounding function to round to two decimal places
   

    
    return (
        <>
            <div style={{ backgroundColor: '#fff' }}> 
                

                <div >
                    <h2 style={{ marginTop: '65px', fontFamily: 'monospace', color: 'orange', marginLeft: '20px' }}>{farm.title}</h2>
                    <span style={{ fontFamily: 'monospace', marginLeft: '20px' }}>Daet, Camarines Norte</span>
                    <Box style={{ width: '100%', backgroundColor: '#22b14c', padding: '30px' }}>
                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                            <Tabs
                                value={value}
                                onChange={handleChange}
                                aria-label="basic tabs example"
                                TabIndicatorProps={{ style: { background: 'orange' } }}
                            >
                                <Tab
                                    label="Farm Profile"
                                    {...a11yProps(0)}
                                    sx={{
                                        color: value === 0 ? 'orange' : 'white',
                                        '&:hover': {
                                            color: 'orange',
                                        },
                                    }}
                                />
                                <Tab
                                    label="Gallery of Farm"
                                    {...a11yProps(1)}
                                    sx={{
                                        color: value === 1 ? 'orange' : 'white',
                                        '&:hover': {
                                            color: 'orange',
                                        },
                                    }}
                                />
                                <Tab
                                    label="Schedule of Farm"
                                    {...a11yProps(2)}
                                    sx={{
                                        color: value === 2 ? 'orange' : 'white',
                                        '&:hover': {
                                            color: 'orange',
                                        },
                                    }}
                                />
                                <Tab
                                    label="Cost and Return Analysis"
                                    {...a11yProps(3)}
                                    sx={{
                                        color: value === 3 ? 'orange' : 'white',
                                        '&:hover': {
                                            color: 'orange',
                                        },
                                    }}
                                />
                            </Tabs>
                        </div>
                        <CustomTabPanel value={value} index={0}>
                            <Farm />
                        </CustomTabPanel>
                        <CustomTabPanel value={value} index={1}>
                            <Farm />
                        </CustomTabPanel>
                        <CustomTabPanel value={value} index={2}>
                            <FarmsSchedule farms= {farm} events={events} />
                            
                        </CustomTabPanel>
                        <CustomTabPanel value={value} index={3}>
                            <CostAndReturn markers={markers}/>
                        </CustomTabPanel>
                    </Box>
                </div>
            </div>
        </>
    );
}




// import { Tab, Tabs } from '@mui/material'
// import AppBar from '@mui/material/AppBar'
// import Container from '@mui/material/Container'
// import Toolbar from '@mui/material/Toolbar'
// import Typography from '@mui/material/Typography'
// import React from 'react'
// import CostAndReturn from '../CostAndReturn'
// import Farm from '../Farm'
// import { eventFarmOne, farmOne } from '../FarmsConstant'
// import FarmsSchedule from '../FarmsSchedule'
// import './FarmTabs.css'


// function FarmTabs() {

//     const tabsTitle = [
//         "Mga Litrato",   
//         "Skedyul ng mga Gawain",
//         "Pagsusuri ng Gastos at Pagbabalik"
//     ]
//     return (
//         <>
//             <div style={{backgroundColor:'green'}}>
//                 <div>
//                     <AppBar
//                         position="absolute"
//                         elevation={0}
//                         style={{ backgroundColor: 'white' }}

//                     >

//                         {/* <AppBar position="fixed" elevation={4} style={{ backgroundColor: 'transparent', backdropFilter: 'blur(8px)', boxShadow: 'none' }}> */}
//                         <Container maxWidth="xl">
//                             <Toolbar disableGutters>
//                                 <img src={require('../image_src/pinyatamap-logo.png')} width={50} height={50} marginLeft />
//                                 <Typography
//                                     variant="h6"
//                                     noWrap
//                                     component="a"
//                                     href="#app-bar-with-responsive-menu"
//                                     sx={{
//                                         mr: 2,
//                                         display: { xs: 'none', md: 'flex' },
//                                         fontFamily: 'monospace',
//                                         fontWeight: 700,
//                                         letterSpacing: '.3rem',
//                                         color: 'green',
//                                         textDecoration: 'none',
//                                     }}
//                                 >
//                                     QUEEN PINEAPPLE FARMING
//                                 </Typography>


//                             </Toolbar>
//                         </Container>
//                     </AppBar>

//                 </div>
//                 <div className='farm-tab' >
//                     <div className='farm-tab-container' >
//                         <h2 style={{ marginTop: '50px', fontFamily: 'monospace', color: 'orange' }}>Pangalan ng Bukid</h2>
//                         <span>Daet, Camarines Norte</span>
//                         <Tabs
//                             defaultActiveKey="profile"
//                             id="fill-tab-example"
//                             className="mb-3"
//                             fill
//                         >
//                             <Tab eventKey="home" title="Mga Litrato">
//                                 <Farm />
//                             </Tab>
//                             <Tab eventKey="profile" title="Skedyul ng mga Gawain">
//                                 <FarmsSchedule farms={farmOne} events={eventFarmOne} />
//                             </Tab>
//                             <Tab eventKey="longer-tab" title="Pagsusuri ng Gastos at Pagbabalik">
//                                 <CostAndReturn />
//                             </Tab>
//                         </Tabs>
//                     </div>
//                 </div>
//             </div>
//         </>
//     )
// }

// export default FarmTabs