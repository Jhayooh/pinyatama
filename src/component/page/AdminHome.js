import React, { useState, useEffect } from 'react';
import { Box, Button, Divider, Grid, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Pie from '../chart/Pie1';
import SplineArea from '../chart/SplineArea';
import '../../component/css/AdminHome.css'
import { Modal } from 'react-bootstrap';
import GeoLoc from './GeoLoc';
import Heatmap from './Heatmap';

// icons
import farmerImg from '../image_src/farmer.png';
import farm from '../image_src/pineapple.png';
import production from '../image_src/cube.png';
import accounts from '../image_src/account.png'
import FarmsSchedule from './FarmsSchedule';

import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';

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

  const [farmsMun, setFarmsMun] = useState({})
  const [selectedMun, setSelectedMun] = useState("DAET (Capital)")

  const [munNames, setMunNames] = useState([])
  const [munData, setMunData] = useState([])

  const [brgyNames, setBrgyNames] = useState([])
  const [brgyData, setBrgyData] = useState([])

  useEffect(() => {
    if (farms && farms.length > 0) {
      const reducedData = farms.reduce((acc, farm) => {
        const { mun, plantNumber } = farm;

        if (!acc[mun]) {
          acc[mun] = 0;
        }

        acc[mun] += parseInt(plantNumber);

        return acc;
      }, {});

      const munArray = Object.keys(reducedData);
      const dataArray = Object.values(reducedData);

      setMunNames(munArray);
      setMunData(dataArray);
    }
  }, [farms]);

  useEffect(() => {
    if (farms && farms.length > 0) {
      const munFarm = farms.filter(bf => bf.mun === selectedMun)
      const reducedData = munFarm.reduce((acc, farm) => {
        const { brgy, plantNumber } = farm;

        if (!acc[brgy]) {
          acc[brgy] = 0;
        }

        acc[brgy] += parseInt(plantNumber);

        return acc;
      }, {});

      const brgyArray = Object.keys(reducedData);
      const dataArray = Object.values(reducedData);

      setBrgyNames(brgyArray);
      setBrgyData(dataArray);
    }
  }, [farms, selectedMun]);

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
            onClick={() => setSelected('farms')}
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
                QP FARMS
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
            onClick={() => setSelected('distribution')}
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
                {(munData.reduce((acc, sum) => acc + sum, 0)).toLocaleString('en-US')}
              </Typography>
              <Typography variant="h6" sx={{ margin: 0, fontSize: '16px' }}>
                QP PRODUCTION
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
            onClick={() => setSelected('farms')}
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
                QP FARMERS
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
            onClick={() => setSelected('accounts')}
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
                {users.filter(user => user.status === 'active').length}
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
                  Projected Schedule
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
                  Actual Schedule
                </Typography>
              </Box>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6}>
          <Box sx={{ boxShadow: 1, p: 1, borderRadius: 3, backgroundColor: '#fff', height: '100%', width: '100%' }}>
            {
              munNames.length === 0 && munData.length === 0
                ? <Typography>No Farm Found</Typography>
                : <Pie labels={munNames} data={munData} title="Camarines Norte Pineapple Plantation (pcs)" setSelectedMun={setSelectedMun} />
            }
          </Box>
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6}>
          <Box sx={{ boxShadow: 1, p: 1, borderRadius: 3, backgroundColor: '#fff', height: '100%', width: '100%' }}>
            {
              brgyNames.length === 0 && brgyData.length === 0
                ? <Typography>No Farm Found</Typography>
                : <Pie labels={brgyNames} data={brgyData} title={`${selectedMun} Pineapple Plantation (pcs)`} />
            }
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

