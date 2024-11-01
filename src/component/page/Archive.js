import { Box, Button, Modal } from '@mui/material'
import React, { useState } from 'react'

// icon
import ArchiveIcon from '@mui/icons-material/ArchiveOutlined';
import Farms from './Farms';

const Archive = ({ events, farms, users, particularData, pineapple }) => {
  const [open, setOpen] = useState(false)

  const handleClose = () => {
    // setOpen(!open)
  }

  return (
    <>
      <Button variant='text' color='warning' onClick={handleClose}><ArchiveIcon />Archive</Button>
      <Modal
        keepMounted
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          <Farms farms={farms.filter(f=>f.cropStage.toLowerCase() === 'complete')} events={events} users={users} particularData={particularData} pineapple={pineapple}/>
        </Box>

      </Modal>
    </>
  )
}

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: `calc(80%)`,
  height: `calc(88%)`,
  boxShadow: 24,
};

export default Archive