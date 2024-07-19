import React, { useState, useEffect } from 'react'
import {
  Box,
  Button,
  CircularProgress,
  Modal,
  Tabs,
  Tab
} from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2';
import Doughnut from '../chart/Doughnut'

import { DataGrid } from '@mui/x-data-grid';
import { collection, query, where } from 'firebase/firestore';
import { db } from '../../firebase/Config';
import { useCollectionData } from 'react-firebase-hooks/firestore';

const ArchiveModal = ({ farm, setFarm, setLoading }) => {
  const partColl = collection(db, `farms/${farm.id}/components`);
  const [parts, partsLoading, partsError] = useCollectionData(partColl);
  const roiColl = collection(db, `farms/${farm.id}/roi`)
  const [roi, roiLoading, roiError] = useCollectionData(roiColl)
  const [showModal, setShowModal] = useState(false)

  const [selectedTab, setSelectedTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  useEffect(() => {
    if (!partsLoading && !roiLoading) {
      setLoading(prevLoading => ({ ...prevLoading, [farm.id]: false }));
      setShowModal(true);
    }
  }, [partsLoading, roiLoading]);

  function handleClose() {
    setShowModal(false)
  }

  return (
    <Modal
      open={showModal}
      onClose={handleClose}
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          bgcolor: 'background.paper',
          borderRadius: '5px',
          boxShadow: 24,
          p: 4,
          width: '80%'
        }}
      >

        <Box>
          <Grid
            container
            spacing={2}
          >
            <Grid xs={5} sx={{ overflow: 'hidden' }}>
              <Box sx={{
                overflowY: 'hidden',
                boxShadow: 2,
                borderRadius: 2,
                backgroundColor: '#fff',
                height: '100%'
              }}>
                <Tabs value={selectedTab} onChange={handleTabChange}>
                  <Tab label="Labor" />
                  <Tab label="Material" />
                  <Tab label="Fertilizer" />
                </Tabs>
                <Box sx={{
                  overflow: 'hidden',
                  height: '100%',
                }}>
                  {/* {
                    (() => {
                      switch (selectedTab) {
                        case 0:
                          return (
                            <DataGrid
                              rows={parts?.filter(part => part.particular.toLowerCase() === 'labor')}
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
                              rows={parts?.filter(part => part.particular.toLowerCase() === 'material' && part.parent.toLowerCase() !== 'fertilizer')}
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
                              rows={parts?.filter(part => part.parent.toLowerCase() === 'fertilizer')}
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
                  } */}
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
              <Grid xs={6} >
                <Box sx={{
                  boxShadow: 2,
                  borderRadius: 2,
                  backgroundColor: '#fff',
                }}>
                  {
                    partsLoading && roiLoading ?
                      <CircularProgress /> :
                      <Doughnut
                        labels={["ROI", "???"]}
                        data={[roi[0].roi, Math.round((100 - roi[0].roi) * 100) / 100]}
                        title={"Expected QP Production"}
                      />
                  }
                </Box>
              </Grid>
              <Grid xs={6}>
                <Box sx={{
                  boxShadow: 2,
                  borderRadius: 2,
                  backgroundColor: '#fff',
                }}>
                  {
                    partsLoading && roiLoading ?
                      <CircularProgress /> :
                      <Doughnut
                        labels={["Materyales", "Labor", "Fertilizer"]}
                        data={[roi[0].materialTotal - roi[0].fertilizerTotal, roi[0].laborTotal, roi[0].fertilizerTotal]}
                        title={'Production Cost'}
                      />
                  }
                </Box>
              </Grid>
              <Grid xs={6}>
                <Box sx={{
                  boxShadow: 2,
                  borderRadius: 2,
                  backgroundColor: '#fff',
                }}>
                  {/* <Doughnut
                  labels={["Pineapple", "Butterball"]}
                  data={[roi[0].pinePrice, roi[0].butterPrice]}
                  title={"Pineapple"}
                /> */}
                </Box>
              </Grid>
            </Grid>
            <Grid xs={12}>
              <Box sx={{
                boxShadow: 2,
                borderRadius: 2,
                backgroundColor: '#fff'
              }}>
                {/* <Column data={[marker.totalPines]} data1={[marker.totalBats]} labels={["Pineapple"]} /> */}
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Modal >
  )
}

const Archive = ({ fieldId }) => {
  console.log("farms sa archive", fieldId)
  const farmCol = query(collection(db, 'farms'), where('fieldId', '==', `${fieldId}`), where('cropStage', '==', 'complete'))
  const [archiveDoc, archiveLoading] = useCollectionData(farmCol)

  const [farm, setFarm] = useState(null)
  const [loading, setLoading] = useState({})

  archiveDoc && console.log("arkaybdok", archiveDoc)

  const columns = [
    {
      field: 'title',
      headerName: 'Farm',
      flex: 1,
      editable: false,
      headerClassName: 'super-app-theme--header',
    },
    {
      field: 'start_date',
      headerName: 'Date of Planting',
      flex: 1,
      type: 'number',
      editable: false,
      headerClassName: 'super-app-theme--header',
      valueFormatter: (params) => {
        return params.value.toDate().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
      }
    },
    {
      field: 'harvest_date',
      headerName: 'Harvest Date',
      flex: 1,
      type: 'number',
      editable: false,
      headerClassName: 'super-app-theme--header',
      valueFormatter: (params) => {
        return params.value.toDate().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
      }
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Action',
      flex: 1,
      cellClassName: 'actions',
      getActions: ({ row }) => {
        const isRowLoading = loading[row.id];

        const editAction = (
          <Button
            variant="contained"
            color="success"
            onClick={() => {
              setLoading(prevLoading => ({ ...prevLoading, [row.id]: true }));
              setFarm(row);
              console.log("row sa button", row);
            }}
            startIcon={isRowLoading ? <CircularProgress size={20} thickness={4.8} /> : null}
          >
            <span>View</span>
          </Button>
        );
        return [editAction];
      }
    }
  ]

  return (
    <>
      <Box sx={{
        heigth: '100%',
        backgroundColor: '#FFF',
        boxShadow: 2,
        borderRadius: 2,
        display: 'flex',
        justifyContent: 'center',
        width: '100%'
      }}>
        {
          archiveLoading
            ?
            <Box sx={{ paddingY: 12 }}>
              <CircularProgress color="success" />
            </Box>
            :
            <Box sx={{
              overflowY: 'hidden',
              height: '100%',
              width: '100%'
            }}>
              <DataGrid
                getRowId={(row) => { return row?.id }}
                rows={archiveDoc}
                columns={columns}
                initialState={{
                  sorting: {
                    sortModel: [{ field: 'name', sort: 'asc' }],
                  },
                }}
                editMode='row'
                // hideFooter
                sx={{
                  border: 'none',
                  paddingX: 2,
                  height: `calc(100%-10px)`,
                  overflowY: 'auto'
                }}
              />
            </Box>
        }
      </Box>
      {farm && <ArchiveModal farm={farm} setFarm={setFarm} setLoading={setLoading} />}
    </>
  )
}

export default Archive