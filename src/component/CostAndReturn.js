import React from 'react';
import PropTypes from 'prop-types';
import Doughnut from './chart/Doughnut';
import SplineArea from './chart/SplineArea';
import Column from './chart/Column';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import CalendarChart from './chart/CalendarChart';
import { gastosSaPinya as g, bentaSaPinya as b } from './FarmsConstant';
import Pie from './chart/Pie'

function CostAndReturn({ markers }) {
  console.log(markers);

  // Calculate data for Pie chart
  const percent = markers.map((marker) => ({
    data: [marker.totalPriceMaterial+ 5000, marker.totalPriceLabor] // Use your actual data here
  }));

  return (
    <Container fluid as="div" className='chart-container'>
      <Row>
        {markers.map((marker, index) => (
          <Col key={index}>
            <Pie
              labels={["Materyales", "Labor"]} // Use the data array directly
              data={percent[index].data} // Use percent[index].data to get data for each marker
              width="100%"
              height='360'
            />
          </Col>
        ))}
        <Col><Doughnut title={b.title} label1={b.labelOne} label2={b.labelTwo} data={b.data} /></Col>
        <Col><SplineArea /></Col>
      </Row>
      <Row>
        <Col><CalendarChart /></Col>
        <Col><Doughnut title={b.title} label1={b.labelOne} label2={b.labelTwo} data={b.data} /></Col>
        <Col><Column /></Col>
      </Row>
    </Container>
  );
}

CostAndReturn.propTypes = {
  markers: PropTypes.array.isRequired, // Assuming markers is an array
};

export default CostAndReturn;
