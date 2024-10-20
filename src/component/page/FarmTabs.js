import { Box, Button, Tab, Tabs, Typography } from '@mui/material';
import { collection } from 'firebase/firestore';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { db } from '../../firebase/Config';
import CostAndReturn from '../CostAndReturn';
import Farm from '../Farm';
import Profile from './Profile';
import Archive from './Archive';
import ArrowBackIcon from '@mui/icons-material/ArrowBackIos';
import ProductPrices from '../ProductPrices';
import Weather from './Weather';
import Fertilizer from './Fertilizer'
import Activities from './Activities'
// import * as XLSX from 'xlsx';
import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';

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

    const qntyParts = (label, fert) => {
        const thePart = parts.find(part => part.label === label && part.name.includes(fert));
        return thePart ? thePart.qntyPrice : 0; 
    };


    const handleSar = async () => {
        const workbook = new ExcelJS.Workbook();

        // Fetch and load the existing Excel template
        const response = await fetch('/reportOne.xlsx');
        const data = await response.arrayBuffer();

        await workbook.xlsx.load(data);

        // Get the first worksheet (1-based index)
        const worksheet = workbook.getWorksheet(1);

        // Modify cells F14, G14, H14
        worksheet.getCell('F14').value = farm.npk[0];
        worksheet.getCell('G14').value = farm.npk[1];
        worksheet.getCell('H14').value = farm.npk[2];
        worksheet.getCell('C8').value = farm.farmerName;
        worksheet.getCell('H7').value = farm.mun;
        worksheet.getCell('H8').value = farm.farmerName;
        worksheet.getCell('H10').value = farm.area;

        // Nutrients Requirements
        worksheet.getCell('B19').value = farm.data.first.nutrients.N;
        worksheet.getCell('D19').value = farm.data.first.nutrients.P;
        worksheet.getCell('H19').value = farm.data.first.nutrients.K;
        worksheet.getCell('B20').value = farm.data.second.nutrients.N;
        worksheet.getCell('D20').value = farm.data.second.nutrients.P;
        worksheet.getCell('H20').value = farm.data.second.nutrients.K;

        // Fertilizer Recommendation
        // - first
        worksheet.getCell('C27').value = qntyParts(1, "14-14-14");
        worksheet.getCell('D27').value = qntyParts(1, "46-0-0");
        worksheet.getCell('F27').value = qntyParts(1, "0-0-60");
        worksheet.getCell('H27').value = qntyParts(1, "16-20-0");
        // - 4th
        worksheet.getCell('C28').value = qntyParts(4, "14-14-14");
        worksheet.getCell('D28').value = qntyParts(4, "46-0-0");
        worksheet.getCell('F28').value = qntyParts(4, "0-0-60");
        worksheet.getCell('H28').value = qntyParts(4, "16-20-0");
        // - 7th
        worksheet.getCell('C29').value = qntyParts(7, "14-14-14");
        worksheet.getCell('D29').value = qntyParts(7, "46-0-0");
        worksheet.getCell('F29').value = qntyParts(7, "0-0-60");
        worksheet.getCell('H29').value = qntyParts(7, "16-20-0");
        // - 10th
        worksheet.getCell('C30').value = qntyParts(10, "14-14-14");
        worksheet.getCell('D30').value = qntyParts(10, "46-0-0");
        worksheet.getCell('F30').value = qntyParts(10, "0-0-60");
        worksheet.getCell('H30').value = qntyParts(10, "16-20-0");

        console.log("worksheet ", worksheet);

        // Write the modified workbook to a buffer
        const buffer = await workbook.xlsx.writeBuffer();

        // Create a Blob from the buffer and trigger the download
        const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8' });
        saveAs(blob, `${farm.title.trim()}.xlsx`);
    }

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
                    {parts && <Button onClick={handleSar}>Download SAR</Button>}
                </Box>
                <Box style={{ width: '100%', padding: '10px' }}>
                    <Box style={{
                        display: 'flex',
                        justifyContent: 'center',
                        width: '100%',
                        position: 'sticky',
                        top: 0,
                        paddingY: '10px',
                        paddingBottom: '10px',
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
                            variant="scrollable"
                            scrollButtons="auto"
                        >
                            <Tab
                                label="Pagsusuri ng Gastos at Kita"
                                {...a11yProps(0)}
                                sx={{
                                    color: value === 0 ? 'orange' : 'green',
                                    '&:hover': {
                                        color: 'orange',
                                    },
                                }}
                            />
                            <Tab
                                label="Aktibidades"
                                {...a11yProps(1)}
                                sx={{
                                    color: value === 1 ? 'orange' : 'green',
                                    '&:hover': {
                                        color: 'orange',
                                    },
                                }}
                            />
                            {/* <Tab
                                label="Panahon"
                                {...a11yProps(1)}
                                sx={{
                                    color: value === 2 ? 'orange' : 'green',
                                    '&:hover': {
                                        color: 'orange',
                                    },
                                }}
                            /> */}
                            <Tab
                                label="Galeriya ng Sakahan"
                                {...a11yProps(1)}
                                sx={{
                                    color: value === 2 ? 'orange' : 'green',
                                    '&:hover': {
                                        color: 'orange',
                                    },
                                }}
                            />
                            <Tab
                                label="Detalye ng Sakahan"
                                {...a11yProps(1)}
                                sx={{
                                    color: value === 3 ? 'orange' : 'green',
                                    '&:hover': {
                                        color: 'orange',
                                    },
                                }}
                            />
                            {/* <Tab
                                label='Arkibo'
                                {...a11yProps(3)}
                                sx={{
                                    color: value === 4 ? 'orange' : 'green',
                                    '&:hover': {
                                        color: 'orange',
                                    },
                                }}
                            /> */}


                        </Tabs>
                    </Box>
                    <CustomTabPanel value={value} index={0}>
                        {roi && <CostAndReturn
                            markers={markers}
                            parts={parts}
                            farm={farm}
                            roi={roi}
                            particularData={particularData}
                            pineapple={pineapple} />
                        }
                    </CustomTabPanel>
                    <CustomTabPanel value={value} index={1}>
                        {roi && <Activities
                            roi={roi}
                            farm={farm}
                            particularData={particularData}
                            parts={parts}
                        />}
                    </CustomTabPanel>
                    {/* <CustomTabPanel value={value} index={2}>
                        <Weather farm={farm} />
                    </CustomTabPanel> */}
                    <CustomTabPanel value={value} index={2}>
                        <Farm farmId={farm.id} />
                    </CustomTabPanel>
                    <CustomTabPanel value={value} index={3}>
                        <Profile user={user} farm={farm} />
                    </CustomTabPanel>
                    <CustomTabPanel value={value} index={4}>
                        <Archive fieldId={farm.fieldId} />
                    </CustomTabPanel>

                </Box>
            </div>
        </>
    );
}
