import SearchIcon from '@mui/icons-material/Search';
import { Box, FormControl, InputAdornment, MenuItem, OutlinedInput, Select } from '@mui/material';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FarmTabs from './FarmTabs.js';
import './Farms.css';

function Farms({ events, farms }) {
  console.log(farms);
  const [markers, setMarkers] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [selectedMunicipality, setSelectedMunicipality] = useState('');
  const navigate = useNavigate();
  const [showFarmTabs, setShowFarmTabs] = useState(false);
  const [indFarm, setindFarm] = useState('')


  const handleButtonClick = (title) => {
    navigate('/farmname', { state: { title } });
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

  function GetIndObj(object, id) {
    return object.filter((obj) => {
      return obj.id === id;
    });
  }

  console.log("indFarm", GetIndObj(farms, indFarm));

  return (
    <Box sx={{ backgroundColor: '#f9fafb', padding: 2, borderRadius: 4, height: '100%', overflow: 'auto' }}>
      {showFarmTabs ? <FarmTabs farm={GetIndObj(farms, indFarm)} /> :
        <Box>
          <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2 }}>
            <Box sx={{ flexGrow: 1 }}>
              <FormControl fullWidth size="small">
                <OutlinedInput
                  id="outlined-adornment-amount"
                  placeholder="Maghanap"
                  startAdornment={<InputAdornment position="start"><SearchIcon /></InputAdornment>}
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                />
              </FormControl>
            </Box>
            <Box sx={{ minWidth: 180 }}>
              <FormControl fullWidth size="small">
                <Select
                  sx={{ border: "none" }}
                  labelId="demo-simple-select-label"
                  
                  id="demo-simple-select"
                  label="Municipality"
                  value={selectedMunicipality}
                  onChange={(e) => setSelectedMunicipality(e.target.value)}
                >
                  <MenuItem value="">
                    <em>Lahat</em>
                  </MenuItem>
                  <MenuItem value={"Basud"}>Basud</MenuItem>
                  <MenuItem value={"Capalongga"}>Capalongga</MenuItem>
                  <MenuItem value={"Daet"}>Daet</MenuItem>
                  <MenuItem value={"Jose Panganiban"}>Jose Panganiban</MenuItem>
                  <MenuItem value={"Labo"}>Labo</MenuItem>
                  <MenuItem value={"Mercedes"}>Mercedes</MenuItem>
                  <MenuItem value={"Paracale"}>Paracale</MenuItem>
                  <MenuItem value={"San Lorenzo Ruiz"}>San Lorenzo Ruiz</MenuItem>
                  <MenuItem value={"San Vicente"}>San Vicente</MenuItem>
                  <MenuItem value={"Santa Elena"}>Santa Elena</MenuItem>
                  <MenuItem value={"Talisay"}>Talisay</MenuItem>
                  <MenuItem value={"Vinzons"}>Vinzons</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Box>
        </Box>}
      <br />
      
      <Box sx={{ display: 'flex', gap: 7, flexWrap: 'wrap' }}>
        {filteredMarkers.map((marker, index) => (
          <Box key={index} sx={{ width: 'calc(30% - 8px)', marginBottom: 8, boxShadow: 3, borderRadius: 0 }}>
            <Box sx={{ paddingY: 2, paddingTop: 0 }}>
              <div className="image-holder">
                <img className='img'
                  src='https://firebasestorage.googleapis.com/v0/b/pinyatama-64d69.appspot.com/o/Farms%2FVwluEFdRHb2KG35mKbNR%2Fw.png?alt=media&token=d7bedb44-2d5c-4c8c-a470-f352e3a74503 ' />
              </div>
              <p style={{ paddingLeft: 20, fontFamily: 'monospace', color: 'orange', fontWeight: 'bold', fontSize: 20 }}>{marker.title}</p>
              <button style={{ paddingLeft: 20, backgroundColor:'green', color:'white', borderWidth:0, padding:5, marginLeft:130 }} onClick={() => {
                setShowFarmTabs(true)
                setindFarm(marker.id)
                console.log("this is the ind farm", marker);
              }}>Karagdagang impormasyon</button>

            </Box>
          </Box>
        ))}
      </Box>



    </Box>
  );
}

export default Farms;
