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
  Select,
  MenuItem,
  InputLabel,
  FormControl
} from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import {
  GridRowModes,
  DataGrid,
  GridToolbarContainer,
  GridActionsCellItem,
  GridRowEditStopReasons,
} from '@mui/x-data-grid'

// firebase
import { db } from '../firebase/Config';
import { addDoc, collection, doc, getDoc, updateDoc } from 'firebase/firestore';

// icons
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';
import moment from 'moment';

export default function ProductPrices({ particularData, pineappleData }) {
  const [rowModesModel, setRowModesModel] = useState({});

  const [saving, setSaving] = useState(false)

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pineModal, setPineModal] = useState(false)

  const [selectedRow, setSelectedRow] = useState({});
  const [pineData, setPineData] = useState({})

  const handleEditClick = (id, row) => () => {
    setSelectedRow(row);
    setIsModalOpen(true);
  };

  const handleEditPine = (pine) => {
    setPineData(pine)
    setPineModal(true)
  }

  const handleRowEditStop = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setPineModal(false)
  };

  const EditPinePrice = () => {
    const [editedPineData, setEditedPineData] = useState(pineData)
    console.log("pineDataaaaaaa:", editedPineData);

    const handleSavePine = async () => {
      setSaving(true)
      try {
        const docRef = doc(db, 'pineapple', pineData.id)
        await updateDoc(docRef, editedPineData)
      } catch (error) {
        console.error("error updating document", error);
      }
      setPineModal(false)
      setSaving(false)
    }

    const handleInputChange = (event) => {
      const { name, value } = event.target;
      setEditedPineData(prevData => ({
        ...prevData,
        [name]: value
      }));
    };

    return (
      <Modal
        open={pineModal}
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
          {saving
            ?
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <CircularProgress color="success" />
            </Box>
            :
            <>
              <h2 id="edit-row-modal">Edit {editedPineData.name} price</h2>
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
                type='number'
                value={editedPineData.price}
                onChange={handleInputChange}
                fullWidth
                sx={{ mb: 2 }}
              />
              <Box sx={{ display: 'flex', justifyContent: 'space-around' }}>
                <button className='btn-view-all'
                  onClick={handleSavePine}
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
          }
        </Box>
      </Modal>
    )
  }

  // Modal component for editing row
  const EditRowModal = () => {
    const [editedRowData, setEditedRowData] = useState(selectedRow);

    const handleSaveChanges = async () => {
      setSaving(true)
      try {
        const docRef = doc(db, 'particulars', selectedRow.id)
        await updateDoc(docRef, editedRowData)
      } catch (error) {
        console.error("error updating document", error);
      }
      setIsModalOpen(false)
      setSaving(false)
    };

    const handleInputChange = (event) => {
      const { name, value } = event.target;
      setEditedRowData(prevData => ({
        ...prevData,
        [name]: value
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
          {saving
            ?
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <CircularProgress color="success" />
            </Box>
            :
            <>
              <h2 id="edit-row-modal">Edit Row</h2>
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
                type='number'
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
          }
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

  // Filtered particularData based on search input
  const filteredParticularData = particularData.filter(particular => {
    return particular.name.toLowerCase().includes(searchInput.toLowerCase());
  });

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
        })
      },
    },
    {
      field: 'unit',
      headerName: 'Unit',
      flex: 1,
    },
    {
      field: 'particular',
      headerName: 'Particular',
      flex: 1,
      valueGetter: (value) => {
        const { row } = value
        if (row.parent.toLowerCase() === 'fertilizer') {
          return row.parent
        }
        return row.particular
      },
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      flex: 1,
      cellClassName: 'actions',
      getActions: ({ id, row }) => {
        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id, row)}
            color="inherit"
          />,
          // <GridActionsCellItem
          //   icon={<DeleteIcon />}
          //   label="Delete"
          //   className="textPrimary"
          //   onClick={() => (null)}
          //   color="inherit"
          // />
        ];
      },
    },
  ]);

  const boxStyle = {
    height: `calc(100% - 62px)`,
    borderRadius: 3,
  }

  console.log("pineData: ", pineappleData)

  return (
    <>
      <Box sx={{ backgroundColor: '#f9fafb', borderRadius: 4, height: '100%' }}>
        <Box sx={{ borderRadius: 3, width: 1, height: '100%' }} >
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', paddingTop: 2, marginX: 2 }}>
            <Box
              component='form'
              sx={{
                p: '2px 4px',
                display: 'flex',
                alignItems: 'center',
                width: 400,
                borderRadius: 2.5,
                border: '2px solid #dcdcdc',
              }}
            >
              <IconButton sx={{ p: '7px' }} aria-label="menu">
                <SearchIcon />
              </IconButton>
              <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder="Search particulars"
                inputProps={{ 'aria-label': 'search particulars' }}
                value={searchInput}
                onChange={handleSearchInputChange}
              />
            </Box>
          </Box>
          <Box sx={{ display: 'flex', flex: 1, height: '100%', overflowY: 'hidden' }}>
            {/* <Box sx={{ ...boxStyle, display: 'flex', flexDirection: 'column', gap: 1 }}> */}
            {/* <Box sx={{ backgroundColor: '#FFF', flex: 1, borderRadius: 3, padding: 4, boxShadow: 1, marginRight: 1, marginBottom: 2, marginTop: 2}}> */}
            <Box sx={{ ...boxStyle, flex: 2, overflowY: 'hidden' }}>
              <Box sx={{ ...boxStyle, height: `calc(100% - 32px)`, backgroundColor: '#FFF', overflowY: 'auto', boxShadow: 1, marginLeft: 2, marginY: 2, marginRight: 1 }}>
                <DataGrid
                  rows={filteredParticularData.map((partiData, index) => { return { index: index + 1, ...partiData } })}
                  columns={columns}
                  initialState={{
                    sorting: {
                      sortModel: [{ field: 'index', sort: 'asc' }],
                    },
                  }}
                  editMode='row'
                  rowModesModel={rowModesModel}
                  onRowEditStop={handleRowEditStop}
                  pageSizeOptions={[25, 50, 100]}
                  disableRowSelectionOnClick
                  sx={{ border: 'none', p: 2 }}
                  hideFooter
                />
              </Box>
            </Box>
            <Box sx={{ ...boxStyle, display: 'flex', flexDirection: 'column', gap: 1 }}>
              {
                pineappleData.map((pineData, index) => (
                  <Box sx={{ backgroundColor: index === 0 ? '#fdff72' : '#008000', flex: 1, borderRadius: 3, padding: 4, boxShadow: 1, marginLeft: 1, marginRight: 2, marginY: 2, marginTop: index === 1 ? 0 : 2 }}>
                    <h3 style={{ color: '#FFF' }}>{pineData.name}</h3>
                    <h1 style={{ color: '#FFF' }}>{`₱${pineData.price}.00`}</h1>
                    <h5 style={{ color: '#FFF' }}>Price</h5>
                    <button className='btn-view-all' style={{marginTop:10}} onClick={() => {
                      handleEditPine(pineData)
                    }}>
                      Edit price
                    </button>
                  </Box>
                ))
              }
              
            </Box>
          </Box>
        </Box>
      </Box>
      <EditRowModal />
      <EditPinePrice />
    </>
  )
};
