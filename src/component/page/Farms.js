import React, { useState, useEffect } from 'react';
import { Box, FormControl, InputAdornment, MenuItem, OutlinedInput, Select } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase/Config';
import { useNavigate } from 'react-router-dom';
import './Farms.css';

const Geocollection = collection(db, "farms");

function Farms() {
  const [markers, setMarkers] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [selectedMunicipality, setSelectedMunicipality] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await getDocs(Geocollection);
        const filteredData = data.docs.map(async doc => {
          const { title } = doc.data();
          const eventsCollection = collection(doc.ref, "events");
          const eventsSnapshot = await getDocs(eventsCollection);
          const eventsData = eventsSnapshot.docs.map(eventDoc => eventDoc.data());
          return { title, events: eventsData };
        });
        
        const resolvedData = await Promise.all(filteredData);
        setMarkers(resolvedData);
        console.log("Events:", resolvedData); // Show events in console
      } catch (err) {
        console.error(err);
      }
    };
  
    getData();
  }, []);
  
  

  const handleButtonClick = (title) => {
    navigate('/farmname', { state: { title } });
  };

  const filteredMarkers = markers.filter(marker => {
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

  return (
    <Box sx={{ backgroundColor: '#f9fafb', padding: 2, borderRadius: 4, height: '100%', overflow: 'auto' }}>
      <Box sx={{ width: 280 }}>
        <FormControl fullWidth size="small">
          <OutlinedInput
            id="outlined-adornment-amount"
            placeholder="Search for farms"
            startAdornment={<InputAdornment position="start"><SearchIcon /></InputAdornment>}
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
        </FormControl>
      </Box>
      <br />
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
              <em>None</em>
            </MenuItem>
            <MenuItem value={"Basud"}> Basud</MenuItem>
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
      <br />
      <Box sx={{ display: 'flex', gap: 7, flexWrap: 'wrap' }}>
        {filteredMarkers.map((marker, index) => (
          <Box key={index} sx={{ width: 'calc(22% - 8px)', marginBottom: 8, boxShadow: 3, borderRadius: 0 }}>
            <Box sx={{ paddingY: 2, paddingTop: 0 }}>
              <div className="image-holder">
                <img className='img' 
                src='https://firebasestorage.googleapis.com/v0/b/pinyatama-64d69.appspot.com/o/Farms%2FVwluEFdRHb2KG35mKbNR%2Fw.png?alt=media&token=d7bedb44-2d5c-4c8c-a470-f352e3a74503 '/>
              </div>
              <p>{marker.title}</p>
              <button onClick={() => handleButtonClick(marker.title)}>Click here</button>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
}

export default Farms;
