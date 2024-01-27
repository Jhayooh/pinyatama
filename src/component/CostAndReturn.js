import React from 'react'
import Doughnut from './chart/Doughnut';
import SplineArea from './chart/SplineArea';
import Column from './chart/Column';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import CalendarChart from './chart/CalendarChart'
import { gastosSaPinya as g, bentaSaPinya as b } from './FarmsConstant';

function CostAndReturn() {
  return (
    <>
    <Container fluid="true" as="div" className='chart-container'>
      <Row>
        <Col><Doughnut title={g.title} label1={g.labelOne} label2={g.labelTwo} data={g.data} /></Col>
        <Col><Doughnut title={b.title} label1={b.labelOne} label2={b.labelTwo} data={b.data} /></Col>
        <Col><SplineArea /></Col>
      </Row>
      <Row>
        <Col><CalendarChart /></Col>
        <Col><Doughnut title={b.title} label1={b.labelOne} label2={b.labelTwo} data={b.data} /></Col>
        <Col><Column /></Col>
      </Row>
    </Container>
    </>
  )
}

export default CostAndReturn