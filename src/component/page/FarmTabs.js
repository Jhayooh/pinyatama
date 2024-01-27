import React from 'react'
import Farm from '../Farm'
import CostAndReturn from '../CostAndReturn'
import FarmsSchedule from '../FarmsSchedule'
import './FarmTabs.css'
import { farmOne, eventFarmOne } from '../FarmsConstant'
import Header from '../Header'

import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';


function FarmTabs() {

    const tabsTitle = [
        "Mga Litrato",
        "Skedyul ng mga Gawain",
        "Pagsusuri ng Gastos at Pagbabalik"
    ]
  return (
    <>
    <Header />
    <div className='farm-tab' >
    <div className='farm-tab-container'>
    <h2>Pangalan ng Bukid</h2>
    <span>Daet, Camarines Norte</span>
    <Tabs
          defaultActiveKey="profile"
          id="fill-tab-example"
          className="mb-3"
          fill
    >
        <Tab eventKey="home" title="Mga Litrato">
            <Farm />
        </Tab>
        <Tab eventKey="profile" title="Skedyul ng mga Gawain">
            <FarmsSchedule farms={farmOne} events={eventFarmOne}/>
        </Tab>
        <Tab eventKey="longer-tab" title="Pagsusuri ng Gastos at Pagbabalik">
            <CostAndReturn />
        </Tab>
    </Tabs>
    </div>
    </div>
    </>
  )
}

export default FarmTabs