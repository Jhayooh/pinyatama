import SearchIcon from '@mui/icons-material/Search';
import { Box, FormControl, InputLabel, InputAdornment, MenuItem, OutlinedInput, Select, Typography, Avatar, Menu, Grid } from '@mui/material';
import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import FarmTabs from './FarmTabs.js';
import './Farms.css';
import { getStorage, ref, listAll, getDownloadURL } from 'firebase/storage';
import { storage } from '../../firebase/Config.js';
import { createTheme } from '@mui/material/styles';
import { DataGrid } from '@mui/x-data-grid';


import Importer from '../Importer.js';
import Exporter from '../Exporter.js';

// icon
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import ViewListIcon from '@mui/icons-material/ViewList';
import More from '@mui/icons-material/MoreVert';
import IconButton from '@mui/material/IconButton';

import GridView from './GridView.js';
import ListView from './ListView.js';

function Farms({ events, farms, users, particularData, pineapple }) {
  const [filteredFarms, setFilteredFarms] = useState(farms);
  const [filteredUsers, setFilteredUsers] = useState(users);
  const [newUser, setNewUser] = useState([{ uid: '1', id: '', displayName: 'Lahat' }, ...users]);
  const [showFarmTabs, setShowFarmTabs] = useState(false);
  const [indFarm, setIndFarm] = useState('');
  const [indUser, setIndUser] = useState('');
  const [imageUrls, setImageUrls] = useState({});

  const [mun, setMun] = useState('');
  const [search, setSearch] = useState('');
  const [userFilter, setUserFilter] = useState('');

  const [grid, setGrid] = useState(true);

  const theme = createTheme({
    palette: {
      yellow: {
        main: '#ffa500',
        light: '#E9DB5D',
        dark: '#A29415',
        contrastText: '#242105',
      },
    },
  });

  const handleMun = (event) => {
    setMun(event.target.value);
  };

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  const handleUser = (event) => {
    setUserFilter(event.target.value);
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
    setFilteredFarms(filteredFarms);
    setFilteredUsers(filteredUsers);
  }, [search, farms, mun, newUser, userFilter]);

  async function getImage(id) {
    try {
      const listRef = ref(storage, `FarmImages/${id}`);
      const result = await listAll(listRef);
      const downloadUrl = await getDownloadURL(result.items[0]);
      return downloadUrl;
    } catch (error) {
      console.error('Error fetching images: ', error);
    }
  }

  useEffect(() => {
    async function fetchImageUrls() {
      const urls = {};
      for (const marker of farms) {
        const url = await getImage(marker.id);
        if (url) {
          urls[marker.id] = url;
        }
      }
      setImageUrls(urls);
    }
    fetchImageUrls();
  }, [farms]);

  const municipalities = [
    { name: 'Lahat', value: '' },
    { name: 'Basud', value: 'BASUD' },
    { name: 'Capalonga', value: 'CAPALONGA' },
    { name: 'Daet', value: 'DAET (Capital)' },
    { name: 'Jose Panganiban', value: 'JOSE PANGANIBAN' },
    { name: 'Labo', value: 'LABO' },
    { name: 'Mercedes', value: 'MERCEDES' },
    { name: 'Paracale', value: 'PARACALE' },
    { name: 'San Lorenzo Ruiz', value: 'SAN LORENZO RUIZ' },
    { name: 'San Vicente', value: 'SAN VICENTE' },
    { name: 'Santa Elena', value: 'SANTA ELENA' },
    { name: 'Talisay', value: 'TALISAY' },
    { name: 'Vinzons', value: 'VINZONS' },
  ];

  function dateFormatter(date) {
    let d;
    if (date && typeof date.toMillis === 'function') {
      d = new Date(date.toMillis());
    } else if (date instanceof Date) {
      d = date;
    } else if (typeof date === 'string' || typeof date === 'number') {
      d = new Date(date);
    } else {
      console.error('Invalid date object:', date);
      return 'Invalid date';
    }

    const options = { year: 'numeric', month: 'long', day: '2-digit' };
    return d.toLocaleDateString('en-US', options);
  }

  const columns = [
    {
      field: 'title',
      headerName: 'Pangalan ng Bukid',
      flex: 1,
      sortable: true,
      renderCell: (params) => (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Avatar sx={{ backgroundColor: 'white' }}>
            {imageUrls[params.row.id] ? (
              <img className='img' src={imageUrls[params.row.id]} alt={params.row.title} style={{ width: '100%', height: '100%' }} />
            ) : (
              <img src={require('../image_src/p1.jpg')} className='img' style={{ width: '80%', height: '80%' }} />
            )}
          </Avatar>
          {params.row.title}
        </Box>
      ),
    },
    {
      field: 'brgy',
      headerName: 'Baranggay',
      flex: 1,
      sortable: true,
      renderCell: (params) => <Typography variant='overline'> {params.row.brgy}</Typography>,
    },
    {
      field: 'mun',
      headerName: 'Munisipalidad',
      flex: 1,
      sortable: true,
      renderCell: (params) => <Typography variant='overline'> {params.row.mun}</Typography>,
    },
    {
      field: 'start_date',
      headerName: 'Petsa ng Pagtanim',
      flex: 1,
      sortable: true,
      valueGetter: (params) => dateFormatter(params.row.start_date),
    },
    {
      field: 'harvest_date',
      headerName: 'Petsa ng inaasahang ani',
      flex: 1,
      sortable: true,
      valueGetter: (params) => dateFormatter(params.row.harvest_date),
    },
  ];

  const datagridStyle = {

    paddingBottom: 0,
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

  const [anchorEl, setAnchorEl] = useState('');
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const currentYear = new Date().getFullYear();
  const years = Array.from(new Array(55), (val, index) => currentYear + 5 - index);

  const [startYear, setStartYear] = useState('');
  const [endYear, setEndYear] = useState('');

  const handleStartYearChange = (event) => {
    setStartYear(event.target.value);
  };

  const handleEndYearChange = (event) => {
    setEndYear(event.target.value);
  };


  return (
    <Box sx={{ backgroundColor: '#f9fafb', p: 1.5, borderRadius: 4, height: '100%' }}>
      <Box sx={{ height: '100%', overflowY: 'hidden' }}>
        {showFarmTabs ? (
          <Box sx={{ height: '100%', overflowY: 'auto', borderRadius: 4 }}>
            <FarmTabs
              farms={filteredFarms.filter((marker) => marker.id === indFarm)}
              setShow={setShowFarmTabs}
              user={users.filter((user) => user.id === indUser)}
              event={events.filter((event) => event.id === indFarm)}
              particularData={particularData}
              pineapple={pineapple}
            />
          </Box>
        ) : (
          <Box sx={{ borderRadius: 4, height: '100%', paddingBottom: 5 }}>
            <Box sx={{ boxShadow: 2, borderRadius: 2, backgroundColor: '#fff' }}>
              <Grid container spacing={1} sx={{ paddingTop: 2, paddingLeft: 2, justifyContent: 'space-evenly' }}>
                {/* SearchBox */}
                <Grid item xs={5} lg={5}>
                  <FormControl fullWidth size='small'>
                    <OutlinedInput
                      id='outlined-adornment-amount'
                      placeholder='Maghanap...'
                      startAdornment={<InputAdornment position='start'><SearchIcon /></InputAdornment>}
                      value={search}
                      onChange={handleSearch}
                    />
                  </FormControl>
                </Grid>
                {/* DateSorting */}
                {/* <Grid item xs={4} lg={2}>
                  <FormControl fullWidth size="small">
                    <InputLabel id="start-year-label">Start Year</InputLabel>
                    <Select
                      labelId="start-year-label"
                      id="start-year-select"
                      value={startYear}
                      label="Start Year"
                      onChange={handleStartYearChange}
                    >
                      {years.map((year) => (
                        <MenuItem key={year} value={year}>
                          {year}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={4} lg={2}>
                  <FormControl fullWidth size="small">
                    <InputLabel id="end-year-label">End Year</InputLabel>
                    <Select
                      labelId="end-year-label"
                      id="end-year-select"
                      value={endYear}
                      label="End Year"
                      onChange={handleEndYearChange}
                    >
                      {years.map((year) => (
                        <MenuItem key={year} value={year}>
                          {year}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid> */}
                {/* MunicipalitySelection */}
                <Grid item xs={5} lg={3}>
                  <FormControl fullWidth size='small'>
                    <InputLabel id='demo-simple-select-label'>Municipality</InputLabel>
                    <Select
                      sx={{ border: 'none' }}
                      labelId='demo-simple-select-label'
                      id='demo-simple-select'
                      value={mun}
                      label='Municipality'
                      onChange={handleMun}
                    >
                      {municipalities.map((municipality) => (
                        <MenuItem key={municipality.value} value={municipality.value}>
                          {municipality.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                {/* ExtensionistSorting */}
                <Grid item xs={5} lg={3}>
                  <FormControl fullWidth size='small'>
                    <InputLabel id='demo-simple-select-label'>Extensionist</InputLabel>
                    <Select
                      sx={{ border: 'none' }}
                      labelId='demo-simple-select-label'
                      id='demo-simple-select'
                      value={userFilter}
                      label='Extensionist'
                      onChange={handleUser}
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
                </Grid>

                {/* MenuIcon */}
                <Grid item >
                  <IconButton
                    aria-label="more"
                    id="long-button"
                    aria-controls={open ? 'long-menu' : undefined}
                    aria-expanded={open ? 'true' : undefined}
                    aria-haspopup="true"
                    onClick={handleClick}
                  >
                    <More />
                  </IconButton>
                  <Menu
                    id="demo-positioned-menu"
                    aria-labelledby="demo-positioned-button"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    anchorOrigin={{
                      vertical: 'top',
                      horizontal: 'left',
                    }}
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'left',
                    }}
                  >
                    <MenuItem >
                      <Importer sx={{ width: '100%' }} />
                    </MenuItem>
                    <MenuItem >
                      <Exporter sx={{ width: '100%' }} />
                    </MenuItem>

                  </Menu>
                </Grid>
              </Grid>
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1, width: 1, p: 2 }}>
                <Button variant='contained' sx={{ backgroundColor: 'orange', '&:hover': { backgroundColor: 'green' } }} startIcon={<ViewListIcon />} onClick={() => setGrid(false)}>
                  List
                </Button>
                <Button variant='contained' sx={{ backgroundColor: 'orange', '&:hover': { backgroundColor: 'green' } }} startIcon={<ViewModuleIcon />} onClick={() => setGrid(true)}>
                  Grid
                </Button>
              </Box>
            </Box>
            <Box sx={{ paddingBottom: 3, height: 1, overflow: 'hidden' }}>
              {grid ? (
                <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', overflowX: 'auto', height: '100%', paddingBottom: {xs: 18, lg:10}, marginTop: 2 }}>
                  {filteredFarms.map((marker, index) => (
                    <GridView
                      key={marker.id}
                      marker={marker}
                      index={index}
                      setShowFarmTabs={setShowFarmTabs}
                      setIndFarm={setIndFarm}
                      setIndUser={setIndUser}
                      imageUrls={imageUrls}
                      user={users.filter((user) => user.id === marker.brgyUID)}
                    />
                  ))}
                </Box>
              ) : (
                <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', overflowY: 'auto', height: '100%', paddingBottom: 10, marginTop: 2 }}>
                  <DataGrid
                    columns={columns}
                    rows={filteredFarms}
                    pageSize={5}
                    rowsPerPageOptions={[5, 10, 20]}
                    onRowClick={(params) => {
                      setShowFarmTabs(true);
                      setIndFarm(params.row.id);
                      setIndUser(params.row.brgyUID);
                    }}
                    sx={{
                      ...datagridStyle,
                      border: 'none',
                      paddingX: 2,
                      overflowX: 'auto',
                      height: `calc(100% - 8px)`,
                      backgroundColor: '#fff',
                      paddingTop: 1
                    }}
                    getRowClassName={(filteredFarms) =>
                      filteredFarms.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd'
                    }
                    hideFooter
                  />
                </Box>
              )}
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
}

export default Farms;
