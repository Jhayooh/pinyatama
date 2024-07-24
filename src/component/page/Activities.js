import { Box, Button, InputAdornment, MenuItem, Modal, Select, StepContent, TextField, Typography } from "@mui/material";
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

import { addDoc, collection, updateDoc } from "firebase/firestore";
import { db } from "../../firebase/Config";

// chart
import Doughnut from '../chart/Doughnut'
import { useCollectionData } from "react-firebase-hooks/firestore";

const Activities = ({ roi, farm, particularData }) => {
    const [isAdd, setIsAdd] = useState(false)

    const activityColl = collection(db, `farms/${farm.id}/activities`)
    const [activities] = useCollectionData(activityColl)

    const [newActivities, setNewActivities] = useState([])
    const [fertilizer, setFertilizer] = useState(null)

    const formatDate = (date) => {
        return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric' })
    }

    const formatTime = (date) => {
        return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
    }

    useEffect(() => {
        if (!particularData) return
        const ferts = particularData.filter(part => part.parent.toLowerCase() === 'fertilizer');
        setFertilizer(ferts)
    }, [particularData])


    useEffect(() => {
        if (!activities) return
        setNewActivities(prev => [{
            date: formatDate(farm.start_date.toDate()),
            time: formatTime(farm.start_date.toDate()),
            label: 'The pine has been planted.',
            compId: '',
            qnty: 0
        }, ...activities])
        console.log('activities', newActivities)
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
            height: 32
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

    const HandleAddMouse = () => {
        const [fert, setFert] = useState('')
        const [qnty, setQnty] = useState(0)

        const handleSave = async () => {
            try {
                const currDate = new Date()
                const theLabel = fertilizer.find(obj => obj.id === fert)
                await addDoc(activityColl, {
                    date: formatDate(currDate),
                    time: formatTime(currDate),
                    label: theLabel.name,
                    compId: fert,
                    qnty: qnty
                });

            } catch (error) {
                console.error('error updating document', error);
            }
            handleModalClose()
        }

        const [age, setAge] = useState('')

        return (
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
                        p: 4,
                        width: 380,
                    }}
                >
                    <Select
                        value={fert}
                        label="Fertilizer"
                        fullwidth
                        sx={{
                            width: '100%',
                            mb: 2
                        }}
                        onChange={(e) => setFert(e.target.value)}
                    >
                        {
                            fertilizer?.map((f) => {
                                if (f.isAvailable) {
                                    return <MenuItem value={f.id}>{f.name}</MenuItem>
                                }
                            })
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
                    <Box sx={{ display: 'flex', justifyContent: 'space-around' }}>
                        <button className="btn-view-all" onClick={handleSave}>
                            Save
                        </button>
                        <button className="btn-view-all" onClick={handleModalClose}>
                            Cancel
                        </button>
                    </Box>
                </Box>
            </Modal>
        )
    }
    // {name, id, unit, index, parent, particular, defQnty, price}
    return (
        <>
            <Box sx={{
            }}>
                <Grid container spacing={2}>
                    <Grid item xs={8}>
                        <Box sx={{
                            backgroundColor: '#F9FAFB',
                        }}>
                            <Stepper activeStep={newActivities.length} connector={<QontoConnector />} orientation='vertical'>
                                {newActivities.map((act, index) => (
                                    <Step key={act.id} sx={{
                                        display: 'flex',
                                        width: '100%',
                                        flexDirection: 'column',
                                        paddingLeft: index === 0 ? 0 : 4,
                                    }}>
                                        <StepLabel StepIconComponent={QontoStepIcon} sx={{
                                            backgroundColor: index === 0 ? '#88C488' : '#FFF',
                                            borderRadius: 2,
                                            paddingX: 2,
                                            boxShadow: 2,
                                            height: index === 0 && 72
                                        }}>
                                            <Box sx={{
                                                display: 'flex',
                                                justifyContent: 'space-between'
                                            }}>
                                                <Box sx={{
                                                    display: 'flex',
                                                    gap: 2,
                                                    alignItems: 'center'
                                                }}>
                                                    <div style={{ fontWidth: '200' }}>{act.date}</div>
                                                    <h6 >{act.label}</h6>
                                                </Box>
                                                <div>{act.time}</div>
                                            </Box>
                                        </StepLabel>
                                        <StepContent sx={{

                                        }}>
                                            {act.label}
                                        </StepContent>
                                    </Step>
                                ))}
                            </Stepper>

                        </Box>
                    </Grid>
                    <Grid item xs={4}>
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
                            <Box>
                                <Doughnut
                                    labels={["Net return", "Production cost"]}
                                    data={[roi[0].netReturn, roi[0].costTotal]}
                                    title={"Expected QP Production"}
                                />
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
            <HandleAddMouse />
        </>

    )
}
export default Activities