import { Modal, Box, Dialog, DialogTitle, DialogContent, DialogActions, DialogContentText } from '@mui/material'
import React, { useState, useEffect } from 'react'
import * as XLSX from 'xlsx';
import Button from '@mui/material/Button';

import { Timestamp, collection, updateDoc, addDoc } from 'firebase/firestore'

// dababase
import { db } from '../firebase/Config';
import { useCollectionData } from 'react-firebase-hooks/firestore';

// icon
import UploadIcon from '@mui/icons-material/FileUploadOutlined';
import CloseIcon from '@mui/icons-material/CloseOutlined';

function Importer() {
    const [file, setFile] = useState(null)
    const [jsonData, setJsonData] = useState("")

    const [showModal, setShowModal] = useState(false)
    const [saving, setSaving] = useState(false)
    const [open, setOpen] = useState(false)

    const queryParti = collection(db, 'particulars');
    const [qParti, lParti, eParti] = useCollectionData(queryParti)
    const queryUsers = collection(db, 'users')
    const [users] = useCollectionData(queryUsers)

    const farmsColl = collection(db, 'farms')

    const handleClose = () => {
        setShowModal(false)
        setOpen(false)
    }

    useEffect(() => {
        setFile(null)
        setJsonData("")
    }, [showModal])


    function convertDate(excelDate) {
        const date = new Date(1900, 0, excelDate - 1);
        date.setDate(date.getDate() + (excelDate >= 60 ? 1 : 0)); // Excel leap year bug for 1900
        return Timestamp.fromDate(date);
    };

    const getPercentage = (pirsint, nambir) => {
        return (pirsint / 100) * nambir
    }

    async function calcRoi(components, roiRef) {
        let materialTotal = 5000
        let laborTotal = 0
        let costTotal = 0

        let grossReturn = 0
        let batterBall = 0

        let roi = 0
        let netReturn = 0

        components.forEach((component) => {
            if (component.particular.toLowerCase() === 'material') {
                if (component.name.toLowerCase() === 'planting materials') {
                    const qntyPrice = parseInt(component.qntyPrice)
                    grossReturn = getPercentage(90, qntyPrice) * 8
                    batterBall = getPercentage(10, qntyPrice) * 2
                }
                materialTotal += parseInt(component.totalPrice);
            } else if (component.particular.toLowerCase() === 'labor') {
                laborTotal += parseInt(component.totalPrice);
            }
        });

        costTotal = materialTotal + laborTotal

        const grossReturnAndBatter = grossReturn + batterBall
        netReturn = grossReturnAndBatter - costTotal;
        roi = (netReturn / grossReturnAndBatter) * 100;

        const roiDetails = {
            laborTotal,
            materialTotal,
            costTotal,
            grossReturn,
            batterBall,
            netReturn,
            roi
        };

        console.log("roi", roiDetails);

        const newRoi = await addDoc(roiRef, {
            ...roiDetails
        })
        await updateDoc(newRoi, { id: newRoi.id })

    }

    const handleConvert = () => {
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const data = e.target.result;
                const workbook = XLSX.read(data, { type: "binary" });
                const sheetName = workbook.SheetNames[0];
                const worksheet = workbook.Sheets[sheetName];
                const json = XLSX.utils.sheet_to_json(worksheet, { header: ['mun', 'brgy', 'farmerName', 'sex', 'area', 'plantNumber', 'start_date', 'cropStage', 'harvest_date'] });
                json.shift()
                const newJson = json.map(farm => ({
                    ...farm,
                    plantNumber: parseInt(farm.plantNumber.split(' ')[0]),
                    start_date: convertDate(farm.start_date),
                    harvest_date: convertDate(farm.harvest_date)
                }));
                setJsonData(newJson)
            };
            reader.readAsBinaryString(file);
        }
    }

    const getMult = (numOne, numTwo) => {
        const num = numOne * numTwo
        return parseFloat(num)
    }

    const saveInputs = async () => {
        if (!jsonData) {
            console.log(jsonData)
            return
        }

        // neeeeedd
        // area: area,
        // brgy: brgyCode,
        // farmerName: farmerName,
        // cropStage: cropStage,
        // start_date: startDate,
        // harvest_date: endDate,
        // geopoint: userLocation, -
        // mun: municipality,
        // title: farmName, -
        // plantNumber: base,
        // sex: sex,
        // brgyUID: user.uid,

        // abilabul
        // {
        //     "area": 0.4,
        //     "brgy": "Mampurog",
        //     "farmerName": "Constancio Chavez",
        //     "cropStage": "Vegetative",
        //     "start_date": {
        //       "seconds": 1635782400,
        //       "nanoseconds": 0
        //     },
        //     "harvest_date": {
        //       "seconds": 1677686400,
        //       "nanoseconds": 0
        //     }
        //     "mun": "San Lorenzo Ruiz",
        //     "plantNumber": 12000,
        //     "sex": "M",
        // },

        try {
            const promises = jsonData.map(async (farm) => {
                const newFarm = await addDoc(farmsColl, {
                    ...farm,
                    geopoint: null,
                    title: farm.farmerName.split(" ")[1] + ' QP Farm'
                })

                const result = users.find(user => user.brgy.toLowerCase() === farm.brgy.toLowerCase() && user.mun.toLowerCase() === farm.mun.toLowerCase());
                const brgyUID = result ? result.id : null;

                await updateDoc(newFarm, { id: newFarm.id, brgyUID: brgyUID })

                const farmComp = collection(db, `farms/${newFarm.id}/components`);
                const eventsRef = collection(db, `farms/${newFarm.id}/events`);
                const roiRef = collection(db, `farms/${newFarm.id}/roi`);

                const base = parseFloat(farm.plantNumber)
                console.log("base:", base);
                console.log("qparti", qParti);
                const newComponents = qParti.map(item => {
                    const newQnty = getMult(parseFloat(farm.area), item.defQnty)
                    console.log("newQnty:", newQnty)
                    return { ...item, qntyPrice: newQnty, totalPrice: getMult(newQnty, item.price), price: parseInt(item.price) };
                });
                console.log("component:", newComponents);

                newComponents.forEach(async (component) => {
                    try {
                        await addDoc(farmComp, {
                            ...component
                        })
                    } catch (e) {
                        console.log("error sa components:", e);
                    }
                })

                calcRoi(newComponents, roiRef)

                handleClose()

                const vegetativeDate = new Date(farm.start_date.toMillis());

                const floweringDate = new Date(vegetativeDate);
                floweringDate.setMonth(vegetativeDate.getMonth() + 10);

                const fruitingDate = new Date(floweringDate);
                fruitingDate.setMonth(floweringDate.getMonth() + 3);

                const harvestDate = new Date(fruitingDate);
                harvestDate.setMonth(fruitingDate.getMonth() + 5);

                const eRef_vegetative = await addDoc(eventsRef, {
                    group: newFarm.id,
                    title: "Vegetative",
                    className: "vegetative",
                    start_time: Timestamp.fromDate(vegetativeDate),
                    end_time: Timestamp.fromDate(floweringDate)
                });
                await updateDoc(eRef_vegetative, { id: eRef_vegetative.id })

                const eRef_flowering = await addDoc(eventsRef, {
                    group: newFarm.id,
                    title: "Flowering",
                    className: "flowering",
                    start_time: Timestamp.fromDate(floweringDate),
                    end_time: Timestamp.fromDate(fruitingDate)
                })
                await updateDoc(eRef_flowering, { id: eRef_flowering.id })

                const eRef_fruiting = await addDoc(eventsRef, {
                    group: newFarm.id,
                    title: "Fruiting",
                    className: "fruiting",
                    start_time: Timestamp.fromDate(fruitingDate),
                    end_time: Timestamp.fromDate(harvestDate)
                })
                await updateDoc(eRef_fruiting, { id: eRef_fruiting.id })
            })
            
            await Promise.all(promises)
            console.log("saving Dooooonnneee :>>>>");

        } catch (e) {
            console.log("json data: ", typeof jsonData)
            console.log("Saving Error: ", e);
        }

    }

    return (
        <>
            <Button variant='outlined' color='success' onClick={() => setShowModal(true)}><UploadIcon />Upload</Button>

            <Modal
                open={showModal}
                onClose={handleClose}
            >
                <Box sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    maxHeight: '92%',
                    overflowX: 'auto',
                    width: 400,
                    bgcolor: 'background.paper',
                    boxShadow: 24,
                    p: 4,
                }}>
                    <Button
                        variant='text'
                        sx={{
                            position: 'absolute',
                            top: 0,
                            right: 0,
                            zIndex: 1,
                            color: 'grey'
                        }}
                        onClick={() => setShowModal(false)}>
                        <CloseIcon />
                    </Button>

                    <input
                        type="file"
                        accept=".xls,.xlsx"
                        onChange={(e) => setFile(e.target.files[0])}
                    />
                    <Button
                        variant='contained'
                        color='success'
                        fullWidth
                        sx={{ justifyContent: 'center', alignItems: 'center', mt: 2, }}
                        onClick={() => {
                            handleConvert()
                            setOpen(true)
                        }}>
                        Save
                    </Button>
                </Box>
            </Modal >

            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Confirm mo beh"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        sure?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button variant='constained' onClick={saveInputs} autoFocus>
                        Agree
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default Importer