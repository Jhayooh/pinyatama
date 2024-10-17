import {
    Alert,
    Backdrop,
    Box,
    Button,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    fabClasses,
    InputAdornment,
    MenuItem,
    Modal,
    Select,
    StepContent,
    TextField,
    Typography,
    Snackbar,
    FormControl,
    InputLabel
} from "@mui/material";
import Grid from '@mui/material/Unstable_Grid2';
import React, { useEffect, useState } from "react";
import Carousel from 'react-bootstrap/Carousel';
import { styled } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Check from '@mui/icons-material/Check';
import SettingsIcon from '@mui/icons-material/Settings';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import VideoLabelIcon from '@mui/icons-material/VideoLabel';
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';

import { addDoc, collection, doc, orderBy, query, updateDoc, Timestamp } from "firebase/firestore";
import { db } from "../../firebase/Config";

// chart
import Doughnut from '../chart/Doughnut'
import { useCollectionData } from "react-firebase-hooks/firestore";
import FarmsSchedule from "../FarmsSchedule";

const Activities = ({ roi, farm, particularData, parts }) => {
    const [isAdd, setIsAdd] = useState(false)

    const activityColl = collection(db, `farms/${farm.id}/activities`)
    const componentsColl = collection(db, `farms/${farm.id}/components`)
    const activityQuery = query(activityColl, orderBy('createdAt'))
    const [activities] = useCollectionData(activityQuery)

    const eventsColl = collection(db, `farms/${farm.id}/events`)
    const eventsQuery = query(eventsColl, orderBy('createdAt'))
    const [e] = useCollectionData(eventsQuery)

    const [newActivities, setNewActivities] = useState([])
    const [fertilizer, setFertilizer] = useState(null)
    const [material, setMaterial] = useState(null)
    const [compAct, setCompAct] = useState(null)
    const [events, setEvents] = useState(null)

    const [stepIndex, setStepIndex] = useState(-1)

    const formatDate = (date) => {
        return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
    }

    const formatTime = (date) => {
        return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
    }

    const stepStyle = {
        backgroundColor: '#E7F3E7'
    }
    useEffect(() => {
        if (!e) return
        console.log('eveeennntttsss', e);
        setEvents(e)
    }, [e])


    useEffect(() => {
        if (!parts) return
        console.log("the parts sa activities:", parts);

        const ferts = parts.filter(part => part.parent.toLowerCase() === 'fertilizer');
        const mat = parts.filter(part => part.particular.toLowerCase() === 'material');
        setFertilizer(ferts)
        setMaterial(mat)
        setCompAct([...ferts, ...mat])
    }, [parts])


    useEffect(() => {
        if (!activities) return
        // const revAct = activities.slice().reverse()
        setNewActivities(prev => [{
            createdAt: farm.start_date,
            label: 'Araw ng Pagtanim ng Pinya',
            compId: '',
            qnty: 0,
        }, ...activities])
    }, [activities])

    const QontoConnector = styled(StepConnector)(({ theme }) => ({
        [`&.${stepConnectorClasses.alternativeLabel}`]: {
            top: 10,
            left: 'calc(-50% + 16px)',
            right: 'calc(50% + 16px)',
        },
        [`&.${stepConnectorClasses.active}`]: {
            [`& .${stepConnectorClasses.line}`]: {
                borderColor: '#40A040',
            },
        },
        [`&.${stepConnectorClasses.completed}`]: {
            [`& .${stepConnectorClasses.line}`]: {
                borderColor: '#40A040',
            },
        },
        [`& .${stepConnectorClasses.line}`]: {
            borderColor: theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
            borderTopWidth: 3,
            borderRadius: 1,
            marginLeft: 42,
            height: 22
        },
    }));

    const QontoStepIconRoot = styled('div')(({ theme, ownerState }) => ({
        color: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#eaeaf0',
        display: 'flex',
        height: 22,
        alignItems: 'center',
        ...(ownerState.active && {
            color: '#40A040',
        }),
        '& .QontoStepIcon-completedIcon': {
            color: '#40A040',
            zIndex: 1,
            fontSize: 18,
        },
        '& .QontoStepIcon-circle': {
            width: 8,
            height: 8,
            borderRadius: '50%',
            backgroundColor: 'currentColor',
        },
    }));

    function QontoStepIcon(props) {
        const { active, completed, className } = props;

        return (
            <QontoStepIconRoot ownerState={{ active }} className={className}>
                {completed ? (
                    <Check className="QontoStepIcon-completedIcon" />
                ) : (
                    <div className="QontoStepIcon-circle" />
                )}
            </QontoStepIconRoot>
        );
    }
    const handleModalClose = () => {
        setIsAdd(false);
    };


    function ethrelValid(currdate, start_date) {
        const monthEight = new Date(start_date.setMonth(start_date.getMonth() + 10))
        const monthTwelve = new Date(start_date.setMonth(start_date.getMonth() + 12))
        const bool = currdate >= monthEight && currdate <= monthTwelve
        return bool
    }

    const getMult = (numOne, numTwo) => {
        const num = numOne * numTwo
        return Math.round(num * 10) / 10
    }

    const [alert, setAlert] = useState({
        visible: false,
        message: "",
        severity: "info",
        vertical: "top",
        horizontal: 'center'
    })

    const HandleAddMouse = () => {
        const [fert, setFert] = useState('')
        const [bilang, setBilang] = useState(0)
        const [comps, setComps] = useState({ qntyPrice: 0, foreignId: '' })

        // error
        const [bilangError, setBilangError] = useState(false)

        const delay = ms => new Promise(res => setTimeout(res, ms));

        const [saving, setSaving] = useState(false)

        function plantPercent(part, total) {
            return Math.round((parseInt(part) / total) * 100)
        }

        const handleSave = async () => {
            setSaving(true)
            try {
                // eventsssss pleaseeee helpp hahahahha
                const currDate = new Date()
                const theLabel = compAct.find(obj => obj.id === fert)
                console.log("the label", theLabel);

                if (theLabel.name.toLowerCase() === "flower inducer (ethrel)" && events) {
                    const vege_event = events.find(p => p.className === 'vegetative')
                    const date_diff = currDate - vege_event.end_time.toDate()

                    if (farm.plantNumber - farm.ethrel === 0) {
                        await delay(1000)
                        setSaving(false)
                        handleModalClose()
                        setAlert({
                            visible: true,
                            message: "Hindi ka na puwedeng mag dagdag ng Ethrel",
                            severity: "warning",
                            vertical: 'top',
                            horizontal: 'center'
                        });
                        return
                    }
                    if (!ethrelValid(currDate, vege_event.start_time.toDate())) {
                        await delay(1000)
                        setSaving(false)
                        handleModalClose()
                        setAlert({
                            visible: true,
                            message: "Hindi ka puwedeng mag lagay ng Ethrel",
                            severity: "warning",
                            vertical: 'top',
                            horizontal: 'center'
                        });
                        return
                    }
                    events.map(async (e) => {
                        switch (e.className.toLowerCase()) {
                            case 'vegetative':
                                e.end_time = Timestamp.fromDate(currDate)
                                e.title = `${e.title} - ${bilang} (${plantPercent(bilang, farm.plantNumber)}%)`
                                const vegeEvent = await addDoc(collection(db, `farms/${farm.id}/events`), {
                                    ...e,
                                    className: e.className + 'Actual',
                                    createdAt: currDate,
                                });
                                await updateDoc(vegeEvent, { id: vegeEvent.id });
                                break;
                            case 'flowering':
                                e.start_time = Timestamp.fromDate(currDate)
                                const st = new Date(e.start_time.toDate())
                                st.setMonth(st.getMonth() + 1)
                                e.end_time = Timestamp.fromMillis(st)
                                const flowEvent = await addDoc(collection(db, `farms/${farm.id}/events`), {
                                    ...e,
                                    className: e.className + 'Actual',
                                    createdAt: currDate,
                                });
                                await updateDoc(flowEvent, { id: flowEvent.id });
                                break;
                            case 'fruiting':
                                const fru_st = new Date(e.start_time.toMillis() + date_diff)
                                e.start_time = Timestamp.fromDate(fru_st)
                                // e.end_time = Timestamp.fromMillis(e.end_time.toMillis() + date_diff)
                                const fru_et = new Date(e.start_time.toDate())
                                fru_et.setMonth(fru_et.getMonth() + 3)
                                fru_et.setDate(fru_et.getDate() + 15)
                                e.end_time = Timestamp.fromDate(fru_et)
                                const fruEvent = await addDoc(collection(db, `farms/${farm.id}/events`), {
                                    ...e,
                                    className: e.className + 'Actual',
                                    createdAt: currDate,
                                });
                                await updateDoc(fruEvent, { id: fruEvent.id });
                                break;
                            default:
                                break;
                        }


                    })

                    await addDoc(activityColl, {
                        createdAt: currDate,
                        label: theLabel.name,
                        compId: fert,
                        qnty: comps.qntyPrice
                    });
                    // update farm isEthrel
                    await updateDoc(doc(db, `farms/${farm.id}`), {
                        isEthrel: currDate,
                        ethrel: farm.ethrel + bilang
                    })
                    const newCompAct = await addDoc(componentsColl, {
                        ...theLabel,
                        type: "a"
                    })
                    await updateDoc(newCompAct, { id: newCompAct.id })
                    setSaving(false)
                    setAlert({
                        visible: true,
                        message: `ikaw ay naglagay ng ethrel ngayong ${formatDate(currDate)}`,
                        severity: "success",
                        vertical: 'bottom',
                        horizontal: 'left'
                    });
                    handleModalClose()
                } else {
                    await addDoc(activityColl, {
                        createdAt: currDate,
                        label: theLabel.name,
                        compId: fert,
                        qnty: comps.qntyPrice
                    });

                    const newCompAct = await addDoc(componentsColl, {
                        ...theLabel,
                        type: "a"
                    })
                    await updateDoc(newCompAct, { id: newCompAct.id })

                    setSaving(false)
                    setAlert({
                        visible: true,
                        message: `ikaw ay naglagay ng fertilizer ngayong ${formatDate(currDate)}`,
                        severity: "success",
                        vertical: 'bottom',
                        horizontal: 'center'
                    });
                }
                handleModalClose()
            } catch (error) {
                console.error('error updating document', error);
            }
        }

        const handleClose = () => {
            setAlert({ ...alert, visible: false });
        };

        return (
            <>
                <Snackbar
                    anchorOrigin={{ vertical: alert.vertical, horizontal: alert.horizontal }}
                    open={alert.visible}
                    autoHideDuration={5000}
                    onClose={handleClose}
                >
                    <Alert variant='filled' severity={alert.severity}>
                        {alert.message}
                    </Alert>
                </Snackbar>
                <Modal open={isAdd} onClose={handleModalClose} aria-labelledby="edit-row-modal">
                    <Box
                        sx={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            bgcolor: 'background.paper',
                            borderRadius: '5px',
                            boxShadow: 24,
                            paddingX: 2,
                            paddingY: 4,
                            width: 340,
                        }}
                    >
                        <Backdrop open={saving} onClick={() => setSaving(false)} sx={{ color: '#fff', zIndex: 9999 }}>
                            <CircularProgress color="inherit" />
                        </Backdrop>
                        <Typography variant="h5" sx={{ marginBottom: 2 }}>
                            Maglagay ng aktibidad
                        </Typography>
                        <FormControl fullWidth>
                            <InputLabel id="fertilizer-select">Fertilizer</InputLabel>
                            <Select
                                labelId="fertilizer-select"
                                id="demo-multiple-name"
                                value={fert}
                                label="Fertilizer"
                                fullwidth
                                sx={{
                                    mb: 2
                                }}
                                onChange={(e) => {
                                    const obj = parts?.find(obj => obj.id === e.target.value)
                                    setFert(e.target.value)
                                    setComps(obj)
                                    setBilang(parseInt(farm.plantNumber) - parseInt(farm.ethrel))
                                    // setComps(obj)
                                    // setQnty(obj['qntyPrice'])
                                    // setEthrel(obj['foreignId'])
                                }}
                            >
                                {/* {
                            fertilizer?.map((f) => {
                                if (f.isAvailable) {
                                    return <MenuItem value={f.id}>{f.name}</MenuItem>
                                    }
                                    })
                                    } */}
                                {
                                    [
                                        ...compAct?.filter((f) => f.isAvailable) || [],
                                        ...compAct?.filter((m) => m.name.toLowerCase() === "flower inducer (ethrel)") || []
                                    ].reduce((acc, part) => {
                                        const existing = acc.find(item => item.foreignId === part.foreignId); // Check if the foreignId already exists
                                        if (existing) {
                                            existing.qntyPrice += part.qntyPrice; // Sum qntyPrice if foreignId exists
                                            existing.totalPrice += part.totalPrice; // Sum totalPrice if foreignId exists
                                        } else {
                                            acc.push({ ...part }); // Push a new object if foreignId doesn't exist
                                        }
                                        return acc;
                                    }, [])
                                        .map((f) => (
                                            <MenuItem key={f.id} value={f.id}>
                                                {f.name}
                                            </MenuItem>
                                        ))
                                }
                            </Select>
                        </FormControl>
                        {
                            comps.foreignId === "26nzrfWyeWAPHriACtP4" &&
                            <TextField
                                error={bilangError}
                                label="Bilang ng tanim"
                                name="id"
                                value={bilang}
                                fullWidth
                                type='number'
                                sx={{ mb: 2 }}
                                onChange={(e) => {
                                    const b = parseInt(e.target.value)
                                    if (isNaN(b) || b > (parseInt(farm.plantNumber) - parseInt(farm.ethrel)) || b <= 0) {
                                        setBilangError(true)
                                    } else {
                                        setBilangError(false)
                                    }
                                    setBilang(b)
                                    setComps(prev => ({
                                        ...prev,
                                        qntyPrice: getMult((b / 30000), prev.defQnty)
                                    }))

                                }}
                                inputProps={{ min: 1, max: farm.plantNumber }}
                                helperText={bilangError && "Sobra sa itinanim"}
                            />
                        }
                        <TextField
                            label="Sukat"
                            name="id"
                            value={comps.qntyPrice}
                            fullWidth
                            type='number'
                            sx={{ mb: 2 }}
                            inputProps={{
                                step: "0.01",
                            }}
                            InputProps={{
                                startAdornment: <InputAdornment position="start">kg</InputAdornment>
                            }}
                            onChange={(e) => setComps(prev => ({
                                ...prev,
                                qntyPrice: e.target.value
                            }))}
                        />
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 2 }}>
                            <Button variant='outlined' color='warning' sx={{ flex: 1 }} onClick={handleModalClose}>
                                Cancel
                            </Button>
                            <Button variant='contained' color="warning" sx={{ flex: 1 }} disabled={!fert || !comps || bilangError} onClick={handleSave}>
                                Save
                            </Button>
                        </Box>
                    </Box>
                </Modal>
            </>
        )
    }
    return (
        <>
            <Box sx={{
                display: 'flex',
                padding: 5,
                overflowY: 'hidden'
            }}>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={12}>
                        <Box
                            sx={{
                                backgroundColor: '#fff',
                                borderRadius: 2,
                                boxShadow: 2,
                                padding: 1.5,
                                gap: 2
                            }}
                        >
                            {events &&
                                <FarmsSchedule farms={[farm]} events={events.map(event => ({
                                    ...event,
                                    start_time: event.start_time.toMillis(),
                                    end_time: event.end_time.toMillis()
                                }))} />
                            }
                        </Box>
                    </Grid>

                    <Grid item xs={12} md={8}>
                        <Box sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            height: '100%',
                            width: '100%',
                            padding: 2,
                        }}>
                            {/* <Box sx={{
                                width: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                                paddingRight: 2
                            }}>
                                <Box sx={{
                                    width: '100%',
                                    display: 'flex',
                                    justifyContent: 'flex-end',
                                    marginBottom: 1,
                                }}>
                                    <Button variant="contained" onClick={() => setIsAdd(true)} color="success" sx={{
                                        width: { xs: '100%', md: '20%' }
                                    }}>
                                        Add Activities
                                    </Button>
                                </Box>
                            </Box> */}
                            <Box sx={{
                                padding: 2,
                                overflowY: 'auto',
                                maxHeight: '400px'
                            }}>
                                <Stepper activeStep={newActivities.length} connector={<QontoConnector />} orientation='vertical'>
                                    {newActivities.map((act, index) => (
                                        <Step expanded={index > 0 && index === stepIndex} onClick={() => setStepIndex(stepIndex === index ? 0 : index)} key={act.id} sx={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            marginLeft: index === 0 ? 0 : 4,
                                            backgroundColor: '#E7F3E7',
                                            borderRadius: 2,
                                            paddingX: 2,
                                            boxShadow: 2,
                                            height: index === 0 && 62,
                                            '&:hover': {
                                                cursor: 'pointer',
                                                backgroundColor: '#58AC58',
                                            }
                                        }}>
                                            <StepLabel StepIconComponent={QontoStepIcon} >
                                                <Box sx={{
                                                    flexDirection: { xs: 'column', md: 'row' },
                                                    display: 'flex',
                                                    justifyContent: 'space-between'
                                                }}>
                                                    <Box sx={{
                                                        flexDirection: { xs: 'column', md: 'row' },
                                                        display: 'flex',
                                                        gap: 2,
                                                        alignItems: 'center'
                                                    }}>
                                                        <Typography variant='caption' sx={{
                                                            color: '#4E4E4E'
                                                        }}>
                                                            {formatDate(act.createdAt.toDate())} : {formatTime(act.createdAt.toDate())}
                                                        </Typography>
                                                        <Typography variant="subtitle1" sx={{fontFamily:'serif'}}>{act.label}</Typography>
                                                    </Box>
                                                    <Typography variant='body2' sx={{ fontWeight: 'bold', color: 'red', display: 'flex', justifyContent: 'flex-end' }}>
                                                        {act.qnty ? `${act.qnty} kg` : null}
                                                    </Typography>
                                                </Box>
                                            </StepLabel>
                                        </Step>
                                    ))}
                                </Stepper>
                            </Box>
                        </Box>
                    </Grid>

                    <Grid item xs={12} md={4}>
                        <Box sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            backgroundColor: '#fff',
                            borderRadius: 2,
                            boxShadow: 2,
                            padding: 5,
                            gap: 2,
                            height: '100%'
                        }}>
                            <Carousel
                                prevIcon={<span className="carousel-control-prev-icon" aria-hidden="true" style={{ display: 'none' }} />}
                                nextIcon={<span className="carousel-control-next-icon" aria-hidden="true" style={{ display: 'none' }} />}
                            >
                                <Carousel.Item>
                                    <Box className='roi'>
                                        <Doughnut
                                            labels={["Net return", "Production cost"]}
                                            data={[roi[0].netReturn, roi[0].costTotal]}
                                            title={"Produksyon ng Pinya"}
                                        />
                                    </Box>
                                </Carousel.Item>
                                <Carousel.Item>
                                    <Box className='parti' >
                                        <Doughnut
                                            labels={["Materyales", "Labor", "Fertilizer"]}
                                            data={[roi[0].materialTotal - roi[0].fertilizerTotal, roi[0].laborTotal, roi[0].fertilizerTotal]}
                                            title={'Gastos sa Produksyon'}
                                        />
                                    </Box>
                                </Carousel.Item>
                                <Carousel.Item>
                                    <Box className='parti' >
                                        <Doughnut
                                            labels={["Materyales", "Labor", "Fertilizer"]}
                                            data={[roi[0].materialTotal - roi[0].fertilizerTotal, roi[0].laborTotal, roi[0].fertilizerTotal]}
                                            title={'Gastos sa Produksyon'}
                                        />
                                    </Box>
                                </Carousel.Item>
                            </Carousel>
                        </Box>
                    </Grid>
                </Grid>
            </Box>

            <HandleAddMouse />

        </>

    )
}
export default Activities