import * as React from 'react';
import { Box, Button } from '@mui/material';
import Typography from '@mui/material/Typography';


//icon
import CircularProgress from '@mui/material/CircularProgress';


function GridView({ marker, index, setShowFarmTabs, setIndFarm, setIndUser , imageUrls}) {

  function dateFormatter(date) {
    const d = new Date(date.toMillis())
    return d.toLocaleDateString()
  }

  return (
    <Box key={index} sx={{ width: 'calc(30% - 8px)', boxShadow: 3, borderRadius: 0 }}>
      <Box sx={{ paddingY: 2, paddingTop: 0 }}>
        <div className="image-holder" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 5 }}>
          {imageUrls[marker.id] ? (
            <img className='img' src={imageUrls[marker.id]} alt={marker.title} />
          ) : (
            <CircularProgress color='success' />
            
          )}
        </div>
        <div >
          <Typography variant='h6' component='h6' sx={{ paddingLeft: 3, color: 'orange' }}>{marker.title}</Typography>
          <Typography variant='subtitle2' component='h2' sx={{ paddingLeft: 3, }}>{marker.brgy}, {marker.mun}</Typography>
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

  );
}
export default GridView;
