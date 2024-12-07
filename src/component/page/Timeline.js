import SearchIcon from '@mui/icons-material/Search';
import {
    Box,
    FormControl,
    InputAdornment,
    InputLabel,
    MenuItem,
    OutlinedInput,
    Select,
    Typography,
    Divider
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import FarmsSchedule from './FarmsSchedule';
import { db } from '../../firebase/Config';
import { collection, getDocs } from 'firebase/firestore';

export default function Timeline({ farms, events, users, setSelected, farmer }) {
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
        const userMun = users.filter(uf => uf.mun === event.target.value)
        setNewUser(userMun)
        setMun(event.target.value);
    };

    const handleSearch = (event) => {
        setSearch(event.target.value)
    };

    const handleUser = (event) => {
        setUserFilter(event.target.value)
    };

    useEffect(() => {
        if (!farms) return;

        const fetchEvents = async () => {
            const eventsPromises = farms.map(async (farm) => {
                const eventsRef = collection(db, `farms/${farm.id}/events`);
                const eventsSnapshot = await getDocs(eventsRef);
                const eventsData = eventsSnapshot.docs.map((doc) => ({
                    ...doc.data(),
                    start_time: doc.data().start_time.toMillis(),
                    end_time: doc.data().end_time.toMillis()
                }));
                return eventsData;
            });
            const allEvents = await Promise.all(eventsPromises);
            setTimelineEvents(allEvents.flat());
        };
        fetchEvents();
    }, [farms]);



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

    const years = [2022, 2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030];

    const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
    return (
        <Box
            sx={{
                backgroundColor: '#f9fafb',
                padding: 2,
                borderRadius: 4,
                height: '100%',
                overflow: 'hidden',
            }}
        >
            <Box sx={{ m: 2, height: '100%', display: 'flex', flexDirection: 'column' }}>
                <h1 style={{ color: '#000' }}>Timeline</h1>
                <Divider sx={{ borderBottomWidth: 2, mb: 2 }} />

                <Box
                    sx={{
                        boxShadow: 1,
                        borderRadius: 3,
                        backgroundColor: '#fff',
                        flex: 1,
                        display: 'flex',
                        flexDirection: 'column',
                        overflow: 'hidden',
                        padding: 2,
                        mb: 2
                    }}
                >
                    <Box sx={{ display: 'flex', p: 2, borderRadius: 20, gap: 1 }}>
                        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, width: '100%', gap: 1 }}>
                            {/* Municipality  */}
                            <Box sx={{ width: '100%' }}>
                                <FormControl fullWidth size="small">
                                    <InputLabel id="demo-simple-select-label">Municipality</InputLabel>
                                    <Select
                                        sx={{ border: "none" }}
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={mun}
                                        label="Municipality"
                                        onChange={handleChange}
                                        MenuProps={{
                                            PaperProps: {
                                                sx: {
                                                    maxHeight: 300,
                                                    overflowY: 'auto',
                                                },
                                            },
                                        }}
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
                            {/* Extensionist */}
                            <Box sx={{ width: '100%' }}>
                                <FormControl fullWidth size="small">
                                    <InputLabel id="demo-simple-select-label">BAEWs</InputLabel>
                                    <Select
                                        sx={{ border: "none" }}
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={userFilter}
                                        label="Extensionist"
                                        onChange={handleUser}
                                        MenuProps={{
                                            PaperProps: {
                                                sx: {
                                                    maxHeight: 300,
                                                    overflowY: 'auto',
                                                },
                                            },
                                        }}
                                    >
                                        {[
                                            { uid: '1', id: '', displayName: 'Lahat' }, // Default user
                                            ...newUser.filter(user => user.status === 'active') // Filtered active users
                                        ].map((user) => (
                                            <MenuItem key={user.uid} value={user.id}>
                                                {user.displayName}
                                            </MenuItem>
                                        ))}
                                    </Select>

                                </FormControl>
                            </Box>
                        </Box>
                        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, width: '100%', gap: 1 }}>
                            <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'flex-end',
                                    gap: 1,
                                    width: { xs: '100%', md: '100%', xl: '100%' },
                                }}
                            >
                                <FormControl fullWidth size="small" >
                                    <OutlinedInput
                                        id="outlined-adornment-amount"
                                        placeholder="Search..."
                                        startAdornment={<InputAdornment position="start"><SearchIcon /></InputAdornment>}
                                        value={search}
                                        onChange={handleSearch}
                                    />
                                </FormControl>
                            </Box>
                        </Box>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginRight: 2, marginBottom: 1, pr: 4, flexDirection: { xs: 'column', md: 'row' } }}>
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
                                Projected Schedule
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
                                Actual Schedule
                            </Typography>
                        </Box>
                    </Box>
                    <Box
                        sx={{
                            flex: 1,
                            overflowY: 'auto',
                        }}
                    >
                        <FarmsSchedule
                            isTimelinePage={true}
                            farms={timelineFarms}
                            events={timelineEvents}
                            setSelected={setSelected}
                        />
                    </Box>
                </Box>
            </Box>
        </Box>

    )
}