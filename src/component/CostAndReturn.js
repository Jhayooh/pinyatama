import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { DataGrid, GridCellModes, GridActionsCellItem, } from '@mui/x-data-grid';
import { Dialog, DialogActions, DialogContent, DialogTitle, Typography, Paper, Snackbar, Alert, Tooltip } from '@mui/material';
import { Tabs, Tab, Box, TextField, Modal, Button } from '@mui/material';
import { NetworkWifi } from '@mui/icons-material';
import { darken, lighten, styled } from '@mui/material/styles';
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2

import { db } from '../firebase/Config';
import { addDoc, collection, doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { useCollectionData } from 'react-firebase-hooks/firestore';

// charts
import Pie from './chart/Pie';
import Doughnut from './chart/Doughnut';
import SplineArea from './chart/SplineArea';
import Column from './chart/Column';

import EditOutlinedIcon from '@mui/icons-material/EditOutlined';

///////////////////
function CostAndReturn({ markers, parts, farm, roi, pineapple }) {
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
  const [snackbar, setSnackbar] = useState(null)

  const [selectedCellParams, setSelectedCellParams] = useState(null);
  const [cellModesModel, setCellModesModel] = useState({});
  const [rowModesModel, setRowModesModel] = useState({})

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pineModal, setPineModal] = useState(false)

  const [selectedRow, setSelectedRow] = useState({});
  const [pineData, setPineData] = useState({})

  const [isClicked, setIsClicked] = useState(false)

  const handleEditClick = (id, row) => () => {
    setSelectedRow(row);
    setIsModalOpen(true);
  };

  const handleCellFocus = React.useCallback((event) => {
    const row = event.currentTarget.parentElement;
    const id = row.dataset.id;
    const field = event.currentTarget.dataset.field;
    setSelectedCellParams({ id, field });
  }, []);

  useEffect(() => {
    newRoi && console.log("new roi sa useEFffect", newRoi)
  }, [newRoi])

  const cellMode = React.useMemo(() => {
    if (!selectedCellParams) {
      return 'view';
    }
    const { id, field } = selectedCellParams;
    return cellModesModel[id]?.[field]?.mode || 'view';
  }, [cellModesModel, selectedCellParams]);

  const handleCellKeyDown = React.useCallback(
    (params, event) => {
      if (cellMode === 'edit') {
        // Prevents calling event.preventDefault() if Tab is pressed on a cell in edit mode
        event.defaultMuiPrevented = true;
      }
    },
    [cellMode],
  );

  const handleModalClose = () => {
    setIsModalOpen(false);
    setPineModal(false)
  };

  const handleCellEditStop = React.useCallback((params, event) => {
    event.defaultMuiPrevented = true;
  }, []);

  useEffect(() => {
    if (!parts || !particularData) {
      return
    }
    const updatedLocalParts = parts.map(part => ({
      ...part,
      isAvailable: particularData.find(data => data.id === part.foreignId)?.isAvailable ?? part.isAvailable
    }));

    setLocalParts(updatedLocalParts);
    setLaborMaterial([markers[0].totalPriceMaterial, markers[0].totalPriceLabor])
    setNewRoi(roi[0])
  }, [particularData, isClicked]);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const handleTabChange = (event, newValue) => {
    setSelectedCellParams(null)
    setCellModesModel({})
    setSelectedTab(newValue);
  };

  function calcTotalParts(upPart) {
    const totalLabor = upPart.filter(item => item.particular.toLowerCase() === 'labor').reduce((sum, item) => sum + item.totalPrice, 0);
    const totalMaterial = upPart.filter(item => item.particular.toLowerCase() === 'material').reduce((sum, item) => sum + item.totalPrice, 0);
    setLaborMaterial([totalMaterial, totalLabor])
    console.log("material labor:", laborMaterial)
  }

  function getPinePrice(pine) {
    const newPine = pineapple.filter(thePine => thePine.name.toLowerCase() === pine.toLowerCase())[0]
    return newPine.price
  }

  function calcNewRoi() {
    const grossReturnAndBatter = (newRoi.grossReturn * getPinePrice('pineapple')) + (newRoi.butterBall * getPinePrice('butterball'))
    const costTotal = laborMaterial[0] + laborMaterial[1]
    const netReturnValue = grossReturnAndBatter - costTotal;
    const roiValue = (netReturnValue / grossReturnAndBatter) * 100;
    setNewRoi((prevItem) => ({
      ...prevItem,
      roi: Math.round(roiValue * 100) / 100,
      costTotal: costTotal,
      laborTotal: laborMaterial[1],
      laborMaterial: laborMaterial[0],
      netReturn: netReturnValue
    }))
    console.log("roi", newRoi)
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

  const handleCloseSnackbar = () => setSnackbar(null);

  const handleReset = () => {
    setIsClicked(!isClicked)
  }

  const handleSaveAnalysis = async () => {
    setIsModalOpen(false)
    setSaving(true)
    try {
      const compRef = doc(db, `farms/${farm.id}/components`, selectedRow.id)
      const roiRef = collection(db, `farms/${farm.id}/roi`)
      await updateDoc(compRef, localParts)
      await setDoc(doc(roiRef, newRoi.id), newRoi);
    } catch (error) {
      console.error("error updating document", error);
    }
    setSaving(false)
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
      const roiRef = doc(db, `farms/${farm.id}/roi`, newRoi.id)
      await setDoc(roiRef, newRoi, { merge: true });
    } catch (error) {
      console.error('Error updating document', error);
    } finally {
      setShow(false);
      setSaving(false);
    }
  };

  const getBackgroundColor = (color, mode) =>
    mode === 'dark' ? darken(color, 0.7) : lighten(color, 0.7);

  const getHoverBackgroundColor = (color, mode) =>
    mode === 'dark' ? darken(color, 0.6) : lighten(color, 0.6);

  const getSelectedBackgroundColor = (color, mode) =>
    mode === 'dark' ? darken(color, 0.5) : lighten(color, 0.5);

  const getSelectedHoverBackgroundColor = (color, mode) =>
    mode === 'dark' ? darken(color, 0.4) : lighten(color, 0.4);
  const shapeStyle = {
    width: 20,
    height: 20,
    borderRadius: '50%',
    display: 'inline-block'
  }
  const EditRowModal = () => {
    const [editedRowData, setEditedRowData] = useState(selectedRow);

    const handleSaveChanges = async () => {

      if (!editedRowData) {
        return
      }

      // setSaving(true)
      const updatedParts = localParts.map((part) => (part.id === editedRowData.id ? editedRowData : part));
      setLocalParts(updatedParts);
      calcTotalParts(updatedParts)
      calcNewRoi()
      handleModalClose()
      // setSaving(false)
    };

    const handleInputChange = (event) => {
      const { name, value } = event.target;
      setEditedRowData(prevData => ({
        ...prevData,
        [name]: parseInt(value),
        totalPrice: parseInt(value) * editedRowData.price
      }));
    };

    return (
      <Modal
        open={isModalOpen}
        onClose={handleModalClose}
        aria-labelledby="edit-row-modal"
      >
        <Box sx={{
          position: 'absolute',
          top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          bgcolor: 'background.paper',
          borderRadius: '5px',
          boxShadow: 24,
          p: 4,
          width: 380
        }}>
          <>
            <h2 id="edit-row-modal" style={{ marginBottom: 12 }}>Edit Row</h2>
            <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2 }}>
              <TextField
                label="Name"
                name="name"
                value={editedRowData.name}
                onChange={handleInputChange}
                fullWidth
                disabled
                sx={{ mb: 2 }}
              />
              <TextField
                label="Price"
                name="price"
                value={editedRowData.price?.toLocaleString('en-PH', {
                  style: 'currency',
                  currency: 'PHP'
                })}
                onChange={handleInputChange}
                fullWidth
                disabled
                sx={{ mb: 2 }}
              />
            </Box>
            <TextField
              label="Quantity"
              name="qntyPrice"
              type='number'
              value={editedRowData.qntyPrice}
              onChange={handleInputChange}
              fullWidth
              sx={{ mb: 2 }}
            />
            <TextField
              label="Total Price"
              name="totalPrice"
              value={editedRowData.totalPrice?.toLocaleString('en-PH', {
                style: 'currency',
                currency: 'PHP'
              })}
              onChange={handleInputChange}
              disabled
              fullWidth
              sx={{ mb: 2 }}
            />
            <Box sx={{ display: 'flex', justifyContent: 'space-around' }}>
              <button className='btn-view-all'
                onClick={handleSaveChanges}
              >
                Save
              </button>
              <button className='btn-view-all'
                onClick={handleModalClose}
              >
                Cancel
              </button>
            </Box>
          </>

        </Box>
      </Modal>
    );
  };

  return (
    <>
      <Box>
        <Grid
          container
          spacing={4}
        >
          <Grid xs={5} sx={{ overflow: 'hidden' }}>
            <Box sx={{
              overflowY: 'hidden',
              boxShadow: 1,
              borderRadius: 3,
            }}>
              <Tabs value={selectedTab} onChange={handleTabChange}>
                <Tab label="Labor" />
                <Tab label="Material" />
                <Tab label="Fertilizer" />
              </Tabs>
              <Box sx={{
                overflow: 'hidden',
              }}>
                {
                  (() => {
                    switch (selectedTab) {
                      case 0:
                        return (
                          <DataGrid
                            rows={localParts.filter(part => part.particular.toLowerCase() === 'labor')}
                            columns={[
                              {
                                field: 'name',
                                headerName: 'Labor',
                                flex: 2,
                                editable: false,
                                headerClassName: 'super-app-theme--header',
                              },
                              {
                                field: 'qntyPrice',
                                headerName: 'Qnty',
                                flex: 1,
                                type: 'number',
                                editable: false,
                                headerClassName: 'super-app-theme--header',
                                valueFormatter
                              },
                              {
                                field: 'totalPrice',
                                headerName: 'Price',
                                flex: 2,
                                type: 'number',
                                editable: false,
                                headerClassName: 'super-app-theme--header',
                                valueFormatter: (params) => {
                                  return params.value && params.value.toLocaleString('en-PH', {
                                    style: 'currency',
                                    currency: 'PHP'
                                  })
                                },
                              },
                              {
                                field: 'actions',
                                type: 'actions',
                                headerName: 'Action',
                                flex: 1,
                                cellClassName: 'actions',
                                getActions: ({ id, row }) => {
                                  const editAction = (
                                    <GridActionsCellItem
                                      icon={<EditOutlinedIcon />}
                                      label="Edit"
                                      className="textPrimary"
                                      onClick={handleEditClick(id, row)}
                                      color="inherit"
                                      sx={{ color: 'inherit', '&:hover': { color: '#008000', backgroundColor: '#DFEFDF' } }}
                                    />
                                  );
                                  return [editAction];
                                }
                              }
                            ]}
                            hideFooter
                            getRowClassName={(params) =>
                              params.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd'
                            }
                            sx={{
                              border: 'none',
                              maxHeight: 400,
                              overflow: 'auto',
                              p: 1,
                              paddingBottom: 0,
                              '& .even': {
                                backgroundColor: 'aliceblue',
                              },
                              '& .odd': {
                                backgroundColor: '#fff',
                              },
                              '& .MuiDataGrid-columnHeaders': {
                                position: 'sticky',
                                top: 0,
                                zIndex: 1,
                                backgroundColor: 'rgba(255, 7, 0, 0.55)'
                              },
                            }}
                          />
                        )
                      case 1:
                        return (
                          <DataGrid
                            rows={localParts.filter(part => part.particular.toLowerCase() === 'material' && part.parent.toLowerCase() !== 'fertilizer')}
                            columns={[
                              {
                                field: 'name',
                                headerName: 'Material',
                                flex: 2,
                                editable: false,
                                headerClassName: 'super-app-theme--header',
                              },
                              {
                                field: 'qntyPrice',
                                headerName: 'Qnty',
                                flex: 1,
                                type: 'number',
                                editable: true,
                                headerClassName: 'super-app-theme--header',
                                valueFormatter
                              },
                              {
                                field: 'totalPrice',
                                headerName: 'Price',
                                flex: 2,
                                type: 'number',
                                editable: false,
                                headerClassName: 'super-app-theme--header',
                                valueFormatter: (params) => {
                                  return params.value && params.value.toLocaleString('en-PH', {
                                    style: 'currency',
                                    currency: 'PHP'
                                  })
                                },
                              },
                              {
                                field: 'actions',
                                type: 'actions',
                                headerName: 'Action',
                                flex: 1,
                                cellClassName: 'actions',
                                getActions: ({ id, row }) => {
                                  const editAction = (
                                    <GridActionsCellItem
                                      icon={<EditOutlinedIcon />}
                                      label="Edit"
                                      className="textPrimary"
                                      onClick={handleEditClick(id, row)}
                                      color="inherit"
                                      sx={{ color: 'inherit', '&:hover': { color: '#008000', backgroundColor: '#DFEFDF' } }}
                                    />
                                  );
                                  return [editAction];
                                }
                              },
                            ]}
                            hideFooter
                            getRowClassName={(params) =>
                              params.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd'
                            }
                            sx={{
                              border: 'none',
                              maxHeight: 460,
                              overflow: 'auto',
                              p: 1,
                              paddingBottom: 0,
                              '& .even': {
                                backgroundColor: 'aliceblue',
                              },
                              '& .odd': {
                                backgroundColor: '#fff',
                              },
                              '& .MuiDataGrid-columnHeaders': {
                                position: 'sticky',
                                top: 0,
                                zIndex: 1,
                                backgroundColor: 'rgba(255, 7, 0, 0.55)'
                              },
                            }}
                          />
                        )
                      case 2:
                        return (
                          <DataGrid
                            rows={localParts.filter(part => part.parent.toLowerCase() === 'fertilizer')}
                            columns={[
                              {
                                field: 'name',
                                headerName: 'Fertilizer',
                                flex: 2,
                                editable: false,
                                headerClassName: 'super-app-theme--header',
                              },
                              {
                                field: 'qntyPrice',
                                headerName: 'Qnty',
                                flex: 1,
                                type: 'number',
                                editable: true,
                                headerClassName: 'super-app-theme--header',
                                valueFormatter
                              },
                              {
                                field: 'price',
                                headerName: 'Price',
                                flex: 2,
                                editable: false,
                                type: 'number',
                                headerClassName: 'super-app-theme--header',
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
                                editable: false,
                                align: 'center',
                                headerClassName: 'super-app-theme--header',
                                valueGetter: (params) => params.row.isAvailable,
                                renderCell: (params) => (
                                  <Tooltip title={params.value ? 'Available' : 'Not Available'}>
                                    <Box
                                      component="span"
                                      sx={{
                                        ...shapeStyle,
                                        backgroundColor: params.value ? 'green' : 'red',
                                      }}
                                    />
                                  </Tooltip>
                                ),
                              },
                              {
                                field: 'actions',
                                type: 'actions',
                                headerName: 'Action',
                                flex: 1,
                                cellClassName: 'actions',
                                getActions: ({ id, row }) => {
                                  const editAction = (
                                    <GridActionsCellItem
                                      icon={<EditOutlinedIcon />}
                                      label="Edit"
                                      className="textPrimary"
                                      onClick={handleEditClick(id, row)}
                                      color="inherit"
                                      disabled={!row.isAvailable}
                                      sx={{ color: 'inherit', '&:hover': { color: '#008000', backgroundColor: '#DFEFDF' } }}
                                    />
                                  );
                                  return [editAction];
                                }
                              }
                            ]}
                            hideFooter
                            getRowClassName={(params) =>
                              params.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd'
                            }
                            sx={{
                              border: 'none',
                              maxHeight: 460,
                              overflow: 'auto',
                              p: 1,
                              paddingBottom: 0,
                              '& .even': {
                                backgroundColor: 'aliceblue',
                              },
                              '& .odd': {
                                backgroundColor: '#fff',
                              },
                              '& .MuiDataGrid-columnHeaders': {
                                position: 'sticky',
                                top: 0,
                                zIndex: 1,
                                backgroundColor: 'rgba(255, 7, 0, 0.55)'
                              },
                            }}
                          />
                        )
                      default:
                        break;
                    }
                  })()
                }
                <Box sx={{
                  display: 'flex',
                  gap: 2,
                  justifyContent: 'flex-end',
                  padding: 1,
                  // backgroundColor: 'GrayText'
                }}
                >
                  <Button variant="text" onClick={handleReset}>Reset</Button>
                  <Button variant="contained" onClick={handleSaveAnalysis}>Save</Button>
                </Box>
              </Box>
            </Box>
          </Grid>
          <Grid
            container
            xs={7}
            alignItems="center"
            justifyContent="center"
            spacing={2}
            display='flex'
          >
            <Grid xs={6}>
              <Box>
                <Doughnut
                  labels={["ROI", "Potential Return"]}
                  data={[newRoi.roi, Math.round((100 - newRoi.roi) * 100) / 100]}
                  title={"Expected QP Production"}
                />
              </Box>
            </Grid>
            <Grid xs={6}>
              <Box>
                <Doughnut
                  labels={["Materyales", "Labor"]}
                  data={laborMaterial}
                  title={'Labor and Material Cost'}
                />
              </Box>
            </Grid>
            <Grid xs={6}>
              <Box>
                <Doughnut
                  labels={["Pineapple", "Butterball"]}
                  data={[marker.totalPines, marker.totalBats]}
                  title={"Pineapple"}
                />
              </Box>
            </Grid>
          </Grid>
          <Grid xs={12}>
            <Column data={[marker.totalPines]} data1={[marker.totalBats]} labels={["Pineapple"]} />
          </Grid>
        </Grid>
      </Box>
      {!!snackbar && (
        <Snackbar
          open
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          onClose={handleCloseSnackbar}
          autoHideDuration={6000}
        >
          <Alert {...snackbar} onClose={handleCloseSnackbar} />
        </Snackbar>
      )}
      <EditRowModal />
    </>
  );
}

CostAndReturn.propTypes = {
  markers: PropTypes.array.isRequired,
  parts: PropTypes.array.isRequired,
  farm: PropTypes.object.isRequired, // Add this prop type
};

export default CostAndReturn;