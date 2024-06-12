import React from 'react';
import { Box } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

function ListView() {
  const columns = [
    { field: 'id', headerName: 'ID', flex: 1 },
    { field: 'farmName', headerName: 'Pangalan ng Bukid', flex: 1 },
    { field: 'address', headerName: 'Address', flex: 1 },
    { field: 'planting', headerName: 'Date of Planting', flex: 1 },
    { field: 'harvest', headerName: 'Date of Harvest', flex: 1 },
  ];

  const rows = [
    { id: 1, farmName: 'Farm 1', address: 'Address 1', planting: '2024-01-01', harvest: '2024-06-01' },
    { id: 2, farmName: 'Farm 2', address: 'Address 2', planting: '2024-01-02', harvest: '2024-06-02' },
    // Add more rows as needed
  ];

  return (
    <Box sx={{ backgroundColor: '#f9fafb', padding: 4, borderRadius: 4, height: '100%' }}>
      <div style={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          checkboxSelection
        />
      </div>
    </Box>
  );
}

export default ListView;
