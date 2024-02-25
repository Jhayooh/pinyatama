import React from 'react';


import FarmsSchedule from '../FarmsSchedule';
import Doughnut from '../chart/Doughnut';
import SplineArea from '../chart/SplineArea';
import { farms, events } from '../FarmsConstant';
import Pie from '../chart/Pie';
import Header from '../Header';
import './AdminHome.css';
import GeoLoc from './GeoLoc';

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
      {legends.map(legend => (
        <span>{legend}</span>
      ))}
    </div>
  );
}

function AdminHome() {
  return (
    <>
      <div className='head'>
        <Header />
      </div>
      <div className='admin-home' style={{ backgroundColor: 'white', display: 'grid', gridTemplateColumns: '1fr 1fr', gridTemplateRows: '1fr 1fr', gap: '10px' }}>
        
          <div className='farm-schedule' style={{ border: '1px solid black', gridColumn: 'span 2' }}>
            <FarmsSchedule farms={farms} events={events} />
            <Legend legends={legends} />
          </div>
          <div className='expect' style={{ border: '1px solid black' }}>
            <Pie />
          </div>
          <div className='map' style={{ border: '1px solid black' }}>
            <GeoLoc />
          </div>
          <div className='spline-area' style={{ border: '1px solid black' }}>
            <SplineArea />
          </div>
        
      </div>
    </>
  );
}

export default AdminHome;
