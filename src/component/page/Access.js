import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Tooltip,
  OutlinedInput,
  Select,
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  TextField,
  Typography,
  Modal
} from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Grid from '@mui/material/Grid';
import { DataGrid } from '@mui/x-data-grid';
import { doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db, auth } from '../../firebase/Config';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import SearchIcon from '@mui/icons-material/Search';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import LockIcon from '@mui/icons-material/LockOutlined';
import UnlockIcon from '@mui/icons-material/LockOpenOutlined';
import moment from 'moment';
import { styled } from '@mui/material/styles';
import Badge from '@mui/material/Badge';

const Access = ({ usersRow }) => {
  const [rowModesModel, setRowModesModel] = useState({});
  const [confirm, setConfirm] = useState(false);
  const [del, setDel] = useState(false);
  const [clicked, setClicked] = useState({});
  const [searchInput, setSearchInput] = useState('');
  const [userRow, setUserRow] = useState(usersRow);
  const [mun, setMun] = useState('');
  const [search, setSearch] = useState('');
  const [viewModalOpen, setViewModalOpen] = useState(false); // State for View modal
  const [viewedUser, setViewedUser] = useState({}); // State to store the user for View modal

  const handleMun = (event) => {
    setMun(event.target.value);
  };

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  const handleClose = () => {
    setViewModalOpen(false); // Close View modal
  };

  const handleCloseDialog = () => {
    setConfirm(false);
    setDel(false);
  };

  const deleteAccount = async () => {
    const userDocRef = doc(db, 'users', viewedUser.uid);
    try {
      await deleteDoc(userDocRef);
      // deletin din ang profile url sa storage
    } catch (e) {
      console.log('error deleting document:', e);
    }
    handleClose()
    handleCloseDialog()
  };

  const blockAccount = async (row) => {
    console.log('clickeddddddd', row.uid);
    const userDocRef = doc(db, 'users', row.uid);
    try {
      await updateDoc(userDocRef, {
        status: 'blocked',
      });
      // deletin din ang profile url sa storage
    } catch (e) {
      console.log('error blocking document:', e);
    }
    handleClose()
  };

  const unblockAccount = async (row) => {
    const userDocRef = doc(db, 'users', row.uid);
    try {
      await updateDoc(userDocRef, {
        status: 'active',
      });
      // deletin din ang profile url sa storage
    } catch (e) {
      console.log('error unblocking document:', e);
    }
    handleClose()
  };

  const registerAccount = async () => {
    const userDocRef = doc(db, 'users', viewedUser.uid);
    const { email, password } = viewedUser;
    const newAuth = getAuth();
    try {
      const userCredential = await createUserWithEmailAndPassword(
        newAuth,
        email,
        password
      );
      await updateDoc(userDocRef, {
        status: 'active',
        id: userCredential.user.uid,
      });
    } catch (error) {
      console.error('Error updating document:', error);
    }
    handleClose()
    handleCloseDialog()
  };

  const municipalities = [
    { name: 'Lahat', value: '' },
    { name: 'Basud', value: 'BASUD' },
    { name: 'Capalonga', value: 'CAPALONGA' },
    { name: 'Daet', value: 'DAET (Capital)' },
    { name: 'Jose Panganiban', value: 'JOSE PANGANIBAN' },
    { name: 'Labo', value: 'LABO' },
    { name: 'Mercedes', value: 'MERCEDES' },
    { name: 'Paracale', value: 'PARACALE' },
    { name: 'San Lorenzo Ruiz', value: 'SAN LORENZO RUIZ' },
    { name: 'San Vicente', value: 'SAN VICENTE' },
    { name: 'Santa Elena', value: 'SANTA ELENA' },
    { name: 'Talisay', value: 'TALISAY' },
    { name: 'Vinzons', value: 'VINZONS' },
  ];
  const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
      backgroundColor: '#44b700',
      color: '#44b700',
      boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
      '&::after': {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        borderRadius: '50%',
        animation: 'ripple 1.2s infinite ease-in-out',
        border: '1px solid currentColor',
        content: '""',
      },
    },
    '@keyframes ripple': {
      '0%': {
        transform: 'scale(.8)',
        opacity: 1,
      },
      '100%': {
        transform: 'scale(2.4)',
        opacity: 0,
      },
    },
  }));
  const [columns, setColumns] = useState([
    {
      field: 'fullname',
      headerName: 'Pangalan',
      renderCell: (params) => (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Avatar src={params.row.photoURL} alt="Profile" sx={{}} />
          {`${params.row.firstname}, ${params.row.lastname}`}
        </Box>
      ),
      flex: 1,
    },
    {
      field: 'address',
      headerName: 'Address',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      flex: 1,
      valueGetter: (value) => {
        return `${value.row.brgy || ''}, ${value.row.mun || ''}`;
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
        <span
          style={{
            color:
              params.row.status === 'active'
                ? 'green'
                : params.row.status === 'pending'
                  ? 'orange'
                  : 'red',
          }}
        >
          {params.row.status}
        </span>
      ),
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      flex: 1,
      cellClassName: 'actions',
      editable: false,
      getActions: ({ id, row }) => {
        if (!row) return null;
        return [
          <Tooltip title="View Details">
            <Button
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
              onClick={() => {
                setViewedUser(row);
                setViewModalOpen(true);

              }}
            >
              View
            </Button>
          </Tooltip>,
        ];
      },
    },
  ]);

  function getRowId(row) {
    return row?.uid;
  }

  useEffect(() => {
    const filteredUser = usersRow.filter((user) => {
      const matchesSearch = user.displayName
        .toLowerCase()
        .includes(search.toLowerCase());
      const matchesMunicipality = mun ? user.mun === mun : true;
      return matchesSearch && matchesMunicipality;
    });
    setUserRow(filteredUser);
  }, [search, usersRow, mun]);

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

  return (
    <>
      <Box
        sx={{
          backgroundColor: '#f9fafb',
          padding: 4,
          borderRadius: 4,
          height: '100%',
        }}
      >
        <Grid container spacing={4} alignItems="stretch">
          <Grid item lg={12} md={12} sm={12} xs={12}>
            <Box
              sx={{
                boxShadow: 1,
                borderRadius: 3,
                backgroundColor: '#fff',
                width: 1,
                marginBottom: 2,
                padding: 2,
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  gap: 2,
                }}
              >
                <Box sx={{ flex: '1 1 auto' }}>
                  <FormControl fullWidth size="small">
                    <OutlinedInput
                      id="outlined-adornment-amount"
                      placeholder="Maghanap..."
                      startAdornment={
                        <InputAdornment position="start">
                          <SearchIcon />
                        </InputAdornment>
                      }
                      value={search}
                      onChange={handleSearch}
                    />
                  </FormControl>
                </Box>
                <Box sx={{ minWidth: 300 }}>
                  <FormControl fullWidth size="small">
                    <InputLabel id="demo-simple-select-label">
                      Municipality
                    </InputLabel>
                    <Select
                      sx={{ border: 'none' }}
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={mun}
                      label="Municipality"
                      onChange={handleMun}
                    >
                      {municipalities.map((municipality) => (
                        <MenuItem key={municipality.value} value={municipality.value}>
                          {municipality.name}
                        </MenuItem>
                      ))}
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
                  sx={{
                    ...datagridStyle,
                    border: 'none',
                    paddingX: 2,
                    overflowX: 'auto',
                    height: `calc(100% - 8px)`,
                    backgroundColor: '#fff',
                    paddingTop: 1
                  }}
                  getRowClassName={(getRowId) =>
                    getRowId.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd'
                  }
                  hideFooter
                />
              </Box>
            </Box>
          </Grid>

        </Grid>
      </Box>
      {/* View User Modal */}
      <Modal
        open={viewModalOpen}
        onClose={handleClose}>
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          bgcolor: 'background.paper',
          borderRadius: '5px',
          boxShadow: 24,
          p: 4,
          width: '50%',
        }}>
          <Grid container spacing={4} >
            <Grid item xs={4} >
              <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
                justifyContent: 'space-between',
                height: '100%',
              }}>
                {/* Avatar and Status */}
                <Box sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',  // Center horizontally
                  gap: 2,
                }}>
                  <Avatar src={viewedUser.photoURL} alt="Profile" variant="rounded" sx={{ width: "100%", height: "80%" }} />
                  <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2 }}>
                    <Typography variant='button'>Status:</Typography>
                    {viewedUser.status === 'pending' && (
                      <Typography variant='button' sx={{ color: 'orange' }}>Pending</Typography>
                    )}
                    {viewedUser.status === 'active' && (
                      <Typography variant='button' sx={{ color: 'green' }}>Active</Typography>
                    )}
                    {viewedUser.status === 'blocked' && (
                      <Typography variant='button' sx={{ color: 'red' }}>Blocked</Typography>
                    )}
                  </Box>
                </Box>

                {/* Buttons at bottom corner */}
                <Box sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-end',
                  gap: 1,
                  // marginBottom: 2,  
                }}>
                  {viewedUser.status === 'pending' && (
                    <Box sx={{ display: 'flex', flexDirection: 'row', gap: 1 }}>
                      <Button color='success' variant='contained' onClick={() => {
                        setConfirm(true)
                        setViewedUser(viewedUser)
                      }}>
                        Accept
                      </Button>
                      <Button color='error' variant='contained' onClick={() => {
                        setDel(true)
                        setViewedUser(viewedUser)
                      }}>
                        Reject
                      </Button>
                    </Box>
                  )}
                  {viewedUser.status === 'active' && (
                    <Button color='error' variant='contained' onClick={() => {
                      blockAccount(viewedUser)
                    }}>
                      Blocked Account
                    </Button>
                  )}
                  {viewedUser.status === 'blocked' && (
                    <Button color='success' variant='contained' onClick={() => {
                      unblockAccount(viewedUser)
                    }}>
                      Unblocked Account
                    </Button>
                  )}
                </Box>
              </Box>

            </Grid>
            <Grid item xs={8}>
              <Typography variant='h6' gutterBottom sx={{ color: '#58AC58', }}>Extensionist Details</Typography>
              <Box sx={{ flexDirection: 'row', display: 'flex', gap: 1 }}>
                <Box sx={{ flexDirection: 'column', display: 'flex' }}>
                  <Typography variant='button'>Firstname:</Typography>
                  <TextField
                    id="filled-read-only-input"
                    defaultValue={viewedUser.firstname}
                    InputProps={{
                      readOnly: true,
                    }}
                    variant="filled"
                  />
                </Box>
                <Box sx={{ flexDirection: 'column', display: 'flex' }}>
                  <Typography variant='button'>Lastname:</Typography>
                  <TextField
                    id="filled-read-only-input"
                    defaultValue={viewedUser.lastname}
                    InputProps={{
                      readOnly: true,
                    }}
                    variant="filled"
                  />
                </Box>
              </Box>
              <Box sx={{ flexDirection: 'column', display: 'flex' }}>
                <Typography variant='button'>Address:</Typography>
                <TextField
                  id="filled-read-only-input"
                  defaultValue={`${viewedUser.brgy}, ${viewedUser.mun}`}
                  InputProps={{
                    readOnly: true,
                  }}
                  variant="filled"
                />
              </Box>
              <Box sx={{ flexDirection: 'column', display: 'flex' }}>
                <Typography variant='button'>Phone Number:</Typography>
                <TextField
                  id="filled-read-only-input"
                  defaultValue={viewedUser.phoneNumber}
                  InputProps={{
                    readOnly: true,
                  }}
                  variant="filled"
                />
              </Box>
              <Box sx={{ flexDirection: 'column', display: 'flex' }}>
                <Typography variant='button'>Email:</Typography>
                <TextField
                  id="filled-read-only-input"
                  defaultValue={viewedUser.email}
                  InputProps={{
                    readOnly: true,
                  }}
                  variant="filled"
                />
              </Box>
            </Grid>
          </Grid>

        </Box>

      </Modal >
      <Dialog
        open={confirm}
        onClose={handleCloseDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {`${viewedUser.firstname}, ${viewedUser.lastname}`}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Sigurado ka bang gusto mong tanggapin ang account na ito?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button color='success' variant='contained' onClick={registerAccount} autoFocus>
            Tanggapin
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={del}
        onClose={handleCloseDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {`${viewedUser.firstname}, ${viewedUser.lastname}`}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Sigurado ka bang gusto mong alisin ang account na ito?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button variant='contained' color="error" onClick={deleteAccount} autoFocus>
            Alisin
          </Button>
        </DialogActions>
      </Dialog>

    </>
  );
};

export default Access;
