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
import CircularProgress from '@mui/material/CircularProgress';


function Farms({ events, farms, users }) {
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
    <Box sx={{ backgroundColor: '#f9fafb', padding: 2, borderRadius: 4, height: '100vh'}}>
      {showFarmTabs ?
        <FarmTabs farms={filteredFarms.filter(marker => marker.id === indFarm)} setShow={setShowFarmTabs} user={users.filter(user => user.id === indUser)} event={events.filter(event => event.id === indFarm)} /> :
        <Box sx={{ boxShadow: 1, borderRadius: 3, backgroundColor: '#fff', height: '100%', overflow: 'hidden' }}>
          <Box sx={{ marginBottom: 1, display: 'flex', width: 1, justifyContent: 'flex-end', gap: 2, p: 2 }}>
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
          <Box sx={{ display: 'flex', gap: 7, flexWrap: 'wrap', paddingLeft: 5, overflow: 'auto', height: '100%', paddingBottom: 12 }}>
            {filteredFarms.map((marker, index) => (
              <Box key={index} sx={{ width: 'calc(30% - 8px)', boxShadow: 3, borderRadius: 0 }}>
                <Box sx={{ paddingY: 2, paddingTop: 0 }}>
                  <div className="image-holder" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop:5 }}>
                    {imageUrls[marker.id] ? (
                      <img className='img' src={imageUrls[marker.id]} alt={marker.title} />
                    ) : (
                      <CircularProgress color='success'/>
                    )}
                  </div>
                  <div >
                    <Typography variant='h6' component='h6' sx={{ paddingLeft: 3, color: 'orange' }}>{marker.title}</Typography>
                    <Typography variant='subtitle2' component='h2' sx={{ paddingLeft: 3, }}>{marker.brgy},{marker.mun}</Typography>
                    <Typography variant='subtitle2' component='h4' sx={{ paddingLeft: 3, }}> Date of Planting: {dateFormatter(marker.start_date)}</Typography>
                    <Typography variant='subtitle2' component='h4' sx={{ paddingLeft: 3, }}> Date of expected Harvest: {dateFormatter(marker.harvest_date)}</Typography>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'flex-end', paddingRight: 10 }}>
                    <Button variant="contained" color="success" onClick={() => {
                      setShowFarmTabs(true)
                      setIndFarm(marker.id)
                      setIndUser(marker.brgyUID)
                    }}>
                      Iba pang Impormasyon</Button>
                  </div>
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
      }
    </Box>
  );
}

export default Farms;
