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
import Heatmap from './Heatmap';

// icons
import farmer from '../image_src/farmer.png'

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
        <Grid lg={12} md={12} sm={12} xs={12} sx={{ mb: 3 }} >
          <h1 style={{ color: '#000' }}>Dashboard</h1>
          <Divider sx={{ borderBottomWidth: 2}} />
        </Grid>
        <Grid lg={3} md={6} sm={6} xs={12}>
          <Box sx={{ flex: 1, paddingX: 3, paddingY: 2, boxShadow: '0px 5px 5px -3px #46bfff', borderRadius: 3, backgroundColor: '#46bfffc2', display: 'flex', flexDirection: 'row' }} >
            <Box sx={{ flex: 2, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'left', m: 0 }}>
              <h1 style={{ fontWeight: 'bold' }}>12</h1>
              <h5 style={{ margin: 0 }}>Farms</h5>
            </Box>
            <Box sx={{ flex: 1, alignItems: 'center', justifyContent: 'center', p: 2 }}>
              <img src={farmer} />
            </Box>
          </Box>
        </Grid>
        <Grid lg={3} md={6} sm={6} xs={12}>
          <Box sx={{ flex: 1, paddingX: 3, paddingY: 2, boxShadow: '0px 5px 5px -3px #ffbb54', borderRadius: 3, backgroundColor: '#ffbb54c2', display: 'flex', flexDirection: 'row' }} >
            <Box sx={{ flex: 2, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'left', m: 0 }}>
              <h1 style={{ fontWeight: 'bold' }}>12</h1>
              <h5 style={{ margin: 0 }}>Farms</h5>
            </Box>
            <Box sx={{ flex: 1, alignItems: 'center', justifyContent: 'center', p: 2 }}>
              <img src={farmer} />
            </Box>
          </Box>
        </Grid>
        <Grid lg={3} md={6} sm={6} xs={12}>
          <Box sx={{ flex: 1, paddingX: 3, paddingY: 2, boxShadow: '0px 5px 5px -3px #717eee', borderRadius: 3, backgroundColor: '#717eeec2', display: 'flex', flexDirection: 'row' }} >
            <Box sx={{ flex: 2, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'left', m: 0 }}>
              <h1 style={{ fontWeight: 'bold' }}>12</h1>
              <h5 style={{ margin: 0 }}>Farms</h5>
            </Box>
            <Box sx={{ flex: 1, alignItems: 'center', justifyContent: 'center', p: 2 }}>
              <img src={farmer} />
            </Box>
          </Box>
        </Grid>
        <Grid lg={3} md={6} sm={6} xs={12}>
          <Box sx={{ flex: 1, paddingX: 3, paddingY: 2, boxShadow: '0px 5px 5px -3px #22b14c', borderRadius: 3, backgroundColor: '#22b14cc2', display: 'flex', flexDirection: 'row' }} >
            <Box sx={{ flex: 2, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'left', m: 0 }}>
              <h1 style={{ fontWeight: 'bold' }}>12</h1>
              <h5 style={{ margin: 0 }}>Farms</h5>
            </Box>
            <Box sx={{ flex: 1, alignItems: 'center', justifyContent: 'center', p: 2 }}>
              <img src={farmer} />
            </Box>
          </Box>
        </Grid>
        <Grid lg={12} sx={{}}>
          <Box sx={{ boxShadow: 1, p: 2, borderRadius: 3, backgroundColor: '#fff', overflow: 'hidden' }} >
            <section style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: 12 }}>
              <h4>Timeline</h4>
              <button className='btn-view-all'
                onClick={() => setSelected('timeline')}
              >
                view all
              </button>
            </section>
            <Box sx={{ maxHeight: 320, overflowY: 'auto' }}>
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
        <Grid lg={16}>
          <Box sx={{ boxShadow: 1, p: 1, borderRadius: 3, backgroundColor: '#fff' }} >
            {/* <Heatmap /> */}
          </Box>
        </Grid>
      </Grid>
    </Box >

  );
}
