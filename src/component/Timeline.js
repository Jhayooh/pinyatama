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


export default function Timeline({ farms, events, users, setSelected }) {
    const [timelineFarms, setTimelineFarms] = useState(farms)
    const [timelineEvents, setTimelineEvents] = useState(events)
    const [filteredUsers, setFilteredUsers] = useState(users);

    const [mun, setMun] = useState('');
    const [search, setSearch] = useState('');
    const [userFilter, setUserFilter] = useState('');

    const handleChange = (event) => {
        setMun(event.target.value);
    };

    const handleSearch = (event) => {
        setSearch(event.target.value)
    };

    const handleUser = (event) => {
        setUserFilter(event.target.value)
    };

    useEffect(() => {
        const filteredFarms = farms.filter((farm) => {
            const matchesMunicipality = mun ? farm.mun === mun : true;
            const matchesSearch = farm.farmerName.toLowerCase().includes(search.toLowerCase());
            const matchesUser = userFilter ? farm.brgyUID === userFilter: true;
            return matchesMunicipality && matchesSearch && matchesUser;
        });
        const filteredUsers = users.filter((user) => {
            return user.displayName.includes(userFilter);
        });
        setTimelineFarms(filteredFarms);
        setFilteredUsers(filteredUsers);
    }, [search, farms, mun, users, userFilter]);

    const municipalities = [
        { name: "Lahat", value: "" },
        { name: "Basud", value: "BASUD" },
        { name: "Capalonga", value: "CAPALONGA" },
        { name: "Daet", value: "DAET (Capital)" },
        { name: "Jose Panganiban", value: "JOSE PANGANIBAN" },
        { name: "Labo", value: "LABO" },
        { name: "Mercedes", value: "MERCEDES" },
        { name: "Paracale", value: "PARACALE" },
        { name: "San Lorenzo Ruiz", value: "SAN LORENZO RUIZ" },
        { name: "San Vicente", value: "SAN VICENTE" },
        { name: "Santa Elena", value: "SANTA ELENA" },
        { name: "Talisay", value: "TALISAY" },
        { name: "Vinzons", value: "VINZONS" }
    ];

    // Filter the municipalities based on the selected mun
    const filteredMunicipalities = municipalities.filter(m => m.value === mun);

    return (
        <Box sx={{ backgroundColor: '#f9fafb', padding: 2, borderRadius: 4, height: '100%' }}>
            <Box sx={{ boxShadow: 1, borderRadius: 3, backgroundColor: '#fff', height: 1, overflow: 'hidden' }} >
                <Box sx={{ marginBottom: 1, display: 'flex', width: 1, justifyContent: 'flex-start', gap: 2, p: 2, borderRadius: 20 }}>
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
                                sx={{ border: "none" }}
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={mun}
                                label="Municipality"
                                onChange={handleChange}
                            >
                                {
                                    municipalities.map((municipality) => (
                                        <MenuItem key={municipality.value} value={municipality.value}>
                                            {municipality.name}
                                        </MenuItem>
                                    ))
                                }
                            </Select>
                        </FormControl>
                    </Box>
                    <Box sx={{ minWidth: 300 }}>
                        <FormControl fullWidth size="small">
                            <InputLabel id="demo-simple-select-label">Extensionist</InputLabel>
                            <Select
                                sx={{ border: "none" }}
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={userFilter}
                                label="Extensionist"
                                onChange={handleUser}
                            >
                                {
                                    users.map((user) => (
                                        <MenuItem key={user.uid} value={user.id}>
                                            {user.displayName}
                                        </MenuItem>
                                    ))
                                }
                            </Select>
                        </FormControl>
                    </Box>
                </Box>
                <FarmsSchedule farms={timelineFarms} events={timelineEvents} setSelected={setSelected}/>
            </Box>
        </Box>
    )
}