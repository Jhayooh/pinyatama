// import * as React from 'react';
// import { Box, Button } from '@mui/material';
// import Typography from '@mui/material/Typography';


// //icon
// import CircularProgress from '@mui/material/CircularProgress';


// function GridView({ marker, index, setShowFarmTabs, setIndFarm, setIndUser , imageUrls}) {

//   function dateFormatter(date) {
//     const d = new Date(date.toMillis())
//     return d.toLocaleDateString()
//   }

//   return (
//     <Box key={index} sx={{ width: 'calc(30% - 8px)', boxShadow: 3, borderRadius: 0 , padding:3}}>
//       <Box sx={{ paddingY: 2, paddingTop: 0 }}>
//         <div className="image-holder" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 5 }}>
//           {imageUrls[marker.id] ? (
//             <img className='img' src={imageUrls[marker.id]} alt={marker.title} />
//           ) : (
//             <img src={require('../image_src/Pineapple.jfif')} className='img' />
//             //<CircularProgress color='success' />
            
//           )}
//         </div>
//         <div >
//         <Typography gutterBottom variant="h5" component="div">
//            {marker.title}
//          </Typography>
//          <Typography variant="body2" color="text.secondary">
//            {marker.brgy}, {marker.mun}
//          </Typography>
//          <Typography variant="body2" color="text.secondary">
//            Date of Planting: {dateFormatter(marker.start_date)}
//          </Typography>
//          <Typography variant="body2" color="text.secondary">
//            Date of expected Harvest: {dateFormatter(marker.harvest_date)}
//          </Typography>
//         </div>
//         <div style={{ display: 'flex', justifyContent: 'flex-end', paddingRight: 10 }}>
//           <Button variant="contained" color="success" onClick={() => {
//             setShowFarmTabs(true)
//             setIndFarm(marker.id)
//             setIndUser(marker.brgyUID)
//           }}>
//             Iba pang Impormasyon</Button>
//         </div>
//       </Box>
//     </Box>

//   );
// }
// export default GridView;




import * as React from 'react';
import {
  Button,
  Box,
  Paper,
  Typography,
  Divider
} from '@mui/material';


//icon
import CircularProgress from '@mui/material/CircularProgress';


function GridView({ marker, index, setShowFarmTabs, setIndFarm, setIndUser, imageUrls }) {

  function dateFormatter(date) {
    const d = new Date(date.toMillis())
    return d.toLocaleDateString()
  }

  return (
    <Box key={index} sx={{ width: 'calc(30% - 8px)', paddingBottom:5}}>
      <Paper elevation={3} sx={{ padding:2 }} onClick={() => {
            setShowFarmTabs(true)
            setIndFarm(marker.id)
            setIndUser(marker.brgyUID)
          }}>
        <div className="image-holder" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 5 }}>
          {imageUrls[marker.id] ? (
            <img className='img' src={imageUrls[marker.id]} alt={marker.title} />
          ) : (
            <img src={require('../image_src/Pineapple.jfif')} className='img' />
            // <CircularProgress color='success' />
          )}
        </div>
        <Divider />
        <Typography gutterBottom variant="h5" component="div" sx={{color:'orange', mt:2}}>
          {marker.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {marker.brgy}, {marker.mun}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Date of Planting: {dateFormatter(marker.start_date)}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Date of expected Harvest: {dateFormatter(marker.harvest_date)}
        </Typography>
        {/* <div style={{ display: 'flex', justifyContent: 'flex-end', paddingRight: 10 }}>
          <Button size="small" sx={{color:'green'}} onClick={() => {
            setShowFarmTabs(true)
            setIndFarm(marker.id)
            setIndUser(marker.brgyUID)
          }}>
            Iba pang Impormasyon
          </Button>
        </div> */}
      </Paper>
    </Box>


  );
}
export default GridView;
