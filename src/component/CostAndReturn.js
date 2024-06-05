import React from 'react';
import PropTypes from 'prop-types';
import Doughnut from './chart/Doughnut';
import SplineArea from './chart/SplineArea';
import Column from './chart/Column';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import CalendarChart from './chart/CalendarChart';
import { bentaSaPinya as b } from './FarmsConstant';
import Pie from './chart/Pie';

function CostAndReturn({ markers }) {
  console.log(markers);

  // Calculate data for Pie chart
  const percent = markers.map((marker) => ({
    data: [marker.totalPriceMaterial + 5000, marker.totalPriceLabor], // Use your actual data here
    data1: [marker.totalSale1],
    data2: [marker.totalPines, marker.totalBats],
    data3: [marker.numRoi1, marker.numIor],
    data4: [marker.numRoi2],
    data5: [marker.numpine, marker.numbut],
    data6: [
      { label: "Pineapple", y: marker.numpine },
      { label: "Butterball", y: marker.numbut }
    ],
    data7: [marker.totalReturn]
  }));

  return (
    <Container fluid as="div" className="chart-container">
      {markers.map((marker, index) => (
        <Row key={index} className="mb-4">
          <Col xs={12} md={6} lg={4}>
            <Pie
              labels={["Materyales", "Labor"]}
              data={percent[index].data}
              width="100%"
              height="100%"
            />
          </Col>
          <Col xs={12} md={6} lg={4}>
            <Doughnut
              labels={["Pineapple", "Butterball"]}
              data={percent[index].data2}
              width="100%"
              height="100%"
            />
          </Col>
          <Col xs={12} md={6} lg={4}>
            <SplineArea data={percent[index].data5} />
          </Col>
        </Row>
      ))}

      {markers.map((marker, index) => (
        <Row key={index} className="mb-4">
          <Col xs={12} md={6} lg={4}>
            <Doughnut
              labels={["Return on Investment", "Potential Return"]}
              data={percent[index].data3}
              width="100%"
              height="100%"
            />
          </Col>
          <Col xs={12} md={6} lg={8}>
            <Column data={percent[index].data2}/>
          </Col>
        </Row>
      ))}
    </Container>
  );
}

CostAndReturn.propTypes = {
  markers: PropTypes.array.isRequired, // Assuming markers is an array
};

export default CostAndReturn;
