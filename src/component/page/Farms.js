import SearchIcon from '@mui/icons-material/Search';
import { Box, FormControl, InputLabel, InputAdornment, MenuItem, OutlinedInput, Select, Typography } from '@mui/material';
import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import FarmTabs from './FarmTabs.js';
import './Farms.css';
import { getStorage, ref, listAll, getDownloadURL } from 'firebase/storage';
import { storage } from '../../firebase/Config.js';

function Farms({ events, farms, users }) {
  const [searchInput, setSearchInput] = useState('');
  const [selectedMunicipality, setSelectedMunicipality] = useState('');
  const navigate = useNavigate();
  const [showFarmTabs, setShowFarmTabs] = useState(false);
  const [indFarm, setIndFarm] = useState('');
  const [indUser, setIndUser] = useState('');
  const [imageUrls, setImageUrls] = useState({});

  const handleButtonClick = (title) => {
    navigate('/farmname', { state: { title } });
  };

  const [mun, setMun] = useState('');

  const handleChange = (event) => {
    setMun(event.target.value);
  };

  const filteredMarkers = farms.filter(marker => {
    if (!searchInput && !selectedMunicipality) {
      return true;
    }

    let isMatched = true;

    if (searchInput && !marker.title.toLowerCase().includes(searchInput.toLowerCase())) {
      isMatched = false;
    }

    if (selectedMunicipality && marker.municipality !== selectedMunicipality) {
      isMatched = false;
    }

    return isMatched;
  });

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

  return (
    <Box sx={{ backgroundColor: '#f9fafb', padding: 2, borderRadius: 4, height: '100%', overflow: 'auto' }}>
      {showFarmTabs ? 
        <FarmTabs farms={filteredMarkers.filter(marker => marker.id === indFarm)} setShow={setShowFarmTabs} user={users.filter(user => user.id === indUser)} event={events.filter(event => event.id === indFarm)} /> :
        <Box sx={{ boxShadow: 1, borderRadius: 3, backgroundColor: '#fff', height: '100%', overflow: 'hidden' }}>
          <Box sx={{ marginBottom: 1, display: 'flex', width: 1, justifyContent: 'flex-end', gap: 2, p: 2 }}>
            <Box sx={{ width: 800 }}>
              <FormControl fullWidth size="small">
                <OutlinedInput
                  id="outlined-adornment-amount"
                  placeholder="Maghanap..."
                  startAdornment={<InputAdornment position="start"><SearchIcon /></InputAdornment>}
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                />
              </FormControl>
            </Box>
            <br />
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
                  {municipalities.map((municipality) => (
                    <MenuItem key={municipality.value} value={municipality.value}>
                      {municipality.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          </Box>
          <br />
          <Box sx={{ display: 'flex', gap: 7, flexWrap: 'wrap', paddingLeft: 5 }}>
            {filteredMarkers.map((marker, index) => (
              <Box key={index} sx={{ width: 'calc(30% - 8px)', marginBottom: 8, boxShadow: 3, borderRadius: 0 }}>
                <Box sx={{ paddingY: 2, paddingTop: 0 }}>
                  <div className="image-holder">
                    {imageUrls[marker.id] ? (
                      <img className='img' src={imageUrls[marker.id]} alt={marker.title} />
                    ) : (
                      <p>Loading image...</p>
                    )}
                  </div>
                  <div >
                    <Typography variant='h6' component='h6' sx={{ paddingLeft: 3, color: 'orange' }}>{marker.title}</Typography>
                    <Typography variant='subtitle2' component='h2' sx={{ paddingLeft: 3, }}>{marker.brgy},{marker.mun}</Typography>
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
