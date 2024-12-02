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
  Modal,
  Divider
} from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Grid from '@mui/material/Grid';
import { DataGrid } from '@mui/x-data-grid';
import { doc, updateDoc, deleteDoc, getDocs, where, query, collection, getDoc } from 'firebase/firestore';
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

import { address } from 'addresspinas';

const Access = ({ usersRow }) => {
  const [rowModesModel, setRowModesModel] = useState({});
  const [confirm, setConfirm] = useState(false);
  const [del, setDel] = useState(false);
  const [clicked, setClicked] = useState({});
  const [searchInput, setSearchInput] = useState('');
  const [userRow, setUserRow] = useState(usersRow);
  const [search, setSearch] = useState('');
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [viewedUser, setViewedUser] = useState({});


  const [mun, setMun] = useState([]);
  const [brgy, setBrgy] = useState(null);
  const [munCode, setMunCode] = useState(null)
  const [barangays, setBarangays] = useState([]);

  const result = (address.getCityMunOfProvince('0516')).cityAndMun;

  // useEffect(() => {
  //   const fetchMunicipalities = () => {
  //     const result = address.getCityMunOfProvince('0516');
  //     setMun(result.cityAndMun)
  //     result && console.log("city and mun", result.cityAndMun)
  //   }

  //   fetchMunicipalities();
  // }, []);


  useEffect(() => {
    if (munCode) {
      const result = address.getBarangaysOfCityMun(munCode);
      setBarangays(result.barangays || []);
    } else {
      setBarangays([]);
    }
  }, [munCode]);


  const handleMun = (event) => {
    setMunCode(event.target.value);
    setBrgy(null);
  };

  const handleBrgy = (event) => {
    setBrgy(event.target.value);
  };


  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  useEffect(() => {
    const filteredUser = usersRow.filter((user) => {
      console.log("munnn", mun);
      const matchesMunicipality = mun.length !== 0
        ? user.mun.toString().toLowerCase() === mun[0].name.toString().toLowerCase()
        : true;
      const matchesBarangay = brgy
        ? user.brgy && user.brgy.toString().toLowerCase() === brgy.toString().toLowerCase()
        : true;
      const matchesSearch = user.displayName.toLowerCase().includes(search.toLowerCase());
      return matchesMunicipality && matchesBarangay && matchesSearch;
    });

    console.log('Filtered Users:', filteredUser);
    setUserRow(filteredUser);
  }, [search, usersRow, munCode, brgy]);



  const handleClose = () => {
    setViewModalOpen(false);
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
    handleClose();
    handleCloseDialog();
    refreshUsers();
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
    handleClose();
    refreshUsers();
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
    handleClose();
    refreshUsers();
  };

  const registerAccount = async () => {
    const userDocRef = doc(db, 'users', viewedUser.uid);
    const { email, password, mun, brgy } = viewedUser;
    const newAuth = getAuth();

    try {
      const existingUsersQuery = query(
        collection(db, 'users'),
        where('mun', '==', mun),
        where('brgy', '==', brgy),
        where('status', '==', 'active')
      );

      const existingUsersSnapshot = await getDocs(existingUsersQuery);

      if (!existingUsersSnapshot.empty) {
        const disableUserPromises = existingUsersSnapshot.docs.map((docSnapshot) => {
          const userRef = docSnapshot.ref;
          return updateDoc(userRef, { status: 'blocked' });
        });

        await Promise.all(disableUserPromises);
      }

      const userCredential = await createUserWithEmailAndPassword(newAuth, email, password);
      await updateDoc(userDocRef, {
        status: 'active',
        id: userCredential.user.uid,
      });

      console.log('User successfully registered and previous users disabled');
    } catch (error) {
      console.error('Error registering new user:', error);
    }

    handleClose();
    handleCloseDialog();
    refreshUsers();
  };
  const refreshUsers = async () => {
    const updatedUsers = await getDocs(collection(db, 'users'));
    setUserRow(updatedUsers.docs.map((doc) => doc.data()));
  };


  // const registerAccount = async () => {
  //   const userDocRef = doc(db, 'users', viewedUser.uid);
  //   const { email, password } = viewedUser;
  //   const newAuth = getAuth();
  //   try {
  //     const userCredential = await createUserWithEmailAndPassword(
  //       newAuth,
  //       email,
  //       password
  //     );
  //     await updateDoc(userDocRef, {
  //       status: 'active',
  //       id: userCredential.user.uid,
  //     });
  //   } catch (error) {
  //     console.error('Error updating document:', error);
  //   }
  //   handleClose()
  //   handleCloseDialog()
  // };

  // const municipalities = [
  //   { name: 'Lahat', value: '' },
  //   { name: 'Basud', value: 'BASUD' },
  //   { name: 'Capalonga', value: 'CAPALONGA' },
  //   { name: 'Daet', value: 'DAET (Capital)' },
  //   { name: 'Jose Panganiban', value: 'JOSE PANGANIBAN' },
  //   { name: 'Labo', value: 'LABO' },
  //   { name: 'Mercedes', value: 'MERCEDES' },
  //   { name: 'Paracale', value: 'PARACALE' },
  //   { name: 'San Lorenzo Ruiz', value: 'SAN LORENZO RUIZ' },
  //   { name: 'San Vicente', value: 'SAN VICENTE' },
  //   { name: 'Santa Elena', value: 'SANTA ELENA' },
  //   { name: 'Talisay', value: 'TALISAY' },
  //   { name: 'Vinzons', value: 'VINZONS' },
  // ];



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
          {`${params.row.lastname}, ${params.row.firstname} `}
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
          padding: 3,
          borderRadius: 4,
          height: '100%',
          overflow: 'auto',
          flexDirection: 'hidden',
        }}
      >
        
          <h1 style={{ color: '#000' }}>Barangay Extensionist Workers</h1>
          <Divider sx={{ borderBottomWidth: 2, mb:2 }} />
        <Grid container spacing={2} alignItems="stretch">
          <Grid item lg={12} md={12} sm={12} xs={12}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                gap: 2,
              }}
            >
              {/* Filters and Search */}
              <Box sx={{ width: '30%' }}>
                <FormControl fullWidth size="small">
                  <InputLabel shrink={true} id="demo-simple-select-label">
                    Municipality
                  </InputLabel>
                  <Select
                    labelId="municipality-select-label"
                    label="Municipality"
                    value={munCode || ''}
                    onChange={(e) => {
                      setMunCode(e.target.value);
                      setMun(result.filter((m) => m.mun_code === e.target.value));
                      setBrgy('');
                    }}
                    displayEmpty
                    MenuProps={{
                      PaperProps: {
                        sx: {
                          maxHeight: 300,
                          overflowY: 'auto',
                        },
                      },
                    }}
                  >
                    <MenuItem value="">
                      <em>All</em>
                    </MenuItem>
                    {result?.map((munItem) => (
                      <MenuItem key={munItem.mun_code} value={munItem.mun_code}>
                        {munItem.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>

              <Box sx={{ width: '30%' }}>
                <FormControl fullWidth size="small">
                  <InputLabel id="demo-simple-select-label">Barangay</InputLabel>
                  <Select
                    labelId="barangay-select-label"
                    value={brgy || ''}
                    onChange={(e) => setBrgy(e.target.value)}
                    displayEmpty
                    disabled={!munCode}
                    MenuProps={{
                      PaperProps: {
                        sx: {
                          maxHeight: 300,
                          overflowY: 'auto',
                        },
                      },
                    }}
                  >
                    <MenuItem value="">
                    </MenuItem>
                    {barangays?.map((barangay, index) => (
                      <MenuItem key={index} value={barangay.name}>
                        {barangay.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
              <Box sx={{ flex: '1 1 auto' }}>
                <FormControl fullWidth size="small">
                  <OutlinedInput
                    id="outlined-adornment-amount"
                    placeholder="Search..."
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
            </Box>
          </Grid>
          <Grid item lg={12} md={12} sm={12} xs={12}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                flexGrow: 1,
                overflow: 'hidden', 
              }}
            >
              <Box
                sx={{
                  maxHeight: '70vh',
                  height: '100%',
                  borderRadius: 2,
                  boxShadow: 2,
                  backgroundColor: '#fff',
                  overflow: 'auto'
                }}
              >
                <DataGrid
                  getRowId={getRowId}
                  rows={userRow}
                  columns={columns}
                  initialState={{
                    sorting: {
                      sortModel: [{ field: 'name', sort: 'asc' }],
                    },
                  }}
                  editMode="row"
                  rowModesModel={rowModesModel}
                  pageSizeOptions={[25, 50, 100]}
                  disableRowSelectionOnClick
                  sx={{
                    ...datagridStyle,
                    border: 'none',
                    backgroundColor: '#fff'
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
          display: 'flex',
          position: 'absolute',
          top: '50%', flexDirection: 'column',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          bgcolor: 'background.paper',
          borderRadius: '5px',
          boxShadow: 24,
          p: 4,
          width: { xs: '50%', md: '70%' },
          maxHeight: '90vh',
          overflowY: 'auto'
        }}>
          <Grid container spacing={4} sx={{ display: 'flex', width: '100%' }}>
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
                  alignItems: 'center',
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
                    <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 1 }}>
                      <Button color='success' variant='contained' onClick={() => {
                        setConfirm(true)
                        setViewedUser(viewedUser)
                      }}>
                        Accept
                      </Button>
                      <Button color='error' variant='outlined' onClick={() => {
                        setDel(true)
                        setViewedUser(viewedUser)
                      }}>
                        Delete
                      </Button>
                    </Box>
                  )}
                  {viewedUser.status === 'active' && (
                    <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 1 }}>
                      <Button color='warning' variant='contained' onClick={() => {
                        blockAccount(viewedUser)
                      }}>
                        Blocked Account
                      </Button>
                      <Button color='error' variant='outlined' onClick={() => {
                        setDel(true)
                        setViewedUser(viewedUser)
                      }}>
                        Delete
                      </Button>
                    </Box>
                  )}
                  {viewedUser.status === 'blocked' && (
                    <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 1 }}>
                      <Button color='success' variant='contained' onClick={() => {
                        unblockAccount(viewedUser)
                      }}>
                        Unblocked Account
                      </Button>
                      <Button color='error' variant='outlined' onClick={() => {
                        setDel(true)
                        setViewedUser(viewedUser)
                      }}>
                        Delete
                      </Button>
                    </Box>
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
                    fullWidth
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
                    fullWidth
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
