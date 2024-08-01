// import Box from '@mui/material/Box';
// import Divider from '@mui/material/Divider';
// import { Modal } from '@mui/material';
// import Drawer from '@mui/material/Drawer';
// import List from '@mui/material/List';
// import ListItem from '@mui/material/ListItem';
// import ListItemButton from '@mui/material/ListItemButton';
// import ListItemIcon from '@mui/material/ListItemIcon';
// import ListItemText from '@mui/material/ListItemText';
// import React, { useEffect, useState, useRef } from 'react';
// import ProductPrices from '../ProductPrices';
// import Timeline from '../Timeline';
// import AdminHome from './AdminHome';
// // import { farms, events } from '../FarmsConstant';
// import { signOut } from 'firebase/auth';
// import {
//   Timestamp,
//   addDoc,
//   collection,
//   doc,
//   getDocs,
//   orderBy,
//   query,
//   updateDoc,
//   where
// } from 'firebase/firestore';
// import { auth, db } from '../../firebase/Config';
// import Farms from './Farms';
// import useIdle from '../provider/IdleTimer'
// import Dialog from '@mui/material/Dialog';
// import DialogActions from '@mui/material/DialogActions';
// import DialogContent from '@mui/material/DialogContent';
// import DialogContentText from '@mui/material/DialogContentText';
// import DialogTitle from '@mui/material/DialogTitle';

// // icons
// import access from '../image_src/access.png';
// import accessSelected from '../image_src/accessSelected.png';
// import dashboard from '../image_src/dashboard.png';
// import dashboardSelected from '../image_src/dashboardSelected.png';
// import farm from '../image_src/farm.png';
// import farmSelected from '../image_src/farmSelected.png';
// import particularspng from '../image_src/particulars.png';
// import particularspngSelected from '../image_src/particularsSelected.png';
// import logo from '../image_src/pinyatamap-logo.png';
// import timelinepng from '../image_src/timeline.png';
// import LogoutIcon from '@mui/icons-material/Logout';
// import InfoIcon from '@mui/icons-material/InfoOutlined';
// import CloseIcon from '@mui/icons-material/CloseOutlined';

// //
// import { Button, CircularProgress } from '@mui/material';
// import { useCollectionData } from 'react-firebase-hooks/firestore';
// import Access from './Access';
// import Geoloc from './GeoLoc';

// const drawerWidth = 160;
// const bgColor = 'green'

// export default function SideNav() {
//   const [selected, setSelected] = useState('dashboard')

//   const farmsRef = collection(db, '/farms')
//   const farmsQuery = query(farmsRef, orderBy("farmerName"))
//   const [farms, loading, error] = useCollectionData(farmsQuery)
//   const [events, setEvents] = useState([])
//   const [roi, setRoi] = useState([])

//   useEffect(() => {
//     const fetchAndUpdateFarms = async () => {
//       if (!farms) {
//         return;
//       }

//       for (const farm of farms) {
//         const farmEventsColl = collection(db, `/farms/${farm.id}/events`);
//         const farmEventsSnapshot = await getDocs(farmEventsColl);
//         const farmEvents = farmEventsSnapshot.docs.map(doc => doc.data());
//         const farmStage = farm.cropStage

//         const cropstage = new Date();
//         let newCropstage = '';

//         farmStage ? console.log('farmer name', farmStage) : console.log("no farmEvvents", farmStage);

//         const vegetativePhase = farmEvents.find(marker => marker.className.toLowerCase() === 'vegetative');
//         const floweringPhase = farmEvents.find(marker => marker.className.toLowerCase() === 'flowering');
//         const fruitingPhase = farmEvents.find(marker => marker.className.toLowerCase() === 'fruiting');

//         if (vegetativePhase && cropstage >= vegetativePhase.start_time.toDate() && cropstage <= vegetativePhase.end_time.toDate()) {
//           newCropstage = 'vegetative';
//         } else if (floweringPhase && cropstage >= floweringPhase.start_time.toDate() && cropstage <= floweringPhase.end_time.toDate()) {
//           newCropstage = 'flowering';
//         } else if (fruitingPhase && cropstage >= fruitingPhase.start_time.toDate() && cropstage <= fruitingPhase.end_time.toDate()) {
//           newCropstage = 'fruiting';
//         } else {
//           newCropstage = 'complete';
//         }

