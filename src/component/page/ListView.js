import React from 'react'
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Avatar from '@mui/material/Avatar';
import { Button, Grid, Box, } from '@mui/material';


// icon
import farm from '../image_src/pinyatamap-logo.png';

function ListView({ marker, index, setShowFarmTabs, setIndFarm, setIndUser, imageUrls }) {

  function dateFormatter(date) {
    const d = new Date(date.toMillis());
    const options = { year: 'numeric', month: 'long', day: '2-digit' };
    return d.toLocaleDateString('en-US', options);
  }
  
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));


  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">

          <TableBody key={index} onClick={() => {
            setShowFarmTabs(true)
            setIndFarm(marker.id)
            setIndUser(marker.brgyUID)
          }}>
            <StyledTableRow >
              <StyledTableCell component="th" scope="row">
                <div style={{ display: 'flex', alignItems: 'center', gap:2 }}>
                  <Avatar sx={{ backgroundColor: 'white' }}>
                    {imageUrls[marker.id] ? (
                      <img className='img' src={imageUrls[marker.id]} alt={marker.title} style={{ width: '100%', height: '100% ' }} />
                    ) : (
                      <img src={require('../image_src/p1.jpg')} className='img' style={{ width: '80%', height: '80% ' }} />
                    )}
                  </Avatar>
                  <span>{marker.title}</span>
                </div>
              </StyledTableCell>
              <StyledTableCell align="center">{marker.brgy}</StyledTableCell>
              <StyledTableCell align="right">{marker.mun}</StyledTableCell>
              <StyledTableCell align="right">{dateFormatter(marker.start_date)}</StyledTableCell>
              <StyledTableCell align="right">{dateFormatter(marker.harvest_date)}</StyledTableCell>
              <StyledTableCell align="right">{marker.CropStage}</StyledTableCell>
            </StyledTableRow>

          </TableBody>
        </Table>
      </TableContainer>


    </>
  )
}

export default ListView