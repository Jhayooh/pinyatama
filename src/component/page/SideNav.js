import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import React, { useEffect, useState } from 'react';
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

//

import { Button, CircularProgress } from '@mui/material';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import Access from './Access';
import Geoloc from './GeoLoc';


import pineapple from '../image_src/pineapple.json';



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
      // Sign-out successful.
    }).catch((error) => {
      // An error happened.
    });
  }
  console.log("eventsssss:", events);
  return (
    
    <Box sx={{ display: 'flex', height: '100vh', width: 1, position: 'fixed' }}>
      {/* <CssBaseline /> */}
      {/* <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <Header />
        </Toolbar>
      </AppBar> */}
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, backgroundColor: bgColor, border: 'none', display: 'flex', flexDirection: 'column' },
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
          {/* <ListItem disablePadding onClick={() => setSelected('particular')}>

              <ListItemButton>
                <ListItemIcon sx={{ minWidth: '35px' }}>
                   <InboxIcon />
                </ListItemIcon>
                <ListItemText primary='Logout' sx={{ color: '#fff' }} />
              </ListItemButton>
            </ListItem> */}
        </List>
        <Box sx={{ alignItems: 'center', display: 'flex', flex: 1, pb: 1.5, justifyContent: 'center', flexDirection: 'column' , }}>
          {/* <Button variant="contained" onClick={uploadPineapple}>Upload baby</Button> */}
          <Button variant="contained" onClick={handleSignOut} sx={{backgroundColor:'orange'}}>Log out </Button>
        </Box>
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
          {selected === 'dashboard' && <AdminHome setSelected={setSelected} farms={farms} events={events} users={users} roi={roi}/>}
          {selected === 'particular' && particularRow ? <ProductPrices particularData={particularRow} /> : <></>}
          {selected === 'timeline' && <Timeline farms={farms} events={events} />}
          {selected === 'access' && usersRow ? <Access usersRow={usersRow} /> : <></>}
          {selected === 'Geo' && <Geoloc />}
          {selected === 'Farms' && <Farms farms={farms} events={events} roi={roi} users={users} />}
        </Box>
      }
    </Box>
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