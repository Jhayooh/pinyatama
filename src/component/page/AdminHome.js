import React from 'react'
import FarmsSchedule from '../FarmsSchedule'
import Doughnut from '../chart/Doughnut'
import SplineArea from '../chart/SplineArea'
import { gastosSaPinya as g } from '../FarmsConstant';
import { farms, events } from "../FarmsConstant";
import Pie from '../chart/Pie';
import Header from '../Header';
import './AdminHome.css'


const legends = [
  "Pagtatanim",
  "Lumalaki",
  "Namumulaklak",
  "Nagbubunga",
  "Pag-aani"
]

function Legend({ legends }) {
  return (
    <div className='legend'>
      {legends.map(legend => (
        <span>{legend}</span>
      ))}
    </div>
  )
}

export default function AdminHome() {

  return (
    <>
    <Header />
    <div className='admin-home'>
          <div className='farm-schedule'>
              <FarmsSchedule farms={farms} events={events}/>
              <Legend legends={legends} />
          </div>
          <div className='expect'>
            <Pie /> <SplineArea />
          </div>
          <div className='map'>
              <span>Hello map</span>
          </div>
    </div>
    </>
  )
}
