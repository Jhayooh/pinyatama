import SearchIcon from '@mui/icons-material/Search';
import {
    Box,
    FormControl,
    InputAdornment,
    InputLabel,
    MenuItem,
    OutlinedInput,
    Select,
    Typography
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import FarmsSchedule from './FarmsSchedule';


export default function Timeline({ farms, events, users, setSelected }) {
    const [timelineFarms, setTimelineFarms] = useState(farms)
    const [timelineEvents, setTimelineEvents] = useState(events)
    const [filteredUsers, setFilteredUsers] = useState(users);
    const [newUser, setNewUser] = useState([{
        uid: '1',
        id: '',
        displayName: 'Lahat',
    }, ...users])
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
            const matchesUser = userFilter ? farm.brgyUID === userFilter : true;
            return matchesMunicipality && matchesSearch && matchesUser;
        });
        const filteredUsers = newUser.filter((user) => {
            return user.displayName.includes(userFilter);
        });
        setTimelineFarms(filteredFarms);
        setFilteredUsers(filteredUsers);
    }, [search, farms, mun, newUser, userFilter]);

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

    // Month and year selection
    const months = [
        { value: 0, label: 'January' },
        { value: 1, label: 'February' },
        { value: 2, label: 'March' },
        { value: 3, label: 'April' },
        { value: 4, label: 'May' },
        { value: 5, label: 'June' },
        { value: 6, label: 'July' },
        { value: 7, label: 'August' },
        { value: 8, label: 'September' },
        { value: 9, label: 'October' },
        { value: 10, label: 'November' },
        { value: 11, label: 'December' }
    ];

    const years = [2022, 2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030]; // Adjust this range based on your data

    const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
    return (
        <Box sx={{ backgroundColor: '#f9fafb', padding: 2, borderRadius: 4, height: '100%' }}>
            <Box sx={{ boxShadow: 1, borderRadius: 3, backgroundColor: '#fff', height: 1, overflow: 'hidden' }} >
                <Box sx={{ marginBottom: 1, display: 'flex', width: 1, justifyContent: 'flex-start', gap: 1, p: 2, borderRadius: 20 }}>
                    <Box sx={{ width: { xs: '100%', md: '80%', xl: '20%' } }}>
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
                    <Box sx={{ width: { xs: '100%', md: '80%', xl: '20%' } }}>
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
                                {newUser
                                    .filter((user) => user.status === "active") // Filter users with active status
                                    .map((user) => (
                                        <MenuItem key={user.uid} value={user.id}>
                                            {user.displayName}
                                        </MenuItem>
                                    ))}
                            </Select>

                        </FormControl>
                    </Box>
                    <Box
                        sx={{
                            width: { xs: '100%', md: '80%', xl: '20%' },
                            display: 'flex',
                            flexDirection: 'row',
                            gap: 1,
                        }}
                    >
                        <FormControl fullWidth size="small">
                            <InputLabel id="month-select-label">Month</InputLabel>
                            <Select
                                sx={{ border: 'none' }}
                                labelId="month-select-label"
                                id="month-select"
                                value={selectedMonth}
                                label="Month"
                                onChange={(e) => setSelectedMonth(e.target.value)}
                            >
                                {months.map((month) => (
                                    <MenuItem key={month.value} value={month.value}>
                                        {month.label}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <FormControl fullWidth size="small">
                            <InputLabel id="year-select-label">Year</InputLabel>
                            <Select
                                sx={{ border: 'none' }}
                                labelId="year-select-label"
                                id="year-select"
                                label="Year"
                                value={selectedYear}
                                onChange={(e) => setSelectedYear(e.target.value)}
                            >
                                {years.map((year) => (
                                    <MenuItem key={year} value={year}>
                                        {year}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Box>

                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'flex-end',
                            gap: 1,
                            width: { xs: '100%', md: '100%', xl: '60%' },
                        }}
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
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginRight: 2, marginBottom: 1, pr: 4, flexDirection: {xs:'column', md:'row'} }}>
                    <Box sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'flex-start',
                        mr: 3
                    }} >
                        <Box
                            sx={{
                                width: 80,
                                height: 18,
                                background: 'linear-gradient(to right, #93d6b0, #68c690, #52be80)',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                borderRadius: 2,  // optional for rounded corners
                                mr: 1
                            }}
                        >
                        </Box>
                        <Typography variant="subtitle2">
                            Projected
                        </Typography>
                    </Box>
                    <Box sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'flex-start'
                    }} >
                        <Box
                            sx={{
                                width: 80,
                                height: 18,
                                background: 'linear-gradient(to right, #f9c667, #f8ba48, #f6a30b)',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                borderRadius: 2,  // optional for rounded corners
                                mr: 1
                            }}
                        >
                        </Box>
                        <Typography variant="subtitle2">
                            Actual
                        </Typography>
                    </Box>
                </Box>
                <Box sx={{ overflowY: 'auto', padding: 3, paddingBottom: 10, height: '100%' }}>
                    <FarmsSchedule farms={timelineFarms} events={timelineEvents} setSelected={setSelected} />
                </Box>
            </Box>
        </Box>
    )
}