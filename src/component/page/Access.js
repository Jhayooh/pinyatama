import {
  Box,
  Button,
  IconButton,
  InputBase,
  Tooltip,
  OutlinedInput,
  Select,
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
} from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Grid from '@mui/material/Unstable_Grid2';
import {
  DataGrid
} from '@mui/x-data-grid';
import { useState, useEffect } from 'react';


// icons
import SearchIcon from '@mui/icons-material/Search';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import LockIcon from '@mui/icons-material/LockOutlined';
import Unlockcon from '@mui/icons-material/LockOpenOutlined';

import moment from 'moment';

import { doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db, auth } from '../../firebase/Config';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth"

export default function Access({ usersRow }) {
  const [rowModesModel, setRowModesModel] = useState({});
  const [confirm, setConfirm] = useState(false)
  const [del, setDel] = useState(false);
  const [clicked, setClicked] = useState({})
  const [searchInput, setSearchInput] = useState('');

  const [userRow, setUserRow] = useState(usersRow)

  const [mun, setMun] = useState('');
  const [search, setSearch] = useState('');

  const handleMun = (event) => {
    setMun(event.target.value);
  };

  const handleSearch = (event) => {
    setSearch(event.target.value)
  };

  const handleClose = () => {
    setConfirm(false)
    setDel(false)
  }

  const deleteAccount = async () => {
    const userDocRef = doc(db, 'users', clicked.uid)
    try {
      await deleteDoc(userDocRef)
      // deletin din ang profile url sa storage
    } catch (e) {
      console.log('error deleting document:', e);
    }
    handleClose()
  }

  const blockAccount = async (row) => {
    console.log("clickeddddddd", row.uid);
    const userDocRef = doc(db, 'users', row.uid)
    try {
      await updateDoc(userDocRef, {
        status: 'blocked'

      })
      // deletin din ang profile url sa storage
    } catch (e) {
      console.log('error blocking document:', e);
    }
    handleClose()
  }

  const unblockAccount = async (row) => {
    const userDocRef = doc(db, 'users', row.uid)
    try {
      await updateDoc(userDocRef, {
        status: 'active'
      })
      // deletin din ang profile url sa storage
    } catch (e) {
      console.log('error unblocking document:', e);
    }
    handleClose()
  }

  const registerAccount = async () => {
    const userDocRef = doc(db, 'users', clicked.uid);
    const { email, password } = clicked
    const newAuth = getAuth()
    try {
      const userCredential = await createUserWithEmailAndPassword(newAuth, email, password);
      await updateDoc(userDocRef, {
        status: 'active',
        id: userCredential.user.uid
      })
    } catch (error) {
      console.error('Error updating document:', error);
    }
    handleClose()
  }

  const municipalities = [
    { name: "Lahat", value: "" },
    { name: "Basud", value: "BASUD" },
    { name: "Capalonga", value: "CAPALONGA" },
    { name: "Daet", value: "DAET (Capital)" },
    { name: "Jose Panganiban", value: "JOSE PANGANIBAN" },
    { name: "Labo", value: "LABO" },
    { name: "Mercedes", value: "MERCEDES" },
    { name: "Paracale", value: "PARACALE" },
    { name: "San Lorenzo Ruiz", value: "SAN LORENZO RUIZ" },
    { name: "San Vicente", value: "SAN VICENTE" },
    { name: "Santa Elena", value: "SANTA ELENA" },
    { name: "Talisay", value: "TALISAY" },
    { name: "Vinzons", value: "VINZONS" }
  ];

  const [columns, setColumns] = useState([
    {
      field: 'displayName',
      headerName: 'Pangalan',
      renderCell: (params) => (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <InputAdornment position="start">
            <Avatar src={params.row.photoURL} alt="Profile" />
          </InputAdornment>
          {params.row.displayName}
        </Box>
      ),
      flex: 1,
    },
    {
      field: 'phoneNumber',
      headerName: 'Phone Number',
      flex: 1,
    },
    {
      field: 'address',
      headerName: 'Address',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      flex: 1,
      valueGetter: (value) => {
        return `${value.row.brgy || ''}, ${value.row.mun || ''}`
      },
    },
    {
      field: 'email',
      headerName: 'Email',
      flex: 1,
    },
    {
      field: 'status',
      headerName: 'Status',
      flex: 1,
      editable: false,
      renderCell: (params) => (
        <span style={{ color: params.row.status === 'active' ? 'green' : params.row.status === 'pending' ? 'orange' : 'red' }}>
          {params.row.status}
        </span>
      )
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      flex: 1,
      cellClassName: 'actions',
      editable: false,
      getActions: ({ id, row }) => {
        if (!row) return null
        const { status } = row
        if (status === 'pending') {
          return [
            <Tooltip title='Accept'>
              <Button color="success" variant='outlined' onClick={() => {
                setConfirm(true)
                setClicked(row)
              }}>
                <CheckIcon />
              </Button>
            </Tooltip>,
            <Tooltip title='Reject'>
              <Button color="error" variant='outlined' onClick={() => {
                setDel(true)
                setClicked(row)
              }}>
                <ClearIcon />
              </Button>
            </Tooltip>
          ]
        } else if (status === 'active') {
          return [
            <Tooltip title='Block Account'>
              <Button color='error' variant='outlined' onClick={() => {
                blockAccount(row)
              }}
                sx={{ color: 'red' }}>
                Block
              </Button>
            </Tooltip>
          ]
        } else if (status === 'blocked') {
          return [
            <Tooltip title='Unblock Account'>
              <Button color='success' variant='outlined' onClick={() => {
                unblockAccount(row)
              }}
                sx={{ color: 'green' }}>
                Unblocked
              </Button>
            </Tooltip>
          ]
        }
      },
    },
  ])

  function getRowId(row) {
    return row?.uid
  }

  // Handle search input change
  const handleSearchInputChange = (event) => {
    setSearchInput(event.target.value);
  };

  useEffect(() => {
    const filteredUser = usersRow.filter((user) => {
      const matchesSearch = user.displayName.toLowerCase().includes(search.toLowerCase())
      const matchesMunicipality = mun ? user.mun === mun : true;
      return matchesSearch && matchesMunicipality;
    })
    setUserRow(filteredUser)
  }, [search, usersRow, mun])

  // Filtered usersRow based on search input (Pangalan)
  const filteredUsersRow = usersRow.filter(user => {
    return user.displayName.toLowerCase().includes(searchInput.toLowerCase());
  });

  return (
    <>
      <Box sx={{ backgroundColor: '#f9fafb', padding: 4, borderRadius: 4, height: '100%' }}>
        <Grid container spacing={4} alignItems='stretch'>
          <Grid lg={12} md={12} sm={12} xs={12} sx={{}}>
            <Box sx={{ boxShadow: 1, borderRadius: 3, backgroundColor: '#fff', width: 1 }} >
              <Box sx={{ marginBottom: 1, display: 'flex', width: 1, justifyContent: 'flex-start', gap: 2, p: 2, borderRadius: 20 }}>
                <Box
                  sx={{ width: 800 }}
                >
                  <FormControl fullWidth size="small" >
                    <OutlinedInput
                      id="outlined-adornment-amount"
                      placeholder="Maghanap..."
                      startAdornment={<InputAdornment position="start"><SearchIcon /></InputAdornment>}
                      value={search}
                      onChange={handleSearch}
                    />
                  </FormControl>
                </Box>
                <Box sx={{ minWidth: 300 }}>
                  <FormControl fullWidth size="small">
                    <InputLabel id="demo-simple-select-label">Municipality</InputLabel>
                    <Select
                      sx={{ border: "none" }}
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={mun}
                      label="Municipality"
                      onChange={handleMun}
                    >
                      {
                        municipalities.map((municipality) => (
                          <MenuItem key={municipality.value} value={municipality.value}>
                            {municipality.name}
                          </MenuItem>
                        ))
                      }
                    </Select>
                  </FormControl>
                </Box>
              </Box>
              <Box >
                <DataGrid
                  getRowId={getRowId}
                  rows={userRow}
                  columns={columns}
                  initialState={{
                    sorting: {
                      sortModel: [{ field: 'name', sort: 'asc' }],
                    },
                  }}
                  editMode='row'
                  rowModesModel={rowModesModel}
                  // onRowEditStop={handleRowEditStop}
                  pageSizeOptions={[25, 50, 100]}
                  disableRowSelectionOnClick
                  sx={{ border: 'none', p: 2 }} />
              </Box>
            </Box>
          </Grid>
        </Grid>
        {/* <EditRowModal /> */}
      </Box>
      <Dialog
        open={confirm}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {clicked.displayName}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Sigurado ka bang gusto mong tanggapin ang account na ito?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button color='success' variant='contained' onClick={registerAccount} autoFocus>
            Tanggapin
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={del}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {clicked.displayName}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Sigurado ka bang gusto mong alisin ang account na ito?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button variant='contained' color="error" onClick={deleteAccount} autoFocus>
            Alisin
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
};
