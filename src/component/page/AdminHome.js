import {
  Box,
  Button
} from '@mui/material';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Unstable_Grid2';
import React from 'react';
// import { events, farms } from '../FarmsConstant';
import { useNavigate } from 'react-router-dom';
import FarmsSchedule from '../FarmsSchedule';
import Pie from '../chart/Pie';
import SplineArea from '../chart/SplineArea';
import './AdminHome.css';
import GeoLoc from './GeoLoc';
import Heatmap from './Heatmap';


// icons
import farmer from '../image_src/farmer.png';

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

export default function AdminHome({ setSelected, farms, users, events }) {
  const navigate = useNavigate();
  // Redirect to the admin page
  
  return (
    <Box sx={{ backgroundColor: '#f9fafb', padding: 4, borderRadius: 4, height: '100%', overflow: 'auto' }}>
      <Grid container spacing={4} alignItems='stretch'>
        <Grid lg={12} md={12} sm={12} xs={12} sx={{ mb: 3 }} >
          <h1 style={{ color: '#000' }}>Dashboard</h1>
          <Divider sx={{ borderBottomWidth: 2}} />
        </Grid>
        <Grid lg={3} md={6} sm={6} xs={12}>
          <Box sx={{ flex: 1, paddingX: 3, paddingY: 2, boxShadow: '0px 5px 5px -3px #789e4f', borderRadius: 3, backgroundColor: 'green', display: 'flex', flexDirection: 'row' }} >
            <Box sx={{ flex: 2, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'left', m: 0 }}>
              <h1 style={{ fontWeight: 'bold' }}>{farms.length}</h1>
              <h5 style={{ margin: 0 }}>Farms</h5>
            </Box>
            <Box sx={{ flex: 1, alignItems: 'center', justifyContent: 'center', p: 2 }}>
              <img src={farmer} />
            </Box>
          </Box>
        </Grid>
        <Grid lg={3} md={6} sm={6} xs={12}>
          <Box sx={{ flex: 1, paddingX: 3, paddingY: 2, boxShadow: '0px 5px 5px -3px #e1ad67', borderRadius: 3, backgroundColor: '#df6d29', display: 'flex', flexDirection: 'row' }}  >
            <Box sx={{ flex: 2, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'left', m: 0 }}>
              <h1 style={{ fontWeight: 'bold' }}>12</h1>
              <h5 style={{ margin: 0 }}>Production</h5>
            </Box>
            <Box sx={{ flex: 1, alignItems: 'center', justifyContent: 'center', p: 2 }}>
              <img src={farmer} />
            </Box>
          </Box>
        </Grid>
        <Grid lg={3} md={6} sm={6} xs={12}>
          <Box sx={{ flex: 1, paddingX: 3, paddingY: 2, boxShadow: '0px 5px 5px -3px #c17a05', borderRadius: 3, backgroundColor: '#af7f35', display: 'flex', flexDirection: 'row' }} >
            <Box sx={{ flex: 2, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'left', m: 0 }}>
              <h1 style={{ fontWeight: 'bold' }}>12</h1>
              <h5 style={{ margin: 0 }}>Farmers</h5>
            </Box>
            <Box sx={{ flex: 1, alignItems: 'center', justifyContent: 'center', p: 2 }}>
              <img src={farmer} />
            </Box>
          </Box>
        </Grid>
        <Grid lg={3} md={6} sm={6} xs={12}>
          <Button sx={{ flex: 1, paddingX: 3, paddingY: 2, boxShadow: '0px 5px 5px -3px #foa30a ', borderRadius: 3, backgroundColor: '#f8da5b', display: 'flex', flexDirection: 'row' }} 
          onClick={() => setSelected('access')}>
            <Box sx={{ flex: 2, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'left', m: 0 }}>
              <h1 style={{ fontWeight: 'bold' }}>{users.length}</h1>
              <h5 style={{ margin: 0 }}>Accounts</h5>
              
            </Box>
            <Box sx={{ flex: 1, alignItems: 'center', justifyContent: 'center', p: 2 }}>
              <img src={farmer} />
            </Box>
          </Button>
        </Grid>
        <Grid lg={12} sx={{}}>
          <Box sx={{ boxShadow: 1, p: 2, borderRadius: 3, backgroundColor: '#fff', overflow: 'hidden', maxHeight: 360 }} >
            <section style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: 12 }}>
              <h4>Timeline</h4>
              <button className='btn-view-all'
                onClick={() => setSelected('timeline')}
              >
                View All
              </button>
            </section>
              <FarmsSchedule farms={farms.slice(0, 5)} events={events} />
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
        { <Grid lg={16}>
          <Box sx={{ boxShadow: 1, p: 1, borderRadius: 3, backgroundColor: '#fff' }} >
            <Heatmap />
          </Box>
        </Grid> }
      </Grid>
    </Box >

  );
}
