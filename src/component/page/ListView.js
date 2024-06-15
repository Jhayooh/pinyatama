import React from 'react'
import { Box, Button, CircularProgress } from '@mui/material';

// icon
import farm from '../image_src/seedling.png';

function ListView({ marker, index, setShowFarmTabs, setIndFarm, setIndUser, imageUrls }) {

  return (
    <Button key={index} sx={{ height: 70, width: 1, backgroundColor: 'red' }} onClick={() => {
      setShowFarmTabs(true)
      setIndFarm(marker.id)
      setIndUser(marker.brgyUID)
    }} >
      <Box sx={{ display: 'flex', justifyContent: 'space-around', height: '100%', width: '100%' }}>
        <Box sx={{ display: 'flex', height: '100%', alignItems: 'center', backgroundColor: 'green', alignItems: 'center' }}>
          <img src={farm} alt="Farms icon" height='60%' />
        </Box>
        <Box sx={{ display: 'flex', height: '100%', backgroundColor: 'green', alignItems: 'center' }}>
          <h3>hello world</h3>
        </Box>
        <Box sx={{ display: 'flex', height: '100%', backgroundColor: 'green', alignItems: 'center' }}>
          {/* {imageUrls[marker.id] ? (
            <img className='img' src={imageUrls[marker.id]} alt={marker.title} height='90%' width='100%' />
          ) : (
            <CircularProgress color='success' />
          )} */}
        </Box>
        <Box sx={{ display: 'flex', height: '100%', backgroundColor: 'green', alignItems: 'center' }}>
          <h3>hello world</h3>
        </Box>
      </Box>
    </Button>
  )
}

export default ListView