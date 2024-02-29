import React from 'react';
import FarmsSchedule from '../FarmsSchedule';
import Doughnut from '../chart/Doughnut';
import SplineArea from '../chart/SplineArea';
import { farms, events } from '../FarmsConstant';
import Pie from '../chart/Pie';
import Header from '../Header';
import './AdminHome.css';
import GeoLoc from './GeoLoc';
import { Box } from '@mui/material';
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

export default function AdminHome() {
  return (
    <Grid container spacing={2}>
      <Grid lg={12} >

        <h1 style={{ color: '#000' }}>Dashboard</h1>
        <Divider sx={{ borderBottomWidth: 3 }} />
      </Grid>
      <Grid lg={12}>
        <FarmsSchedule farms={farms} events={events} />
      </Grid>
      <Grid lg={6}>
        <Pie />
      </Grid>
      <Grid lg={6}>
        <SplineArea />
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
