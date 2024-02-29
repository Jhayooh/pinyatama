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
      {legends.map((legend, index) => (
        <span key={index}>{legend}</span>
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
      <div className='admin-home'>
        <div className='farm-schedule' style={{ gridColumn: 'span 2' }}>
          <FarmsSchedule farms={farms} events={events} />
          <Legend legends={legends} />
        </div>
        <div className='expect'>
          <Pie />
        </div>
        
        <div className='spline-area'>
          <SplineArea />
        </div>

        
      </div>
      <div className='map'>
          <GeoLoc />
        </div>
    </>
  );
}

export default AdminHome;
