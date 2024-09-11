import * as React from 'react';
import {
  Button,
  Box,
  Paper,
  Typography,
  Divider,
  Grid,
  Avatar
} from '@mui/material';


//icon
import CircularProgress from '@mui/material/CircularProgress';

function GridView({ marker, index, setShowFarmTabs, setIndFarm, setIndUser, imageUrls, user }) {
  console.log("user sa grid", user);

  function dateFormatter(date) {
    const d = new Date(date.toMillis())
    return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
  }

  return (
    <Grid container sx={{ width: { xs: '100%',sm:'calc(80%-90px)', md: 'calc(50% - 90px)' ,lg: 'calc(30% - 50px)'  } }}>
      <Grid item xs={12} sm={12} md={12} lg={12} sx={{ paddingLeft: 2, paddingTop: 2 }}>
        <Box
          sx={{
            borderRadius: '20px',
            border: 2,
            borderColor: '#f9fafb', '&:hover': { borderColor: '#88c488' },
            cursor: 'pointer',
            
          }}
          onClick={() => {
            setShowFarmTabs(true)
            setIndFarm(marker.id)
            setIndUser(marker.brgyUID)
          }} >
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            {imageUrls[marker.id] ? (
              <img className='img' src={imageUrls[marker.id]} alt={marker.title} />
            ) : (
              <img src={require('../image_src/p1.jpg')} className='img' />
            )}
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'row' }}>
            <Box sx={{ paddingLeft: .5 }}>
              <Avatar src={user[0].photoURL} alt='Profile' sx={{ marginTop: 1, marginRight: 1, border: 0.1, borderColor: 'green' }} />
            </Box>
            <Box>
              <Typography variant="overline" display="block" sx={{ color: 'green', fontSize: 15, fontWeight: 'bold', alignItems: 'center', fontFamily: 'monospace' }}>
                {marker.title}
              </Typography>
              <Box>
                <Typography variant="caption" display="block" color="text.secondary">
                  {marker.brgy}, {marker.mun}
                </Typography>
                <Typography variant="caption" display="block" color="text.secondary">
                  {dateFormatter(marker.start_date)} - {dateFormatter(marker.harvest_date)}
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </Grid>
    </Grid>

  );
}
export default GridView;
