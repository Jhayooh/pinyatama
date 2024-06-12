import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import { Modal } from '@mui/material';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import React, { useEffect, useState, useRef } from 'react';
import ProductPrices from '../ProductPrices';
import Timeline from '../Timeline';
import AdminHome from './AdminHome';
// import { farms, events } from '../FarmsConstant';
import { signOut } from 'firebase/auth';
import {
  Timestamp,
  addDoc,
  collection,
  getDocs,
  orderBy,
  query,
  updateDoc,
  where
} from 'firebase/firestore';
import { auth, db } from '../../firebase/Config';
import Farms from './Farms';
import useIdle from '../provider/IdleTimer'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

// icons
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
import LogoutIcon from '@mui/icons-material/Logout';
import InfoIcon from '@mui/icons-material/InfoOutlined';
//
import { Button, CircularProgress } from '@mui/material';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import Access from './Access';
import Geoloc from './GeoLoc';

import pineapple from '../image_src/pineapple.json';
import GridView from './GridView';
import ListView from './ListView';


const drawerWidth = 160;
const bgColor = 'green'

export default function SideNav() {
  const [selected, setSelected] = useState('dashboard')

  const farmsRef = collection(db, '/farms')
  const farmsQuery = query(farmsRef, orderBy("farmerName"))
  const [farms, loading, error] = useCollectionData(farmsQuery)
  const [events, setEvents] = useState([])
  const [roi, setRoi] = useState([])

  const userRef = collection(db, '/users')
  const userQuery = query(userRef)
  const [users] = useCollectionData(userQuery)

  const particularsRef = collection(db, '/particulars')
  const [particularRow, particularLoading, particularError] = useCollectionData(particularsRef)

  const usersRef = collection(db, '/users')
  // const usersQuery = query(usersRef, where("isRegistered", "==", false))
  const [usersRow, usersLoading, usersError] = useCollectionData(usersRef)
  console.log("usersRow", usersRow);
  const [modalIdle, setModalIdle] = useState(false)
  const [remainingTime, setRemainingTime] = useState(0)

  const handleClose = (event, reason) => {
    if (reason && reason === "backdropClick")
      return;
    setModalIdle(false)
  }

  const handleIdle = () => {
    setModalIdle(true); //show modal
    setRemainingTime(30); //set 15 seconds as time remaining
  };

  const { isIdle } = useIdle({ onIdle: handleIdle, idleTime: 30 });

  useEffect(() => {
    let interval;

    if (isIdle && modalIdle) {
      interval = setInterval(() => {
        setRemainingTime(
          (prevRemainingTime) =>
            prevRemainingTime > 0 ? prevRemainingTime - 1 : 0 //reduces the second by 1
        );
      }, 1000);
    }

    return () => {
      clearInterval(interval);
    };
  }, [isIdle, modalIdle]);

  useEffect(() => {
    if (remainingTime === 0 && modalIdle) {
      setModalIdle(false);
      handleSignOut()
    }
  }, [remainingTime, modalIdle]);

  function parseDate(rawDate, day) {
    const date = rawDate.split('-')
    const year = date[0]
    const month = date[1]
    const newDate = day + "-" + month + "-" + year
    return newDate
  }

  const uploadPineapple = async () => {
    try {
      for (const fdetail of pineapple) {
        const fRef = await addDoc(farmsRef, { ...fdetail, title: fdetail.farmerName });
        await updateDoc(fRef, { id: fRef.id });
        const eventsRef = collection(fRef, 'events')
        console.log("startDate:", fdetail.start_date);

        const vegetativeDate = new Date(Date.parse(fdetail.start_date));
        const floweringDate = new Date(vegetativeDate);
        floweringDate.setMonth(vegetativeDate.getMonth() + 10);
        const fruitingDate = new Date(floweringDate);
        fruitingDate.setMonth(floweringDate.getMonth() + 2);

        const harvestDate = new Date(Date.parse(parseDate(fdetail.harvest_date, floweringDate.getDate())));
        console.log('End Date:', harvestDate); // Log the end date

        const eRef_vegetative = await addDoc(eventsRef, {
          group: fRef.id,
          title: "Vegetative",
          className: "vegetative",
          start_time: Timestamp.fromDate(vegetativeDate),
          end_time: Timestamp.fromDate(floweringDate)
        });
        await updateDoc(eRef_vegetative, { id: eRef_vegetative.id })

        const eRef_flowering = await addDoc(eventsRef, {
          group: fRef.id,
          title: "Flowering",
          className: "flowering",
          start_time: Timestamp.fromDate(floweringDate),
          end_time: Timestamp.fromDate(fruitingDate)
        })
        await updateDoc(eRef_flowering, { id: eRef_flowering.id })

        const eRef_fruiting = await addDoc(eventsRef, {
          group: fRef.id,
          title: "Fruiting",
          className: "fruiting",
          start_time: Timestamp.fromDate(fruitingDate),
          end_time: Timestamp.fromDate(harvestDate)
        })
        await updateDoc(eRef_fruiting, { id: eRef_fruiting.id })

      }
      alert('SUCCESSFUL ANG PAGUPLOAD PADI')
    } catch (error) {
      console.error("Error uploading pineapple: ", error);
    }
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
        console.log("roi data", roiData);
        return roiData;
      });
      const allRoi = await Promise.all(roiPromises);
      setRoi(allRoi.flat());
    };
    fetchRoi()
    fetchEvents();
  }, [farms]);

  const handleSignOut = () => {
    signOut(auth).then(() => {
      handleClose()
      // Sign-out successful.
    }).catch((error) => {
      // An error happened.
    });
  }
  console.log("eventsssss:", events);

  //Logout
  const [logoutModalDisplay, setLogoutModalDisplay] = useState(false);
  const modalRef = useRef(null);

  const openLogoutModal = () => {
    setLogoutModalDisplay(true);
  };
  const closeLogoutMdal = () => {
    setLogoutModalDisplay(false);
  };

  //Reloading page
  const handleReload = () => {
    window.location.reload();
  };

  return (
    <>
      <Box sx={{ display: 'flex', height: '100vh', width: 1, position: 'fixed', overflowY:'auto' ,}}>
        <Drawer
          variant="permanent"
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: 
            { width: drawerWidth, 
              backgroundColor: bgColor,
               border: 'none', 
               display: 'flex', 
               flexDirection: 'column' },
          }}
        >
          {/* <Toolbar /> */}
          <Box sx={{ p: 2.4 }}>
            <img src={logo} alt='pinyatamap logo' width='100%' />
          </Box>
          <Divider />
          <List>
            <ListItem disablePadding onClick={() => setSelected('dashboard')} sx={selected === 'dashboard' ? styles.isSelected : styles.notSelected}>
              <ListItemButton>
                <ListItemIcon sx={{ minWidth: 24, mr: 1.1 }}>
                  <img src={selected === 'dashboard' ? dashboardSelected : dashboard} style={{ width: 24 }} />
                </ListItemIcon>
                <ListItemText primary='Dashboard' />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding onClick={() => setSelected('timeline')} sx={selected === 'timeline' ? styles.isSelected : styles.notSelected}>
              <ListItemButton>
                <ListItemIcon sx={{ minWidth: 24, mr: 1.1 }}>
                  {/* <InboxIcon /> */}
                  <img src={timelinepng} alt='timeline' style={{ width: 24 }} />
                </ListItemIcon>
                <ListItemText primary='Timeline' />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding onClick={() => setSelected('particular')} sx={selected === 'particular' ? styles.isSelected : styles.notSelected}>
              <ListItemButton>
                <ListItemIcon sx={{ minWidth: 24, mr: 1.1 }}>
                  {/* <InboxIcon /> */}
                  <img src={selected === 'particular' ? particularspngSelected : particularspng} style={{ width: 24 }} />
                </ListItemIcon>
                <ListItemText primary='Particulars' />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding onClick={() => setSelected('access')} sx={selected === 'access' ? styles.isSelected : styles.notSelected}>
              <ListItemButton>
                <ListItemIcon sx={{ minWidth: 24, mr: 1.1 }}>
                  <img src={selected === 'access' ? accessSelected : access} style={{ width: 24 }} />
                </ListItemIcon>
                <ListItemText primary='Accounts' />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding onClick={() => setSelected('Farms')} sx={selected === 'Farms' ? styles.isSelected : styles.notSelected}>
              <ListItemButton>
                <ListItemIcon sx={{ minWidth: 24, mr: 1.1 }}>
                  <img src={selected === 'Farms' ? farmSelected : farm} style={{ width: 24 }} />
                </ListItemIcon>
                <ListItemText primary='Farms' />
              </ListItemButton>
            </ListItem>
            <div style={{marginTop:'80%'}}>
            <ListItem disablePadding onClick={openLogoutModal} sx={selected === 'Logout' ? styles.isSelected : styles.notSelected}>
              <ListItemButton>
                <ListItemIcon sx={{ minWidth: 24, mr: 1.1 }}>
                  <LogoutIcon style={{ width: 24, color: 'orange' }} />
                </ListItemIcon>
                <ListItemText primary='Logout' />
              </ListItemButton>
            </ListItem>
            </div>
          </List>
          <Modal
            open={logoutModalDisplay}
            onClose={closeLogoutMdal}
          >
            <Box sx={{
              position: 'fixed',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              zIndex: '9999',
              backgroundColor: 'white',
              padding: '20px',
              borderRadius: '10px',
              boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',


            }}>
              <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',

              }}>
                <InfoIcon sx={{ color: 'red', width: '25%', height: '25%', alignItems: 'center' }} />
                <h5 style={{ alignItems: 'center', padding: 5 }}>Are you sure you want to Logout?</h5>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}>
                <Button
                  variant="contained" color='success'
                  style={{ flexDirection: 'column' }}
                  onClick={handleSignOut}
                >
                  Proceed
                </Button>
                <Button
                  variant="outlined"
                  style={{ flexDirection: 'column', marginLeft: 5 }}
                  onClick={closeLogoutMdal}
                >
                  Cancel
                </Button>
              </Box>
              </Box>

          </Modal>
          {/* <Box sx={{ alignItems: 'center', display: 'flex', flex: 1, pb: 1.5, justifyContent: 'center', flexDirection: 'column', }}>
            <Button variant="contained" onClick={handleSignOut} sx={{ backgroundColor: 'orange' }}>Log out </Button>
          </Box> */}
        </Drawer>
        {loading && particularLoading && usersLoading
          ?
          <Box component="main" sx={{ flexBox: 1, p: 1.5, pl: 0, backgroundColor: bgColor, width: 1, overflow: 'hidden', alignItems: 'center', justifyContent: 'center' }}>
            <Box sx={{ backgroundColor: '#f9fafb', padding: 4, borderRadius: 4, height: '100%', alignItems: 'center', justifyContent: 'center', display: 'flex' }}>
              <CircularProgress />
            </Box>
          </Box>
          :
          <Box component="main" sx={{ flexBox: 1, p: 1.5, pl: 0, backgroundColor: bgColor, width: 1, overflow: 'hidden' }}>
            {selected === 'dashboard' && <AdminHome setSelected={setSelected} farms={farms} events={events} users={users} roi={roi} />}
            {selected === 'particular' && particularRow ? <ProductPrices particularData={particularRow} /> : <></>}
            {selected === 'timeline' && <Timeline farms={farms} events={events} users={users} setSelected={setSelected}/>}
            {/* {selected === 'timeline' && <ListView />} */}
            {selected === 'access' && usersRow ? <Access usersRow={usersRow} /> : <></>}
            {selected === 'Geo' && <Geoloc />}
            {selected === 'Farms' && <Farms farms={farms} events={events} roi={roi} users={users} />}
          </Box>
        }
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
}