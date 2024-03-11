import React, { useState } from 'react'
import {
    Divider,
    Box,
    Button,
    Paper,
    IconButton,
    InputBase,
    TextField,
    OutlinedInput,
    InputAdornment,
    InputLabel,
    Input
} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import Grid from '@mui/material/Unstable_Grid2';
import FarmsSchedule from './FarmsSchedule';
import { events } from './FarmsConstant';

export default function Timeline({ farms }) {


    return (
        <Box sx={{ backgroundColor: '#f9fafb', padding: 4, borderRadius: 4, height: '100%' }}>
            <Box sx={{ height: '100%' }}>
                <Box sx={{ boxShadow: 1, p: 2, borderRadius: 3, backgroundColor: '#fff', overflow: 'hidden', height: '100%' }} >
                    <Box sx={{ marginBottom: 1.5, display: 'flex', width: 1, justifyContent: 'flex-end', height: 'auto' }}>
                        <Box
                            component='form'
                            sx={{
                                p: '2px 4px',
                                display: 'flex',
                                alignItems: 'center',
                                width: 400,
                                borderRadius: 2.5,
                                border: '2px solid #dcdcdc',
                                // boxShadow: `0 1px 5px 0 rgba(0, 0, 0, 0.2),
                                //             0 2px 2px 0 rgba(0, 0, 0, 0.14),
                                //             0 3px 1px -2px rgba(0, 0, 0, 0.12)`
                            }}
                        >
                            <IconButton sx={{ p: '7px' }} aria-label="menu">
                                <SearchIcon />
                            </IconButton>
                            <InputBase
                                sx={{ ml: 1, flex: 1 }}
                                placeholder="Search for farms"
                                inputProps={{ 'aria-label': 'search farms' }}
                            />
                        </Box>
                    </Box>
                    <Box sx={{ overflowY: 'auto', maxHeight: '100%' }}>
                        <FarmsSchedule farms={farms} events={events} />
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}