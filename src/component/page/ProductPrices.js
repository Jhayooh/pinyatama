import { useState, useEffect } from 'react';
import {
  Divider,
  Box,
  Button,
  TextField,
  IconButton,
  InputBase,
  Modal,
  CircularProgress,
  Tooltip,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Tabs,
  Tab,
  Typography,
  Paper,
} from '@mui/material';

import Grid from '@mui/material/Unstable_Grid2';
import {
  GridRowModes,
  DataGrid,
  GridToolbarContainer,
  GridActionsCellItem,
  GridRowEditStopReasons,
} from '@mui/x-data-grid';

import Backdrop from '@mui/material/Backdrop';

// firebase
import { db } from '../../firebase/Config';
import { addDoc, collection, doc, getDoc, updateDoc, query, orderBy, limit, arrayUnion } from 'firebase/firestore';

// icons
import AddIcon from '@mui/icons-material/Add';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import SearchIcon from '@mui/icons-material/Search';
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined'
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';

import moment from 'moment';

import Pine from './../image_src/p.jpg';
import Butt from './../image_src/p1.jpg'


export default function ProductPrices({ particularData, pineappleData, others }) {
  const [rowModesModel, setRowModesModel] = useState({});

  const [saving, setSaving] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pineModal, setPineModal] = useState(false);

  const [selectedRow, setSelectedRow] = useState({});
  const [pineData, setPineData] = useState({});

  const [activeTab, setActiveTab] = useState('materials');

  const handleTabChange = (event, newTab) => {
    setActiveTab(newTab);
  };

  const handleEditClick = (id, row) => () => {
    setSelectedRow(row);
    setIsModalOpen(true);
  };

  const handleEditPine = (pine) => {
    setPineData(pine);
    setPineModal(true);
  };

  const handleRowEditStop = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleAvailability = async (row) => {
    console.log('ROWW', row);
    setSaving(true);
    try {
      const docRef = doc(db, '/particulars', row.id);
      await updateDoc(docRef, {
        isAvailable: !row.isAvailable,
      });
    } catch (e) {
      console.log('error update', e);
    }
    setSaving(false);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setPineModal(false);
  };

  const EditPinePrice = () => {
    const [editedPineData, setEditedPineData] = useState(pineData);

    const handleSavePine = async () => {
      setSaving(true);
      try {
        const docRef = doc(db, 'pineapple', pineData.id);

        // Get the current document to capture the current price
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const currentData = docSnap.data();
          const currentPrice = currentData.price; // Assuming `price` is the current price field

          // Debugging log to check the current price
          console.log('Current Price:', currentPrice);

          // Create a new price history array with the current price
          const newPriceHistory = [{
            previousPrice: currentPrice,
            timestamp: new Date(),
          }];

          // Update the document with the new price and overwrite the priceHistory
          await updateDoc(docRef, {
            priceHistory: newPriceHistory, // Store only the latest price change
            price: editedPineData.price, // Update the document with the new price
          });

          console.log('Price history saved, and document updated');
        } else {
          console.error('No such document exists!');
        }
      } catch (error) {
        console.error('Error updating document and price history', error);
      }
      setPineModal(false);
      setSaving(false);
    };



    const handleInputChange = (event) => {
      const { name, value } = event.target;
      setEditedPineData((prevData) => ({
        ...prevData,
        [name]: parseInt(value),
      }));
    };

    return (
      <Modal open={pineModal} onClose={handleModalClose} aria-labelledby="edit-row-modal">
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
            width: 380,
          }}
        >
          <>
            <TextField
              label="Name"
              name="name"
              value={editedPineData.name}
              onChange={handleInputChange}
              fullWidth
              disabled
              sx={{ mb: 2 }}
            />
            <TextField
              label="Price"
              name="price"
              type="number"
              value={editedPineData.price}
              onChange={handleInputChange}
              fullWidth
              sx={{ mb: 2 }}
            />
            <Box sx={{ display: 'flex', justifyContent: 'space-around' }}>
              <button className="btn-view-all" onClick={handleSavePine}>
                Save
              </button>
              <button className="btn-view-all" onClick={handleModalClose}>
                Cancel
              </button>
            </Box>
          </>
        </Box>
      </Modal>
    );
  };

  // Modal component for editing row
  const EditRowModal = () => {
    const [editedRowData, setEditedRowData] = useState(selectedRow);

    const handleSaveChanges = async () => {
      setIsModalOpen(false);
      setSaving(true);
      try {
        const docRef = doc(db, 'particulars', selectedRow.id);
        await updateDoc(docRef, editedRowData);
      } catch (error) {
        console.error('error updating document', error);
      }
      setSaving(false);
    };

    const handleInputChange = (event) => {
      const { name, value } = event.target;
      setEditedRowData((prevData) => ({
        ...prevData,
        [name]: parseInt(value),
      }));
    };

    return (
      <Modal open={isModalOpen} onClose={handleModalClose} aria-labelledby="edit-row-modal">
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
            width: 380,
          }}
        >
          <>
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
              type="number"
              value={editedRowData.price}
              onChange={handleInputChange}
              fullWidth
              sx={{ mb: 2 }}
            />
            <TextField
              label="Unit"
              name="unit"
              value={editedRowData.unit}
              onChange={handleInputChange}
              disabled
              fullWidth
              sx={{ mb: 2 }}
            />
            <Box sx={{ display: 'flex', justifyContent: 'space-around' }}>
              <button className="btn-view-all" onClick={handleSaveChanges}>
                Save
              </button>
              <button className="btn-view-all" onClick={handleModalClose}>
                Cancel
              </button>
            </Box>
          </>
        </Box>
      </Modal>
    );
  };

  // Search state
  const [searchInput, setSearchInput] = useState('');

  // Handle search input change
  const handleSearchInputChange = (event) => {
    setSearchInput(event.target.value);
  };

  // Filtered particularData based on search input and active tab
  const filteredParticularData = particularData.filter((part) => {
    const lowercasedName = part.name.toLowerCase();
    const lowercasedSearchInput = searchInput.toLowerCase();

    if (activeTab === 'materials') {
      return (
        part.particular.toLowerCase() === 'material' &&
        part.parent.toLowerCase() !== 'fertilizer' &&
        lowercasedName.includes(lowercasedSearchInput)
      );
    } else if (activeTab === 'fertilizers') {
      return (
        part.parent.toLowerCase() === 'fertilizer' &&
        lowercasedName.includes(lowercasedSearchInput)
      );
    } else if (activeTab === 'labors') {
      return (
        part.particular.toLowerCase() === 'labor' &&
        lowercasedName.includes(lowercasedSearchInput)
      );
    }
    return true; // Default case: return all
  });


  const datagridStyle = {

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
  const [columns, setColumns] = useState([
    {
      field: 'name',
      headerName: 'Particular',
      flex: 2,

    },
    {
      field: 'price',
      headerName: 'Price',
      flex: 1,
      type: 'number',
      editable: true,
      align: 'right',
      valueFormatter: (params) => {
        return params.value && params.value.toLocaleString('en-PH', {
          style: 'currency',
          currency: 'PHP'
        });
      },
    },
    {
      field: 'unit',
      headerName: 'Unit',
      flex: 1,
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
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
            sx={{
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
            }}
          />
        );

        if (row.parent.toLowerCase() === 'fertilizer') {
          const availabilityAction = row.isAvailable ? (
            <Tooltip title="Set to Unavailable" placement="top-start">
              <GridActionsCellItem
                icon={<CheckCircleOutlineOutlinedIcon />}
                label="Available"
                className="textPrimary"
                onClick={() => handleAvailability(row)}
                color="inherit"
                sx={{ color: 'green', '&:hover': { color: 'green', backgroundColor: '#DFEFDF' } }}
              />
            </Tooltip>
          ) : (
            <Tooltip title="Set to Available" placement="top-start">
              <GridActionsCellItem
                icon={<CancelOutlinedIcon />}
                label="Unavailable"
                className="textPrimary"
                onClick={() => handleAvailability(row)}
                color="inherit"
                sx={{ color: 'red', '&:hover': { color: 'red', backgroundColor: '#DFEFDF' } }}
              />
            </Tooltip>
          );

          return [availabilityAction, editAction];
        }

        return [editAction];
      },
    },
  ]);

  const boxStyle = {
    height: `calc(100% - 62px)`,
    borderRadius: 4,
  };

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

  return (
    <>
      <Box
        sx={{
          backgroundColor: '#f9fafb',
          padding: 3,
          borderRadius: 4,
          height: '100%',
          overflow: 'auto',
          flexDirection: 'column',
        }}
      >
        <h1 style={{ color: '#000' }}>Product Prices</h1>
        <Divider sx={{ borderBottomWidth: 2, mb: 2 }} />
        <Grid spacing={2} xs={12} md={12} container sx={{ height: 'calc(100% - 72px)', display: 'flex' }}>
          {/* Left Side: List of Products */}
          <Grid item xs={12} md={4} sx={{ display: 'flex', flexDirection: 'column', height: '100%', gap: 2 }}>
            {pineappleData.map((pineData, index) => (
              <Box
                key={index}
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  borderRadius: 4,
                  overflow: 'hidden',
                  backgroundColor: '#58AC58',
                  boxShadow: 2,
                  paddingY: { xs: 3, md: 5 },
                  height:'100%'
                }}
              >
                <Box sx={{ color: '#FFF', display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1, mr: { xs: 3, md: 5 }, ml: { xs: 3, md: 5 } }}>
                  <Typography variant="button" sx={{ fontWeight: { xs: 300, md: 500 }, fontSize: { xs: 18, sm: 25, md: 30 } }}>
                    {pineData.name.toLowerCase()==='butterball' ? 'Batterball': pineData.name}
                  </Typography>
                  <IconButton sx={{
                    height: 28, width: 28, borderRadius: 2, cursor: 'pointer',
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                    '&:hover': {
                      transform: 'scale(1.05)',
                      boxShadow: '0px 8px 15px rgba(0, 0, 0, 0.3)',
                    },
                  }}>
                    <EditOutlinedIcon onClick={() => handleEditPine(pineData)} />
                  </IconButton>
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 0.5, backgroundColor: '#fff', borderTopRightRadius: 30, borderBottomRightRadius: 30, mr: { xs: 3, md: 5 } }}>
                  <Typography sx={{ fontWeight: 300, fontSize: { xs: 30, sm: 50 }, color: '#f9c667' }}>₱</Typography>
                  <Typography sx={{ fontWeight: 700, fontSize: { xs: 20, sm: 40 }, color: '#f9c667' }}>
                    {`${pineData.price}.00`}
                  </Typography>
                  <Typography sx={{ fontWeight: 100, fontSize: 20, color: '#f9c667' }}>/pc</Typography>
                </Box>
                {pineData.priceHistory && pineData.priceHistory.length > 0 ? (
                  pineData.priceHistory.map((entry, index) => (
                    <Box key={index} sx={{
                      display: 'flex',
                      color: '#f6f6f6',
                      borderRadius: 2,
                      justifyContent: 'center',
                      alignItems: 'center',
                      flexDirection: 'row',
                      gap: 1,
                      textDecoration: 'line-through',
                    }}>
                      <Typography sx={{ fontWeight: 200, fontSize: { xs: 10, md: 30, lg: 50}, color: '#f6f6f6' ,mb:2 }}>
                        {`₱${entry.previousPrice}.00`}
                      </Typography>
                    </Box>
                  ))
                ) : null}
              </Box>
            ))}
          </Grid>

          {/* Right Side: Tabs and DataGrid */}
          <Grid item xs={12} md={8} sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                p: { xs: 1, sm: 2 },
                backgroundColor: '#fff',
                borderRadius: 4
              }}
            >
              <Tabs value={activeTab} onChange={handleTabChange} variant="scrollable" scrollButtons="auto">
                <Tab label="Material" value="materials" />
                <Tab label="Fertilizer" value="fertilizers" />
                <Tab label="Labor" value="labors" />
                {/* <Tab label='Others' /> */}
              </Tabs>
              <Box
                sx={{
                  flex: 1, // Take up the remaining height
                  overflow: 'hidden',
                }}
              >
                <Box
                  component="form"
                  sx={{
                    p: '2px',
                    m: { xs: 1, sm: 2 },
                    display: 'flex',
                    borderRadius: 2.5,
                    border: '2px solid #dcdcdc',
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                  }}
                >
                  <IconButton sx={{ p: '7px' }} aria-label="menu">
                    <SearchIcon />
                  </IconButton>
                  <InputBase
                    sx={{ ml: 1, flex: 1 }}
                    placeholder="Maghanap..."
                    inputProps={{ 'aria-label': 'search particulars' }}
                    value={searchInput}
                    onChange={handleSearchInputChange}
                  />
                </Box>
                <Box sx={{ height: 'calc(100% - 56px)', overflowY: 'auto', pb: 3 }}>
                  <DataGrid
                    rows={filteredParticularData.map((partiData, index) => ({
                      index: index + 1,
                      ...partiData,
                    }))}
                    columns={columns}
                    initialState={{
                      sorting: {
                        sortModel: [{ field: 'particular', sort: 'asc' }],
                      },
                      EditRowModal
                    }}
                    editMode='row'
                    rowModesModel={rowModesModel}
                    onRowEditStop={handleRowEditStop}
                    pageSizeOptions={[25, 50, 100]}
                    disableRowSelectionOnClick
                    sx={{
                      ...datagridStyle,
                      backgroundColor: '#fff',
                      // border:'none'
                    }}
                    getRowClassName={(rows) =>
                      rows.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd'
                    }
                    hideFooter
                  />
                </Box>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>


      <EditRowModal />
      <EditPinePrice />
      <Modal open={saving} aria-labelledby="edit-row-modal">
        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={saving}
        // onClick={handleClose}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      </Modal>

    </>
  );
}
