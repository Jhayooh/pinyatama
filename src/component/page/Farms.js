import SearchIcon from '@mui/icons-material/Search';
import { Box, FormControl, InputLabel, InputAdornment, MenuItem, OutlinedInput, Select, Typography } from '@mui/material';
import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import FarmTabs from './FarmTabs.js';
import './Farms.css';
import { getStorage, ref, listAll, getDownloadURL } from 'firebase/storage';
import { storage } from '../../firebase/Config.js';
import { createTheme } from '@mui/material/styles';

import Importer from '../Importer.js';
import Exporter from '../Exporter.js';

// icon
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import ViewListIcon from '@mui/icons-material/ViewList';

import GridView from './GridView.js';
import ListView from './ListView.js';


function Farms({ events, farms, users, particularData }) {
  const [filteredFarms, setFilteredFarms] = useState(farms)
  const [filteredUsers, setFilteredUsers] = useState(users);
  const [newUser, setNewUser] = useState([{
    uid: '1',
    id: '',
    displayName: 'Lahat',
  }, ...users])
  const [showFarmTabs, setShowFarmTabs] = useState(false);
  const [indFarm, setIndFarm] = useState('');
  const [indUser, setIndUser] = useState('');
  const [imageUrls, setImageUrls] = useState({});

  const [mun, setMun] = useState('');
  const [search, setSearch] = useState('');
  const [userFilter, setUserFilter] = useState('');

  const [grid, setGrid] = useState(true)

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
    setFilteredFarms(filteredFarms);
    setFilteredUsers(filteredUsers);
  }, [search, farms, mun, newUser, userFilter]);

  async function getImage(id) {
    try {
      const listRef = ref(storage, `FarmImages/${id}`);
      const result = await listAll(listRef);
      const downloadUrl = await getDownloadURL(result.items[0])
      return downloadUrl
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
  }, []);

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

  function dateFormatter(date) {
    const d = new Date(date.toMillis())
    return d.toLocaleDateString()
  }

  return (
    <Box sx={{ backgroundColor: '#f9fafb', padding: 2, borderRadius: 4, height: '100vh' }}>
      {showFarmTabs ?
        <Box sx={{ height: '100%', overflowY: 'auto' }}>
          <FarmTabs farms={filteredFarms.filter(marker => marker.id === indFarm)} setShow={setShowFarmTabs} user={users.filter(user => user.id === indUser)} event={events.filter(event => event.id === indFarm)} particularData={particularData} />
        </Box >
        :
        <Box sx={{ boxShadow: 1, borderRadius: 3, backgroundColor: '#fff', height: '100%', overflow: 'hidden' }}>
          <Box sx={{ display: 'flex', width: 1, justifyContent: 'flex-end', gap: 2, paddingTop: 2, paddingX: 2 }}>
            <Box sx={{ width: '80%' }}>
              <FormControl fullWidth size="small">
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
                    newUser.map((user) => (
                      <MenuItem key={user.uid} value={user.id}>
                        {user.displayName}
                      </MenuItem>
                    ))
                  }
                </Select>
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
                  onChange={handleMun}
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
            <Box>
              <Importer />
            </Box>
            <Box>
              <Exporter farms={farms} />
            </Box>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1, width: 1, p: 2 }}>
            <Button variant="contained" sx={{ backgroundColor: 'orange' }} startIcon={<ViewListIcon />} onClick={() => {
              setGrid(false)
            }}>
            </Button>
            <Button variant="contained" sx={{ backgroundColor: 'orange' }} startIcon={<ViewModuleIcon />} onClick={() => {
              setGrid(true)
            }}>
              Grid
            </Button>
          </Box>
          {
            grid ?
              <Box sx={{ display: 'flex', gap: 7, flexWrap: 'wrap', paddingLeft: 5, overflow: 'auto', height: '100%', paddingBottom: 12 }}>
                {filteredFarms.map((marker, index) => (
                  <GridView marker={marker} index={index} setShowFarmTabs={setShowFarmTabs} setIndFarm={setIndFarm} setIndUser={setIndUser} imageUrls={imageUrls} />
                ))}
              </Box>
              :
              <Box sx={{ display: 'flex', flexWrap: 'wrap', paddingLeft: 2, overflow: 'auto', height: '100%', width: 1 }}>
                {filteredFarms.map((marker, index) => (
                  <ListView marker={marker} index={index} setShowFarmTabs={setShowFarmTabs} setIndFarm={setIndFarm} setIndUser={setIndUser} imageUrls={imageUrls} />
                ))}
              </Box>
          }
        </Box>
      }
    </Box>
  );
}

export default Farms;
