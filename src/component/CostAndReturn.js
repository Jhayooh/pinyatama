import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Doughnut from './chart/Doughnut';
import SplineArea from './chart/SplineArea';
import Column from './chart/Column';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Pie from './chart/Pie';
import { Modal, Button } from 'react-bootstrap';
import { DataGrid } from '@mui/x-data-grid'; // Import the DataGrid component
import { Typography } from '@mui/material';
import { Tabs, Tab, Box } from '@mui/material';

function CostAndReturn({ markers, parts }) {
  const [selectedTab, setSelectedTab] = useState(0);
  const [show, setShow] = useState(false);
  const [localParts, setLocalParts] = useState([]);
  

  useEffect(() => {
    setLocalParts(parts);
  }, [parts]);

  const handleChange = (e, index) => {
    const { name, value } = e.target;
    const updatedParts = [...localParts];
    updatedParts[index] = { ...updatedParts[index], [name]: value };
    setLocalParts(updatedParts);
  };

  


  const percent = markers.map((marker) => ({
    data: [marker.totalPriceMaterial + 5000, marker.totalPriceLabor],
    data2: [marker.totalPines, marker.totalBats],
    data5: [marker.numpine, marker.numbut],
    data3: [marker.numRoi1, marker.numIor],
    data4: [marker.numRoi2],
    data6: [
      { label: "Pineapple", y: marker.numpine },
      { label: "Butterball", y: marker.numbut }
    ],
    data7: [marker.totalReturn]
  }));

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  return (
    <Container fluid as="div" className="chart-container">
      {markers.map((marker, index) => (
        <Row key={index} className="mb-4">
          <Col xs={12} md={6} lg={4} onClick={handleShow}>
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
            <Column data={percent[index].data2} />
          </Col>
        </Row>
      ))}
 <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Labour And Material Cost</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={selectedTab} onChange={handleTabChange}>
            <Tab label="Labor" />
            <Tab label="Material" />
          </Tabs>
        </Box>
        {selectedTab === 0 && (
          <DataGrid
            rows={localParts.filter(part => part.particular === 'Labor')}
            columns={[
              { field: 'defQnty', headerName: 'Quantity', flex: 1, editable: true },
              { field: 'name', headerName: 'Labour/Material', flex: 1 },
              { field: 'price', headerName: 'Price', flex: 1 },
            ]}
            autoHeight
          />
        )}
        {selectedTab === 1 && (
          <DataGrid
            rows={localParts.filter(part => part.particular === 'Material')}
            columns={[
              { field: 'defQnty', headerName: 'Quantity', flex: 1, editable: true },
              { field: 'name', headerName: 'Labour/Material', flex: 1 },
              { field: 'price', headerName: 'Price', flex: 1 },
            ]}
            autoHeight
          />
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
    </Container>
  );
}

CostAndReturn.propTypes = {
  markers: PropTypes.array.isRequired,
  parts: PropTypes.array.isRequired,
};

export default CostAndReturn;
