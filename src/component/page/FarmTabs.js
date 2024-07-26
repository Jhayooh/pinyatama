import { Box, Button, Tab, Tabs, Typography } from '@mui/material';
import { collection } from 'firebase/firestore';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { db } from '../../firebase/Config';
import CostAndReturn from '../CostAndReturn';
import Farm from '../Farm';
import FarmsSchedule from '../FarmsSchedule1';
import Profile from './Profile';
import Archive from './Archive';
import ArrowBackIcon from '@mui/icons-material/ArrowBackIos';
import ProductPrices from '../ProductPrices';
import Weather from './Weather';
import Activities from './Activities'

import BackIcon from '@mui/icons-material/ArrowBackIosNew';

function CustomTabPanel({ children, value, index }) {

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
        >
            {value === index && (
                <Box sx={{ paddingX: 2, paddingY: 2, height: '100%' }}>
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

export default function FarmTabs({ farms, setShow, user, event, particularData, pineapple }) {
    var farm = farms[0]
    var user = user[0]
    const roundToTwoDecimals = (num) => {
        return Math.round(num * 100) / 100;
    };
    const [value, setValue] = useState(0);
    const eventsColl = collection(db, `farms/${farm.id}/events`)
    const [events] = useCollectionData(eventsColl)
    const partColl = collection(db, `farms/${farm.id}/components`);
    const [parts, loading, error] = useCollectionData(partColl);
    const roiColl = collection(db, `farms/${farm.id}/roi`)
    const [roi] = useCollectionData(roiColl)
    const totalPine = roi ? roi.reduce((total, roiItem) => total + roiItem.grossReturn, 0) : 0;
    const totalPriceLabor = roi ? roi.reduce((total, roiItem) => total + roiItem.laborTotal, 0) : 0;
    const totalPriceMaterial = roi ? roi.reduce((total, roiItem) => total + roiItem.materialTotal, 0) : 0;
    const totalPriceAll = roi ? roi.reduce((total, roiItem) => total + roiItem.costTotal, 0) : 0;
    const totalBat = roi ? roi.reduce((total, roiItem) => total + roiItem.butterBall, 0) : 0;
    const numRoi = roi ? roi.reduce((total, roiItem) => total + roiItem.roi, 0) : 0;

    const totalBats = totalBat
    const totalPines = totalPine
    const totalPines1 = totalPines + totalBats
    const priceBat = (totalBat * 2);
    const pricePine = (totalPine * 8);
    const totalSale = (priceBat + pricePine);
    const numRoi1 = roundToTwoDecimals(numRoi);
    const numRoi2 = (numRoi1 + "%")
    const numIor = (100 - numRoi1);

    const percentageMaterial = roundToTwoDecimals((totalPriceMaterial / totalPriceAll) * 100);
    const percentageLabor = roundToTwoDecimals((totalPriceLabor / totalPriceAll) * 100);
    let markers = [
        { name: 'totalPines', totalPine: 0 }
    ];
    const percentageBut = roundToTwoDecimals((priceBat / totalSale) * 100);
    const percentagePine = roundToTwoDecimals((pricePine / totalSale) * 100);
    const totalSale1 = "₱" + (totalBat + totalPine).toLocaleString();

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    markers = markers.map(marker => {
        switch (marker.name) {
            case 'totalPines':
                return {
                    ...marker,
                    totalBats: totalBats,
                    totalPines: totalPines,
                    totalPriceMaterial: totalPriceMaterial,
                    totalPriceLabor: totalPriceLabor,
                    totalSale1: totalSale1,
                    priceBut: priceBat,
                    numRoi1: numRoi1,
                    numIor: numIor,
                    numbut: totalBat,
                    numpine: totalPine,
                    numRoi2: numRoi2,
                };

            default:
                return marker;
        }
    });
    return (
        <>
            <div>
                <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                    <Button onClick={() => { setShow(false) }} sx={{ color: 'green' }}><BackIcon /></Button>
                    <h2 style={{ fontFamily: 'monospace', color: 'orange', marginLeft: '20px', flex: 1 }}>{farm.title}</h2>
                </Box>
                <Box style={{ width: '100%', padding: '10px' }}>
                    <Box style={{
                        display: 'flex',
                        justifyContent: 'center',
                        width: '100%',
                        position: 'sticky',
                        top: 0,
                        padding: '10px',
                        zIndex: 9999,
                    }}>
                        <Tabs
                            value={value}
                            onChange={handleChange}
                            aria-label="basic tabs example"
                            centered
                            // variant='fullWidth'
                            TabIndicatorProps={{ style: { background: 'orange' } }}
                            sx={{
                                backgroundColor: '#fff',
                                boxShadow: 2,
                                borderRadius: 2,
                                // width: '100%'
                                position: 'sticky',
                                zIndex: 9
                            }}
                        >
                            <Tab
                                label="Farm Profile"
                                {...a11yProps(0)}
                                sx={{
                                    color: value === 0 ? 'orange' : 'green',
                                    '&:hover': {
                                        color: 'orange',
                                    },
                                }}
                            />
                            <Tab
                                label="Galeriya ng Sakahan"
                                {...a11yProps(1)}
                                sx={{
                                    color: value === 1 ? 'orange' : 'green',
                                    '&:hover': {
                                        color: 'orange',
                                    },
                                }}
                            />
                            <Tab
                                label="Panahon"
                                {...a11yProps(1)}
                                sx={{
                                    color: value === 2 ? 'orange' : 'green',
                                    '&:hover': {
                                        color: 'orange',
                                    },
                                }}
                            />
                            <Tab
                                label="AKtibidades"
                                {...a11yProps(1)}
                                sx={{
                                    color: value === 3 ? 'orange' : 'green',
                                    '&:hover': {
                                        color: 'orange',
                                    },
                                }}
                            />
                            <Tab
                                label="Pagsusuri ng Gastos at Kita"
                                {...a11yProps(2)}
                                sx={{
                                    color: value === 4 ? 'orange' : 'green',
                                    '&:hover': {
                                        color: 'orange',
                                    },
                                }}
                            />
                            <Tab
                                label='Arkibo'
                                {...a11yProps(3)}
                                sx={{
                                    color: value === 5 ? 'orange' : 'green',
                                    '&:hover': {
                                        color: 'orange',
                                    },
                                }}
                            />

                        </Tabs>
                    </Box>
                    <CustomTabPanel value={value} index={0}>
                        <Profile user={user} farm={farm} />
                    </CustomTabPanel>
                    <CustomTabPanel value={value} index={1}>
                        <Farm farmId={farm.id} />
                    </CustomTabPanel>
                    <CustomTabPanel value={value} index={2}>
                        <Weather />
                    </CustomTabPanel>
                    <CustomTabPanel value={value} index={3}>
                        {roi && <Activities
                            roi={roi}
                            farm={farm}
                            particularData={particularData}
                        />}
                    </CustomTabPanel>
                    <CustomTabPanel value={value} index={4}>
                        {roi && <CostAndReturn
                            markers={markers}
                            parts={parts}
                            farm={farm}
                            roi={roi}
                            particularData={particularData}
                            pineapple={pineapple} />
                        }
                    </CustomTabPanel>
                    <CustomTabPanel value={value} index={5}>
                        <Archive fieldId={farm.fieldId} />
                    </CustomTabPanel>

                </Box>
            </div>
        </>
    );
}
