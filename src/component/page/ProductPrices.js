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
          backgroundColor: "#f9fafb",
          borderRadius: 4,
          padding: 2,
          height: "100%",
          display: "flex",
          flexDirection: 'column',
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            gap: 2,
            // flexWrap: "wrap",
            padding: 2,
            height: "auto",
            width: '100%',
            alignContent:'space-between'
          }}
        >
          {pineappleData.map((pineData, index) => (
            <Box
              key={index}
              sx={{
                borderRadius: 4,
                boxShadow: 2,
                padding: 2,
                backgroundColor: index % 2 === 0 ? "#e8f5e9" : "#ffebee",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                "&:hover": {
                  transform: "scale(1.05)",
                  boxShadow: "0px 8px 15px rgba(0, 0, 0, 0.1)",
                },
                minWidth: { xs: "100%",md: "45%",},
               
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 700,
                  fontSize: { xs: 16, sm: 20, md: 24 },
                  color: "#34495e",
                }}
              >
                {pineData.name}
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "baseline",
                  gap: 0.5,
                  marginTop: 1,
                }}
              >
                <Typography
                  sx={{
                    fontSize: { xs: 20, sm: 24, md: 30 },
                    fontWeight: 300,
                    color: "#f9c667",
                  }}
                >
                  ₱
                </Typography>
                <Typography
                  onClick={() => handleEditPine(pineData)}
                  sx={{
                    fontSize: { xs: 24, sm: 28, md: 32 },
                    fontWeight: 700,
                    color: "#f39c12",
                    cursor: "pointer",
                  }}
                >
                  {pineData.price}.00
                </Typography>
              </Box>
              <Box sx={{ marginTop: 2 }}>
                {pineData.priceHistory && pineData.priceHistory.length > 0 ? (
                  pineData.priceHistory.map((entry, index) => (
                    <Typography
                      key={index}
                      sx={{
                        fontSize: { xs: 14, sm: 16 },
                        color: "#bdc3c7",
                        textDecoration: "line-through",
                      }}
                    >
                      ₱{entry.previousPrice}.00
                    </Typography>
                  ))
                ) : (
                  <Typography>No price history available.</Typography>
                )}
              </Box>
            </Box>
          ))}
        </Box>



        {/* Main Content Section */}

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            height: "100%",
            backgroundColor: "#fff",
            borderRadius: 4,
            boxShadow: 2,
            padding: 2,
          }}
        >
          {/* Tabs */}
          <Tabs
            value={activeTab}
            onChange={handleTabChange}
            variant="scrollable"
            scrollButtons="auto"
            sx={{ marginBottom: 2 }}
          >
            <Tab label="Material" value="materials" />
            <Tab label="Fertilizer" value="fertilizers" />
            <Tab label="Labor" value="labors" />
            <Tab label="Others" value="others" />
          </Tabs>

          {/* Search Box */}
          <Box
            component="form"
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              padding: "8px",
              borderRadius: 2,
              border: "2px solid #dcdcdc",
            }}
          >
            <IconButton>
              <SearchIcon />
            </IconButton>
            <InputBase
              sx={{ flex: 1 }}
              placeholder="Maghanap..."
              value={searchInput}
              onChange={handleSearchInputChange}
            />
          </Box>

          {/* Data Grid */}
          <Box sx={{ marginTop: 2, height: "calc(100% - 60px)", overflow: "auto" }}>
            <DataGrid
              rows={filteredParticularData.map((partiData, index) => ({
                index: index + 1,
                ...partiData,
              }))}
              columns={columns}
              initialState={{
                sorting: {
                  sortModel: [{ field: "particular", sort: "asc" }],
                },
              }}
              editMode="row"
              rowModesModel={rowModesModel}
              onRowEditStop={handleRowEditStop}
              pageSizeOptions={[25, 50, 100]}
              disableRowSelectionOnClick
              sx={{
                border: "none",
                backgroundColor: "#f9fafb",
                "& .even": { backgroundColor: "#f2f2f2" },
                "& .odd": { backgroundColor: "#fff" },
              }}
              hideFooter
            />
          </Box>
        </Box>


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
