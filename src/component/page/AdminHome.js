import React, { useState, useEffect } from 'react';
import { Box, Button, Divider, Grid, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Pie from '../chart/Pie1';
import SplineArea from '../chart/SplineArea';
import './AdminHome.css';
import '../css/AdminHome.css'
import { Modal } from 'react-bootstrap';
import GeoLoc from './GeoLoc';
import Heatmap from './Heatmap';

// icons
import farmerImg from '../image_src/farmer.png';
import farm from '../image_src/seedling.png';
import production from '../image_src/production.png';
import accounts from '../image_src/account.png'
import FarmsSchedule from './FarmsSchedule';

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

export default function AdminHome({ setSelected, farms, users, events, roi, farmer, pineappleData }) {
  const navigate = useNavigate();


  const legendItems = [
    { color: 'red', label: 'Danger' },
    { color: 'yellow', label: 'Warning' },
    { color: 'green', label: 'Safe' }
  ];


  // Group the roi data by farm title 
  const groupedByTitle = roi.reduce((acc, roiItem) => {
    const title = farms.title;
    if (!acc[title]) {
      acc[title] = [];
    }
    acc[title].push(roiItem.grossReturn);
    return acc;
  }, {});



  // Group the roi data by farm mun 

  const groupedByMun = roi.reduce((acc, roiItem) => {
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
    data: groupedByTitle[title].map(grossReturn => grossReturn),
  }));

  const combinedData1 = Object.keys(groupedByMun).map(mun => ({
    mun,
    data: groupedByTitle[mun].map(grossReturn => grossReturn),
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

  const [productionData, setProductionData] = useState([]);
  const [totalProduction, setTotalProduction] = useState(0);

  useEffect(() => {
    const totalProduction = { sum: 0 };

    const data = farms.reduce((acc, farm, index) => {
      const existing = acc.find(item => item.label === farm.mun);
      const pieValue = parseFloat(pieData1[index]) || 0;

      totalProduction.sum += pieValue;

      if (existing) {
        existing.value += pieValue;
      } else {
        acc.push({
          label: farm.mun,
          value: pieValue,
        });
      }

      return acc;
    }, []);

    setProductionData(data);
    setTotalProduction(totalProduction.sum);
  }, [farms, pieData1]);


  const series = pieChartData.map(item => item.value);
  const labels = pieChartData.map(item => item.label);
  const events1 = pieChartData.map(item => item.event);
  const series2 = pieChartData1.map(item => item.value);
  const labels2 = pieChartData1.map(item => item.label);
  const series1 = combinedData2.map(item => item.value);
  const labels1 = combinedData2.map(item => item.label);
  const prod = productionData.map(item => item.value)

  const municipalities = [
    "BASUD", "CAPALONGA", "DAET (Capital)", "JOSE PANGANIBAN",
    "LABO", "MERCEDES", "PARACALE", "SAN LORENZO RUIZ",
    "SAN VICENTE", "SANTA ELENA", "TALISAY", "VINZONS"
  ];

  const filteredFarms = municipalities.map(mun => farms?.find(farm => farm.mun === mun)).filter(Boolean);


  return (
    <Box sx={{ backgroundColor: '#f9fafb', padding: 3, borderRadius: 4, height: '100%', overflow: 'auto' }}>
      <Grid container spacing={4} alignItems='stretch'>
        <Grid item lg={12} md={12} sm={12} xs={12} sx={{ mb: 3 }}>
          <h1 style={{ color: '#000' }}>Dashboard </h1>
          <Divider sx={{ borderBottomWidth: 2 }} />
        </Grid>
        <Grid item lg={3} md={6} sm={6} xs={12}>
          <Box
            sx={{
              paddingX: 3,
              paddingY: 2,
              boxShadow: '0px 5px 10px rgba(0, 0, 0, 0.2)',
              borderRadius: '16px',
              background: 'linear-gradient(to right bottom, #93d6b0, #68c690, #52be80)',
              display: 'flex',
              flexDirection: 'row',
              color: 'black',
              cursor: 'pointer',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              '&:hover': {
                transform: 'scale(1.05)',
                boxShadow: '0px 8px 15px rgba(0, 0, 0, 0.3)',
              },
            }}
            onClick={() => setSelected('Farms')}
          >
            <Box
              sx={{
                flex: 2,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'flex-start',
              }}
            >
              <Typography variant="h4" sx={{ fontWeight: 'bold', fontSize: '36px', marginBottom: 1 }}>
                {farms.length}
              </Typography>
              <Typography variant="h6" sx={{ margin: 0, fontSize: '16px' }}>
                Mga Sakahan
              </Typography>
            </Box>
            <Box
              sx={{
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <img src={farm} alt="Farms icon" style={{ width: '60%', height: 'auto', maxHeight: '60px' }} />
            </Box>
          </Box>
        </Grid>

        <Grid item lg={3} md={6} sm={6} xs={12}>
          <Box
            sx={{
              paddingX: 3,
              paddingY: 2,
              boxShadow: '0px 5px 10px rgba(0, 0, 0, 0.2)',
              borderRadius: '16px',
              background: 'linear-gradient(to right bottom, #FFA652, #FF8D21, #FF7B00)',
              display: 'flex',
              flexDirection: 'row',
              color: 'black',
              cursor: 'pointer',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              '&:hover': {
                transform: 'scale(1.05)',
                boxShadow: '0px 8px 15px rgba(0, 0, 0, 0.3)',
              },
            }}
            onClick={() => setSelected('Distribution')}
          >
            <Box
              sx={{
                flex: 2,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'flex-start',
              }}
            >
              <Typography variant="h4" sx={{ fontWeight: 'bold', fontSize: '36px', marginBottom: 1 }}>
                {totalProduction}
              </Typography>
              <Typography variant="h6" sx={{ margin: 0, fontSize: '16px' }}>
                Produksyon
              </Typography>
            </Box>
            <Box
              sx={{
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <img
                src={production}
                alt="Production icon"
                style={{ width: '60%', height: 'auto', maxHeight: '60px' }}
              />
            </Box>
          </Box>
        </Grid>

        <Grid item lg={3} md={6} sm={6} xs={12}>
          <Box
            sx={{
              paddingX: 3,
              paddingY: 2,
              boxShadow: '0px 5px 10px rgba(0, 0, 0, 0.2)',
              borderRadius: '16px',
              background: 'linear-gradient(to right bottom, #D2B48C, #987554, #664229)',
              display: 'flex',
              flexDirection: 'row',
              color: 'black',
              cursor: 'pointer',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              '&:hover': {
                transform: 'scale(1.05)',
                boxShadow: '0px 8px 15px rgba(0, 0, 0, 0.3)',
              },
            }}
            onClick={() => setSelected('Farms')}
          >
            <Box
              sx={{
                flex: 2,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'flex-start',
              }}
            >
              <Typography variant="h4" sx={{ fontWeight: 'bold', fontSize: '36px', marginBottom: 1 }}>
                {farmer.length}
              </Typography>
              <Typography variant="h6" sx={{ margin: 0, fontSize: '16px' }}>
                Mga Magsasaka
              </Typography>
            </Box>
            <Box
              sx={{
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <img
                src={farmerImg}
                alt="Farmer icon"
                style={{ width: '60%', height: 'auto', maxHeight: '60px' }}
              />
            </Box>
          </Box>
        </Grid>

        <Grid item lg={3} md={6} sm={6} xs={12}>
          <Box
            sx={{
              paddingX: 3,
              paddingY: 2,
              boxShadow: '0px 5px 10px rgba(0, 0, 0, 0.2)',
              borderRadius: '16px',
              background: 'linear-gradient(to right bottom, #FFE761, #FFDC2E, #FFD500)',
              display: 'flex',
              flexDirection: 'row',
              color: 'black',
              cursor: 'pointer',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              '&:hover': {
                transform: 'scale(1.05)',
                boxShadow: '0px 8px 15px rgba(0, 0, 0, 0.3)',
              },
            }}
            onClick={() => setSelected('access')}
          >
            <Box
              sx={{
                flex: 2,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'flex-start',
              }}
            >
              <Typography variant="h4" sx={{ fontWeight: 'bold', fontSize: '36px', marginBottom: 1 }}>
                {users.length}
              </Typography>
              <Typography variant="h6" sx={{ margin: 0, fontSize: '16px' }}>
                BAEW's
              </Typography>
            </Box>
            <Box
              sx={{
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <img
                src={accounts}
                alt="Accounts icon"
                style={{ width: '60%', height: 'auto', maxHeight: '60px' }}
              />
            </Box>
          </Box>
        </Grid>


        <Grid item lg={12} xs={12}>
          <Box sx={{ boxShadow: 1, p: 2, borderRadius: 3, backgroundColor: '#fff', overflow: 'hidden', maxHeight: 1000 }}>
            <section style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: 12 }}>
              <h4>Timeline</h4>
              <button className='btn-view-all' onClick={() => setSelected('timeline')}>View All</button>
            </section>
            <FarmsSchedule farms={filteredFarms} events={events} />
            <Box sx={{ display: 'flex', justifyContent: 'flex-start', marginRight: 2, marginBottom: 1, pr: 4, flexDirection: { xs: 'column', md: 'row' }, marginTop: 3 }}>
              <Box sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-start',
                mr: 3
              }} >
                <Box
                  sx={{
                    width: 80,
                    height: 18,
                    background: 'linear-gradient(to right, #93d6b0, #68c690, #52be80)',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 2,
                    mr: 1
                  }}
                >
                </Box>
                <Typography variant="subtitle2">
                  Inaasahang Iskedyul
                </Typography>
              </Box>
              <Box sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-start'
              }} >
                <Box
                  sx={{
                    width: 80,
                    height: 18,
                    background: 'linear-gradient(to right, #f9c667, #f8ba48, #f6a30b)',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 2,
                    mr: 1
                  }}
                >
                </Box>
                <Typography variant="subtitle2">
                  Aktuwal na Iskedyul
                </Typography>
              </Box>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6}>
          <Box sx={{ boxShadow: 1, p: 1, borderRadius: 3, backgroundColor: '#fff', height: '100%', width: '100%' }}>
            <Pie labels={labels1} data={series1} title="Munisipalidad" />
          </Box>
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6}>
          <Box sx={{ boxShadow: 1, p: 1, borderRadius: 3, backgroundColor: '#fff', height: '100%', width: '100%' }}>
            <Pie labels={labels} data={series} title="Mga Sakahan" sx={{ height: '100%', width: '100%' }} />
          </Box>
        </Grid>
        <Grid item lg={12} xs={12} md={12}>
          <Box sx={{ boxShadow: 1, p: 1, borderRadius: 3, backgroundColor: '#fff' }} onDoubleClick={() => setSelected('Farms')}>
            <GeoLoc famrs={farms} />
          </Box>
        </Grid>

      </Grid>

    </Box >
  );
}

