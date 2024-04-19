import React, { useEffect, useState } from 'react';
import { AppBar, Box, Container, Tab, Tabs, Toolbar, Typography } from '@mui/material';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase/Config';
import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import CostAndReturn from '../CostAndReturn';
import Farm from '../Farm';
import FarmsSchedule from '../FarmsSchedule';


const Geocollection = collection(db, "farms");

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

function FarmTabs() {
    const [value, setValue] = useState(0);
    const [markers, setMarkers] = useState([{ title: 'Farm', totalPriceAll: '', totalPriceMaterial: '' }]);
    const location = useLocation();
    const title = location.state ? location.state.title : '';

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    useEffect(() => {
        const getData = async () => {
            try {
                const data = await getDocs(Geocollection);
                const filteredData = data.docs
                    .filter(doc => doc.data().title === title) // Filter data based on title
                    .map(async doc => {
                        const { title } = doc.data();
                        const eventsCollection = collection(doc.ref, "components");
                        const eventsCollection1 = collection(doc.ref, "roi");
                        const eventsSnapshot = await getDocs(eventsCollection);
                        const eventsSnapshot1 = await getDocs(eventsCollection1);
                        const eventsData = eventsSnapshot.docs
                            .map(eventDoc => eventDoc.data());
                        const eventsData1 = eventsSnapshot1.docs
                            .map(eventDoc => eventDoc.data());

    
                        // Calculate total price for all events
                        const totalPriceAll = eventsData.reduce((acc, curr) => acc + (curr.totalPrice || 0), 0);

                        const totalReturn = "₱" + eventsData.concat(eventsData1)
                    .reduce((acc, curr) => acc + (curr.netReturn || 0), 0)
                    .toLocaleString();
    
                    const numpine = eventsData.concat(eventsData1).reduce((acc, curr) => acc + (curr.grossReturn || 0), 0);

                    const numbut = eventsData.concat(eventsData1).reduce((acc, curr) => acc + (curr.batterBall || 0), 0);

                    const numRoi = eventsData.concat(eventsData1).reduce((acc, curr) => acc + (curr.roi || 0), 0);



                        // Calculate total price for events with particular: "Material"
                        const totalPriceMaterial = eventsData
                            .filter(event => event.particular.toLowerCase() === "material")
                            .reduce((acc, curr) => acc + (curr.totalPrice || 0), 0);
    
                        // Calculate total price for events with particular: "labor"
                        const totalPriceLabor = eventsData
                            .filter(event => event.particular.toLowerCase() === "labor")
                            .reduce((acc, curr) => acc + (curr.totalPrice || 0), 0);
    
                        // Calculate percentages
                        const percentageMaterial = roundToTwoDecimals((totalPriceMaterial / totalPriceAll) * 100);
                        const percentageLabor = roundToTwoDecimals((totalPriceLabor / totalPriceAll) * 100);

                        const priceBut = (numbut * 2) ;
                        const pricePine = (numpine * 8) ;
                        const numRoi1 = roundToTwoDecimals(numRoi);
                        const numRoi2 = (numRoi1 +"%")
                        const numIor = (100- numRoi1);

                        const totalSale = (priceBut + pricePine);
                        const percentageBut = roundToTwoDecimals((priceBut / totalSale) * 100);
                        const percentagePine = roundToTwoDecimals((pricePine / totalSale) * 100);
                        const totalSale1 = "₱" + (priceBut + pricePine).toLocaleString();
                        return { title, events: eventsData.concat(eventsData1), totalReturn, numRoi2, numRoi, numRoi1, numIor, percentagePine, percentageBut, totalSale, totalSale1, priceBut, pricePine, numbut, numpine, totalPriceAll, totalPriceMaterial, totalPriceLabor, percentageMaterial, percentageLabor };
                    });
    
                const resolvedData = await Promise.all(filteredData);
                setMarkers(resolvedData);
                console.log("Events:", resolvedData); // Show events in console
            } catch (err) {
                console.error(err);
            }
        };
    
        if (title) {
            getData();
        }
    }, [title]);
    
    // Custom rounding function to round to two decimal places
    const roundToTwoDecimals = (num) => {
        return Math.round(num * 100) / 100;
    };
    
    
    
    
    return (
        <>
            <div style={{ backgroundColor: '#fff' }}> 
                <div>
                    <AppBar
                        position="absolute"
                        elevation={0}
                        style={{ backgroundColor: 'white' }}
                    >
                        <Container maxWidth="xl">
                            <Toolbar disableGutters>
                                <img src={require('../image_src/pinyatamap-logo.png')} width={50} height={50} marginLeft alt="" />
                                <Typography
                                    variant="h6"
                                    noWrap
                                    component="a"
                                    href="#app-bar-with-responsive-menu"
                                    sx={{
                                        mr: 2,
                                        display: 'flex',
                                        alignItems: 'center', // Center vertically
                                        fontFamily: 'monospace',
                                        fontWeight: 700,
                                        letterSpacing: '.3rem',
                                        color: 'green',
                                        textDecoration: 'none',
                                    }}
                                    style={{marginLeft:'10px'}}
                                >
                                    QUEEN PINEAPPLE FARMING
                                </Typography>
                            </Toolbar>
                        </Container>
                    </AppBar>
                </div>

                <div >
                    <h2 style={{ marginTop: '65px', fontFamily: 'monospace', color: 'orange', marginLeft: '20px' }}>{title}</h2>
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
                            <FarmsSchedule markers={markers} />
                            
                        </CustomTabPanel>
                        <CustomTabPanel value={value} index={3}>
                            <CostAndReturn markers={markers} />
                        </CustomTabPanel>
                    </Box>
                </div>
            </div>
        </>
    );
}

export default FarmTabs;



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