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
import { addDoc, collection, doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { NetworkWifi } from '@mui/icons-material';
import { useCollectionData } from 'react-firebase-hooks/firestore';

function CostAndReturn({ markers, parts, farm, roi }) {
  const marker = markers[0]
  const particularsRef = collection(db, '/particulars')
  const [particularData, particularLoading] = useCollectionData(particularsRef)

  const [selectedTab, setSelectedTab] = useState(0);
  const [show, setShow] = useState(false);
  const [localParts, setLocalParts] = useState(parts);
  const [saving, setSaving] = useState(false);
  const [laborMaterial, setLaborMaterial] = useState([])
  const [newRoi, setNewRoi] = useState({
    ...roi[0]
  })
  const [editedRowData, setEditedRowData] = useState([]);

  useEffect(() => {
    if (!parts || !particularData) {
      return
    }

    const queueFarmComp = collection(db, `farms/${farm.id}/components`)

    const updatedLocalParts = parts.map(part => ({
      ...part,
      isAvailable: particularData.find(data => data.id === part.foreignId)?.isAvailable ?? part.isAvailable
    }));

    // await updateDoc(queueFarmComp, updatedLocalParts)

    console.log("updatedLocalParts", updatedLocalParts)

    setLocalParts(updatedLocalParts);
    setLaborMaterial([markers[0].totalPriceMaterial, markers[0].totalPriceLabor])
    setNewRoi(roi[0])
  }, [particularData]);

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
    const grossReturnAndBatter = newRoi.grossReturn + newRoi.batterBall
    const costTotal = laborMaterial[0] + laborMaterial[1]
    const netReturnValue = grossReturnAndBatter - costTotal;
    const roiValue = (netReturnValue / grossReturnAndBatter) * 100;
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
    return params.value;
  };

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
        <Row className="mb-4">
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
            <Doughnut
              title={['ROI']}
              labels={["Return on Investment", "Potential Return"]}
              data={[newRoi.roi, 100 - newRoi.roi]}
              width="100%"
              height="100%"
            />
          </Col>
          <Col xs={12} md={12} lg={12}>
            <Column data={[marker.totalPines]} data1={[marker.totalBats]} labels={["Pineapple"]} />
          </Col>
        </Row>

      </Container>

      <Dialog open={show} onClose={handleClose} fullWidth={true} maxWidth='lg'>
        <DialogTitle>
          Labour and Material Cost
        </DialogTitle>
        <DialogContent dividers>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Box sx={{ overflowY: 'auto', flex: 1 }}>
              <Tabs value={selectedTab} onChange={handleTabChange}>
                <Tab label="Labor" />
                <Tab label="Material" />
                <Tab label="Fertilizer" />
              </Tabs>
              {selectedTab === 0 && (
                <Box sx={{ overflowY: 'auto', height: 380 }}>
                  <DataGrid
                    rows={localParts.filter(part => part.particular.toLowerCase() === 'labor')}
                    columns={[
                      { field: 'name', headerName: 'Labor', flex: 1, },
                      {
                        field: 'qntyPrice',
                        headerName: 'Quantity',
                        flex: 1,
                        type: 'number',
                        editable: true,
                        valueFormatter
                      },
                      {
                        field: 'totalPrice',
                        headerName: 'Price',
                        flex: 1,
                        valueFormatter: (params) => {
                          return params.value && params.value.toLocaleString('en-PH', {
                            style: 'currency',
                            currency: 'PHP'
                          })
                        },
                      },
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
                    rows={localParts.filter(part => part.particular.toLowerCase() === 'material' && part.parent.toLowerCase() !== 'fertilizer')}
                    columns={[
                      { field: 'name', headerName: 'Material', flex: 1 },
                      {
                        field: 'qntyPrice',
                        headerName: 'Quantity',
                        flex: 1,
                        type: 'number',
                        editable: true,
                        valueFormatter
                      },
                      {
                        field: 'totalPrice',
                        headerName: 'Price',
                        flex: 1,
                        valueFormatter: (params) => {
                          return params.value && params.value.toLocaleString('en-PH', {
                            style: 'currency',
                            currency: 'PHP'
                          })
                        },
                      },
                    ]}
                    // autoHeight
                    hideFooter={true}
                    processRowUpdate={processRowUpdate}
                  />
                </Box>
              )}
              {selectedTab === 2 && (
                <Box sx={{ overflowY: 'auto', height: 380 }}>
                  <DataGrid
                    rows={localParts.filter(part => part.parent.toLowerCase() === 'fertilizer')}
                    columns={[
                      { field: 'name', headerName: 'Fertilizer', flex: 1 },
                      {
                        field: 'qntyPrice',
                        headerName: 'Quantity',
                        flex: 1,
                        type: 'number',
                        editable: true,
                        valueFormatter
                      },
                      {
                        field: 'price',
                        headerName: 'Price',
                        flex: 1,
                        valueFormatter: (params) => {
                          return params.value && params.value.toLocaleString('en-PH', {
                            style: 'currency',
                            currency: 'PHP'
                          })
                        },
                      },
                      {
                        field: 'status',
                        headerName: 'Status',
                        flex: 1,
                        valueGetter: (params) => {
                          return params.row.isAvailable ? 'Available' : 'Unavailable';
                        },
                      }
                    ]}
                    // autoHeight
                    hideFooter={true}
                    processRowUpdate={processRowUpdate}
                    getRowClassName={(params) => params.row.status === 'Unavailable' ? 'disabled-row' : ''}
                  />
                </Box>
              )}
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Box sx={{ flex: 1 }}>
                <Pie
                  labels={["Materyales", "Labor"]}
                  data={laborMaterial}
                />
              </Box>
              <Box sx={{ flex: 1 }}>
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