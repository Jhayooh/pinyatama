import { useState } from 'react';
import {
  MaterialReactTable,
  useMaterialReactTable,
} from 'material-react-table';
import {
  Divider,
  Box,
  Button,
  TextField,
  IconButton,
  InputBase,
  Modal,
  CircularProgress,
  Alert
} from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {
  GridRowModes,
  DataGrid,
  GridToolbarContainer,
  GridActionsCellItem,
  GridRowEditStopReasons,
} from '@mui/x-data-grid'

// icons
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';
import CheckIcon from '@mui/icons-material/Check';
import moment from 'moment';

import { doc, updateDoc, deleteField } from 'firebase/firestore';
import { db, auth } from '../../firebase/Config';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth"

export default function Access({ usersRow }) {
  const [rowModesModel, setRowModesModel] = useState({});
  const [confirm, setConfirm] = useState(false)
  const [clicked, setClicked] = useState({})
  const [del, setDel] = useState(false)

  const handleClose = () => {
    setConfirm(false)
    setDel(false)
  }

  const deleteAccount = async () => {
    const userDocRef = doc(db, 'users', clicked.uid)
    try {
      await deleteDoc(userDocRef)
    } catch (e) {
      console.log('error deleting document:', e);
    }
  }

  const registerAccount = async () => {
    const userDocRef = doc(db, 'users', clicked.uid);
    const { email, password } = clicked
    console.log(clicked.email);
    console.log(clicked.password);
    const newAuth = getAuth()
    try {
      const userCredential = await createUserWithEmailAndPassword(newAuth, email, password);
      await updateDoc(userDocRef, {
        isRegistered: true
      })
    } catch (error) {
      console.error('Error updating document:', error);
    }
    handleClose()
  }

  const [columns, setColumns] = useState([
    {
      field: 'uid',
      headerName: 'ID',
      flex: 1,
    },
    {
      field: 'displayName',
      headerName: 'Name',
      flex: 1,
    },
    {
      field: 'email',
      headerName: 'Email',
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
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      flex: 1.5,
      cellClassName: 'actions',
      editable: false,
      getActions: ({ id, row }) => {
        return [
          <Button variant="contained" color="success" onClick={() => {
            setConfirm(true)
            setClicked(row)
          }}>Accept</Button>,
          <Button variant="contained" color="error" onClick={()=>{
            setDel(true)
            setClicked(row)
          }}>Delete</Button>
        ];
      },
    },
  ])

  function getRowId(row) {
    return row?.uid
  }

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
                    placeholder="Search Account"
                    inputProps={{ 'aria-label': 'search farms' }}
                  />
                </Box>

                <button className='btn-view-all'
                  onClick={() => null}
                >
                  Add Data
                </button>
              </Box>
              <Box >

                <DataGrid
                  getRowId={getRowId}
                  rows={usersRow}
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
            Let Google help apps determine location. This means sending anonymous
            location data to Google, even when no apps are running.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button variant='contained' onClick={registerAccount} autoFocus>
            Accept
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
