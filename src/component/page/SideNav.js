import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';
import React, { useState, useEffect } from 'react';
import ProductPrices from '../ProductPrices';
import Timeline from '../Timeline';
import AdminHome from './AdminHome';
// import { farms, events } from '../FarmsConstant';
import { db, auth } from '../../firebase/Config';
import { collection, getDocs } from 'firebase/firestore';

// icons
import DashboardIcon from '@mui/icons-material/Dashboard';
import logo from '../image_src/pinyatamap-logo.png';
import dashboard from '../image_src/dashboard.png'
import dashboardSelected from '../image_src/dashboardSelected.png'
import timelinepng from '../image_src/timeline.png'
import particularspng from '../image_src/particulars.png'
import particularspngSelected from '../image_src/particularsSelected.png'

import { useCollectionData } from 'react-firebase-hooks/firestore';
import { CircularProgress } from '@mui/material';
import Access from './Access'

const drawerWidth = 160;
const bgColor = '#22b14c'

export default function SideNav() {
  const [selected, setSelected] = useState('dashboard')

  const farmsRef = collection(db, '/farms')
  const [farms, loading, error] = useCollectionData(farmsRef)
  const [events, setEvents] = useState([])

  useEffect(() => {
    if (!farms) return; // Ensure farms data is loaded

    const fetchEvents = async () => {
      const eventsPromises = farms.map(async (farm) => {
        const eventsRef = collection(db, `farms/${farm.id}/events`); // Assuming farm.id is the ID of each farm
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

    fetchEvents();
  }, [farms]);

  console.log("farms: ", farms)
  console.log("events: ", events)

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
          [`& .MuiDrawer-paper`]: { width: drawerWidth, backgroundColor: bgColor, border: 'none' },
        }}
      >
        {/* <Toolbar /> */}
        <Box sx={{
          pl: 1
        }}>
          <Box sx={{ p: 2.4 }}>
            <img src={logo} alt='pinyatamap logo' />
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
          </List>
          <Divider />
          <List >
          <ListItem disablePadding onClick={() => setSelected('Access')} sx={selected === 'Access' ? styles.isSelected : styles.notSelected}>

              <ListItemButton>
                <ListItemIcon sx={{ minWidth: '35px' }}>
                  {/* <InboxIcon /> */}
                </ListItemIcon>
                <ListItemText primary='Access Requests' sx={{ color: '#fff' }} />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding onClick={() => setSelected('particular')}>
              <ListItemButton>
                <ListItemIcon sx={{ minWidth: '35px' }}>
                  {/* <InboxIcon /> */}
                </ListItemIcon>
                <ListItemText primary='Logout' sx={{ color: '#fff' }} />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </Drawer>
      {loading
        ?
        <Box component="main" sx={{ flexBox: 1, p: 1.5, pl: 0, backgroundColor: bgColor, width: 1, overflow: 'hidden', alignItems: 'center', justifyContent: 'center' }}>
          <Box sx={{ backgroundColor: '#f9fafb', padding: 4, borderRadius: 4, height: '100%', alignItems: 'center', justifyContent: 'center', display: 'flex' }}>
            <CircularProgress />
          </Box>
        </Box>
        :
        <Box component="main" sx={{ flexBox: 1, p: 1.5, pl: 0, backgroundColor: bgColor, width: 1, overflow: 'hidden' }}>
          {selected === 'dashboard' && <AdminHome setSelected={setSelected} />}
          {selected === 'particular' && <ProductPrices />}

          {selected === 'timeline' && <Timeline farms={farms} events={events} />}
          {selected === 'Access' && <Access/>}
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