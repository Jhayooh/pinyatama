import React from 'react'
import { Box, Button, CircularProgress, Typography, Paper, Grid, Card, CardActionArea, CardMedia, CardContent } from '@mui/material';

// icon
import farm from '../image_src/pinyatamap-logo.png';

function ListView({ marker, index, setShowFarmTabs, setIndFarm, setIndUser, imageUrls }) {

  function dateFormatter(date) {
    const d = new Date(date.toMillis())
    return d.toLocaleDateString()
  }
  return (
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

           
          </Card>
        </CardActionArea>
       
      </Box >
    </Button >
  )
}

export default ListView