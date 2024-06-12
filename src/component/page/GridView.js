import * as React from 'react';
import { Box } from '@mui/material';
import Typography from '@mui/material/Typography';


function GridView() {


  return (
    <Box
      sx={{
        height: '100%',
        backgroundColor: '#f9fafb',
        padding: 2,
        borderRadius: 4,

      }}>
      <Box sx={{ width: 'calc(30% - 8px)', boxShadow: 3, borderRadius: 0 }}>
        <Box sx={{ paddingY: 2, paddingTop: 0, justifyContent:'center' }}>
          <div className='image-holder'>
              <img src={require('../image_src/nay.jpg')} style={{width:'50%', height:'50%'}}/>
          </div>
          <div>
          <Typography variant='h6' component='h6' sx={{ paddingLeft: 3, color: 'orange' }}>Farm Name</Typography>
                    <Typography variant='subtitle2' component='h2' sx={{ paddingLeft: 3, }}>brgy, Municipality</Typography>
                    <Typography variant='subtitle2' component='h4' sx={{ paddingLeft: 3, }}> Date of Planting: </Typography>
                    <Typography variant='subtitle2' component='h4' sx={{ paddingLeft: 3, }}> Date of expected Harvest: </Typography>
          </div>
        </Box>
      </Box>

    </Box>

  );
}
export default GridView;
