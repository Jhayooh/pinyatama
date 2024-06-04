import {
  Box,
  Button,
  IconButton,
  InputBase,
  InputAdornment,
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
import { useState } from 'react';


// icons
import SearchIcon from '@mui/icons-material/Search';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import BlockIcon from '@mui/icons-material/Block';

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
            <Button color="success" variant='outlined' onClick={() => {
              setConfirm(true)
              setClicked(row)
            }}>
              <CheckIcon />
            </Button>,
            <Button color="error" variant='outlined' onClick={() => {
              setDel(true)
              setClicked(row)
            }}>
              <ClearIcon />
            </Button>
          ]
        } else if (status === 'active') {
          return [
            <Button color="secondary" variant='outlined' onClick={() => {
              blockAccount(row)
            }}>
              <BlockIcon />
            </Button>
          ]
        } else if (status === 'blocked') {
          return [
            <Button color="secondary" variant='outlined' onClick={() => {
              unblockAccount(row)
            }}>
              Unblock
            </Button>
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
                    placeholder="Maghanap..."
                    inputProps={{ 'aria-label': 'search farms' }}
                    value={searchInput}
                    onChange={handleSearchInputChange}
                  />
                </Box>
              </Box>
              <Box >
                <DataGrid
                  getRowId={getRowId}
                  rows={filteredUsersRow}
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
          <Button variant='contained' onClick={registerAccount} autoFocus>
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
          Deleting registration
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Let Google help apps determine location. This means sending anonymous
            location data to Google, even when no apps are running.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button variant='contained' color="error" onClick={deleteAccount} autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
};
