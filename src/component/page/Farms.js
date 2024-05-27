import SearchIcon from '@mui/icons-material/Search';
import { Box, FormControl, InputLabel, InputAdornment, MenuItem, OutlinedInput, Select } from '@mui/material';
import { collection } from 'firebase/firestore';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import FarmTabs from './FarmTabs.js';
import './Farms.css';

function Farms({ events, farms }) {
  console.log(farms);
  console.log(farms);
  const [markers, setMarkers] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [selectedMunicipality, setSelectedMunicipality] = useState('');
  const navigate = useNavigate();
  const [showFarmTabs, setShowFarmTabs] = useState(false);
  const [indFarm, setindFarm] = useState('')
  const [timelineFarms, setTimelineFarms] = useState(farms)
  const [timelineEvents, setTimelineEvents] = useState(events)


  const handleButtonClick = (title) => {
    navigate('/farmname', { state: { title } });
  };
  const [mun, setMun] = useState('');
  const [search, setSearch] = useState('');


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

  function GetIndObj(object, id) {
    return object.filter((obj) => {
      return obj.id === id;
    });
  }


  console.log("indFarm", GetIndObj(farms, indFarm));

  return (
    <Box sx={{ backgroundColor: '#f9fafb', padding: 2, borderRadius: 4, height: '100%', overflow: 'auto' }}>
      {showFarmTabs ? <FarmTabs farm={GetIndObj(farms, indFarm)} /> :
        <Box sx={{ boxShadow: 1, borderRadius: 3, backgroundColor: '#fff', height: 1, overflow: 'hidden' }}>
          <Box sx={{ marginBottom: 1, display: 'flex', width: 1, justifyContent: 'flex-end', gap: 2, p: 2 }}>
            <Box sx={{ width: 280 }}>
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
            <Box sx={{ minWidth: 180 }}>
              <FormControl fullWidth size="small">
                <InputLabel id="demo-simple-select-label">Municipality</InputLabel>
                <Select
                  sx={{ border: "none" }}
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Municipality"
                  value={selectedMunicipality}
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
          <br />
          <Box sx={{ display: 'flex', gap: 7, flexWrap: 'wrap', paddingLeft: 5 }}>
            {filteredMarkers.map((marker, index) => (
              <Box key={index} sx={{ width: 'calc(30% - 8px)', marginBottom: 8, boxShadow: 3, borderRadius: 0 }}>
                <Box sx={{ paddingY: 2, paddingTop: 0 }}>
                  <div className="image-holder">
                    <img className='img'
                      src='https://firebasestorage.googleapis.com/v0/b/pinyatama-64d69.appspot.com/o/Farms%2FVwluEFdRHb2KG35mKbNR%2Fw.png?alt=media&token=d7bedb44-2d5c-4c8c-a470-f352e3a74503 ' />
                  </div>
                  <div >
                  <p style={{ paddingLeft: 20, paddingTop: 10, color: 'orange', fontWeight: 'bold', fontSize: 15 }}>{marker.title}</p>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <button style={{
                    marginRight:10,
                    backgroundColor: 'green',
                    color: 'white',
                    borderRadius: 5,
                    border:0,
                    padding:5
                    
                  }} onClick={() => {
                    setShowFarmTabs(true)
                    setindFarm(marker.id)

                    console.log("this is the ind farm", marker);
                  }}>Iba pang Impormasyon</button>
                  </div>

                </Box>
              </Box>
            ))}
          </Box>

        </Box>}

    </Box>
  );
}

export default Farms;
