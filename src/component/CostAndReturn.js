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
import { Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@mui/material';
import { Tabs, Tab, Box } from '@mui/material';
import { db } from '../firebase/Config';
import { addDoc, collection, doc, getDoc, setDoc } from 'firebase/firestore';
import { NetworkWifi } from '@mui/icons-material';

function CostAndReturn({ markers, parts, farm, roi }) {
  const [selectedTab, setSelectedTab] = useState(0);
  const [show, setShow] = useState(false);
  const [localParts, setLocalParts] = useState([]);
  const [saving, setSaving] = useState(false);
  const [laborMaterial, setLaborMaterial] = useState([])
  const [newRoi, setNewRoi] = useState(null)
  const [editedRowData, setEditedRowData] = useState([]);

  // name:"totalPines"
  // numIor:45.17
  // numRoi1:54.83
  // numRoi2:"54.83%",
  // numbut:3600
  // numpine:129600
  // priceBut:1800
  // totalBats:1800
  // totalPine:0
  // totalPines:16200
  // totalPriceLabor:21360
  // totalPriceMaterial:38804
  // totalSale1:"₱133,200"


  // batterBall
  // : 
  // 4000
  // costTotal
  // : 
  // 66290
  // grossReturn
  // : 
  // 144000
  // id
  // : 
  // "sfDEGsou9SKyqix3RzOH"
  // laborTotal
  // : 
  // 23731
  // materialTotal: 42559
  // netReturn: 81710
  // roi: 55.20945945945947

  useEffect(() => {
    setLocalParts(parts);
    setLaborMaterial([markers[0].totalPriceMaterial, markers[0].totalPriceLabor])
    setNewRoi(roi[0])
  }, [parts, show]);


  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  function calcTotalParts(upPart) {
    const totalLabor = upPart.filter(item => item.particular.toLowerCase() === 'labor').reduce((sum, item) => sum + item.totalPrice, 0);
    const totalMaterial = upPart.filter(item => item.particular.toLowerCase() === 'material').reduce((sum, item) => sum + item.totalPrice, 0);
    setLaborMaterial([totalMaterial, totalLabor])
  }

  function calcNewRoi() {
    console.log("roi", roi)
    const grossReturnAndBatter = newRoi.grossReturn + newRoi.batterBall
    console.log("grossAndBatter", grossReturnAndBatter)
    const costTotal = laborMaterial[0] + laborMaterial[1]
    console.log("costTotal", costTotal)
    const netReturnValue = grossReturnAndBatter - costTotal;
    console.log("returnValue", netReturnValue)
    const roiValue = (netReturnValue / grossReturnAndBatter) * 100;
    console.log("roiValue", roiValue)
    setNewRoi((prevItem) => ({
      ...prevItem,
      roi: roiValue,
      costTotal: costTotal,
      grossReturn: grossReturnAndBatter,
      laborTotal: laborMaterial[1],
      laborMaterial: laborMaterial[0],
      netReturn: netReturnValue
    }))
  }

  function addEditedData(newItem) {
    setEditedRowData((prevItems) => {
      const itemIndex = prevItems.findIndex(item => item.id === newItem.id);
      if (itemIndex === -1) {
        // Item does not exist, add it
        return [...prevItems, newItem];
      } else {
        // Item exists, update it
        const updatedItems = [...prevItems];
        updatedItems[itemIndex] = newItem;
        return updatedItems;
      }
    });
  }

  const processRowUpdate = (newRow) => {
    newRow['qntyPrice'] = parseInt(newRow.qntyPrice)
    newRow['totalPrice'] = newRow.price * newRow.qntyPrice
    const updatedParts = localParts.map((part) => (part.id === newRow.id ? newRow : part));
    setLocalParts(updatedParts);
    calcTotalParts(updatedParts)
    calcNewRoi()
    addEditedData(newRow)
  };

  const valueFormatter = (params) => {
    if (params.value == null || isNaN(params.value)) {
      return '';
    }
    return parseFloat(params.value);
  };

  useEffect(() => {

  }, [editedRowData])


  const handleSaveChanges = async () => {
    if (!editedRowData) {
      console.error('No edited row data to save.');
      return;
    }

    setSaving(true);
    console.log("Saving data to Firebase:", editedRowData);
    try {
      const promises = editedRowData.map(doc => {
        const docRef = doc(db, `farms/${farm.id}/components`, doc.id);

        return setDoc(docRef, doc, { merge: true });
      })
      await Promise.all(promises);
      const roiRef = doc(db, `farmms/${farm.id}/roi`, newRoi.id)
      await setDoc(roiRef, newRoi, { merge: true });
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
                data={laborMaterial}
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
                data={[newRoi.roi, 100 - newRoi.roi]}
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

      <Dialog open={show} onClose={handleClose} fullWidth={true} maxWidth='lg'>
        <DialogTitle>
          Labour and Material Cost
        </DialogTitle>
        <DialogContent dividers>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider', overflowY: 'auto', flex: 1 }}>
              <Tabs value={selectedTab} onChange={handleTabChange}>
                <Tab label="Labor" />
                <Tab label="Material" />
              </Tabs>
              {selectedTab === 0 && (
                <Box sx={{ overflowY: 'auto', height: 380 }}>
                  <DataGrid
                    rows={localParts.filter(part => part.particular === 'Labor')}
                    columns={[
                      { field: 'name', headerName: 'Labor', flex: 1, },
                      { field: 'qntyPrice', headerName: 'Quantity', flex: 1, editable: true, valueFormatter },
                      { field: 'totalPrice', headerName: 'Price', flex: 1, valueFormatter },
                    ]}
                    // autoHeight
                    hideFooter={true}
                    processRowUpdate={processRowUpdate}
                  />
                </Box>
              )}
              {selectedTab === 1 && (
                <Box sx={{ overflowY: 'auto', height: 380 }}>
                  <DataGrid
                    rows={localParts.filter(part => part.particular === 'Material')}
                    columns={[
                      { field: 'name', headerName: 'Material', flex: 1 },
                      { field: 'qntyPrice', headerName: 'Quantity', flex: 1, editable: true, valueFormatter },
                      { field: 'totalPrice', headerName: 'Price', flex: 1, valueFormatter },
                    ]}
                    // autoHeight
                    hideFooter={true}
                    processRowUpdate={processRowUpdate}
                  />
                </Box>
              )}
            </Box>
            <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
              <Box>
                <Pie
                  labels={["Materyales", "Labor"]}
                  data={laborMaterial}
                />
              </Box>
              <Box>
                <Doughnut
                  labels={["Return on Investment", "Potential Return"]}
                  data={[newRoi.roi, 100 - newRoi.roi]}
                />
              </Box>
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSaveChanges} disabled={saving}>
            {saving ? 'Saving...' : 'Save Changes'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* <Modal show={show} onHide={handleClose} sx={{width: 900}} >
        <Modal.Header closeButton>
          <Modal.Title>Labour And Material Cost</Modal.Title>
        </Modal.Header>
        <Modal.Body >
          <Box sx={{ display: 'flex' }}>
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
            <Box>
              <Pie
                labels={["Materyales", "Labor"]}
                data={[markers[0].totalPriceMaterial + 5000, markers[0].totalPriceLabor]}
              />
            </Box>
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
      </Modal > */}
    </>
  );
}

CostAndReturn.propTypes = {
  markers: PropTypes.array.isRequired,
  parts: PropTypes.array.isRequired,
  farm: PropTypes.object.isRequired, // Add this prop type
};

export default CostAndReturn;