import React, { useState, useEffect } from 'react'
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
    Input,
    FormControl,
    Select,
    MenuItem,
} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import Grid from '@mui/material/Unstable_Grid2';
import FarmsSchedule from './FarmsSchedule';

export default function Timeline({ farms, events }) {
    const [timelineFarms, setTimelineFarms] = useState(farms)
    const [timelineEvents, setTimelineEvents] = useState(events)

    const [mun, setMun] = useState('');
    const [search, setSearch] = useState('');

    const handleChange = (event) => {
        setMun(event.target.value);
    };

    const handleSearch = (event) => {
        setSearch(event.target.value)
    };

    useEffect(() => {
        const filteredFarms = farms.filter((farm) => {
            const matchesMunicipality = mun ? farm.mun === mun : true;
            const matchesSearch = farm.farmerName.toLowerCase().includes(search.toLowerCase());
            return matchesMunicipality && matchesSearch;
        });
        setTimelineFarms(filteredFarms);
    }, [search, farms, mun]);

    return (
        <Box sx={{ backgroundColor: '#f9fafb', padding: 2, borderRadius: 4, height: '100%' }}>
            <Box sx={{ boxShadow: 1, borderRadius: 3, backgroundColor: '#fff', height: 1, overflow: 'hidden' }} >
                <Box sx={{ marginBottom: 1, display: 'flex', width: 1, justifyContent: 'flex-end', gap: 2, p: 2 }}>
                    <Box
                        sx={{ width: 280 }}
                    >
                        <FormControl fullWidth size="small" >
                            <OutlinedInput
                                id="outlined-adornment-amount"
                                placeholder="Search for farms"
                                startAdornment={<InputAdornment position="start"><SearchIcon /></InputAdornment>}
                                value={search}
                                onChange={handleSearch}
                            />
                        </FormControl>
                    </Box>
                    <Box sx={{ minWidth: 180 }}>
                        <FormControl fullWidth size="small">
                            <InputLabel id="demo-simple-select-label">Municipality</InputLabel>
                            <Select
                                sx={{
                                    border: "none"
                                }}
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={mun}
                                label="Municipality"
                                onChange={handleChange}
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                <MenuItem value={"San Lorenzo Ruiz"}>San Lorenzo Ruiz</MenuItem>
                                <MenuItem value={"Labo"}>Labo</MenuItem>
                                <MenuItem value={"Mercedes"}>Mercedes</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                </Box>
                <FarmsSchedule farms={timelineFarms} events={timelineEvents} />
            </Box>
        </Box>
    )
}