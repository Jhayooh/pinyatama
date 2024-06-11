import React, {useState} from 'react';
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
import { Modal, Button } from 'react-bootstrap';

function CostAndReturn({ markers, parts }) {

 
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
  }));const [show, setShow] = useState(false);
  const [parts1, setParts] = useState([]);
  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(!show);
  };


const handleChange = (e, index) => {
  const { name, value } = e.target;
  const updatedParts = [...parts1]; // Create a copy of the parts array
  updatedParts[index] = { ...updatedParts[index], [name]: value }; // Update the specific part with the new value
  setParts(updatedParts); // Update the state with the new parts array
};

  return (
    <Container fluid as="div" className="chart-container">
      {markers.map((marker, index) => (
        <Row key={index} className="mb-4">
          <Col xs={12} md={6} lg={4}  onClick={handleShow} >
            <Pie
              labels={["Materyales", "Labor"]}
              data={percent[index].data}
              width="100%"
              height="100%"
            />

<Modal show={show} onHide={handleClose}>
  <Modal.Header closeButton>
    <Modal.Title>Labour And Material Cost</Modal.Title>
  </Modal.Header>
  <Modal.Body>
  
  <table className="table">
  <thead>
    <tr>
      <th>#</th>
      <th>Labour/Material</th>
      <th>Price</th>
    </tr>
  </thead>
  <tbody>
    {parts && parts.map((part, index) => (
      <tr key={index}>
        <td>{part.defQnty}</td>
        <td><input type="text" value={part.name} onChange={(e) => handleChange(e, index)} /></td>
        <td><input type="text" value={part.price} onChange={(e) => handleChange(e, index)} /></td>
      </tr>
    ))}
  </tbody>
</table>

   
  </Modal.Body>
  <Modal.Footer>
    <Button variant="secondary" onClick={handleClose}>
      Close
    </Button>
  </Modal.Footer>
</Modal>
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
