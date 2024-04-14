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

export default function ProductPrices({ particularData }) {
  console.log(particularData);
  const [rowModesModel, setRowModesModel] = useState({});
  const [rows, setRows] = useState([])



  const [saving, setSaving] = useState(false)

  // State variables for modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAdd, setIsAdd] = useState(false)

  const [selectedRow, setSelectedRow] = useState({});

  const handleEditClick = (id, row) => () => {
    setSelectedRow(row);
    setIsModalOpen(true);
  };

  const handleRowEditStop = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

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

  // Modal comp for adding row
  const AddRowModal = () => {

    // Data for adding row
    const [partiName, setPartiName] = useState('')
    const [partiPrice, setPartiPrice] = useState(0)
    const [partiUnit, setPartiUnit] = useState('')
    const [partiParent, setPartiParent] = useState('')
    const [partiParti, setPartiParti] = useState('')
    const [select, setSelect] = useState([])

    const [adding, setAdding] = useState(false)

    const selection = [
      {
        'name': 'material',
        'data': ['Fertilizer']
      },
      {
        'name': 'labor',
        'data': ['Land Preparation']
      },
    ]

    const handleParent = (event) => {
      setPartiParent(event.target.value)
    }

    const handleParti = (event) => {
      const value = event.target.value;
      setPartiParti(value);
      if (value !== '') {
        setSelect(selection.filter(item => item.name === value))
      } else {
        setSelect([])
      }
    };
    const handleAdd = async () => {
      const partiRef = collection(db, 'particulars')
      try {
        const newParti = await addDoc(partiRef, {
          name: partiName,
          parent: partiParent.charAt(0).toUpperCase(),
          particular: partiParti.charAt(0).toUpperCase(),
          price: partiPrice,
          unit: partiUnit
        })
        await updateDoc(newParti, { id: newParti.id })

        setSaving(false)
      } catch (e) {
        console.log(e);
      }
    }

    return (
      <Modal
        open={isAdd}
        onClose={() => setIsAdd(false)}
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
            <h2 id="edit-row-modal">Add Row</h2>
            <TextField
              label="Name"
              name="name"
              value={partiName}
              onChange={(name) => setPartiName(name.target.value)}
              fullWidth
              sx={{ mb: 2 }}
            />
            <TextField
              label="Price"
              name="price"
              type='number'
              value={partiPrice}
              onChange={(price) => setPartiPrice(price.target.value)}
              fullWidth
              sx={{ mb: 2 }}
            />
            <TextField
              label="Unit"
              name="unit"
              value={partiUnit}
              onChange={(unit) => setPartiUnit(unit.target.value)}
              fullWidth
              sx={{ mb: 2 }}
            />
            <FormControl fullWidth>
              <InputLabel id="partiLabel">Particular</InputLabel>
              <Select
                labelId="partiLabel"
                id="parti"
                value={partiParti}
                label="Particular"
                onChange={handleParti}
                sx={{ mb: 2, width: '100%' }}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={"labor"}>Labor</MenuItem>
                <MenuItem value={"material"}>Material</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth>

              <InputLabel id="parentLabel">Parent</InputLabel>
              <Select
                labelId="parentLabel"
                id="parent"
                value={partiParent}
                label="Parent"
                onChange={handleParent}
                sx={{ mb: 2, width: '100%' }}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {select.map(particular => (
                  particular.data.map(item => (
                    <MenuItem key={item} value={item}>{item}</MenuItem>
                  ))
                ))}
              </Select>
            </FormControl>
            <Box sx={{ display: 'flex', justifyContent: 'space-around' }}>
              {
                adding
                  ?
                  <CircularProgress />
                  :
                  <>
                    <button className='btn-view-all'
                      onClick={() => {
                        setAdding(true)
                        handleAdd()
                      }}
                    >
                      Add
                    </button>
                    <button className='btn-view-all'
                      onClick={() => setIsAdd(false)}
                    >
                      Cancel
                    </button>
                  </>
              }
            </Box>
          </>
        </Box>
      </Modal>
    );
  }

  const [columns, setColumns] = useState([
    {
      field: 'parent',
      headerName: 'Label',
      flex: 1,
    },
    {
      field: 'name',
      headerName: 'Name',
      flex: 2,
    },
    {
      field: 'price',
      headerName: 'Price',
      flex: 1,
      type: 'number',
      editable: true,
      align: 'right',
      format: (value) => value.toLocaleString('en-US'),
    },
    {
      field: 'unit',
      headerName: 'Unit',
      flex: 1,
    },
    {
      field: 'id',
      headerName: 'ID',
      flex: 1.5,
    },
    {
      field: 'particular',
      headerName: 'Particular',
      flex: 1,
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
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            className="textPrimary"
            onClick={() => (null)}
            color="inherit"
          />
        ];
      },
    },

    // {
    //   field: 'actions',
    //   headerName: 'Action',
    //   minWidth: 160,
    //   align: 'center',
    // }
  ])

  return (
    <>
      <Box sx={{ backgroundColor: '#f9fafb', padding: 4, borderRadius: 4, height: '100%' }}>
        <Grid container spacing={4} alignItems='stretch'>
          <Grid lg={12} md={12} sm={12} xs={12} sx={{}}>
            <Box sx={{ boxShadow: 1, borderRadius: 3, backgroundColor: '#fff', width: 1 }} >
              {/* <PricesBuilder particularData={particularData} /> */}
              <Box sx={{ marginBottom: 1.5, display: 'flex', width: 1, justifyContent: 'flex-end', height: 'auto', gap: 2, pt: 2, pr: 2 }}>
                <Box
                  component='form'
                  sx={{
                    p: '2px 4px',
                    display: 'flex',
                    alignItems: 'center',
                    width: 400,
                    borderRadius: 2.5,
                    border: '2px solid #dcdcdc',
                    // boxShadow: `0 1px 5px 0 rgba(0, 0, 0, 0.2),
                    //             0 2px 2px 0 rgba(0, 0, 0, 0.14),
                    //             0 3px 1px -2px rgba(0, 0, 0, 0.12)`
                  }}
                >
                  <IconButton sx={{ p: '7px' }} aria-label="menu">
                    <SearchIcon />
                  </IconButton>
                  <InputBase
                    sx={{ ml: 1, flex: 1 }}
                    placeholder="Search for farms"
                    inputProps={{ 'aria-label': 'search farms' }}
                  />
                </Box>

                <button className='btn-view-all'
                  onClick={() => setIsAdd(true)}
                >
                  Add Data
                </button>
              </Box>
              <Box >
                <DataGrid
                  rows={particularData}
                  columns={columns}
                  initialState={{
                    sorting: {
                      sortModel: [{ field: 'name', sort: 'asc' }],
                    },
                  }}
                  editMode='row'
                  rowModesModel={rowModesModel}
                  onRowEditStop={handleRowEditStop}
                  pageSizeOptions={[25, 50, 100]}
                  disableRowSelectionOnClick
                  sx={{ border: 'none', p: 2 }} />
              </Box>
            </Box>
          </Grid>
        </Grid>
        <AddRowModal />
        <EditRowModal />
      </Box>
    </>
  )
};
