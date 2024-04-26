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
import Pie from './chart/Pie'
import { DataArrayTwoTone } from '@mui/icons-material';

function CostAndReturn({ markers }) {
  console.log(markers);

  
  // Calculate data for Pie chart
  const percent = markers.map((marker) => ({
    data: [marker.totalPriceMaterial+ 5000, marker.totalPriceLabor], // Use your actual data here
    data1: [marker.totalSale1],
    data2: [
      {
          name: "Pinya", y: marker.pricePine
      },

      {
          name: "Butterball", y: marker.priceBut
      },
  ],
    data3: [
      {
          name: "Return on Investment", y: marker.numRoi1
      },

      {
          name: "Loss", y: marker.numIor
      },
  ],
  data4: [marker.numRoi2],
  data5:[
    marker.numpine, marker.numbut
  ],
  data6:[ { label: "Pineapple", y: marker.numpine },
  { label: "Butterball", y: marker.numbut }
 
  ],
  data7:[ marker.totalReturn
    
  ]

  }));

 
  return (
    <Container fluid as="div" className='chart-container'>
      {markers.map((marker, index) => (
      <Row>
        
          <Col key={index}>
              <Pie
                key={index}
                labels={["Materyales", "Labor"]}
                data={percent[index].data}  // Use item.data to get data for each marker
                width="100%"
                height="360"
              />
          </Col>
       
        <Col><Doughnut title={b.title} label1={percent[index].data1} label2={b.labelTwo} data={percent[index].data2} /></Col>
        <Col><SplineArea data={percent[index].data5} /></Col>
      </Row>
       ))}

{markers.map((marker, index) => (
      <Row>
       
        <Col><Doughnut title={"Return on Investment"} label1={percent[index].data4} label2={b.labelTwo} data={percent[index].data3} /></Col>
        <Col><Column data={percent[index].data6} title={percent[index].data7} /></Col>
      </Row>
      ))}
    </Container>
  );
}

CostAndReturn.propTypes = {
  markers: PropTypes.array.isRequired, // Assuming markers is an array
};

export default CostAndReturn;