//         if (farmStage.toLowerCase() != newCropstage.toLowerCase()) {
//           await updateDoc(doc(db, `/farms/${farm.id}`), {
//             cropStage: newCropstage,
//           });
//         }
//       }
//     };

//     fetchAndUpdateFarms();
//   }, [farms]);

//   const userRef = collection(db, '/users')
//   const userQuery = query(userRef)
//   const [users] = useCollectionData(userQuery)

//   const farmerRef = collection(db, '/farmer')
//   const [farmerRow, farmerLoading] = useCollectionData(farmerRef)

//   const particularsRef = collection(db, '/particulars')
//   const [particularRow, particularLoading] = useCollectionData(particularsRef)

//   const pineappleRef = collection(db, '/pineapple')
//   const [pineappleData, pineappleLoading, pineappleError] = useCollectionData(pineappleRef)

//   const usersRef = collection(db, '/users')
//   const [usersRow, usersLoading, usersError] = useCollectionData(usersRef)
//   const [modalIdle, setModalIdle] = useState(false)
//   const [remainingTime, setRemainingTime] = useState(0)

//   const handleClose = (event, reason) => {
//     if (reason && reason === "backdropClick")
//       return;
//     setModalIdle(false)
//   }

//   const handleIdle = () => {
//     setModalIdle(true); //show modal
//     setRemainingTime(30); //set 15 seconds as time remaining
//   };

//   const { isIdle } = useIdle({ onIdle: handleIdle, idleTime: 30 });

//   useEffect(() => {
//     let interval;

//     if (isIdle && modalIdle) {
//       interval = setInterval(() => {
//         setRemainingTime(
//           (prevRemainingTime) =>
//             prevRemainingTime > 0 ? prevRemainingTime - 1 : 0 //reduces the second by 1
//         );
//       }, 1000);
//     }

//     return () => {
//       clearInterval(interval);
//     };
//   }, [isIdle, modalIdle]);

//   useEffect(() => {
//     if (remainingTime === 0 && modalIdle) {
//       // alert("Time out!");
//       setModalIdle(false);
//       handleSignOut()
//     }
//   }, [remainingTime, modalIdle]);

//   function parseDate(rawDate, day) {
//     const date = rawDate.split('-')
//     const year = date[0]
//     const month = date[1]
//     const newDate = day + "-" + month + "-" + year
//     return newDate
//   }

//   useEffect(() => {
//     if (!farms) return; // Ensure farms data is loaded

//     const fetchEvents = async () => {
//       const eventsPromises = farms.map(async (farm) => {
//         const eventsRef = collection(db, `farms/${farm.id}/events`);
//         const eventsSnapshot = await getDocs(eventsRef);
//         const eventsData = eventsSnapshot.docs.map((doc) => ({
//           ...doc.data(),
//           start_time: doc.data().start_time.toMillis(),
//           end_time: doc.data().end_time.toMillis()
//         }));
//         return eventsData;
//       });
//       const allEvents = await Promise.all(eventsPromises);
//       setEvents(allEvents.flat());
//     };

//     const fetchRoi = async () => {
//       const roiPromises = farms.map(async (farm) => {
//         const roiRef = collection(db, `farms/${farm.id}/roi`);
//         const roiSnapshot = await getDocs(roiRef);
//         const roiData = roiSnapshot.docs.map((doc) => ({
//           ...doc.data()
//         }))
//         return roiData;
//       });
//       const allRoi = await Promise.all(roiPromises);
//       setRoi(allRoi.flat());
//     };
//     fetchRoi()
//     fetchEvents();
//   }, [farms]);

//   const handleSignOut = () => {
//     signOut(auth).then(() => {
//       handleClose()
//       // Sign-out successful.
//     }).catch((error) => {
//       // An error happened.
//     });
//   }

//   //Logout
//   const [logoutModalDisplay, setLogoutModalDisplay] = useState(false);
//   const modalRef = useRef(null);

//   const openLogoutModal = () => {
//     setLogoutModalDisplay(true);
//   };
//   const closeLogoutMdal = () => {
//     setLogoutModalDisplay(false);
//   };

//   //Reloading page
//   const handleReload = () => {
//     window.location.reload();
//   };

