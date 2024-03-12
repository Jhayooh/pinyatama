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
import Heatmap from './Heatmap'

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

export default function Timeline() {
  return (
    <Grid container spacing={4}>
      <Grid lg={12} sx={{mb: 3}} >
        <h1 style={{ color: '#000' }}>Timeline</h1>
        <Divider sx={{ borderBottomWidth: 3 }} />
      </Grid>
      <Grid lg={3}>
        <Box sx={{ boxShadow: 1, p: 1, borderRadius: 3, backgroundColor: '#fff' }} >
        </Box>
      </Grid>
      <Grid lg={3}>
        <Box sx={{ boxShadow: 1, p: 1, borderRadius: 3, backgroundColor: '#fff' }} >
        </Box>
      </Grid>
      <Grid lg={3}>
        <Box sx={{ boxShadow: 1, p: 1, borderRadius: 3, backgroundColor: '#fff' }} >
        </Box>
      </Grid>
      <Grid lg={3}>
        <Box sx={{ boxShadow: 1, p: 1, borderRadius: 3, backgroundColor: '#fff' }} >
        </Box>
      </Grid>
      <Grid lg={12} >
        <Box sx={{ boxShadow: 1, p: 3, borderRadius: 3, backgroundColor: '#fff' }} >
          <h3>Timeline</h3>
          <FarmsSchedule farms={farms} events={events} />
        </Box>
      </Grid>
    </Grid>

  );
}
