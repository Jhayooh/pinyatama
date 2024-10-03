import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { DataGrid, GridCellModes, GridActionsCellItem, } from '@mui/x-data-grid';
import { Dialog, DialogActions, DialogContent, DialogTitle, Typography, Paper, Snackbar, Alert, Tooltip, InputAdornment, IconButton } from '@mui/material';
import { Tabs, Tab, Box, TextField, Modal, Button } from '@mui/material';
import { GetApp, NetworkWifi } from '@mui/icons-material';
import { darken, lighten, styled } from '@mui/material/styles';
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2

import { db } from '../firebase/Config';
import { addDoc, collection, doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { useCollectionData } from 'react-firebase-hooks/firestore';

// icon
import pesoCoin from './image_src/peso.png'

// charts
import Pie from './chart/Pie';
import Doughnut from './chart/Doughnut';
import SplineArea from './chart/SplineArea';
import Column from './chart/Column';

import EditOutlinedIcon from '@mui/icons-material/EditOutlined';

function CostAndReturn({ markers, parts, farm, roi, pineapple }) {
  // const marker = markers[0]
  const particularsRef = collection(db, '/particulars')
  const [particularData, particularLoading] = useCollectionData(particularsRef)

  const [selectedTab, setSelectedTab] = useState(0);
  const [show, setShow] = useState(false);
  const [localParts, setLocalParts] = useState(parts);
  const [localPine, setLocalPine] = useState(pineapple)
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

  const [selectedRow, setSelectedRow] = useState({});
  const [pineData, setPineData] = useState({})

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pineModal, setPineModal] = useState(false)
  const [newPine, setNewPine] = useState(null)

  const [isClicked, setIsClicked] = useState(false)

  const handleEditClick = (id, row) => () => {
    setSelectedRow(row);
    setIsModalOpen(true);
  };

  const formatter = new Intl.NumberFormat('en-PH', {
    style: 'currency',
    currency: 'PHP'
  })

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
    if (!parts || !particularData || !pineapple) {
      return
    }
    const updatedLocalParts = parts.map(part => ({
      ...part,
      isAvailable: particularData.find(data => data.id === part.foreignId)?.isAvailable ?? part.isAvailable
    }));
    setLocalParts(updatedLocalParts);
    setLaborMaterial([roi[0].materialTotal - roi[0].fertilizerTotal, roi[0].laborTotal, roi[0].fertilizerTotal])
    setNewRoi(roi[0])
    setLocalPine(pineapple)
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
    const totalFertilizer = upPart
      .filter(item => item.parent.toLowerCase() === "fertilizer")
      .reduce((sum, item) => sum + item.totalPrice, 0);
    setLaborMaterial([totalMaterial - totalFertilizer, totalLabor, totalFertilizer])
  }

  function getPinePrice(pine, pineObject) {
    const newPine = pineObject.filter(thePine => thePine.name.toLowerCase() === pine.toLowerCase())[0]
    return newPine.price
  }

  useEffect(() => {
    const grossReturnAndBatter = (newRoi.grossReturn * getPinePrice('pineapple', localPine)) + (newRoi.butterBall * getPinePrice('butterball', localPine))
    const costTotal = laborMaterial[0] + laborMaterial[1] + laborMaterial[2]
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
  }, [localParts, localPine, pineapple])

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
      // const compRef = doc(db, `farms/${farm.id}/components`, selectedRow.id)
      // await updateDoc(compRef, localParts)
      const roiRef = collection(db, `farms/${farm.id}/roi`)
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

  const getMult = (numOne, numTwo) => {
    const num = numOne * numTwo
    return Math.round(num * 10) / 10
  }

  const getBackgroundColor = (color, mode) =>
    mode === 'dark' ? darken(color, 0.7) : lighten(color, 0.7);

  const getHoverBackgroundColor = (color, mode) =>
    mode === 'dark' ? darken(color, 0.6) : lighten(color, 0.6);

  const getSelectedBackgroundColor = (color, mode) =>
    mode === 'dark' ? darken(color, 0.5) : lighten(color, 0.5);

  const getSelectedHoverBackgroundColor = (color, mode) =>
    mode === 'dark' ? darken(color, 0.4) : lighten(color, 0.4);

  const EditRowModal = () => {
    const [editedRowData, setEditedRowData] = useState(selectedRow);

    const getPercentage = (pirsint, nambir) => {
      return Math.round((nambir / 100) * pirsint)
    }

    const handleSaveChanges = () => {

      if (!editedRowData) return
      console.log("edited data", editedRowData)

      let updatedParts = []

      // setSaving(true)
      if (editedRowData.name.toLowerCase() === 'planting materials') {
        const newArea = editedRowData.qntyPrice / 30000
        // calculate the components again
        updatedParts = localParts.map((part) => {
          const newQnty = getMult(newArea, part.defQnty)
          return { ...part, qntyPrice: newQnty, totalPrice: getMult(newQnty, part.price), price: parseInt(part.price) }
        });
        setNewRoi((prev) => ({
          ...prev,
          grossReturn: getPercentage(90, editedRowData.qntyPrice),
          butterBall: getPercentage(10, editedRowData.qntyPrice)
        }))

      } else {
        updatedParts = localParts.map((part) => (part.id === editedRowData.id ? editedRowData : part));
      }
      console.log("updatedPartsss", updatedParts)
      setLocalParts(updatedParts);
      calcTotalParts(updatedParts)
      handleModalClose()
      // setSaving(false)
    };

    const handleInputChange = (event) => {
      const { name, value } = event.target;
      setEditedRowData(prevData => ({
        ...prevData,
        [name]: parseFloat(value),
        totalPrice: parseFloat(value) * editedRowData.price
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
            <Box sx={{ display: 'flex', flexDirection: 'row', gap: 1 }}>
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
                inputProps={{
                  step: "0.01"
                }}
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
              label="Unit"
              name="unit"
              value={editedRowData.unit}
              onChange={handleInputChange}
              fullWidth
              disabled
              sx={{ mb: 2, flex: 1 }}
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

  const EditPinePrice = () => {
    const [newPrice, setNewPrice] = useState(0)

    useEffect(() => {
      if (!newPine) return
      setNewPrice(newPine.price)
    }, [newPine])

    if (!newPine) return

    const handleSaveChanges = () => {
      setLocalPine((prev) => prev.map((pine) =>
        pine.name.toLowerCase() === newPine.name.toLowerCase() ? { ...pine, 'price': newPrice } : pine
      ));
      handleModalClose()
    }


    return (
      <Modal
        open={pineModal}
        onClose={handleModalClose}
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
            <Box sx={{ display: 'flex', flexDirection: 'row', gap: 1 }}>
              <TextField
                label="Name"
                name="name"
                value={newPine.name}
                fullWidth
                disabled
                sx={{ mb: 2 }}
              />
              <TextField
                label="Market Price"
                name="marketPrice"
                value={formatter.format(getPinePrice('pineapple', pineapple))}
                fullWidth
                disabled
                inputProps={{
                  step: "0.01"
                }}
                sx={{ mb: 2 }}
              />
            </Box>
            <TextField
              label="New Price"
              name="newPrice"
              type='number'
              value={newPrice}
              onChange={(e) => {
                setNewPrice(e.target.value)
                console.log("newPricceeeee", e.target.value)
              }}
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
  }

  const datagridStyle = {
    border: 'none',
    overflow: 'auto',
    maxHeight: 424,
    p: 1,
    paddingBottom: 0,
    '& .even': {
      backgroundColor: '#FFFFFF',
    },
    '& .odd': {
      backgroundColor: '#F6FAF6',
    },
    '& .MuiDataGrid-columnHeaders': {
      position: 'sticky',
      top: 0,
      zIndex: 1,
      backgroundColor: '#88C488'
    },
  }

  const actionBtnStyle = {
    backgroundColor: '#E7F3E7',
    height: '40px',
    width: '40px',
    borderRadius: 3,
    color: '#58AC58',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    '&:hover': {
      color: '#FFF',
      backgroundColor: '#88C488'
    }
  }

  const shapeStyle = {
    width: 20,
    height: 12,
    borderRadius: '50%',
    display: 'inline-block',
  }

  return (
    <>
      <Box sx={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: 1.5
      }}>
        <Grid
          container
          spacing={2}
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' }
          }}>

          {/* Labor/ Material / Fertilizer */}
          <Grid item
            md={5}
            xs={12}
            className='tabsBox' sx={{
              overflowY: 'hidden',
              boxShadow: 2,
              borderRadius: 2,
              backgroundColor: '#fff',
              flex: 2,

            }}>
            <Tabs
              value={selectedTab}
              onChange={handleTabChange}
              variant="scrollable"
              scrollButtons="auto">

              <Tab label="Labor" />
              <Tab label="Material" />
              <Tab label="Fertilizer" />
            </Tabs>
            <Box sx={{
              overflow: 'hidden',
              height: '100%',
              display: 'flex',
              flexDirection: 'column'
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
                              headerName: 'Quantity',
                              flex: 1,
                              type: 'number',
                              editable: false,
                              headerClassName: 'super-app-theme--header',
                              valueFormatter
                            },
                            {
                              field: 'unit',
                              headerName: 'Unit',
                              flex: 1,
                              editable: false,
                              headerClassName: 'super-app-theme--header',
                              valueFormatter: (params) => params.value || 'N/A', 
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
                                    sx={actionBtnStyle}
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
                          sx={datagridStyle}
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
                              valueFormatter: (params) => params.value || 'N/A', 
                            },
                            {
                              field: 'unit',
                              headerName: 'Unit',
                              flex: 1,
                              editable: false,
                              headerClassName: 'super-app-theme--header',
                              valueFormatter: (params) => params.value || 'N/A', 
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
                                    sx={actionBtnStyle}
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
                          sx={datagridStyle}
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
                              field: 'unit',
                              headerName: 'Unit',
                              flex: 1,
                              editable: false,
                              headerClassName: 'super-app-theme--header',
                              valueFormatter: (params) => params.value || 'N/A', 
                            },
                            {
                              field: 'totalPrice',
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
                                      backgroundColor: params.value ? '#28B463' : '#E74C3C',
                                      '&:hover': {
                                        boxShadow: params.value ? '0 0 12px #28B463' : '0 0 18px #E74C3C',
                                        transition: 'box-shadow 0.3s ease',
                                      }
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
                                    sx={actionBtnStyle}
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
                          sx={datagridStyle}
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
              }}
              >
                <Button variant="text" color='error' onClick={handleReset}>Reset</Button>
                {/* <Button variant="contained" color='success' onClick={handleSaveAnalysis}>Save</Button> */}
              </Box>
            </Box>
          </Grid>

          <Grid item xs={12} md={7}
            className='chartsBox' sx={{
              flex: 3,
              display: 'flex',
              flexDirection: 'column',
              gap: 1.5
            }}>
            <Box
              // className='topChartsBox'
              sx={{
                display: 'flex',
                flexDirection: { xs: 'column', md: 'row' },
                gap: 1.5,
                flex: 1
              }}>
              <Box className='roiBox' sx={{
                boxShadow: 2,
                borderRadius: 2,
                backgroundColor: '#fff',
                flex: 1
              }}>
                <Doughnut
                  labels={["Net return", "Production cost"]}
                  data={[newRoi.netReturn, newRoi.costTotal]}
                  title={"Expected QP Production"}
                />
              </Box>
              <Box className='productionBox' sx={{
                boxShadow: 2,
                borderRadius: 2,
                backgroundColor: '#fff',
                flex: 1
              }}>
                <Doughnut
                  labels={["Materyales", "Labor", "Fertilizer"]}
                  data={laborMaterial}
                  title={'Production Cost'}
                />
              </Box>
            </Box>
            <Box
              //className='botChartsBox' 
              sx={{
                display: 'flex',
                flexDirection: { xs: 'column', md: 'row' },
                flex: 1,
                gap: 1.5
              }}>
              <Box sx={{
                boxShadow: 2,
                borderRadius: 2,
                backgroundColor: '#fff',
                flex: 1
              }}>
                <Doughnut
                  labels={["Pineapple", "Butterball"]}
                  data={[newRoi.grossReturn * getPinePrice('pineapple', localPine), newRoi.butterBall * getPinePrice('butterball', localPine)]}
                  title={"Pineapple cost"}
                />
              </Box>
              <Box className='pricesBox' sx={{
                display: 'flex',
                flex: 1,
                gap: 1.5,
                flexDirection: 'column',
              }}>
                {/* GoodSize */}
                <Box sx={{
                  boxShadow: 2,
                  borderRadius: 2,
                  backgroundColor: '#FFF',
                  // backgroundColor: '#E7F3E7',
                  flex: 1,
                  display: 'flex',
                  flexDirection: { xs: 'column', md: 'row' }
                }}>
                  <Box xs={12}
                    className='column-one' sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      flex: 3,
                      paddingY: 1.5,
                      paddingLeft: 2,
                      paddingRight: 1
                    }}>
                    {/* <Typography>
                      Good Size
                    </Typography> */}
                    <Box sx={{
                      display: 'flex',
                      gap: 2,
                      alignItems: 'center',
                      justifyContent: 'flex-start'
                    }}>
                      <Typography sx={{
                        fontWeight: 400
                      }}>
                        Good Size
                      </Typography>
                      <IconButton
                        onClick={() => {
                          setNewPine(localPine.find((pone) => pone.name.toLowerCase() === 'pineapple'))
                          setPineModal(true)
                        }}
                        sx={{ ...actionBtnStyle, height: '28px', width: '28px', borderRadius: 2 }}>
                        <EditOutlinedIcon />
                      </IconButton>
                    </Box>
                    <Box sx={{
                      display: 'flex',
                      color: '#58AC58',
                      // border: .6,
                      // borderColor: '#88C488',
                      borderRadius: 2,
                      // backgroundColor: '#E7F3E7',
                      paddingX: 1.5,
                      paddingTop: .5
                    }}>
                      <Typography variant='h3' sx={{
                        fontWeight: 200,
                      }}>
                        ₱
                      </Typography>
                      <Typography
                        variant='h3'
                        sx={{
                          fontWeight: 700,
                        }}
                      >
                        {parseFloat(getPinePrice('pineapple', localPine)).toFixed(2)}
                      </Typography>
                      <Typography align='center'>
                        /pc
                      </Typography>
                    </Box>
                    {/* <Button variant='contained' color='success' size='small'>
                      Edit
                    </Button> */}
                  </Box>
                  <Box xs={12}
                    className='column-two' sx={{
                      flex: 1,
                      paddingY: 1.5,
                      paddingRight: 2,
                      paddingLeft: 1,
                      backgroundColor: '#88C488',
                      // borderRadius: 2,
                      borderTopRightRadius: '8px',
                      borderBottomRightRadius: '8px',
                      display: 'flex',
                      flexDirection: 'column',
                      color: '#FFF'
                    }}>
                    <Typography align='center' variant='caption'>
                      Market price
                    </Typography>
                    <Typography align='center' variant='h6' sx={{
                      fontWeight: 600
                    }}>
                      {formatter.format(getPinePrice('pineapple', pineapple))}
                    </Typography>
                  </Box>
                </Box>
                {/* ButterballSize */}
                <Box sx={{
                  boxShadow: 2,
                  borderRadius: 2,
                  backgroundColor: '#FFF',
                  // backgroundColor: '#E7F3E7',
                  flex: 1,
                  display: 'flex',
                  flexDirection: { xs: 'column', md: 'row' }
                }}>
                  <Box className='column-one' sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    flex: 3,
                    paddingY: 1.5,
                    paddingLeft: 2,
                    paddingRight: 1
                  }}>
                    <Box sx={{
                      display: 'flex',
                      gap: 2,
                      alignItems: 'center',
                      justifyContent: 'flex-start'
                    }}>
                      <Typography sx={{
                        fontWeight: 400
                      }}>
                        Butterball
                      </Typography>
                      <IconButton
                        onClick={() => {
                          setNewPine(localPine.find((pone) => pone.name.toLowerCase() === 'butterball'))
                          setPineModal(true)
                        }}
                        sx={{ ...actionBtnStyle, height: '28px', width: '28px', borderRadius: 2 }}>
                        <EditOutlinedIcon />
                      </IconButton>
                    </Box>
                    <Box sx={{
                      display: 'flex',
                      color: '#58AC58',
                      // border: .6,
                      // borderColor: '#88C488',
                      borderRadius: 2,
                      // backgroundColor: '#E7F3E7',
                      paddingX: 1.5,
                      paddingTop: .5
                    }}>
                      <Typography variant='h3' sx={{
                        fontWeight: 200
                      }}>
                        ₱
                      </Typography>
                      <Typography
                        variant='h3'
                        sx={{
                          fontWeight: 700,
                        }}
                      >
                        {parseFloat(getPinePrice('butterball', localPine)).toFixed(2)}
                      </Typography>
                      <Typography align='center'>
                        /pc
                      </Typography>
                    </Box>
                    {/* <Button variant='contained' color='success' size='small'>
                      Edit
                    </Button> */}
                  </Box>
                  <Box className='column-two' sx={{
                    flex: 1,
                    paddingY: 1.5,
                    paddingRight: 2,
                    paddingLeft: 1,
                    backgroundColor: '#88C488',
                    // borderRadius: 2,
                    borderTopRightRadius: '8px',
                    borderBottomRightRadius: '8px',
                    display: 'flex',
                    flexDirection: 'column',
                    color: '#FFF'
                  }}>
                    <Typography align='center' variant='caption'>
                      Market price
                    </Typography>
                    <Typography align='center' variant='h6' sx={{
                      fontWeight: 600
                    }}>
                      {formatter.format(getPinePrice('butterball', pineapple))}
                    </Typography>
                  </Box>
                </Box>
                {/* <Button
                  variant='contained'
                  color='success'
                  size='large'
                // startIcon={<PesoCoin />}
                >
                  <Typography sx={{
                    fontWeight: 500
                  }}>
                    Harvest now
                  </Typography>
                </Button> */}
              </Box>
            </Box>
          </Grid>
        </Grid>
        {/* <Box sx={{
          flex: 1
        }}>
          <Box sx={{
            boxShadow: 2,
            borderRadius: 2,
            backgroundColor: '#fff',

          }}>
            <Column
              data={[markers[0].totalPines]}
              data1={[markers[0].totalBats]}
              labels={["Pineapple"]} />
          </Box>
        </Box> */}
      </Box >
      {!!snackbar && (
        <Snackbar
          open
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          onClose={handleCloseSnackbar}
          autoHideDuration={6000}
        >
          <Alert {...snackbar} onClose={handleCloseSnackbar} />
        </Snackbar>
      )
      }
      <EditRowModal />
      <EditPinePrice />
    </>
  );
}

CostAndReturn.propTypes = {
  markers: PropTypes.array.isRequired,
  parts: PropTypes.array.isRequired,
  farm: PropTypes.object.isRequired, // Add this prop type
};

export default CostAndReturn;
