import SearchIcon from '@mui/icons-material/Search';
import { Box, FormControl, InputLabel, InputAdornment, MenuItem, Divider, OutlinedInput, Select, Typography, Avatar, Menu, Grid } from '@mui/material';
import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import FarmTabs from './FarmTabs.js';
import '../../component/css/Farms.css';
import { getStorage, ref, listAll, getDownloadURL } from 'firebase/storage';
import { storage } from '../../firebase/Config.js';
import { createTheme } from '@mui/material/styles';
import { DataGrid } from '@mui/x-data-grid';

//db

import { addDoc, collection, doc, orderBy, query, updateDoc, Timestamp } from "firebase/firestore";
import { db } from "../../firebase/Config";
import { useCollectionData } from "react-firebase-hooks/firestore";


import Importer from './Importer.js';
import Exporter from './Exporter.js';
import Archive from './Archive.js';

// icon
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import ViewListIcon from '@mui/icons-material/ViewList';
import More from '@mui/icons-material/MoreVert';
import IconButton from '@mui/material/IconButton';
import ArchiveIcon from '@mui/icons-material/ArchiveOutlined';
import UnarchiveIcon from '@mui/icons-material/Unarchive';
import UndoRoundedIcon from '@mui/icons-material/UndoRounded';

import GridView from './GridView.js';
import ListView from './ListView.js';

