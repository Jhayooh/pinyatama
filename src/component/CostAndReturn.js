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
import { DataGrid } from '@mui/x-data-grid';
import { Typography } from '@mui/material';
import { Tabs, Tab, Box } from '@mui/material';
import { db } from '../firebase/Config';
import { addDoc, collection, doc, getDoc, updateDoc } from 'firebase/firestore';
import { NetworkWifi } from '@mui/icons-material';

function CostAndReturn({ markers, parts, farm }) {
  const [selectedTab, setSelectedTab] = useState(0);
  const [show, setShow] = useState(false);
  const [localParts, setLocalParts] = useState([]);
  const [editedRowData, setEditedRowData] = useState(null);
  const [saving, setSaving] = useState(false);

  console.log("the markers:>>>>>>", markers)

  // name:"totalPines"
  // numIor:45.17
  // numRoi1:54.83
  // numRoi2:"54.83%"
  // numbut:3600
  // numpine:129600
  // priceBut:1800
  // totalBats:1800
  // totalPine:0
  // totalPines:16200
  // totalPriceLabor:21360
  // totalPriceMaterial:38804
  // totalSale1:"₱133,200"

  useEffect(() => {
    setLocalParts(parts);
  }, [parts]);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const processRowUpdate = (newRow) => {
    const updatedParts = localParts.map((part) => (part.id === newRow.id ? newRow : part));
    setLocalParts(updatedParts);
    setEditedRowData(newRow); // Save the edited row data
    console.log("Edited row data set:", newRow);

    return newRow;

  };
  const valueFormatter = (params) => {
    if (params.value == null || isNaN(params.value)) {
      return '';
    }
    return parseFloat(params.value);
  };

  const handleSaveChanges = async () => {
    if (!editedRowData) {
      console.error('No edited row data to save.');
      return;
    }

    setSaving(true);
    console.log("Saving data to Firebase:", editedRowData);
    try {

      console.log("Edited row data ID:", editedRowData.id);
      const docRef = doc(db, `farms/${farm.id}/components`, editedRowData.id);
      await updateDoc(docRef, editedRowData);
      console.log('Document successfully updated!');
    } catch (error) {
      console.error('Error updating document', error);
    } finally {
      setShow(false);
      setSaving(false);
    }
  };

  return (
    <>
      <Container>
        {markers.map((marker, index) => (
          <Row key={index} className="mb-4">
            <Col xs={12} md={6} lg={4} onClick={handleShow}>
              <Pie
                labels={["Materyales", "Labor"]}
                data={[marker.totalPriceMaterial + 5000, marker.totalPriceLabor]}
                width="100%"
                height="100%"
              />
            </Col>
            <Col xs={12} md={6} lg={4}>
              <Doughnut
                labels={["Pineapple", "Butterball"]}
                data={[marker.totalPines, marker.totalBats]}
                width="100%"
                height="100%"
              />
            </Col>
            <Col xs={12} md={6} lg={4}>
              <SplineArea data={[marker.numpine, marker.numbut]} />
            </Col>
          </Row>
        ))}

        {markers.map((marker, index) => (
          <Row key={index} className="mb-4">
            <Col xs={12} md={6} lg={4}>
              <Doughnut
                labels={["Return on Investment", "Potential Return"]}
                data={[marker.numRoi1, marker.numIor]}
                width="100%"
                height="100%"
              />
            </Col>
            <Col xs={12} md={6} lg={8}>
              <Column data={[marker.totalPines, marker.totalBats]} />
            </Col>
          </Row>
        ))}
      </Container>

      <Modal show={show} onHide={handleClose} >
        <Modal.Header closeButton>
          <Modal.Title>Labour And Material Cost</Modal.Title>
        </Modal.Header>
        <Modal.Body >
          <Box sx={{ borderBottom: 1, borderColor: 'divider', overflowY: 'auto' }}>
            <Tabs value={selectedTab} onChange={handleTabChange}>
              <Tab label="Labor" />
              <Tab label="Material" />
            </Tabs>
            {selectedTab === 0 && (
              <Box sx={{ overflowY: 'auto', maxHeight: 380 }}>
                <DataGrid
                  rows={localParts.filter(part => part.particular === 'Labor')}
                  columns={[
                    { field: 'id', headerName: 'ID', flex: 1 },
                    { field: 'qntyPrice', headerName: 'Quantity', flex: 1, editable: true, valueFormatter },
                    { field: 'name', headerName: 'Labor', flex: 1, },
                    { field: 'totalPrice', headerName: 'Price', flex: 1, editable: true, valueFormatter },
                  ]}
                  // autoHeight
                  hideFooter={true}
                  processRowUpdate={processRowUpdate}
                />
              </Box>
            )}
            {selectedTab === 1 && (
              <Box sx={{ overflowY: 'auto', maxHeight: 380 }}>
                <DataGrid
                  rows={localParts.filter(part => part.particular === 'Material')}
                  columns={[
                    { field: 'id', headerName: 'ID', flex: 1, },
                    { field: 'qntyPrice', headerName: 'Quantity', flex: 1, editable: true, valueFormatter },
                    { field: 'name', headerName: 'Material', flex: 1 },
                    { field: 'totalPrice', headerName: 'Price', flex: 1, editable: true, valueFormatter },
                  ]}
                  // autoHeight
                  hideFooter={true}
                  processRowUpdate={processRowUpdate}
                />
              </Box>
            )}
          </Box>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSaveChanges} disabled={saving}>
            {saving ? 'Saving...' : 'Save Changes'}
          </Button>
        </Modal.Footer>
      </Modal >
    </>
  );
}

CostAndReturn.propTypes = {
  markers: PropTypes.array.isRequired,
  parts: PropTypes.array.isRequired,
  farm: PropTypes.object.isRequired, // Add this prop type
};

export default CostAndReturn;