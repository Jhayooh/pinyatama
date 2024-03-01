import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import Header from '../Header';
import AdminHome from './AdminHome';
import ProductPrices from '../ProductPrices';

const drawerWidth = 160;
const bgColor = '#247027'

export default function SideNav() {
  const [selected, setSelected] = useState('particular')

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
        <Toolbar />
        <Box sx={{
          pl: 1
        }}>
          <h5>This is the icon!</h5>
          <Divider />
          <List>
            <ListItem disablePadding onClick={() => setSelected('dashboard')} sx={selected === 'dashboard' ? styles.isSelected : styles.notSelected}>
              <ListItemButton>
                <ListItemIcon sx={{ minWidth: '35px' }}>
                  <InboxIcon />
                </ListItemIcon>
                <ListItemText primary='Dashboard' />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding onClick={() => setSelected('timeline')} sx={selected === 'timeline' ? styles.isSelected : styles.notSelected}>
              <ListItemButton>
                <ListItemIcon sx={{ minWidth: '35px' }}>
                  <InboxIcon />
                </ListItemIcon>
                <ListItemText primary='Timeline' />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding onClick={() => setSelected('particular')} sx={selected === 'particular' ? styles.isSelected : styles.notSelected}>
              <ListItemButton>
                <ListItemIcon sx={{ minWidth: '35px' }}>
                  <InboxIcon />
                </ListItemIcon>
                <ListItemText primary='Particulars' />
              </ListItemButton>
            </ListItem>
          </List>
          <Divider />
          <List >
            <ListItem disablePadding onClick={() => setSelected('dashboard')} >
              <ListItemButton>
                <ListItemIcon sx={{ minWidth: '35px' }}>
                  <InboxIcon />
                </ListItemIcon>
                <ListItemText primary='Access Requests' sx={{ color: '#fff' }} />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding onClick={() => setSelected('particular')}>
              <ListItemButton>
                <ListItemIcon sx={{ minWidth: '35px' }}>
                  <InboxIcon />
                </ListItemIcon>
                <ListItemText primary='Logout' sx={{ color: '#fff' }} />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </Drawer>
      <Box component="main" sx={{ flexBox: 1, p: 1.5, pl: 0, backgroundColor: bgColor, width: 1, overflow: 'hidden' }}>
          {selected === 'dashboard' && <AdminHome setSelected={setSelected} />}
          {selected === 'particular' && <ProductPrices />}
      </Box>
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