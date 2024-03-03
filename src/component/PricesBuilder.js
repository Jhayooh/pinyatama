import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Box, Button, IconButton, TextField, Modal, FormControl, InputLabel, Input } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const columns = [
  { id: 'id', label: 'id', minWidth: 170 },
  { id: 'name', label: 'name', minWidth: 100 },
  {
    id: 'price',
    label: 'price',
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

let currentId = 0;

function createData(name, price) {
  currentId += 1;
  return { id: currentId, name, price };
}

const initialRows = [
  createData('Seeds', 0.50 ),
];

export default function StickyHeadTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [formData, setFormData] = useState({ name: '', price: '' });
  const [editId, setEditId] = useState(null);
  const [rows, setRows] = React.useState(initialRows);

  const handleOpenAdd = () => {
    setFormData({ name: '', price: '' }); 
    setOpenAdd(true);
  };

  const handleCloseAdd = () => {
    setOpenAdd(false);
  };

  const handleOpenEdit = (id) => {
    const rowToEdit = rows.find((row) => row.id === id);
    setFormData({ name: rowToEdit.name, price: rowToEdit.price });
    setEditId(id);
    setOpenEdit(true);
  };

  const handleCloseEdit = () => {
    setOpenEdit(false);
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
  
  const handleEdit = () => {
    const updatedRows = rows.map((row) => {
      if (row.id === editId) {
        return { ...row, ...formData };
      }
      return row;
    });
    setRows(updatedRows);
    setOpenEdit(false);
  };
  
  const handleDelete = (id) => {
    setRows(prevRows => prevRows.filter(row => row.id !== id));
  };

  const handleFormChange = (event) => {
    const { id, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [id]: value,
    }));
  };

  const handleSubmit = () => {
    const newRow = createData(formData.name, parseFloat(formData.price));
    setRows([...rows, newRow]);
    setOpenAdd(false);
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
        <Button variant="contained" color="primary" sx={{maxWidth: 210}}  onClick={handleOpenAdd}>
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
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                    {columns.map((column) => {
                      if (column.id === 'actions') {
                        return (
                          <TableCell key={column.id} align="center" sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
                            <IconButton onClick={() => handleOpenEdit(row.id)} sx={{ height: 32, width: 32 }}>
                              <EditIcon />
                            </IconButton>
                            <IconButton onClick={() => handleDelete(row.id)} sx={{ height: 32, width: 32 }}>
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
        open={openAdd}
        onClose={handleCloseAdd}
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
              <InputLabel htmlFor="name">Name</InputLabel>
              <Input id="name" aria-describedby="code-helper-text" value={formData.name} onChange={handleFormChange} />
            </div>
            <br></br>
          </FormControl>
          <FormControl>
            <div>
              <InputLabel htmlFor="price">Price</InputLabel>
              <Input id="price" aria-describedby="population-helper-text" value={formData.price} onChange={handleFormChange} />
            </div>
            <br></br>
          </FormControl>
          <Button onClick={handleSubmit}>Submit</Button>
        </Box>
      </Modal>
      <Modal
        open={openEdit}
        onClose={handleCloseEdit}
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
              <InputLabel htmlFor="name">Name</InputLabel>
              <Input id="name" aria-describedby="code-helper-text" value={formData.name} onChange={handleFormChange} />
            </div>
            <br></br>
          </FormControl>
          <FormControl>
            <div>
              <InputLabel htmlFor="price">Price</InputLabel>
              <Input id="price" aria-describedby="population-helper-text" value={formData.price} onChange={handleFormChange} />
            </div>
            <br></br>
          </FormControl>
          <Button onClick={handleEdit}>Edit</Button>
        </Box>
      </Modal>
    </>
  );
}
