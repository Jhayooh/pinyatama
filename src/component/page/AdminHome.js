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
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';

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
    <>
      <h1 style={{ color: '#000' }}>Dashboard</h1>
      <Divider sx={{ borderBottomWidth: 3 }} />
      
      {/* <div className='farm-schedule' >
        <FarmsSchedule farms={farms} events={events} />
        <Legend legends={legends} />
      </div>
      <div className='expect'>
        <Pie /> <SplineArea />
      </div>
      <div className='map'>
        <span>Hello map</span>
      </div> */}
    </>
  );
}
