import SearchIcon from '@mui/icons-material/Search';
import { Box, FormControl, InputLabel, InputAdornment, MenuItem, OutlinedInput, Select, Typography } from '@mui/material';
import { collection } from 'firebase/firestore';
import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import FarmTabs from './FarmTabs.js';
import './Farms.css';
import { getStorage, ref, listAll, getDownloadURL } from 'firebase/storage';
import { storage } from '../../firebase/Config.js';

function Farms({ events, farms, users }) {
  console.log(farms);
  const [markers, setMarkers] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [selectedMunicipality, setSelectedMunicipality] = useState('');
  const navigate = useNavigate();
  const [showFarmTabs, setShowFarmTabs] = useState(false);
  const [indFarm, setindFarm] = useState('');
  const [indUser, setindUser] = useState('');
  const [timelineFarms, setTimelineFarms] = useState(farms)
  const [timelineEvents, setTimelineEvents] = useState(events)
  const [imageUrls, setImageUrls] = useState({});


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

  useEffect(() => {
    // Fetch image URLs for filtered markers
    async function fetchImageUrls() {
      const urls = {};
      for (const marker of filteredMarkers) {
        const url = await getImage(marker.id);
        if (url) {
          urls[marker.id] = url;
        }
      }
      setImageUrls(urls);
    }

    fetchImageUrls();
  }, [filteredMarkers]);

  async function getImage(id) {
    const imageUrl = ""
    try {
      const listRef = ref(storage, `FarmImages/${id}`);
      const result = await listAll(listRef);
      const downloadUrl = await getDownloadURL(result.items[0])
      // const imagePromises = result.items.map(async (itemRef) => {
      //   const downloadURL = await getDownloadURL(itemRef);
      //   // const metadata = await itemRef.getMetadata();
      //   console.log("dlURL:", downloadURL);
      //   return {
      //     src: downloadURL,
      //   };
      // });
      // const imagesData = await Promise.all(imagePromises);
      // setImages(imagesData);
      return downloadUrl
    } catch (error) {
      console.error('Error fetching images: ', error);
    }
  }
  useEffect(() => {
    // Fetch image URLs for filtered markers
    async function fetchImageUrls() {
      const urls = {};
      for (const marker of filteredMarkers) {
        const url = await getImage(marker.id);
        if (url) {
          urls[marker.id] = url;
        }
      }
      setImageUrls(urls);
    }

    fetchImageUrls();
  }, [filteredMarkers]);

  async function getImage(id) {
    const imageUrl = ""
    try {
      const listRef = ref(storage, `FarmImages/${id}`);
      const result = await listAll(listRef);
      const downloadUrl = await getDownloadURL(result.items[0])
      // const imagePromises = result.items.map(async (itemRef) => {
      //   const downloadURL = await getDownloadURL(itemRef);
      //   // const metadata = await itemRef.getMetadata();
      //   console.log("dlURL:", downloadURL);
      //   return {
      //     src: downloadURL,
      //   };
      // });
      // const imagesData = await Promise.all(imagePromises);
      // setImages(imagesData);
      return downloadUrl
    } catch (error) {
      console.error('Error fetching images: ', error);
    }
  }
console.log('ejdjs',users)
console.log('farsjdka',farms)

  return (
    <Box sx={{ backgroundColor: '#f9fafb', padding: 2, borderRadius: 4, height: '100%', overflow: 'auto' }}>
      {showFarmTabs ? <FarmTabs farm={GetIndObj(farms, indFarm)} setShow={setShowFarmTabs} user={GetIndObj(users, indUser)}/> :
        <Box sx={{ boxShadow: 1, borderRadius: 3, backgroundColor: '#fff', height: 1, overflow: 'hidden' }}>
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
                    {imageUrls[marker.id] ? (
                      <img className='img' src={imageUrls[marker.id]} alt={marker.title} />
                    ) : (
                      <p>Loading image...</p>
                    )}
                  </div>
                  <div >
                    <Typography variant='h6' component='h6' sx={{paddingLeft:3,color:'orange'}}>{marker.title}</Typography>
                    <Typography variant='subtitle2' component='h2' sx={{paddingLeft:3,}}>{marker.brgy},{marker.mun}</Typography>
                  {/* <p style={{ paddingLeft: 20, paddingTop: 10, color: 'orange', fontWeight: 'bold', fontSize: 15 }}>{marker.title}</p> */}
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'flex-end', paddingRight:10}}>
                  <Button variant="contained" color="success" onClick={() => {
                    setShowFarmTabs(true)
                    setindFarm(marker.id)
                    setindUser(marker.brgyUID)
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
