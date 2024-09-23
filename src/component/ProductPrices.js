import { useState } from 'react';
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
import { db } from '../firebase/Config';
import { addDoc, collection, doc, getDoc, updateDoc } from 'firebase/firestore';

// icons
import AddIcon from '@mui/icons-material/Add';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import SearchIcon from '@mui/icons-material/Search';
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';

import moment from 'moment';

import Pine from './image_src/p.jpg';
import Butt from './image_src/p1.jpg'

export default function ProductPrices({ particularData, pineappleData }) {
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
        await updateDoc(docRef, editedPineData);
      } catch (error) {
        console.error('error updating document', error);
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
              label="ID"
              name="id"
              value={editedRowData.id}
              onChange={handleInputChange}
              fullWidth
              disabled
              sx={{ mb: 2 }}
            />
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

  return (
    <>
      <Box sx={{ backgroundColor: '#f9fafb', borderRadius: 4, height: '100%', padding: 2 }}>
        <Grid container spacing={1} sx={{ height: '100%', overflowY: 'auto' }}>
          <Grid item xs={12} md={4} lg={3}>
            <Box sx={{ ...boxStyle, display: 'flex', flexDirection: 'column', gap: 1, height: '100%' }}>
              {pineappleData.map((pineData, index) => (
                <Box elevation={3}
                  sx={{
                    backgroundColor: index === 0 ? '#58AC58' : '#F7BF0B',
                    padding: 2,
                    flex: 1,
                    height: '50%'
                  }}>
                  {index === 0 ? (
                    <img src={Butt} alt="Butt" style={{ width: '100%', maxHeight: '150px', objectFit: 'contain' }} />
                  ) : (
                    <img src={Butt} alt="Pine" style={{ width: '100%', maxHeight: '150px', objectFit: 'contain' }} />
                  )}
                  <Divider sx={{ marginTop: 2 }} />
                  <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>

                    <Typography variant="button" display="block" gutterBottom sx={{ color: 'white', fontSize: 20 }}>
                      {pineData.name}
                    </Typography>
                    <Typography variant="h6" gutterBottom>
                      {`₱${pineData.price}.00`}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Button variant='contained' color='success' onClick={() => handleEditPine(pineData)}>
                      Edit Price
                    </Button>
                  </Box>
                </Box>
              ))}
            </Box>
          </Grid>
          <Grid xs={12} md={8} lg={9} sx={{ height: '100%' }}>

            <Box sx={{
              display: 'flex',
              flexDirection: 'column',
              height: '100%',
              backgroundColor: '#fff',
              p: 1,
              borderRadius: 4,
              boxShadow: 2,
            }}>
              <Tabs
                value={activeTab}
                onChange={handleTabChange}
                variant="scrollable"
                scrollButtons="auto"
                >

                <Tab label="Material" value="materials" />
                <Tab label="Fertilizer" value="fertilizers" />
                <Tab label="Labor" value="labors" />
                <Box
                  component="form"
                  sx={{
                    p: '2px ',
                    display: 'flex',
                    // alignItems: 'center',
                    width:'100%',
                    marginRight: 2,
                    width: '100%',
                    borderRadius: 2.5,
                    border: '2px solid #dcdcdc',
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
              </Tabs>
              <Box
                sx={{
                  height: '100%',
                  overflowX: 'hidden',
                }}
              >
                <DataGrid
                  rows={filteredParticularData.map((partiData, index) => ({ index: index + 1, ...partiData }))}
                  columns={columns}
                  initialState={{
                    sorting: {
                      sortModel: [{ field: 'particular', sort: 'asc' }],
                    },
                  }}
                  editMode="row"
                  rowModesModel={rowModesModel}
                  onRowEditStop={handleRowEditStop}
                  pageSizeOptions={[25, 50, 100]}
                  disableRowSelectionOnClick
                  sx={{
                    ...datagridStyle,
                    border: 'none',
                    paddingX: 2,
                    overflowX: 'auto',
                    height: `calc(100% - 8px)`,
                    backgroundColor: '#fff',
                    paddingTop: 1
                  }}
                  getRowClassName={(rows) =>
                    rows.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd'
                  }
                  hideFooter

                />
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
