import React, {useState}from 'react';
import { Box, Button, Divider, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import FarmsSchedule from '../FarmsSchedule';
import Pie from '../chart/Pie';
import SplineArea from '../chart/SplineArea';
import './AdminHome.css';
import { Modal } from 'react-bootstrap';
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

export default function AdminHome({ setSelected, farms, users, events, roi }) {
  const navigate = useNavigate();
 
  // Group the roi data by farm title

  // Group the roi data by farm title 
  const groupedByTitle = roi.reduce((acc, roiItem) => {
    const title = farms.title;
    if (!acc[title]) {
      acc[title] = [];
    }
    acc[title].push(roiItem.grossReturn);
    return acc;
  }, {});

  const groupedByMun= roi.reduce((acc, roiItem) => {
    const mun = farms.mun;
    if (!acc[mun]) {
      acc[mun] = [];
    }
    acc[mun].push(roiItem.grossReturn);
    return acc;
  }, {});



  // Create combinedData array with separated grossReturn values by farm title
  const combinedData = Object.keys(groupedByTitle).map(title => ({
    title,
    data: groupedByTitle[title].map(grossReturn => grossReturn / 8),
  }));

  const combinedData1 = Object.keys(groupedByMun).map(mun => ({
    mun,
    data: groupedByTitle[mun].map(grossReturn => grossReturn / 8),
  }));
  // Flatten the data for pie chart
  const pieData = combinedData.flatMap(item => item.data);
  const pieData1 = combinedData1.flatMap(item => item.data);
  const pieChartData = farms.map((farm, index) => ({
    label: farm.title,
    value: pieData[index] || 0,
  }));

  const pieChartData1 = farms.map((farm, index) => ({
    label: farm.mun,
    value: pieData1[index] || 0,
  }));

  const combinedData2 = farms.reduce((acc, farm, index) => {
    const existing = acc.find(item => item.label === farm.mun);
    if (existing) {
      existing.value += pieData1[index] || 0;
    } else {
      acc.push({
        label: farm.mun,
        value: pieData1[index] || 0,
      });
    }
    return acc;
  }, []);

  function getFarmMun(){

  }

  


  const series = pieChartData.map(item => item.value);
  const labels = pieChartData.map(item => item.label);
  const events1 = pieChartData.map(item => item.event);
  const series2 = pieChartData1.map(item => item.value);
  const labels2 = pieChartData1.map(item => item.label);
  const series1 = combinedData2.map(item => item.value);
  const labels1 = combinedData2.map(item => item.label);

  
 
  return (
    <Box sx={{ backgroundColor: '#f9fafb', padding: 3, borderRadius: 4, height: '100%', overflow: 'auto' }}>
      <Grid container spacing={4} alignItems='stretch'>
        <Grid item lg={12} md={12} sm={12} xs={12} sx={{ mb: 3 }}>
          <h1 style={{ color: '#000' }}>Dashboard</h1>
          <Divider sx={{ borderBottomWidth: 2 }} />
        </Grid>
        <Grid item lg={3} md={6} sm={6} xs={12}>
          <Box sx={{ flex: 1, paddingX: 3, paddingY: 2, boxShadow: '0px 5px 5px -3px #789e4f', borderRadius: 3, backgroundColor: 'green', display: 'flex', flexDirection: 'row' }}>
            <Box sx={{ flex: 2, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'left', m: 0 }}>
              <h1 style={{ fontWeight: 'bold' }}>{farms.length}</h1>
              <h5 style={{ margin: 0 }}>Farms</h5>
            </Box>
            <Box sx={{ flex: 1, alignItems: 'center', justifyContent: 'center', p: 2 }}>
              <img src={farmer} alt="Farmer icon" />
            </Box>
          </Box>
        </Grid>
        <Grid item lg={3} md={6} sm={6} xs={12}>
          <Box sx={{ flex: 1, paddingX: 3, paddingY: 2, boxShadow: '0px 5px 5px -3px #e1ad67', borderRadius: 3, backgroundColor: '#df6d29', display: 'flex', flexDirection: 'row' }}>
            <Box sx={{ flex: 2, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'left', m: 0 }}>
              <h1 style={{ fontWeight: 'bold' }}>12</h1>
              <h5 style={{ margin: 0 }}>Production</h5>
            </Box>
            <Box sx={{ flex: 1, alignItems: 'center', justifyContent: 'center', p: 2 }}>
              <img src={farmer} alt="Farmer icon" />
            </Box>
          </Box>
        </Grid>
        <Grid item lg={3} md={6} sm={6} xs={12}>
          <Box sx={{ flex: 1, paddingX: 3, paddingY: 2, boxShadow: '0px 5px 5px -3px #c17a05', borderRadius: 3, backgroundColor: '#af7f35', display: 'flex', flexDirection: 'row' }}>
            <Box sx={{ flex: 2, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'left', m: 0 }}>
              <h1 style={{ fontWeight: 'bold' }}>12</h1>
              <h5 style={{ margin: 0 }}>Farmers</h5>
            </Box>
            <Box sx={{ flex: 1, alignItems: 'center', justifyContent: 'center', p: 2 }}>
              <img src={farmer} alt="Farmer icon" />
            </Box>
          </Box>
        </Grid>
        <Box lg={3} md={6} sm={6} xs={12}>
          <Button sx={{ flex: 1, paddingX: 3, paddingY: 2, boxShadow: '0px 5px 5px -3px #foa30a ', borderRadius: 3, backgroundColor: '#f8da5b', display: 'flex', flexDirection: 'row' }}
            onClick={() => setSelected('access')}>
            <Box sx={{ flex: 2, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'left', m: 0 }}>
              <h1 style={{ fontWeight: 'bold' }}>{users.length}</h1>
              <h5 style={{ margin: 0 }}>Accounts</h5>
            </Box>
            <Box sx={{ flex: 1, alignItems: 'center', justifyContent: 'center', p: 2 }}>
              <img src={farmer} alt="Farmer icon" />
            </Box>
          </Button>
        </Box>
        <Grid item lg={12}>
          <Box sx={{ boxShadow: 1, p: 2, borderRadius: 3, backgroundColor: '#fff', overflow: 'hidden', maxHeight: 360 }}>
            <section style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: 12 }}>
              <h4>Timeline</h4>
              <button className='btn-view-all' onClick={() => setSelected('timeline')}>View All</button>
            </section>
            <FarmsSchedule farms={farms.slice(0, 5)} events={events} />
          </Box>
        </Grid>
        <Grid item lg={6}>
        
         
        
         
          
            <Pie labels={labels1} data={series1}  />
           
            
            

        </Grid>
        <Grid item lg={6}>
          <Box sx={{ boxShadow: 1, p: 1, borderRadius: 3, backgroundColor: '#fff', height: '100%', width: '100%' }}>
          <Pie labels={labels} data={series} />
          </Box>
        </Grid>
        <Grid item lg={12}>
          <Box sx={{ boxShadow: 1, p: 1, borderRadius: 3, backgroundColor: '#fff' }}>
            <GeoLoc />
          </Box>
        </Grid>
        
      </Grid>
      
    </Box>
  );
}
