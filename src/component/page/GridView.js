import * as React from 'react';
import {
  Button,
  Box,
  Paper,
  Typography,
  Divider,
  Grid
} from '@mui/material';


//icon
import CircularProgress from '@mui/material/CircularProgress';



function GridView({ marker, index, setShowFarmTabs, setIndFarm, setIndUser, imageUrls }) {

  function dateFormatter(date) {
    const d = new Date(date.toMillis())
    return d.toLocaleDateString()
  }

  return (
    <Grid sx={{width: 'calc(30% - 8px)',}} >
      <Grid
        item
        xs={12}
        sm={6}
        md={9}
        lg={3}
        elavation={3}
        sx={{backgroundColor: '#fff', marginBottom:5, boxShadow: '0px 3px 6px rgba(0, 255, 0, 0.5)' ,}}
        onClick={() => {
          setShowFarmTabs(true)
          setIndFarm(marker.id)
          setIndUser(marker.brgyUID)
        }} >
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: 2, }}>
          {imageUrls[marker.id] ? (
            <img className='img' src={imageUrls[marker.id]} alt={marker.title} />
          ) : (
            <img src={require('../image_src/Pineapple.jfif')} className='img' />
          )}
        </Box>
        <Divider />
        <Box sx={{padding:2}}> 
          <Typography variant="overline" display="block" gutterBottom sx={{ color: 'orange', fontSize:15, alignItems:'center'}}>
            {marker.title}
          </Typography>
          <Box>
          <Typography variant="caption" display="block" gutterBottom color="text.secondary">
           {marker.brgy}, {marker.mun}
         </Typography>
         <Typography variant="caption" display="block" gutterBottom color="text.secondary">
           Date of Planting: {dateFormatter(marker.start_date)}
         </Typography>
         <Typography variant="caption" display="block" gutterBottom color="text.secondary">
           Date of expected Harvest: {dateFormatter(marker.harvest_date)}
         </Typography>
          </Box>
        </Box>

      </Grid>

    </Grid>
    // <Box key={index} sx={{ width: 'calc(30% - 8px)', paddingBottom:5}}>
    // <Grid key={index} container spacing={2}>
    //   <Paper elevation={3} sx={{ padding: 2, backgroundColor: '#fff' }} onClick={() => {
    //     setShowFarmTabs(true)
    //     setIndFarm(marker.id)
    //     setIndUser(marker.brgyUID)
    //   }}>
    //     <div className="image-holder" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 5 }}>
    //       {imageUrls[marker.id] ? (
    //         <img className='img' src={imageUrls[marker.id]} alt={marker.title} />
    //       ) : (
    //         <img src={require('../image_src/Pineapple.jfif')} className='img' />
    //         // <CircularProgress color='success' />
    //       )}
    //     </div>
    //     <Divider />
    //     <Typography gutterBottom variant="h5" component="div" sx={{ color: 'orange', mt: 2 }}>
    //       {marker.title}
    //     </Typography>
    //     <Typography variant="body2" color="text.secondary">
    //       {marker.brgy}, {marker.mun}
    //     </Typography>
    //     <Typography variant="body2" color="text.secondary">
    //       Date of Planting: {dateFormatter(marker.start_date)}
    //     </Typography>
    //     <Typography variant="body2" color="text.secondary">
    //       Date of expected Harvest: {dateFormatter(marker.harvest_date)}
    //     </Typography>

    //   </Paper>
    // </Grid>
    // </Box>


  );
}
export default GridView;
