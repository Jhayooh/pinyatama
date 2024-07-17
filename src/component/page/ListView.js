import React from 'react'
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import { Button } from '@mui/material';
// icon
import farm from '../image_src/pinyatamap-logo.png';

function ListView({ marker, index, setShowFarmTabs, setIndFarm, setIndUser, imageUrls }) {

  function dateFormatter(date) {
    const d = new Date(date.toMillis());
    const options = { year: 'numeric', month: 'long', day: '2-digit' };
    return d.toLocaleDateString('en-US', options);
  }
  return (
    <>
      <Button
        key={index}
        sx={{
          color: 'black',
          backgroundColor: '#FFF'


        }}
        onClick={() => {
          setShowFarmTabs(true)
          setIndFarm(marker.id)
          setIndUser(marker.brgyUID)
        }} >
        <ListItem disablePadding >
          <ListItemAvatar sx={{ textAlign: 'center' }}>
            <Avatar sx={{ backgroundColor: 'white' }}>
              {imageUrls[marker.id] ? (
                <img className='img' src={imageUrls[marker.id]} alt={marker.title} style={{ width: '100%', height: '100% ' }} />
              ) : (
                <img src={require('../image_src/p1.jpg')} className='img' style={{ width: '80%', height: '80% ' }} />
              )}
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary={marker.title} />
          <ListItemText secondary={marker.brgy + ', ' + marker.mun} sx={{ textAlign: 'right' }} />
          <ListItemText secondary={dateFormatter(marker.start_date)} sx={{ textAlign: 'right' }} />
          <ListItemText secondary={dateFormatter(marker.harvest_date)} sx={{ textAlign: 'right' }} />
        </ListItem>

        
        <Divider />
      </Button>

      
    </>
  )
}

export default ListView