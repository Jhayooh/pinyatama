import {
    Box,
    StepContent,
    Typography,
    Skeleton,
    CircularProgress
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
import { DataGrid, GridCellModes, GridActionsCellItem, } from '@mui/x-data-grid';

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

    const pineappleColl = collection(db, `pineapple`)
    const [pineapple, pineappleLoading] = useCollectionData(pineappleColl)

    const [newActivities, setNewActivities] = useState([])
    const [events, setEvents] = useState(null)

    const [actualRoi, setActualRoi] = useState(farm.roi.find(r => r.type === 'a'))
    const [projectedRoi, setProjectedRoi] = useState(farm.roi.find(r => r.type === 'p'))

    const [stepIndex, setStepIndex] = useState(-1)

    const formatDate = (date) => {
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    }

    const formatTime = (date) => {
        return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
    }

    useEffect(() => {
        if (!activities) return

        setNewActivities(prev => [{
            createdAt: farm.start_date,
            label: 'Planting of Pineapple',
            compId: '',
            qnty: 0,
        }, ...activities])

        console.log("activities:", activities);


        const hasAct = activities.find(act => act.type === 'a' || act.type === 'r')
        setActualRoi(farm.roi.find(r => r.type === 'a'))
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

    const datagridStyle = {
        border: 'none',
        overflow: 'auto',
        maxHeight: '100%',
        p: 1,
        // paddingBottom: 0,
        '& .even': {
            backgroundColor: '#FFFFFF',
        },
        '& .odd': {
            backgroundColor: '#F6FAF6',
        },
        '& .MuiDataGrid-columnHeaders': {
            position: 'sticky',
            top: 0,
            zIndex: 1,
            backgroundColor: '#88C488'
        },
    }

    return (
        <>
            <Box sx={{
                width: '100%',
                height: '100%',
                display: 'flex',
                overflowY: 'hidden',
                paddingBottom: 2
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
                                        gap: 2,
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
                    <Grid container spacing={2} xs={12} md={4}>
                        <Grid item xs={12} md={12}>
                            <Box
                                sx={{
                                    backgroundColor: '#fff',
                                    borderRadius: 2,
                                    boxShadow: 2,
                                    padding: 1.5,
                                    gap: 2,
                                    display: 'flex',
                                    flexDirection: 'column',
                                }}
                            >
                                <Typography variant="h4">Projected</Typography>
                                {
                                    activitiesLoading && eLoading
                                        ? <CircularProgress />
                                        : <>
                                            <Box>
                                                <Doughnut
                                                    labels={["Net return", "Production cost"]}
                                                    data={[projectedRoi.netReturn, projectedRoi.costTotal]}
                                                    title={""}

                                                />
                                            </Box>
                                        </>
                                }
                                <DataGrid
                                    rows={
                                        [
                                            {
                                                name: 'Net Return',
                                                value: projectedRoi.netReturn || 0,
                                                id: 0
                                            },
                                            {
                                                name: 'Cost of Production',
                                                value: Math.max(0, projectedRoi.costTotal | 0),
                                                id: 1
                                            },
                                            {
                                                name: 'Production damage',
                                                value: projectedRoi.damage || 0,
                                                id: 2
                                            },

                                        ]
                                        // Object.entries(actualRoi)
                                        //     .map(([name, value], index) => ({
                                        //         id: index + 1,
                                        //         name,
                                        //         value
                                        //     }))
                                        //     .sort((a, b) => a.name.localeCompare(b.name))
                                    }
                                    columns={[
                                        {
                                            field: 'name',
                                            headerName: 'Name',
                                            flex: 2,
                                            editable: false,
                                            headerClassName: 'super-app-theme--header',
                                        },
                                        {
                                            field: 'value',
                                            headerName: 'Value (P)',
                                            flex: 1,
                                            type: 'number',
                                            editable: false,
                                            headerClassName: 'super-app-theme--header',
                                        },
                                    ]}
                                    hideFooter
                                    getRowClassName={(params) =>
                                        params.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd'
                                    }
                                    sx={datagridStyle}
                                />
                            </Box>
                        </Grid>
                        <Grid item xs={12} md={12}>
                            <Box
                                sx={{
                                    backgroundColor: '#fff',
                                    borderRadius: 2,
                                    boxShadow: 2,
                                    padding: 1.5,
                                    gap: 2,
                                    display: 'flex',
                                    flexDirection: 'column',
                                }}
                            >
                                {
                                    activitiesLoading && eLoading
                                        ? <CircularProgress />
                                        : <>
                                            <Box>
                                                <Doughnut
                                                    labels={["Materials", "Labor", "Fertilizer"]}
                                                    data={[projectedRoi.materialTotal || 0, projectedRoi.laborTotal || 0, projectedRoi.fertilizerTotal || 0]}
                                                    title={'Production Cost'}
                                                />
                                            </Box>
                                        </>
                                }
                                <DataGrid
                                    rows={
                                        [
                                            {
                                                name: 'Material',
                                                value: projectedRoi.materialTotal || 0,
                                                id: 0
                                            },
                                            {
                                                name: 'Labor',
                                                value: projectedRoi.laborTotal || 0,
                                                id: 1
                                            },
                                            {
                                                name: 'Fertilizer',
                                                value: projectedRoi.fertilizerTotal || 0,
                                                id: 2
                                            },

                                        ]
                                        // Object.entries(actualRoi)
                                        //     .map(([name, value], index) => ({
                                        //         id: index + 1,
                                        //         name,
                                        //         value
                                        //     }))
                                        //     .sort((a, b) => a.name.localeCompare(b.name))
                                    }
                                    columns={[
                                        {
                                            field: 'name',
                                            headerName: 'Name',
                                            flex: 2,
                                            editable: false,
                                            headerClassName: 'super-app-theme--header',
                                        },
                                        {
                                            field: 'value',
                                            headerName: 'Value (P)',
                                            flex: 1,
                                            type: 'number',
                                            editable: false,
                                            headerClassName: 'super-app-theme--header',
                                        },
                                    ]}
                                    hideFooter
                                    getRowClassName={(params) =>
                                        params.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd'
                                    }
                                    sx={datagridStyle}
                                />

                            </Box>
                        </Grid>
                        <Grid item xs={12} md={12}>
                            <Box
                                sx={{
                                    backgroundColor: '#fff',
                                    borderRadius: 2,
                                    boxShadow: 2,
                                    padding: 1.5,
                                    gap: 2,
                                    display: 'flex',
                                    flexDirection: 'column',
                                }}
                            >
                                {
                                    activitiesLoading && eLoading
                                        ? <CircularProgress />
                                        : <>
                                            <Box>
                                                <Doughnut
                                                    labels={["Good Size", "Batterball"]}
                                                    data={[projectedRoi.grossReturn * projectedRoi.pinePrice, projectedRoi.butterBall * projectedRoi.butterPrice]}
                                                    title={"Gross Return"}
                                                />
                                            </Box>
                                        </>
                                }
                                <DataGrid
                                    rows={
                                        [
                                            {
                                                name: 'Good Size',
                                                value: projectedRoi.grossReturn * projectedRoi.pinePrice,
                                                id: 0
                                            },
                                            {
                                                name: 'Batterball',
                                                value: projectedRoi.butterBall * projectedRoi.butterPrice,
                                                id: 1
                                            }
                                        ]
                                        // Object.entries(actualRoi)
                                        //     .map(([name, value], index) => ({
                                        //         id: index + 1,
                                        //         name,
                                        //         value
                                        //     }))
                                        //     .sort((a, b) => a.name.localeCompare(b.name))
                                    }
                                    columns={[
                                        {
                                            field: 'name',
                                            headerName: 'Name',
                                            flex: 2,
                                            editable: false,
                                            headerClassName: 'super-app-theme--header',
                                        },
                                        {
                                            field: 'value',
                                            headerName: 'Value (P)',
                                            flex: 1,
                                            type: 'number',
                                            editable: false,
                                            headerClassName: 'super-app-theme--header',
                                        },
                                    ]}
                                    hideFooter
                                    getRowClassName={(params) =>
                                        params.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd'
                                    }
                                    sx={datagridStyle}
                                />
                            </Box>
                        </Grid>
                    </Grid>
                    <Grid container spacing={2} xs={12} md={4}>
                        <Grid item xs={12} md={12}>
                            <Box
                                sx={{
                                    backgroundColor: '#fff',
                                    borderRadius: 2,
                                    boxShadow: 2,
                                    padding: 1.5,
                                    gap: 2,
                                    display: 'flex',
                                    flexDirection: 'column',
                                }}
                            >
                                <Typography variant="h4">Actual</Typography>
                                {
                                    activitiesLoading && eLoading
                                        ? <CircularProgress />
                                        : <>
                                            <Box>
                                                <Doughnut
                                                    labels={["Net return", "Production cost"]}
                                                    data={[Math.max(0, actualRoi.netReturn), actualRoi.costTotal]}
                                                    title={""}
                                                />
                                            </Box>
                                        </>
                                }
                                <DataGrid
                                    rows={
                                        [
                                            {
                                                name: 'Net Return',
                                                value: actualRoi.netReturn || 0,
                                                id: 0
                                            },
                                            {
                                                name: 'Cost of Production',
                                                value: actualRoi.costTotal,
                                                id: 1
                                            },
                                            {
                                                name: 'Production damage',
                                                value: actualRoi.damageCost || 0,
                                                id: 2
                                            },

                                        ]
                                        // Object.entries(actualRoi)
                                        //     .map(([name, value], index) => ({
                                        //         id: index + 1,
                                        //         name,
                                        //         value
                                        //     }))
                                        //     .sort((a, b) => a.name.localeCompare(b.name))
                                    }
                                    columns={[
                                        {
                                            field: 'name',
                                            headerName: 'Name',
                                            flex: 2,
                                            editable: false,
                                            headerClassName: 'super-app-theme--header',
                                        },
                                        {
                                            field: 'value',
                                            headerName: 'Value (P)',
                                            flex: 1,
                                            type: 'number',
                                            editable: false,
                                            headerClassName: 'super-app-theme--header',
                                        },
                                    ]}
                                    hideFooter
                                    getRowClassName={(params) =>
                                        params.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd'
                                    }
                                    sx={datagridStyle}
                                />
                            </Box>
                        </Grid>
                        <Grid item xs={12} md={12}>
                            <Box
                                sx={{
                                    backgroundColor: '#fff',
                                    borderRadius: 2,
                                    boxShadow: 2,
                                    padding: 1.5,
                                    gap: 2,
                                    display: 'flex',
                                    flexDirection: 'column',
                                }}
                            >
                                {
                                    activitiesLoading && eLoading
                                        ? <CircularProgress />
                                        : <>
                                            <Box>
                                                <Doughnut
                                                    labels={["Materials", "Labor", "Fertilizer"]}
                                                    data={[actualRoi.materialTotal || 0, actualRoi.laborTotal || 0, actualRoi.fertilizerTotal || 0]}
                                                    title={'Production Cost'}
                                                />
                                            </Box>
                                        </>
                                }
                                <DataGrid
                                    rows={
                                        [
                                            {
                                                name: 'Material',
                                                value: actualRoi.materialTotal || 0,
                                                id: 0
                                            },
                                            {
                                                name: 'Labor',
                                                value: actualRoi.laborTotal || 0,
                                                id: 1
                                            },
                                            {
                                                name: 'Fertilizer',
                                                value: actualRoi.fertilizerTotal || 0,
                                                id: 2
                                            },

                                        ]
                                        // Object.entries(actualRoi)
                                        //     .map(([name, value], index) => ({
                                        //         id: index + 1,
                                        //         name,
                                        //         value
                                        //     }))
                                        //     .sort((a, b) => a.name.localeCompare(b.name))
                                    }
                                    columns={[
                                        {
                                            field: 'name',
                                            headerName: 'Name',
                                            flex: 2,
                                            editable: false,
                                            headerClassName: 'super-app-theme--header',
                                        },
                                        {
                                            field: 'value',
                                            headerName: 'Value (P)',
                                            flex: 1,
                                            type: 'number',
                                            editable: false,
                                            headerClassName: 'super-app-theme--header',
                                        },
                                    ]}
                                    hideFooter
                                    getRowClassName={(params) =>
                                        params.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd'
                                    }
                                    sx={datagridStyle}
                                />

                            </Box>
                        </Grid>
                        <Grid item xs={12} md={12}>
                            <Box
                                sx={{
                                    backgroundColor: '#fff',
                                    borderRadius: 2,
                                    boxShadow: 2,
                                    padding: 1.5,
                                    gap: 2,
                                    display: 'flex',
                                    flexDirection: 'column',
                                }}
                            >
                                {
                                    activitiesLoading && eLoading && pineappleLoading
                                        ? <CircularProgress />
                                        : <>
                                            <Box>
                                                <Doughnut
                                                    labels={["Good Size", "Batterball"]}
                                                    data={
                                                        [actualRoi.grossReturn * pineapple.find(p => p.name.toLowerCase() === 'good size').price, actualRoi.butterBall * pineapple.find(p => p.name.toLowerCase() === 'butterball').price]
                                                    }
                                                    title={"Gross Return"}
                                                />
                                            </Box>


                                            <DataGrid
                                                rows={
                                                    [
                                                        {
                                                            name: 'Good Size',
                                                            value: actualRoi.grossReturn * pineapple.find(p => p.name.toLowerCase() === 'good size').price,
                                                            id: 0
                                                        },
                                                        {
                                                            name: 'Batterball',
                                                            value: actualRoi.butterBall * pineapple.find(p => p.name.toLowerCase() === 'butterball').price,
                                                            id: 1
                                                        }
                                                    ]
                                                    // Object.entries(actualRoi)
                                                    //     .map(([name, value], index) => ({
                                                    //         id: index + 1,
                                                    //         name,
                                                    //         value
                                                    //     }))
                                                    //     .sort((a, b) => a.name.localeCompare(b.name))
                                                }
                                                columns={[
                                                    {
                                                        field: 'name',
                                                        headerName: 'Name',
                                                        flex: 2,
                                                        editable: false,
                                                        headerClassName: 'super-app-theme--header',
                                                    },
                                                    {
                                                        field: 'value',
                                                        headerName: 'Value (P)',
                                                        flex: 1,
                                                        type: 'number',
                                                        editable: false,
                                                        headerClassName: 'super-app-theme--header',
                                                    },
                                                ]}
                                                hideFooter
                                                getRowClassName={(params) =>
                                                    params.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd'
                                                }
                                                sx={datagridStyle}
                                            />
                                        </>
                                }
                            </Box>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Box
                            sx={{
                                backgroundColor: '#FAFAFA',
                                borderRadius: 2,
                                boxShadow: 2,
                                padding: 1.5,
                                gap: 2,
                                minHeight: '100%',
                            }}
                        >
                            {
                                activitiesLoading && eLoading
                                    ? <Skeleton animation='wave' variant="rounded" width='100%' height={240} />
                                    : <Box
                                        sx={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            height: '100%',
                                            minHeight: 580,
                                            width: '100%',
                                            overflowY: 'auto',
                                            maxHeight: '100%',
                                            padding: 1,
                                        }}
                                    >
                                        <Stepper
                                            activeStep={newActivities.length}
                                            connector={<QontoConnector />}
                                            orientation="vertical"
                                        >
                                            {newActivities.map((act, index) => (
                                                <Step
                                                    expanded={index > 0 && index === stepIndex}
                                                    onClick={() => {
                                                        setStepIndex(stepIndex === index ? 0 : index);
                                                    }}
                                                    key={act.id}
                                                    sx={{
                                                        display: 'flex',
                                                        flexDirection: 'column',
                                                        marginLeft: index === 0 ? 0 : 2,
                                                        backgroundColor: index === 0
                                                            ? '#FFF'
                                                            : act.type === 'a'
                                                                ? '#A8E6A1'
                                                                : '#FFBABA',
                                                        borderRadius: 3,
                                                        paddingX: 2,
                                                        paddingY: 1.5,
                                                        boxShadow: 4,
                                                        height: 'auto',
                                                        color: act.type === 'a' ? '#355E3B' : '#8B0000',
                                                        transition: 'background-color 0.3s ease, box-shadow 0.3s ease',
                                                        '&:hover': {
                                                            cursor: index === 0 ? 'default' : 'pointer',
                                                            backgroundColor: index === 0
                                                                ? '#FFF'
                                                                : act.type === 'a'
                                                                    ? '#D7F9D5'
                                                                    : '#FFD6D6',
                                                            boxShadow: 6,
                                                        },
                                                        
                                                    }}
                                                >
                                                    <StepLabel StepIconComponent={QontoStepIcon}>
                                                        <Box
                                                            sx={{
                                                                flexDirection: { xs: 'column', md: 'row' },
                                                                display: 'flex',
                                                                justifyContent: 'space-between',
                                                                alignItems: 'center',
                                                                gap: 2,
                                                            }}
                                                        >
                                                            <Box
                                                                sx={{
                                                                    flexDirection: { xs: 'column', md: 'row' },
                                                                    display: 'flex',
                                                                    gap: 2,
                                                                    alignItems: 'center',
                                                                }}
                                                            >
                                                                <Typography
                                                                    variant="caption"
                                                                    sx={{
                                                                        color: '#6C6C6C',
                                                                        fontFamily: 'cursive',
                                                                        display: 'flex',
                                                                        flexDirection: 'column'
                                                                    }}
                                                                >
                                                                    {formatDate(act.createdAt.toDate())}
                                                                    {formatTime(act.createdAt.toDate())}
                                                                </Typography>
                                                                <Typography
                                                                    variant="subtitle1"
                                                                    sx={{
                                                                        fontFamily: 'cursive',
                                                                        color: index === 0 ? 'orange' : '#4E4E4E',
                                                                    }}
                                                                >
                                                                    {act.label}
                                                                </Typography>
                                                            </Box>
                                                            <Typography
                                                                variant="body2"
                                                                sx={{
                                                                    fontWeight: 'bold',
                                                                    display: 'flex',
                                                                    justifyContent: 'flex-end',
                                                                }}
                                                            >
                                                                {index !== 0
                                                                    ? `${act.qnty} ${act.unit || ''}`
                                                                    : null}
                                                            </Typography>
                                                        </Box>
                                                        <StepContent
                                                            sx={{
                                                                borderLeft: 0,
                                                            }}
                                                        >
                                                            <Box sx={{ paddingY: 2 }}>
                                                                <Typography
                                                                    variant="body2"
                                                                    sx={{
                                                                        fontFamily: 'cursive',
                                                                    }}
                                                                >
                                                                    {act.desc || ""}
                                                                </Typography>
                                                            </Box>
                                                        </StepContent>
                                                    </StepLabel>
                                                </Step>
                                            ))}
                                        </Stepper>
                                    </Box>

                            }
                        </Box>
                    </Grid>
                    {/* <Grid item xs={12} md={7}>
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
                                                <Step
                                                    expanded={index > 0 && index === stepIndex}
                                                    onClick={() => { setStepIndex(stepIndex === index ? 0 : index) }}
                                                    key={act.id}
                                                    sx={{
                                                        display: 'flex',
                                                        flexDirection: 'column',
                                                        marginLeft: index === 0 ? 0 : 4,
                                                        backgroundColor: index === 0 ? '#fff' : (act.type === 'a' ? '#58AC58' : "#E74C3C"),
                                                        borderRadius: 2,
                                                        paddingX: 2,
                                                        boxShadow: 2,
                                                        height: index === 0 ? 62 : 'auto',
                                                        color: act.type === 'a' ? 'black' : '#fff',
                                                        '&:hover': {
                                                            cursor: index === 0 ? 'default' : 'pointer',
                                                            backgroundColor: index === 0 ? '#fff' : (act.type === 'a' ? '#E7F3E7' : "#E74C3C"),
                                                            //color: index === 0 ? 'inherit' : '#FAFAFA',
                                                        },
                                                    }}
                                                >
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
                                                                <Typography variant="subtitle1" sx={{ fontFamily: 'serif', color: index === 0 ? 'orange' : '#4E4E4E' }}>{act.label}</Typography>
                                                            </Box>
                                                            <Typography variant='body2' sx={{ fontWeight: 'bold', display: 'flex', justifyContent: 'flex-end' }}>
                                                                {
                                                                    index !== 0 ?
                                                                        act.type === 'a' ?
                                                                            `${act.qnty}kg` :
                                                                            `${act.qnty}% Damage`
                                                                        : null
                                                                }
                                                            </Typography>
                                                        </Box>
                                                        <StepContent sx={{
                                                            borderLeft: 0,
                                                        }}>
                                                            <Box sx={{ paddingY: 2 }}>
                                                                <Typography variant='body2'>
                                                                    {
                                                                        act.type === 'a' ?
                                                                            `Ikaw ay naglagay ng ${act.qnty}kg na ${act.label}` :
                                                                            `${act.desc}`
                                                                    }
                                                                </Typography>
                                                            </Box>
                                                        </StepContent>
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
                                                    data={[actualRoi.materialTotal, actualRoi.laborTotal, actualRoi.fertilizerTotal]}
                                                    title={'Gastos sa Produksyon'}
                                                />
                                            </Box>
                                        </Carousel.Item>
                                    </Carousel>
                                </Box>
                        }
                    </Grid> */}
                </Grid>
            </Box>

        </>

    )
}
export default Activities