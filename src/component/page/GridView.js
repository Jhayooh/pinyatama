import React, { useState, useEffect } from 'react';
import {
  Button,
  Box,
  Paper,
  Typography,
  Divider,
  Grid,
  Avatar
} from '@mui/material';

//db

import { addDoc, collection, doc, orderBy, query, updateDoc, Timestamp } from "firebase/firestore";
import { db } from "../../firebase/Config";
import { useCollectionData } from "react-firebase-hooks/firestore";

//icon
import CircularProgress from '@mui/material/CircularProgress';

function GridView({ marker, index, setShowFarmTabs, setIndFarm, setIndUser, imageUrls, user }) {
  const [newUser, setNewUser] = useState({})
  const [label, setLabel] = useState(null)
  function dateFormatter(date) {
    const d = new Date(date.toMillis())
    return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
  }
  useEffect(() => {
    if (user.length === 0) return

    setNewUser(user[0])
  }, [user])

  const activityColl = collection(db, `farms/${marker.id}/activities`)
  const activityQuery = query(activityColl, orderBy('createdAt'))
  const [activities, activitiesLoading] = useCollectionData(activityQuery)

  useEffect(() => {
    if (!activities) return
    const act = activities.find(a => a.remarks === true)
    if (act) {
      console.log("labelll", act.label);
      setLabel(act.label)
    }
  }, [activities])


  const getRemark = () => {
    const label = activities?.find(a => a.remarks === true ? a.label : "Undipaynd")

  }

  getRemark()

  return (
    <Grid container sx={{ width: { xs: '100%', sm: `calc(100%/2)`, md: `calc(100%/3)`, lg: `calc(100%/4)`, xl: `calc(100%/5)` } }}>
      <Grid item xs={12} sm={12} md={12} lg={12} sx={{ p: 1.5 }}>
        <Box
          sx={{
            borderRadius: '20px',
            border: 2,
            borderColor: '#f9fafb', '&:hover': { borderColor: '#88c488' },
            cursor: 'pointer',
            height: '100%',
            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
            '&:hover': {
              transform: 'scale(1.05)',
              boxShadow: '0px 8px 15px rgba(0, 0, 0, 0.1)',
            },

          }}
          onClick={() => {
            setShowFarmTabs(true)
            setIndFarm(marker.id)
            setIndUser(marker.brgyUID)
          }} >
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            {imageUrls[marker.id] ? (
              <img className='img' src={imageUrls[marker.id]} alt={marker.title} />
            ) : (
              <img src={require('../image_src/p1.jpg')} className='img' />
            )}
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'row' }}>
            <Box sx={{ paddingLeft: .5 }}>
              {newUser && <Avatar src={newUser.photoURL} alt='Profile' sx={{ marginTop: 1, marginRight: 1, border: 0.1, borderColor: 'green' }} />}
            </Box>
            <Box>
              <Typography variant="overline" display="block" sx={{ color: 'green', fontSize: 15, fontWeight: 'bold', alignItems: 'center', fontFamily: 'monospace' }}>
                {marker.title}
              </Typography>
              <Box>
                <Typography variant="caption" display="block" color="text.secondary">
                  {marker.brgy}, {marker.mun}
                </Typography>
                <Typography variant="caption" display="block" color="text.secondary">
                  {dateFormatter(marker.start_date)} - {dateFormatter(marker.harvest_date)}
                </Typography>
                <Typography
                  variant="caption"
                  display="block"
                  color={marker.remarks ? (marker.remarks === 'failed' ? 'red' : 'orange') : 'green'}
                >
                  {marker.remarks ? `${marker.remarks.toUpperCase()}` : 'SUCCESS'}
                  {marker.remarks === 'failed' && label && ` due to ${label[0]}`}
                </Typography>

              </Box>
            </Box>
          </Box>
        </Box>
      </Grid>
    </Grid>

  );
}
export default GridView;
