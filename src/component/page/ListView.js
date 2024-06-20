import React from 'react'
<<<<<<< HEAD
import { Box, Button, CircularProgress, Typography, Paper, Grid, Card, CardActionArea, CardMedia, CardContent } from '@mui/material';

// icon
import farm from '../image_src/seedling2.png';
=======
import { Box, Button, CircularProgress } from '@mui/material';

// icon
import farm from '../image_src/seedling.png';
>>>>>>> main

function ListView({ marker, index, setShowFarmTabs, setIndFarm, setIndUser, imageUrls }) {

  function dateFormatter(date) {
    const d = new Date(date.toMillis())
    return d.toLocaleDateString()
  }
  return (
<<<<<<< HEAD
    <Button
      key={index}
      sx={{
        height: 120,
        width: 1,
        backgroundColor: '#fff',
        borderColor: 'green',
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        '&:hover': {
          backgroundColor: '#f0f0f0',
        },
      }}
      onClick={() => {
        setShowFarmTabs(true)
        setIndFarm(marker.id)
        setIndUser(marker.brgyUID)
      }} >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-around',
          height: '100%',
          width: '100%'

        }}>
        {/* <Grid sx={{ display: 'flex' }} item > */}
        <CardActionArea component="a" href="#">
          <Card sx={{ display: 'flex' }}>
            <CardContent sx={{ display: 'flex', height: '100%', alignItems: 'center' }}>
              <img src={farm} alt="Farms icon" style={{ width: '5%', height: '5%' }} />
              <Typography variant='subtitle1' component='h6' sx={{ paddingLeft: 3, color: 'orange', marginBottom: 1 }}>{marker.title}</Typography>
              <Typography variant='subtitle2' component='h2' sx={{ paddingLeft: 3, marginBottom: 1 }}>{marker.brgy}, {marker.mun}</Typography>
              <Typography variant='subtitle2' component='h4' sx={{ paddingLeft: 3, marginBottom: 1, color:'green' }}>Date of Planting: {dateFormatter(marker.start_date)}</Typography>
              <Typography variant='subtitle2' component='h4' sx={{ paddingLeft: 3, marginBottom: 1, color: 'red' }}>Date of expected Harvest: {dateFormatter(marker.harvest_date)}</Typography>

            </CardContent>
            <CardMedia>
              {imageUrls[marker.id] ? (
                <img className='img' src={imageUrls[marker.id]} alt={marker.title} style={{width:100, height:100}}/>
              ) : (
                <CircularProgress color='success' />
              )}
            </CardMedia>

            {/* <CardMedia>
                {imageUrls[marker.id] ? (
                  <img className='img' src={imageUrls[marker.id]} alt={marker.title} />
                ) : (
                  <CircularProgress color='success' <CardActionArea component="a" href="#">
  <Card sx={{ display: 'flex', alignItems: 'center', marginBottom: 1, padding: 1, borderRadius: 0, boxShadow: 'none', borderBottom: '1px solid #ccc' }}>
    <img src={farm} alt="Farms icon" style={{ width: 30, height: 30, marginRight: 10 }} />
    <CardContent sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
      <Typography variant='h6' component='h6' sx={{ color: 'orange', marginBottom: 0 }}>{marker.title}</Typography>
      <Typography variant='subtitle2' component='h2' sx={{ marginBottom: 1 }}>{marker.brgy}, {marker.mun}</Typography>
      <Typography variant='subtitle2' component='h4' sx={{ marginBottom: 1 }}>Date of Planting: {dateFormatter(marker.start_date)}</Typography>
      <Typography variant='subtitle2' component='h4' sx={{ marginBottom: 1 }}>Date of expected Harvest: {dateFormatter(marker.harvest_date)}</Typography>
    </CardContent>
  </Card>
</CardActionArea>
/>
                )}

              </CardMedia> */}
          </Card>
        </CardActionArea>
        {/* </Grid> */}
        {/* <Box sx={{ display: 'flex', height: '100%', alignItems: 'center', alignItems: 'center' }}>
            <img src={farm} alt="Farms icon" height='60%' />
          </Box>
          <Box sx={{ display: 'flex', height: '100%', alignItems: 'center' }}>
            <Typography variant='h6' component='h6' sx={{ paddingLeft: 3, color: 'orange' }}>{marker.title}</Typography>
            <Typography variant='subtitle2' component='h2' sx={{ paddingLeft: 3, }}>{marker.brgy}, {marker.mun}</Typography>
            <Typography variant='subtitle2' component='h4' sx={{ paddingLeft: 3, }}> Date of Planting: {dateFormatter(marker.start_date)}</Typography>
            <Typography variant='subtitle2' component='h4' sx={{ paddingLeft: 3, }}> Date of expected Harvest: {dateFormatter(marker.harvest_date)}</Typography>
          </Box>

          <Box sx={{  width:'5%', alignItems: 'center' }}>
            {imageUrls[marker.id] ? (
              <img className='img' src={imageUrls[marker.id]} alt={marker.title} height='10%' />
            ) : (
              <CircularProgress color='success' />
            )}
          </Box> */}
      </Box >
    </Button >

=======
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
>>>>>>> main
  )
}

export default ListView