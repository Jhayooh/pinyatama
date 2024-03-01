import React from 'react';
import FarmsSchedule from '../FarmsSchedule';
import Doughnut from '../chart/Doughnut';
import SplineArea from '../chart/SplineArea';
import { farms, events } from '../FarmsConstant';
import Pie from '../chart/Pie';
import Header from '../Header';
import './AdminHome.css';
import GeoLoc from './GeoLoc';
import {
  Box,
  Button
} from '@mui/material';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Unstable_Grid2';

const legends = [
  "Pagtatanim",
  "Lumalaki",
  "Namumulaklak",
  "Nagbubunga",
  "Pag-aani"
];

function Legend({ legends }) {
  return (
    <div className='legend'>
      {legends.map((legend, index) => (
        <span key={index}>{legend}</span>
      ))}
    </div>
  );
}

export default function AdminHome({setSelected}) {
  return (
    <Grid container spacing={4} alignItems='stretch'>
      <Grid lg={12} sx={{ mb: 3 }} >
        <h1 style={{ color: '#000' }}>Dashboard</h1>
        <Divider sx={{ borderBottomWidth: 3 }} />
      </Grid>
      <Grid lg={3} >
        <Box sx={{ boxShadow: 1, p: 1, borderRadius: 3, backgroundColor: '#fff' }} >
        </Box>
      </Grid>
      <Grid lg={3} >
        <Box sx={{ boxShadow: 1, p: 1, borderRadius: 3, backgroundColor: '#fff' }} >
        </Box>
      </Grid>
      <Grid lg={3}>
        <Box sx={{ boxShadow: 1, p: 1, borderRadius: 3, backgroundColor: '#fff' }} >
        </Box>
      </Grid>
      <Grid lg={3} >
        <Box sx={{ boxShadow: 1, p: 1, borderRadius: 3, backgroundColor: '#fff' }} >
        </Box>
      </Grid>
      <Grid lg={12}>
        <Box sx={{ boxShadow: 1, p: 2, borderRadius: 3, backgroundColor: '#fff' }} >

          <section style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: 12 }}>
            <h4>Timeline</h4>
            <Button variant="outlined" sx={{width: 180}} onClick={()=>setSelected('timeline')}>view all</Button>
          </section>
          <FarmsSchedule farms={farms} events={events} />
        </Box>
      </Grid>
      <Grid lg={4} >
        <Box sx={{ boxShadow: 1, p: 1, borderRadius: 3, backgroundColor: '#fff', height: '100%' }} >
          <Pie />
        </Box>
      </Grid>
      <Grid lg={8} >
        <Box sx={{ boxShadow: 1, p: 1, borderRadius: 3, backgroundColor: '#fff', height: '100%' }} >
          <SplineArea />
        </Box>
      </Grid>
      <Grid lg={12}>
        <Box sx={{ boxShadow: 1, p: 1, borderRadius: 3, backgroundColor: '#fff' }} >
          <GeoLoc />
        </Box>
      </Grid>

    </Grid>
    // <>

    //   <div className='farm-schedule' >
    //     <FarmsSchedule farms={farms} events={events} />
    //     <Legend legends={legends} />
    //   </div>
    //   <div className='expect'>
    //     <Pie /> <SplineArea />
    //   </div>
    //   <div className='map'>
    //     <span>Hello map</span>
    //   </div>
    // </>
  );
}