//   return (
//     <>
//       <Box sx={{ display: 'flex', height: '100vh', width: 1, position: 'fixed', overflowY: 'auto', }}>
//         <Drawer
//           variant="permanent"
//           sx={{
//             width: drawerWidth,
//             flexShrink: 0,
//             [`& .MuiDrawer-paper`]:
//             {
//               width: drawerWidth,
//               backgroundColor: bgColor,
//               border: 'none',
//               display: 'flex',
//               flexDirection: 'column'
//             },
//           }}
//         >
//        

//           <Box sx={{ p: 2.4 }}>
//             <img src={logo} alt='pinyatamap logo' width='100%' />
//           </Box>
//           <Divider />
//           <List>
//             <ListItem disablePadding onClick={() => setSelected('dashboard')} sx={selected === 'dashboard' ? styles.isSelected : styles.notSelected}>
//               <ListItemButton>
//                 <ListItemIcon sx={{ minWidth: 24, mr: 1.1 }}>
//                   <img src={selected === 'dashboard' ? dashboardSelected : dashboard} style={{ width: 24 }} />
//                 </ListItemIcon>
//                 <ListItemText primary='Dashboard' />
//               </ListItemButton>
//             </ListItem>
//             <ListItem disablePadding onClick={() => setSelected('timeline')} sx={selected === 'timeline' ? styles.isSelected : styles.notSelected}>
//               <ListItemButton>
//                 <ListItemIcon sx={{ minWidth: 24, mr: 1.1 }}>
//                   {/* <InboxIcon /> */}
//                   <img src={timelinepng} alt='timeline' style={{ width: 24 }} />
//                 </ListItemIcon>
//                 <ListItemText primary='Timeline' />
//               </ListItemButton>
//             </ListItem>
//             <ListItem disablePadding onClick={() => setSelected('particular')} sx={selected === 'particular' ? styles.isSelected : styles.notSelected}>
//               <ListItemButton>
//                 <ListItemIcon sx={{ minWidth: 24, mr: 1.1 }}>
//                   {/* <InboxIcon /> */}
//                   <img src={selected === 'particular' ? particularspngSelected : particularspng} style={{ width: 24 }} />
//                 </ListItemIcon>
//                 <ListItemText primary='Particulars' />
//               </ListItemButton>
//             </ListItem>
//             <ListItem disablePadding onClick={() => setSelected('access')} sx={selected === 'access' ? styles.isSelected : styles.notSelected}>
//               <ListItemButton>
//                 <ListItemIcon sx={{ minWidth: 24, mr: 1.1 }}>
//                   <img src={selected === 'access' ? accessSelected : access} style={{ width: 24 }} />
//                 </ListItemIcon>
//                 <ListItemText primary='Accounts' />
//               </ListItemButton>
//             </ListItem>
//             <ListItem disablePadding onClick={() => setSelected('Farms')} sx={selected === 'Farms' ? styles.isSelected : styles.notSelected}>
//               <ListItemButton>
//                 <ListItemIcon sx={{ minWidth: 24, mr: 1.1 }}>
//                   <img src={selected === 'Farms' ? farmSelected : farm} style={{ width: 24 }} />
//                 </ListItemIcon>
//                 <ListItemText primary='Farms' />
//               </ListItemButton>
//             </ListItem>
//             <div style={{ marginTop: '80%' }}>
//               <ListItem disablePadding onClick={openLogoutModal} sx={selected === 'Logout' ? styles.isSelected : styles.notSelected}>
//                 <ListItemButton>
//                   <ListItemIcon sx={{ minWidth: 24, mr: 1.1 }}>
//                     <LogoutIcon style={{ width: 24, color: 'orange' }} />
//                   </ListItemIcon>
//                   <ListItemText primary='Logout' />
//                 </ListItemButton>
//               </ListItem>
//             </div>
//           </List>
//           <Dialog
//             open={logoutModalDisplay}
//             onClose={closeLogoutMdal}
//             aria-labelledby="alert-dialog-title"
//             aria-describedby="alert-dialog-description"
//           >
//             <DialogTitle id="alert-dialog-title">
//               {"Logout"}
//             </DialogTitle>
//             <DialogContent>
//               <DialogContentText id="alert-dialog-description">
//                Are you sure you want to signout from this account?
//               </DialogContentText>
//             </DialogContent>
//             <DialogActions>
//               <Button variant='text' color='error' onClick={ closeLogoutMdal}>Cancel</Button>
//               <Button  variant='contained' color='success' onClick={handleSignOut} autoFocus>
//                 Ok
//               </Button>
//             </DialogActions>
//           </Dialog>

