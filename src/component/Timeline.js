import SearchIcon from '@mui/icons-material/Search';
import {
    Box,
    FormControl,
    InputAdornment,
    InputLabel,
    MenuItem,
    OutlinedInput,
    Select
} from '@mui/material';
import React, { useEffect, useState } from 'react';
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
                <Box sx={{ marginBottom: 1, display: 'flex', width: 1, justifyContent: 'flex-start', gap: 2, p: 2,borderRadius:20 }}>
                    <Box
                        sx={{ width: 800 }}
                    >
                        <FormControl fullWidth size="small" >
                            <OutlinedInput
                                id="outlined-adornment-amount"
                                placeholder="Maghanap..."
                                startAdornment={<InputAdornment position="start"><SearchIcon /></InputAdornment>}
                                value={search}
                                onChange={handleSearch}
                            />
                        </FormControl>
                    </Box>
                    <Box sx={{ minWidth: 300 }}>
                        <FormControl fullWidth size="small">
                            <InputLabel id="demo-simple-select-label">Municipality</InputLabel>
                            <Select
                                sx={{border: "none"}}
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={mun}
                                label="Municipality"
                                onChange={handleChange}
                            >
                                <MenuItem value="">
                                    <em>Lahat</em>
                                </MenuItem>
                                <MenuItem value={"BASUD"}>Basud</MenuItem>
                                <MenuItem value={"CAPALONGA"}>Capalonga</MenuItem>
                                <MenuItem value={"DAET"}>Daet</MenuItem>
                                <MenuItem value={"JOSE PANGANIBAN"}> Jose Panganiban</MenuItem>
                                <MenuItem value={"LABO"}>Labo</MenuItem>
                                <MenuItem value={"MERCEDES"}>Mercedes</MenuItem>
                                <MenuItem value={"PARACALE"}>Paracale</MenuItem>
                                <MenuItem value={"SAN LORENZO RUIZ"}>San Lorenzo Ruiz</MenuItem>
                                <MenuItem value={"SAN VICENTE"}>San Vicente</MenuItem>
                                <MenuItem value={"SANTA ELENA"}>Santa Elena</MenuItem>
                                <MenuItem value={"TALISAY"}>Talisay</MenuItem>
                                <MenuItem value={"VINZONS"}>Vinzons</MenuItem>
                                
                                
                            </Select>
                        </FormControl>
                    </Box>
                </Box>
                <FarmsSchedule farms={timelineFarms} events={timelineEvents} />
            </Box>
        </Box>
    )
}