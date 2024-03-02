import React from 'react'
import {
    Divider,
    Box,
    Button,
    Paper,
    IconButton,
    InputBase,
    TextField
} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import Grid from '@mui/material/Unstable_Grid2';
import FarmsSchedule from './FarmsSchedule';
import { farms, events } from './FarmsConstant';



export default function Timeline() {
    
    return (
        <Box sx={{ backgroundColor: '#f9fafb', padding: 4, borderRadius: 4, height: '100%', overflowY: 'auto' }}>
            
            <Grid container spacing={4} alignItems='stretch'>
                <Grid lg={12} >
                    <h1 style={{ color: '#000' }}>Timeline</h1>
                    <Divider sx={{ borderBottomWidth: 3 }} />
                </Grid>
                <Grid lg={12} sx={{ width: 1, height: '100%' }}>
                    <Box sx={{ boxShadow: 1, p: 2, borderRadius: 3, backgroundColor: '#fff', overflow: 'hidden' }} >
                        <Box sx={{ paddingBottom: 12 }}>
                        <TextField
          label="Search"
          variant="outlined"
          
          sx={{ maxWidth: 400 }}
        />
                        </Box>
                        <Box sx={{ maxHeight: 220, overflowY: 'auto' }}>
                            <FarmsSchedule farms={farms} events={events} />
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    )
}