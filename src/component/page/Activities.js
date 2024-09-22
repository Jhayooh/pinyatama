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
    Snackbar
} from "@mui/material";
import Grid from '@mui/material/Unstable_Grid2';
import React, { useEffect, useState } from "react";

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

const Activities = ({ roi, farm, particularData, parts }) => {
    const [isAdd, setIsAdd] = useState(false)

    const activityColl = collection(db, `farms/${farm.id}/activities`)
    const activityQuery = query(activityColl, orderBy('createdAt'))
    const [activities] = useCollectionData(activityQuery)

    const eventsColl = collection(db, `farms/${farm.id}/events`)
    const eventsQuery = query(eventsColl, orderBy('createdAt'))
    const [e] = useCollectionData(eventsQuery)

    const [newActivities, setNewActivities] = useState([])
    const [fertilizer, setFertilizer] = useState(null)
    const [material, setMaterial] = useState(null)
    const [events, setEvents] = useState(null)
    const [compAct, setCompAct] = useState(null)

    const [stepIndex, setStepIndex] = useState(-1)

    const formatDate = (date) => {
        return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric' })
    }

    const formatTime = (date) => {
        return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
    }

    useEffect(() => {
        if (!e) return

        setEvents(e)
    }, [e])


    useEffect(() => {
        if (!parts) return
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
            label: 'The pine has been planted.',
            compId: '',
            qnty: 0
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


    function ethrelValid(currdate, start_date, end_date) {
        const monthEight = new Date(start_date.setMonth(start_date.getMonth() + 8))
        const bool = currdate >= monthEight && currdate <= end_date
        console.log("1", monthEight);
        console.log("2", currdate);
        console.log("3", end_date);        
        console.log('bool', bool)
        return bool
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
        const [qnty, setQnty] = useState(0)

        const delay = ms => new Promise(res => setTimeout(res, ms));

        const [saving, setSaving] = useState(false)

        const handleSave = async () => {
            setSaving(true)
            try {
                // eventsssss pleaseeee helpp hahahahha
                const currDate = new Date()
                const theLabel = compAct.find(obj => obj.id === fert)
                if (theLabel.name.toLowerCase() === "flower inducer (ethrel)" && events) {
                    const vege_event = events.find(p => p.className === 'vegetative')
                    const date_diff = currDate - vege_event.end_time.toDate()
                    console.log("the farm ethrel status:", farm);
                    
                    if (farm.isEthrel) {
                        await delay(1000)
                        setSaving(false)
                        handleModalClose()
                        console.log("ikaw ay naglagay na ng ethrel");
                        setAlert({
                            visible: true,
                            message: "Ikaw ay naglagay na ng Ethrel anue ba",
                            severity: "warning",
                            vertical: 'top',
                            horizontal: 'center'
                        });
                        return
                    }

                    if (!ethrelValid(currDate, vege_event.start_time.toDate(), vege_event.end_time.toDate())) {
                        await delay(1000)
                        setSaving(false)
                        handleModalClose()
                        console.log("hindi pa ikaw pwede maglagay ng ethrel");
                        setAlert({
                            visible: true,
                            message: "Hindi pa ikaw pwede maglagay ng Ethrel.",
                            severity: "warning",
                            vertical: 'top',
                            horizontal: 'center'
                        });
                        return
                    }

                    events.map(async (e) => {
                        switch (e.className) {
                            case 'vegetative':
                                e.end_time = Timestamp.fromDate(currDate)
                                console.log("the vege: ", e)
                                break;
                            case 'flowering':
                                e.start_time = Timestamp.fromDate(currDate)
                                e.end_time = Timestamp.fromMillis(e.end_time.toMillis() + date_diff)
                                console.log("the flower: ", e)
                                break;
                            case 'fruiting':
                                e.start_time = Timestamp.fromMillis(e.start_time.toMillis() + date_diff)
                                e.end_time = Timestamp.fromMillis(e.end_time.toMillis() + date_diff)
                                console.log("the fruit: ", e)
                                break;
                            default:
                                break;
                        }

                        const newEvent = await addDoc(collection(db, `farms/${farm.id}/events`), {
                            ...e,
                            className: e.className + 'Actual',
                            createdAt: currDate
                        });
                        await updateDoc(newEvent, { id: newEvent.id });
                    })

                    await addDoc(activityColl, {
                        createdAt: currDate,
                        label: theLabel.name,
                        compId: fert,
                        qnty: qnty
                    });

                    // update farm isEthrel
                    console.log("ikaw ay naglagay ng ethrel ngayong ", currDate);
                    setSaving(false)
                    setAlert({
                        visible: true,
                        message: "ikaw ay naglagay ng ethrel ngayong",
                        severity: "success",
                        vertical: 'bottom',
                        horizontal: 'center'
                    });
                    handleModalClose()
                }
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
                        <Select
                            value={fert}
                            label="Fertilizer"
                            fullwidth
                            sx={{
                                width: '100%',
                                mb: 2
                            }}
                            onChange={(e) => {
                                const obj = parts?.find(obj => obj.id === e.target.value)
                                setFert(e.target.value)
                                setQnty(obj['qntyPrice'])
                                console.log("the parts", compAct)
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
                                ].map((f) => (
                                    <MenuItem key={f.id} value={f.id}>
                                        {f.name}
                                    </MenuItem>
                                ))
                            }
                        </Select>
                        <TextField
                            label="ID"
                            name="id"
                            value={qnty}
                            fullWidth
                            type='number'
                            sx={{ mb: 2 }}
                            inputProps={{
                                step: "0.01",
                            }}
                            InputProps={{
                                startAdornment: <InputAdornment position="start">kg</InputAdornment>
                            }}
                            onChange={(e) => setQnty(e.target.value)}
                        />
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 2 }}>
                            <Button variant='outlined' color='warning' sx={{ flex: 1 }} onClick={handleModalClose}>
                                Cancel
                            </Button>
                            <Button variant='contained' color="warning" sx={{ flex: 1 }} disabled={!fert || !qnty} onClick={handleSave}>
                                Save
                            </Button>
                        </Box>
                    </Box>
                </Modal>
            </>
        )
    }
    // {name, id, unit, index, parent, particular, defQnty, price}
    return (
        <>
            <Box sx={{
            }}>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={8}>
                        <Box sx={{
                            backgroundColor: '#F9FAFB',
                        }}>
                            <Stepper activeStep={newActivities.length} connector={<QontoConnector />} orientation='vertical'>
                                {newActivities.map((act, index) => (
                                    <Step expanded={index > 0 && index === stepIndex} onClick={() => setStepIndex(stepIndex === index ? 0 : index)} key={act.id} sx={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        marginLeft: index === 0 ? 0 : 4,
                                        backgroundColor: '#FFF',
                                        borderRadius: 2,
                                        paddingX: 2,
                                        boxShadow: 2,
                                        height: index === 0 && 62,
                                        '&:hover': {
                                            cursor: 'pointer'
                                        }
                                    }}>
                                        <StepLabel StepIconComponent={QontoStepIcon} sx={{
                                        }}>
                                            <Box
                                                sx={{
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
                                                        {formatDate(act.createdAt.toDate())}
                                                    </Typography>
                                                    <Typography variant="subtitle1">{act.label}</Typography>
                                                </Box>
                                                <Typography variant='caption' sx={{
                                                    color: '#4E4E4E'
                                                }} >
                                                    {formatTime(act.createdAt.toDate())}
                                                </Typography>
                                            </Box>
                                        </StepLabel>
                                        <StepContent sx={{
                                            borderLeft: 0,
                                        }}>
                                            <Box sx={{ paddingY: 2 }}>
                                                <Typography variant='body2'>
                                                    Ikaw ay naglagay ng <span style={{ fontWeight: 'bold' }}>{act.qnty}kg</span> ng fertilizer na <span style={{ fontWeight: 'bold' }}>{act.label}</span>
                                                </Typography>
                                            </Box>
                                        </StepContent>
                                    </Step>
                                ))}
                            </Stepper>

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
                            padding: 2,
                            gap: 2
                        }}>
                            <Box sx={{
                                width: 1
                            }}>
                                <Button variant="contained" onClick={() => setIsAdd(true)} color='success' sx={{
                                    width: 1
                                }}>
                                    Add
                                </Button>
                            </Box>
                            <Box className='roi'>
                                <Doughnut
                                    labels={["Net return", "Production cost"]}
                                    data={[roi[0].netReturn, roi[0].costTotal]}
                                    title={"QP Production"}
                                />
                            </Box>
                            <Box className='parti' >
                                <Doughnut
                                    labels={["Materyales", "Labor", "Fertilizer"]}
                                    data={[roi[0].materialTotal - roi[0].fertilizerTotal, roi[0].laborTotal, roi[0].fertilizerTotal]}
                                    title={'Production Cost'}
                                />
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
            <HandleAddMouse />
            {/* {alert.visible && (
                <Alert severity={alert.severity}>
                    {alert.message}
                </Alert>
            )} */}
        </>

    )
}
export default Activities