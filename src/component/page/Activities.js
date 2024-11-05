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
    InputLabel,
    Skeleton
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
import FarmsSchedule from "./FarmsSchedule";
import { LocalDiningRounded } from "@mui/icons-material";

const Activities = ({ farm }) => {
    const activityColl = collection(db, `farms/${farm.id}/activities`)
    const activityQuery = query(activityColl, orderBy('createdAt'))
    const [activities, activitiesLoading] = useCollectionData(activityQuery)

    const eventsColl = collection(db, `farms/${farm.id}/events`)
    const eventsQuery = query(eventsColl, orderBy('createdAt'))
    const [e, eLoading] = useCollectionData(eventsQuery)

    const [newActivities, setNewActivities] = useState([])
    const [events, setEvents] = useState(null)

    const [actualRoi, setActualRoi] = useState(farm.roi.find(r => r.type === 'a'))

    const [stepIndex, setStepIndex] = useState(-1)

    const formatDate = (date) => {
        return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
    }

    const formatTime = (date) => {
        return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
    }

    const loading = true

    // useEffect(() => {
    //     if (!e) return
    //     setEvents(e)
    // }, [e])


    useEffect(() => {
        if (!activities) return

        setNewActivities(prev => [{
            createdAt: farm.start_date,
            label: 'Araw ng Pagtanim ng Pinya',
            compId: '',
            qnty: 0,
        }, ...activities])

        const hasAct = activities.find(act => act.type === 'a' || act.type === 'r')
        if (hasAct) {
            setActualRoi(farm.roi.find(r => r.type === 'a'))
        } else {
            setActualRoi(farm.roi.find(r => r.type === 'p'))
        }
    }, [activities, farm])

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

    return (
        <>
            <Box sx={{
                width: '100%',
                height: '100%',
                display: 'flex',
                overflowY: 'hidden',

            }}>
                <Grid container spacing={2} sx={{ width: '100%' }}>
                    <Grid item xs={12} md={12}>
                        {
                            activitiesLoading && eLoading
                                ? <Skeleton variant="rounded" width='100%' height={120} sx={{ bgcolor: '#D4D4D4' }} />
                                : <Box
                                    sx={{
                                        backgroundColor: '#fff',
                                        borderRadius: 2,
                                        boxShadow: 2,
                                        padding: 1.5,
                                        gap: 2
                                    }}
                                >
                                    <FarmsSchedule farms={[farm]} events={e.map(event => ({
                                        ...event,
                                        start_time: event.start_time.toMillis(),
                                        end_time: event.end_time.toMillis()
                                    }))} />
                                </Box>
                        }
                    </Grid>
                    <Grid item xs={12} md={7}>
                        {
                            activitiesLoading && eLoading
                                ? <Skeleton animation='wave' variant="rounded" width='100%' height={240} />
                                : <Box sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    height: '100%',
                                    width: '100%',
                                    padding: 2,
                                }}>
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
                                                        color: '#FAFAFA',
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
                                                                <Typography variant="subtitle1" sx={{ fontFamily: 'serif' }}>{act.label}</Typography>
                                                            </Box>
                                                            <Typography variant='body2' sx={{ fontWeight: 'bold', display: 'flex', justifyContent: 'flex-end' }}>
                                                                {index !== 0 ? `${act.qnty} kg` : null}
                                                            </Typography>
                                                        </Box>
                                                    </StepLabel>
                                                </Step>
                                            ))}
                                        </Stepper>
                                    </Box>
                                </Box>
                        }
                    </Grid>
                    <Grid item xs={12} md={5}>
                        {
                            activitiesLoading && eLoading
                                ? <Skeleton animation='wave' variant="rounded" width='100%' height={240} />
                                : <Box sx={{
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
                                                    data={[actualRoi.netReturn, actualRoi.costTotal]}
                                                    title={"Produksyon ng Pinya"}
                                                />
                                            </Box>
                                        </Carousel.Item>
                                        <Carousel.Item>
                                            <Box className='parti' >
                                                <Doughnut
                                                    labels={["Materyales", "Labor", "Fertilizer"]}
                                                    data={[actualRoi.materialTotal - actualRoi.fertilizerTotal, actualRoi.laborTotal, actualRoi.fertilizerTotal]}
                                                    title={'Gastos sa Produksyon'}
                                                />
                                            </Box>
                                        </Carousel.Item>
                                    </Carousel>
                                </Box>
                        }
                    </Grid>
                </Grid>
            </Box>

        </>

    )
}
export default Activities