function Farms({ events, farms, users, particularData, pineapple }) {
  const [filteredFarms, setFilteredFarms] = useState(farms);
  const [filteredUsers, setFilteredUsers] = useState(users);
  const [newUser, setNewUser] = useState([{
    uid: '1',
    id: '',
    displayName: 'All'
  }, ...users]);
  const [showFarmTabs, setShowFarmTabs] = useState(false);
  const [indFarm, setIndFarm] = useState('');
  const [indUser, setIndUser] = useState('');
  const [imageUrls, setImageUrls] = useState({});

  const [mun, setMun] = useState('');
  const [search, setSearch] = useState('');
  const [userFilter, setUserFilter] = useState('');
  const [cropFilter, setCropFilter] = useState('All');
  const [month, setMonth] = useState(0)
  const [year, setYear] = useState(new Date().getFullYear())

  const [selectedMonth, setSelectedMonth] = useState("All");
  const [selectedYear, setSelectedYear] = useState("All");

  const [archive, setArchive] = useState(false)

  const [grid, setGrid] = useState(true);

  const [label, setLabel] = useState(null)

  const activityColl = collection(db, `farms/${farms.id}/activities`)
  const activityQuery = query(activityColl, orderBy('createdAt'))
  const [activities, activitiesLoading] = useCollectionData(activityQuery)

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
    const userMun = users.filter(uf => uf.mun === event.target.value)
    setNewUser(userMun)
    setMun(event.target.value);
  };

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  const handleUser = (event) => {
    setUserFilter(event.target.value);
  };
  const handleCrop = (event) => {
    setCropFilter(event.target.value);
  }
  const handleMonth = (event) => {
    setMonth(event.target.value)
  }
  const handleYear = (event) => {
    setYear(event.target.value)
  }

  const handleArchive = () => {
    setArchive(!archive)
  }

  useEffect(() => {
    if (!activities) return;
    const act = activities.find(a => a.remarks === true);
    console.log('actsss', act)
    if (act) {
      setLabel(act.label);
    }
  }, [activities]);

  const getRemark = () => {
    const activity = activities?.find(a => a.remarks === true);
    return activity ? activity.label : "Undipaynd";
  };


  useEffect(() => {
    const useFilteredFarms = farms.filter((farm) => {
      const matchesArchive = archive ? farm.cropStage === 'complete' || farm.remarks === 'failed' : farm.cropStage !== 'complete' && farm.remarks !== 'failed' && farm.remarks === 'On going'
      const matchesMunicipality = mun ? farm.mun === mun : true;
      const matchesUser = userFilter ? farm.brgyUID === userFilter : true;
      const matchesCropStage = cropFilter !== "All" ? farm.cropStage === cropFilter.toLowerCase() : true;
      const matchesSearch = farm.farmerName.toLowerCase().includes(search.toLowerCase());
      return matchesMunicipality && matchesSearch && matchesUser && matchesCropStage && matchesArchive;
    });
    const filteredUsers = newUser.filter((user) => {
      return user.displayName.includes(userFilter);
    });
    setFilteredFarms(useFilteredFarms);
    setFilteredUsers(filteredUsers);
  }, [search, farms, mun, newUser, userFilter, cropFilter, month, year, archive]);

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
    { name: 'All', value: '' },
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
      headerName: 'Farm Name',
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
      headerName: 'Barangay',
      flex: 1,
      sortable: true,
      renderCell: (params) => <Typography variant='overline'> {params.row.brgy}</Typography>,
    },
    {
      field: 'mun',
      headerName: 'Municipality',
      flex: 1,
      sortable: true,
      renderCell: (params) => <Typography variant='overline'> {params.row.mun}</Typography>,
    },
    {
      field: 'start_date',
      headerName: 'Date of Planting',
      flex: 1,
      sortable: true,
      valueGetter: (params) => dateFormatter(params.row.start_date),
    },
    {
      field: 'harvest_date',
      headerName: 'Date of Expected Harvest',
      flex: 1,
      sortable: true,
      valueGetter: (params) => dateFormatter(params.row.harvest_date),
    },
    // {
    //   field: 'cropStage',
    //   headerName: 'Status',
    //   flex: 1,
    //   sortable: true,
    //   renderCell: (params) => <Typography variant='overline'>{params.row.cropStage}</Typography>,
    // },
    {
      field: 'remarks',
      headerName: 'Remarks',
      flex: 1,
      sortable: true,
      renderCell: (params) => {
        const { cropStage, remarks } = params.row;
        let status = '';
        if (cropStage === 'complete') {
          status = 'Success';
        } else if (remarks === 'failed' && label) {
          status = `Failed due to ${label[0]}`;
        } else if (remarks === 'On going') {
          status = 'On going';
        } else {
          status = remarks;
        }
        const bgColor = {
          'Success': 'green',
          'failed': 'red',
          'On going': 'orange',
        }[status] || 'transparent';
        return (
          <div
            style={{
              backgroundColor: bgColor,
              color: '#fff',
              padding: '5px',
              borderRadius: '4px',
              textAlign: 'center',
              textTransform: 'uppercase'
            }}
          >
            {status}
          </div>
        );
      },
    }

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
  // Month and year selection
  const months = [
    { value: 0, label: 'All' },
    { value: 1, label: 'January' },
    { value: 2, label: 'February' },
    { value: 3, label: 'March' },
    { value: 4, label: 'April' },
    { value: 5, label: 'May' },
    { value: 6, label: 'June' },
    { value: 7, label: 'July' },
    { value: 8, label: 'August' },
    { value: 9, label: 'September' },
    { value: 10, label: 'October' },
    { value: 11, label: 'November' },
    { value: 12, label: 'December' },
  ];

  const year2 = [2022, 2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030];

  return (
    <Box sx={{ backgroundColor: '#f9fafb', p: 2, borderRadius: 4, height: '100%', overflow: 'hidden' }}>
      <Box lg={12} md={12} sm={12} xs={12} sx={{ m: 2, height: '100%', }}>

        <Box sx={{ height: '100%', overflowY: 'hidden' }}>
          {showFarmTabs ? (
            <Box sx={{ height: '100%', overflowY: 'auto', borderRadius: 4 }}>

              <FarmTabs
                farm={filteredFarms.find((marker) => marker.id === indFarm)}
                setShow={setShowFarmTabs}
                user={users.find((user) => user.id === indUser)}
                event={events.filter((event) => event.id === indFarm)}
                particularData={particularData}
                pineapple={pineapple}
              />
            </Box>
          ) : (
            <Box sx={{ borderRadius: 4, height: '100%', paddingBottom: 5 }}>
              <h1 style={{ color: '#000' }}>
                {archive ? `Achived Farms` : `Active Farms`}
              </h1>
              <Divider sx={{ borderBottomWidth: 2, mb: 2 }} />
              <Box sx={{ boxShadow: 2, borderRadius: 2, backgroundColor: '#fff' }}>

                <Box sx={{ display: 'flex', p: 2, borderRadius: 20, gap: 1 }}>

                  <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, width: '100%', gap: 1 }}>
                    {/* Bak butun */}
                    {
                      archive &&
                      <Button onClick={() => (setArchive(false))}>
                        <UndoRoundedIcon />
                      </Button>
                    }
                    {/* Municipality */}
                    <Box sx={{ display: 'flex', width: '100%' }}>
                      <FormControl fullWidth size="small">
                        <InputLabel id="demo-simple-select-label">Municipality</InputLabel>
                        <Select
                          sx={{ border: 'none' }}
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={mun}
                          label="Municipality"
                          onChange={handleMun}
                          MenuProps={{
                            PaperProps: {
                              sx: {
                                maxHeight: 300,
                                overflowY: 'auto',
                              },
                            },
                          }}
                        >
                          {municipalities.map((municipality) => (
                            <MenuItem key={municipality.value} value={municipality.value}>
                              {municipality.name}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Box>
                    {/* ExtensionistSorting */}
                    <Box sx={{ display: 'flex', width: '100%' }}>
                      <FormControl fullWidth size='small'>
                        <InputLabel id='demo-simple-select-label'>BAEW's</InputLabel>
                        <Select
                          sx={{ border: 'none' }}
                          labelId='demo-simple-select-label'
                          id='demo-simple-select'
                          value={userFilter}
                          label='Extensionist'
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
                            { uid: '1', id: '', displayName: 'All' }, // Default user
                            ...newUser.filter(user => user.status === 'active') // Filtered active users
                          ].map((user) => (
                            <MenuItem key={user.uid} value={user.id}>
                              {user.displayName}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Box>
                    {/* Crop Stage */}
                    <Box sx={{ display: 'flex', width: '100%' }}>
                      <FormControl fullWidth size='small'>
                        <InputLabel id='demo-simple-select-label'>Stage of Crops</InputLabel>
                        <Select
                          sx={{ border: 'none' }}
                          labelId='demo-simple-select-label'
                          id='demo-simple-select'
                          value={cropFilter}
                          label='Crop Stage'
                          onChange={handleCrop}
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
                            [{ id: '', cropStage: 'All' },
                            { id: '0', cropStage: 'Vegetative' },
                            { id: '1', cropStage: 'Flowering' },
                            { id: '2', cropStage: 'Fruiting' }].map((farm) => (
                              <MenuItem key={farm.id} value={farm.cropStage}>
                                {farm.cropStage}
                              </MenuItem>
                            ))}
                        </Select>
                      </FormControl>
                    </Box>
                  </Box>
                  <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, width: '100%', gap: 1 }}>
                    {/* Month & Year */}
                    {/* <Box sx={{
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'row',
                    gap: 1,
                  }}
                  >
                    <FormControl fullWidth size="small">
                      <InputLabel id="month-select-label">Buwan</InputLabel>
                      <Select
                        sx={{ border: 'none' }}
                        labelId="month-select-label"
                        id="month-select"
                        value={month}
                        label="Month"
                        onChange={handleMonth}
                      >
                        {months.map((month) => (
                          <MenuItem key={month.value} value={month.value}>
                            {month.label}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                    <FormControl fullWidth size="small">
                      <InputLabel id="year-select-label">Taon</InputLabel>
                      <Select
                        sx={{ border: 'none' }}
                        labelId="year-select-label"
                        id="year-select"
                        label="Taon"
                        value={year}
                        onChange={handleYear}
                      >
                        {year2.map((year) => (
                          <MenuItem key={year} value={year}>
                            {year}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Box> */}
                    {/* SearchBox */}
                    <Box sx={{
                      width: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'flex-end',
                      gap: 1,
                    }}>
                      <FormControl fullWidth size='small'>
                        <OutlinedInput
                          id='outlined-adornment-amount'
                          placeholder='Search...'
                          startAdornment={<InputAdornment position='start'><SearchIcon /></InputAdornment>}
                          value={search}
                          onChange={handleSearch}
                        />
                      </FormControl>
                    </Box>
                    {/* MenuIcon */}
                    <Grid item >
                      <IconButton onClick={() => setGrid(!grid)} >
                        {grid ? <ViewListIcon /> : <ViewModuleIcon />}
                      </IconButton>
                    </Grid>
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
                          <Exporter farms={filteredFarms} sx={{ width: '100%' }} />
                        </MenuItem>
                        <MenuItem onClick={handleArchive} sx={{ width: '100%' }}>
                          <Button variant='text' color='warning' >
                            {archive ? <UnarchiveIcon /> : <ArchiveIcon />}
                            {archive ? `Active` : `Archive`}
                          </Button>
                        </MenuItem>
                      </Menu>
                    </Grid>
                  </Box>
                </Box>
                {/* <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1, width: 1, p: 2 }}>
                <Button variant='contained' sx={{ backgroundColor: 'orange', '&:hover': { backgroundColor: 'green' } }} startIcon={<ViewModuleIcon />} onClick={() => setGrid(true)}>
                  Grid
                </Button>
                <Button variant='contained' sx={{ backgroundColor: 'orange', '&:hover': { backgroundColor: 'green' } }} startIcon={<ViewListIcon />} onClick={() => setGrid(false)}>
                  List
                </Button>
              </Box> */}
              </Box>
              <Box sx={{ paddingBottom: 3, height: '100%', overflowX: 'auto', }}>
                {grid ? (
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', paddingBottom: { xs: 18, lg: 10 }, marginTop: 2 }}>
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
    </Box>
  );
}

export default Farms;