//           {/* <Box sx={{ alignItems: 'center', display: 'flex', flex: 1, pb: 1.5, justifyContent: 'center', flexDirection: 'column', }}>
//             <Button variant="contained" onClick={handleSignOut} sx={{ backgroundColor: 'orange' }}>Log out </Button>
//           </Box> */}
//         </Drawer>
//         {
//           loading && particularLoading && usersLoading && pineappleLoading
//             ?
//             <Box component="main" sx={{ flexBox: 1, p: 1.5, pl: 0, backgroundColor: bgColor, width: 1, overflow: 'hidden', alignItems: 'center', justifyContent: 'center' }}>
//               <Box sx={{ backgroundColor: '#f9fafb', padding: 4, borderRadius: 4, height: '100%', alignItems: 'center', justifyContent: 'center', display: 'flex' }}>
//                 <CircularProgress />
//               </Box>
//             </Box>
//             :
//             <Box component="main" sx={{ flexBox: 1, p: 1.5, pl: 0, backgroundColor: bgColor, width: 1, overflow: 'hidden' }}>
//               {selected === 'dashboard' && <AdminHome setSelected={setSelected} farms={farms} events={events} users={users} roi={roi} farmer={farmerRow} pineappleData={pineappleData}/>}
//               {selected === 'Farms' && particularRow && pineappleData ? <Farms farms={farms} events={events} roi={roi} users={users} particularData={particularRow} pineapple={pineappleData} /> : <></>}
//               {selected === 'particular' && particularRow && pineappleData ? <ProductPrices particularData={particularRow} pineappleData={pineappleData} /> : <></>}
//               {selected === 'timeline' && <Timeline farms={farms} events={events} users={users} setSelected={setSelected} />}
//               {selected === 'access' && usersRow ? <Access usersRow={usersRow} /> : <></>}
//               {selected === 'Geo' && <Geoloc />}
//             </Box>
//         }
//       </Box >
//       <Dialog
//         open={modalIdle}
//         onClose={handleClose}
//         aria-labelledby="alert-dialog-title"
//         aria-describedby="alert-dialog-description"
//         maxWidth="sm"
//       >
//         <DialogTitle sx={{ backgroundColor: 'green', color: 'white' }} id="alert-dialog-title">
//           Session Time Out
//         </DialogTitle>
//         <DialogContent dividers>
//           <DialogContentText id="alert-dialog-description">
//             You are about to be logged out due to inactivity. {`(${remainingTime})`}
//           </DialogContentText>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleClose}>Cancel</Button>
//           <Button variant='contained' color="error" onClick={handleSignOut} autoFocus>
//             Continue
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </>
//   );
// }

// const styles = {
//   isSelected: {
//     backgroundColor: '#fff',
//     borderTopLeftRadius: 24,
//     borderBottomLeftRadius: 24,
//     color: '#000'
//   },
//   notSelected: {
//     color: '#fff'
//   }
// }

