import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Box, Button, IconButton, TextField, Modal, FormControl, InputLabel, Input } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const columns = [
  { id: 'id', label: 'ID', minWidth: 170 },
  { id: 'name', label: 'Name', minWidth: 100 },
  {
    id: 'price',
    label: 'Price',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },

  {
    id: 'actions',
    label: 'Action',
    minWidth: 160,
    align: 'center',
  }
];

function createData(id, name, price) {
 
  return { id, name, price};
}

const initialRows = [
  createData('001', 'Seeds', 0.50 ),

];

export default function StickyHeadTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', code: '', population: '', size: '' });
  const [rows, setRows] = React.useState(initialRows);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };
  

  const handleFormChange = (event) => {
    const { id, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [id]: value,
    }));
  };

  const handleSubmit = () => {
    const newRow = createData(formData.name, formData.code, parseFloat(formData.population), parseFloat(formData.size));
    setRows([...initialRows, newRow]);
    handleClose();
  };

  const filteredRows = rows.filter((row) =>
    row.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <Box sx={{  width: 1, display: 'flex', justifyContent: 'space-between', p: 2, height: 80}}>
        <TextField
          label="Search"
          variant="outlined"
          value={searchQuery}
          onChange={handleSearchChange}
          sx={{ maxWidth: 400 }}
        />
        <Button variant="contained" color="primary" sx={{maxWidth: 210}}  onClick={handleOpen}>
          Add Data
        </Button>
      </Box>
      <TableContainer sx={{ maxHeight: 490 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredRows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {columns.map((column) => {
                      if (column.id === 'actions') {
                        return (
                          <TableCell key={column.id} align="center" sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
                            <IconButton sx={{ height: 32, width: 32 }}>
                              <EditIcon />
                            </IconButton>
                            <IconButton sx={{ height: 32, width: 32 }}>
                              <DeleteIcon />
                            </IconButton>
                          </TableCell>
                        );
                      } else {
                        const value = row[column.id];
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.format && typeof value === 'number'
                              ? column.format(value)
                              : value}
                          </TableCell>
                        );
                      }
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
          }}
        >
          <FormControl>
            <div>
              <InputLabel htmlFor="name">ID</InputLabel>
              <Input id="name" aria-describedby="name-helper-text" value={formData.name} onChange={handleFormChange} />
            </div>
            <br></br>
          </FormControl>
          <FormControl>
            <div>
              <InputLabel htmlFor="code">Name</InputLabel>
              <Input id="code" aria-describedby="code-helper-text" value={formData.code} onChange={handleFormChange} />
            </div>
            <br></br>
          </FormControl>
          <FormControl>
            <div>
              <InputLabel htmlFor="population">Price</InputLabel>
              <Input id="population" aria-describedby="population-helper-text" value={formData.population} onChange={handleFormChange} />
            </div>
            <br></br>
          </FormControl>
          
          <Button onClick={handleSubmit}>Submit</Button>
        </Box>
      </Modal>
    </>
  );
}
