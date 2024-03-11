import {
  Box,
  Button
} from '@mui/material';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Unstable_Grid2';
import React from 'react';
import { events, farms } from '../FarmsConstant';
import FarmsSchedule from '../FarmsSchedule';
import Pie from '../chart/Pie';
import SplineArea from '../chart/SplineArea';
import './AdminHome.css';
import GeoLoc from './GeoLoc';
import { useNavigate } from 'react-router-dom';

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




export default function AdminHome({ setSelected }) {
  const navigate = useNavigate();
  // Redirect to the admin page
  const redirectToAdmin = () => {
    navigate('/geo'); // Replace '/admin' with your actual admin route
  };
  return (
    <Box sx={{ backgroundColor: '#f9fafb', padding: 4, borderRadius: 4, height: '100%', overflow: 'auto' }}>
      <Grid container spacing={4} alignItems='stretch'>
        <Grid lg={12} sx={{ mb: 3 }} >
          <h1 style={{ color: '#000' }}>Dashboard</h1>
          <Divider sx={{ borderBottomWidth: 3 ,backgroundColor:'#22b14c'}} />
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
        <Grid lg={12} sx={{}}>
          <Box sx={{ boxShadow: 1, p: 2, borderRadius: 3, backgroundColor: '#fff', overflow: 'hidden' }} >
            <section style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: 12 }}>
              <h4>Timeline</h4>
              <Button variant="outlined" sx={{ width: 180 }} onClick={() => setSelected('timeline')}>view all</Button>
            </section>
            <Box sx={{ maxHeight: 220, overflowY: 'auto'}}>
              <FarmsSchedule farms={farms} events={events} />
            </Box>
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
          <Box sx={{ boxShadow: 1, p: 1, borderRadius: 3, backgroundColor: '#fff' }} onClick={redirectToAdmin} >
            <GeoLoc />
          </Box>
        </Grid>
      </Grid>
    </Box >

  );
}