import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import { useState, useEffect, useRef } from 'react';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import LogoutIcon from '@mui/icons-material/Logout';
import { Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { signOut } from 'firebase/auth';
import { auth, db } from '../../firebase/Config';
import { collection, doc, getDocs, orderBy, query, updateDoc } from 'firebase/firestore';
import access from '../image_src/access.png';
import accessSelected from '../image_src/accessSelected.png';
import dashboard from '../image_src/dashboard.png';
import dashboardSelected from '../image_src/dashboardSelected.png';
import farm from '../image_src/farm.png';
import farmSelected from '../image_src/farmSelected.png';
import particularspng from '../image_src/particulars.png';
import particularspngSelected from '../image_src/particularsSelected.png';
import logo from '../image_src/pinyatamap-logo.png';
import timelinepng from '../image_src/timeline.png';
import AdminHome from './AdminHome';
import Timeline from '../Timeline';
import ProductPrices from '../ProductPrices';
import Farms from './Farms';
import Access from './Access';
import Geoloc from './GeoLoc';
import useIdle from '../provider/IdleTimer';

const drawerWidth = 240;
const bgColor = 'green';

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-start',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    "& .MuiDrawer-paper": { borderWidth: 0 },
    // whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    height: '100vh',

    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

export default function SideNav() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [selected, setSelected] = React.useState('dashboard');
  const [logoutModalDisplay, setLogoutModalDisplay] = React.useState(false);
  // const [modalIdle, setModalIdle] = React.useState(false);
  // const [remainingTime, setRemainingTime] = React.useState(0);

  const farmsRef = collection(db, '/farms');
  const farmsQuery = query(farmsRef, orderBy("farmerName"));
  const [farms, loading, error] = useCollectionData(farmsQuery);
  const [events, setEvents] = React.useState([]);
  const [roi, setRoi] = React.useState([]);
  const userRef = collection(db, '/users')
  const userQuery = query(userRef)
  const [users] = useCollectionData(userQuery)

  const farmerRef = collection(db, '/farmer')
  const [farmerRow, farmerLoading] = useCollectionData(farmerRef)

  const particularsRef = collection(db, '/particulars')
  const [particularRow, particularLoading] = useCollectionData(particularsRef)

  const pineappleRef = collection(db, '/pineapple')
  const [pineappleData, pineappleLoading, pineappleError] = useCollectionData(pineappleRef)

  const usersRef = collection(db, '/users')
  const [usersRow, usersLoading, usersError] = useCollectionData(usersRef)
  const [modalIdle, setModalIdle] = useState(false)
  const [remainingTime, setRemainingTime] = useState(0)

  const handleDrawerOpen = () => {
    setOpen(prevState => !prevState);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const openLogoutModal = () => {
    setLogoutModalDisplay(true);
  };

  const closeLogoutModal = () => {
    setLogoutModalDisplay(false);
  };

  const handleSignOut = () => {
    signOut(auth).then(() => {
      closeLogoutModal();
    }).catch((error) => {
      // Handle error
    });
  };

  const handleClose = (event, reason) => {
    if (reason && reason === "backdropClick")
      return;
    setModalIdle(false)
  }

  const handleIdle = () => {
    setModalIdle(true);
    setRemainingTime(30);
  };

  const { isIdle } = useIdle({ onIdle: handleIdle, idleTime: 30 });

  React.useEffect(() => {
    let interval;

    if (isIdle && modalIdle) {
      interval = setInterval(() => {
        setRemainingTime(
          (prevRemainingTime) =>
            prevRemainingTime > 0 ? prevRemainingTime - 1 : 0
        );
      }, 1000);
    }

    return () => {
      clearInterval(interval);
    };
  }, [isIdle, modalIdle]);

  React.useEffect(() => {
    if (remainingTime === 0 && modalIdle) {
      setModalIdle(false);
      handleSignOut()
    }
  }, [remainingTime, modalIdle]);


  useEffect(() => {
    const fetchAndUpdateFarms = async () => {
      if (!farms) {
        return;
      }

      for (const farm of farms) {
        const farmEventsColl = collection(db, `/farms/${farm.id}/events`);
        const farmEventsSnapshot = await getDocs(farmEventsColl);
        const farmEvents = farmEventsSnapshot.docs.map(doc => doc.data());
        const farmStage = farm.cropStage

        const cropstage = new Date();
        let newCropstage = '';

        farmStage ? console.log('farmer name', farmStage) : console.log("no farmEvvents", farmStage);

        const vegetativePhase = farmEvents.find(marker => marker.className.toLowerCase() === 'vegetative');
        const floweringPhase = farmEvents.find(marker => marker.className.toLowerCase() === 'flowering');
        const fruitingPhase = farmEvents.find(marker => marker.className.toLowerCase() === 'fruiting');

        if (vegetativePhase && cropstage >= vegetativePhase.start_time.toDate() && cropstage <= vegetativePhase.end_time.toDate()) {
          newCropstage = 'vegetative';
        } else if (floweringPhase && cropstage >= floweringPhase.start_time.toDate() && cropstage <= floweringPhase.end_time.toDate()) {
          newCropstage = 'flowering';
        } else if (fruitingPhase && cropstage >= fruitingPhase.start_time.toDate() && cropstage <= fruitingPhase.end_time.toDate()) {
          newCropstage = 'fruiting';
        } else {
          newCropstage = 'complete';
        }

        if (farmStage.toLowerCase() != newCropstage.toLowerCase()) {
          await updateDoc(doc(db, `/farms/${farm.id}`), {
            cropStage: newCropstage,
          });
        }
      }
    };

    fetchAndUpdateFarms();
  }, [farms]);

  function parseDate(rawDate, day) {
    const date = rawDate.split('-')
    const year = date[0]
    const month = date[1]
    const newDate = day + "-" + month + "-" + year
    return newDate
  }

  useEffect(() => {
    if (!farms) return; // Ensure farms data is loaded

    const fetchEvents = async () => {
      const eventsPromises = farms.map(async (farm) => {
        const eventsRef = collection(db, `farms/${farm.id}/events`);
        const eventsSnapshot = await getDocs(eventsRef);
        const eventsData = eventsSnapshot.docs.map((doc) => ({
          ...doc.data(),
          start_time: doc.data().start_time.toMillis(),
          end_time: doc.data().end_time.toMillis()
        }));
        return eventsData;
      });
      const allEvents = await Promise.all(eventsPromises);
      setEvents(allEvents.flat());
    };

    const fetchRoi = async () => {
      const roiPromises = farms.map(async (farm) => {
        const roiRef = collection(db, `farms/${farm.id}/roi`);
        const roiSnapshot = await getDocs(roiRef);
        const roiData = roiSnapshot.docs.map((doc) => ({
          ...doc.data()
        }))
        return roiData;
      });
      const allRoi = await Promise.all(roiPromises);
      setRoi(allRoi.flat());
    };
    fetchRoi()
    fetchEvents();
  }, [farms]);



  //Logout

  const modalRef = useRef(null);

  // 
  const closeLogoutMdal = () => {
    setLogoutModalDisplay(false);
  };

  //Reloading page
  const handleReload = () => {
    window.location.reload();
  };



  return (
    <>
      <Box sx={{ display: 'flex', height: '100%', width: 1, position: 'fixed', overflowY: 'hidden', }}>
        {/* <CssBaseline /> */}
        {/* <AppBar position="fixed" open={open} sx={{ backgroundColor: '#fff' }}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{
                marginRight: 5,
                ...(open && { display: 'none' }),
              }}
            >
              <MenuIcon sx={{ color: 'green' }} />
            </IconButton>
            <img src={require('../image_src/pinyatamap-logo.png')} width={50} height={50} marginLeft />
            <Typography
              variant="h6"
              noWrap
              component="a"
              // href="#app-bar-with-responsive-menu"
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'green',
                textDecoration: 'none',
              }}
              style={{ marginLeft: '10px' }}
            >
              QUEEN PINEAPPLE FARMING
            </Typography>
          </Toolbar>
        </AppBar> */}
        <Drawer variant="permanent" open={open} elevation={0} hideBackdrop={true} sx={{ height: '100vh' , "& .MuiDrawer-paper": { borderWidth: 0 }}}>
          <DrawerHeader sx={{ backgroundColor: 'green' }}>
            <IconButton onClick={handleDrawerOpen}>
              <MenuIcon sx={{ color: '#fff' }} />

            </IconButton>
            <Typography
              variant="h6"
              noWrap
              component="a"
              // href="#app-bar-with-responsive-menu"
              sx={{
                mr: 2,
                display: 'flex',
                fontFamily: 'monospace',
                fontWeight: 700,
                // letterSpacing: '.3rem',
                color: 'orange',
                textDecoration: 'none',
                opacity: open ? 1 : 0,
              }}
              style={{ marginLeft: '10px' }}
            >
              QP FARMING
            </Typography>
          </DrawerHeader>
          {/* <Divider /> */}
          <List sx={{ backgroundColor: 'green', flexGrow: 1 }}>
            <Box sx={{ p: 2.4, display: open ? 'flex' : 'none', alignItems: 'center', justifyContent: 'center' }}>
              <img src={logo} alt='pinyatamap logo' width='50%' />
            </Box>
            <ListItem disablePadding onClick={() => setSelected('dashboard')} sx={selected === 'dashboard' ? styles.isSelected : styles.notSelected}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  <img src={selected === 'dashboard' ? dashboardSelected : dashboard} style={{ width: 24 }} />
                </ListItemIcon>
                <ListItemText primary='Dashboard' sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding onClick={() => setSelected('timeline')} sx={selected === 'timeline' ? styles.isSelected : styles.notSelected}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  <img src={timelinepng} alt='timeline' style={{ width: 24 }} />
                </ListItemIcon>
                <ListItemText primary='Timeline' sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding onClick={() => setSelected('particular')} sx={selected === 'particular' ? styles.isSelected : styles.notSelected}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  <img src={selected === 'particular' ? particularspngSelected : particularspng} style={{ width: 24 }} />
                </ListItemIcon>
                <ListItemText primary='Particulars' sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding onClick={() => setSelected('access')} sx={selected === 'access' ? styles.isSelected : styles.notSelected}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  <img src={selected === 'access' ? accessSelected : access} style={{ width: 24 }} />
                </ListItemIcon>
                <ListItemText primary='Accounts' sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding onClick={() => setSelected('Farms')} sx={selected === 'Farms' ? styles.isSelected : styles.notSelected}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  <img src={selected === 'Farms' ? farmSelected : farm} style={{ width: 24 }} />
                </ListItemIcon>
                <ListItemText primary='Farms' sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
            <Box sx={{ flexGrow: 0 , 
              //marginTop: open ? '50%' : '100%', display: open ? 'flex' : 'none', justifyContent:'flex-end', alignItems:'flex-end'
              }}>
              <ListItem disablePadding onClick={openLogoutModal} sx={selected === 'Logout' ? styles.isSelected : styles.notSelected}>
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? 'initial' : 'center',
                    px: 2.5,

                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : 'auto',
                      justifyContent: 'center',
                    }}
                  >
                    <LogoutIcon style={{ width: 24, color: 'orange' }} />
                  </ListItemIcon>
                  <ListItemText primary='Logout' sx={{ opacity: open ? 1 : 0 }} />
                </ListItemButton>
              </ListItem>
            </Box>
          </List>
          <Dialog
            open={logoutModalDisplay}
            onClose={closeLogoutModal}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {"Logout"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Are you sure you want to sign out from this account?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button variant='text' color='error' onClick={closeLogoutModal}>Cancel</Button>
              <Button variant='contained' color='success' onClick={handleSignOut} autoFocus>
                Ok
              </Button>
            </DialogActions>
          </Dialog>
        </Drawer>
        {/* <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <DrawerHeader /> */}
        {
          loading
            ? (
              <Box component="main" sx={{ flexBox: 1, p: 1.5, pl: 0, backgroundColor: bgColor, width: 1, overflow: 'hidden', alignItems: 'center', justifyContent: 'center' }}>
                <Box sx={{ backgroundColor: '#f9fafb', padding: 4, borderRadius: 4, height: '100%', alignItems: 'center', justifyContent: 'center', display: 'flex' }}>
                  <CircularProgress />
                </Box>
              </Box>
            )
            : (
              <>
                <Box component="main" sx={{ flexBox: 1, p: 1.5, pl: 0, width: 1, overflow: 'hidden', backgroundColor: 'green' }}>
                  {selected === 'dashboard' && <AdminHome setSelected={setSelected} farms={farms} events={events} users={users} roi={roi} farmer={farmerRow} pineappleData={pineappleData} />}
                  {selected === 'Farms' && particularRow && pineappleData ? <Farms farms={farms} events={events} roi={roi} users={users} particularData={particularRow} pineapple={pineappleData} /> : <></>}
                  {selected === 'particular' && particularRow && pineappleData ? <ProductPrices particularData={particularRow} pineappleData={pineappleData} /> : <></>}
                  {selected === 'timeline' && <Timeline farms={farms} events={events} users={users} setSelected={setSelected} />}
                  {selected === 'access' && usersRow ? <Access usersRow={usersRow} /> : <></>}
                  {selected === 'Geo' && <Geoloc />}
                </Box>
              </>
            )
        }
        {/* </Box> */}

      </Box>
      <Dialog
        open={modalIdle}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth="sm"
      >
        <DialogTitle sx={{ backgroundColor: 'green', color: 'white' }} id="alert-dialog-title">
          Session Time Out
        </DialogTitle>
        <DialogContent dividers>
          <DialogContentText id="alert-dialog-description">
            You are about to be logged out due to inactivity. {`(${remainingTime})`}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button variant='contained' color="error" onClick={handleSignOut} autoFocus>
            Continue
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

const styles = {
  isSelected: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 24,
    borderBottomLeftRadius: 24,
    color: '#000'
  },
  notSelected: {
    color: '#fff'
  }
};
