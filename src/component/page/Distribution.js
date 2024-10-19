import React, { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {
  Box,
  Button,
  FormControl,
  MenuItem,
  Select,
  InputLabel,
  OutlinedInput,
  Typography,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';

// Icons
import BackIcon from '@mui/icons-material/ArrowBackIosNew';

// Import XLSX
import * as XLSX from 'xlsx';

import { DataGrid } from '@mui/x-data-grid';

export default function Distribution({ farms, roi }) {
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [inputText, setInputText] = useState('');
  const [distributionData, setDistributionData] = useState([]);
  const [percentageData, setPercentage] = useState([]);
  const [actualDistribution, setActualDistribution] = useState([]); // State for actual distribution
  const [savedDistributions, setSavedDistributions] = useState([]);
  const [view, setView] = useState('distribution');
  const [selectedSavedDistribution, setSelectedSavedDistribution] = useState(null);

  // Dialog states
  const [openDialog, setOpenDialog] = useState(false);
  const [editingIndex, setEditingIndex] = useState(0); // Track which row is being edited
  const [editValue, setEditValue] = useState(''); // Value for editing actual distribution

  const formatDate = (timestamp) => {
    const dateObj = new Date(timestamp.seconds * 1000);
    return dateObj;
  };

  const groupedByTitle = roi.reduce((acc, roiItem) => {
    const farm = farms.find(farm => farm.id === roiItem.farmId);
    const title = farm ? farm.title : 'Unknown';

    if (!acc[title]) {
      acc[title] = [];
    }
    acc[title].push(roiItem.grossReturn);
    return acc;
  }, {});

  const combinedData = Object.keys(groupedByTitle).map(title => ({
    title,
    data: groupedByTitle[title].map(grossReturn => grossReturn),
  }));

  const pieData = combinedData.flatMap(item => item.data);

  const pieChartData = farms.map((farm, index) => ({
    label: farm.title,
    value: pieData[index] || 0,
    date: formatDate(farm.harvest_date)
  }));

  const totalProduction = pieChartData.reduce((acc, item) => acc + item.value, 0);

  const filteredPieChartData = pieChartData.filter(item => {
    const itemDate = dayjs(item.date);
    return itemDate.month() === selectedDate.month() && itemDate.year() === selectedDate.year();
  });

  const filteredSeries = filteredPieChartData.map(item => item.value);
  const filteredLabels = filteredPieChartData.map(item => item.label);
  const filteredDate = filteredPieChartData.map(item => item.date.toLocaleDateString());

  const distributeResources = () => {
    const filteredTotalProduction = filteredSeries.reduce((acc, value) => acc + value, 0);
    const percentages = filteredSeries.map(value => (value / filteredTotalProduction) * 100);
    const distribution = percentages.map(percentage => Math.round((inputText * percentage) / 100));
    setEditingIndex(distribution);
    setPercentage(percentages);
    setDistributionData(distribution);
    setActualDistribution(new Array(distribution.length).fill('')); // Reset actual distribution
  };

  const saveDistribution = () => {
    const saved = filteredSeries.map((value, index) => ({
      label: filteredLabels[index],
      value: value,
      distribution: distributionData[index],
      actualDistribution: actualDistribution[index] || 0, // Save actual distribution
      percentage: percentageData[index],
      date: filteredDate[index],
    }));

    const involvedFarms = filteredLabels.join(', ');

    setSavedDistributions(prev => [...prev, { id: Date.now(), data: saved, farmsInvolved: involvedFarms }]);
    setView('saved');
  };

  const handleSavedChange = (event) => {
    const selected = savedDistributions.find(distribution => distribution.id === event.target.value);
    setSelectedSavedDistribution(selected);
  };

  const downloadExcel = (distribution) => {
    const ws = XLSX.utils.json_to_sheet(distribution.data.map((item) => ({
      Date: item.date,
      Farm: item.label,
      Production: item.value,
      Distribution: item.distribution,
      Percentage: item.percentage,
      'Actual Distribution': item.actualDistribution
    })));
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Distributions");
    XLSX.writeFile(wb, `distribution_${Date.now()}.xlsx`);
  };

  // Open dialog for editing actual distribution
  const handleEditClick = (index) => {
    setEditingIndex(index);
    setEditValue(actualDistribution[index] || '');
    setOpenDialog(true);
  };

  // Save the edited value
  const handleSaveEdit = () => {
    setActualDistribution(prev => {
      const updated = [...prev];
      updated[editingIndex] = editValue;
      return updated;
    });
    setOpenDialog(false); // Close modal
    setEditingIndex(null);
  };

  const datagridStyle = {

    paddingBottom: 0,
    '& .even': {
      backgroundColor: '#FFFFFF',
    },
    '& .odd': {
      backgroundColor: '#F6FAF6',
    },
    '& .MuiDataGrid-columnHeaders': {
      position: 'sticky',
      top: 0,
      zIndex: 1,
      backgroundColor: '#88C488'
    },
  }
  const DataTable = ({ data, data1, data2, distribution, percentage, actualDistribution }) => {
    const columns = [
      {
        field: 'date',
        headerName: 'Date',
        flex: 1,
        align: 'left',
      },
      {
        field: 'farm',
        headerName: 'Farm',
        flex: 1,
        align: 'left',
      },
      {
        field: 'production',
        headerName: 'Production',
        flex: 1,
        align: 'left',
      },
      {
        field: 'percentage',
        headerName: 'Percentage',
        flex: 1,
        align: 'left',
      },
      {
        field: 'suggested',
        headerName: 'Suggested distribution',
        flex: 1,
        align: 'left',
      },
      {
        field: 'actual',
        headerName: 'Actual distribution',
        flex: 1,
        type: 'number',
        editable: true,
        align: 'center',
      },
    ];
    const rows = data.map((row, index) => ({
      id: index,
      date: data2[index],
      farm: data1[index],
      production: row,
      percentage: percentage[index] ? percentage[index].toFixed(2): 0,
      suggested: distribution[index] || 0,
      actual: actualDistribution[index] || 0,
    }));

    return (
      <Box sx={{ height: 400, width: '100%', marginTop: 4 }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5, 10, 20]}
          disableSelectionOnClick
          sx={{
            ...datagridStyle,
            border: 'none',
            paddingX: 2,
            overflowX: 'auto',
            height: `calc(100% - 8px)`,
            backgroundColor: '#fff',
            paddingTop: 1,
            boxShadow: 2
          }}
          getRowClassName={(rows) =>
            rows.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd'
          }
          hideFooter
        />
      </Box>
    );
    // return (
    //   <TableContainer component={Paper} sx={{ marginTop: 4 }}>
    //     <Table>
    //       <TableHead sx={{ backgroundColor: '#f0f0f0' }}>
    //         <TableRow>
    //           <TableCell>Date</TableCell>
    //           <TableCell align="right">Farm</TableCell>
    //           <TableCell align="right">Production</TableCell>
    //           <TableCell align="right">Percentage (%)</TableCell>
    //           <TableCell align="right">Suggested Distribution</TableCell>
    //           <TableCell align="right">Actual Distribution</TableCell>
    //         </TableRow>
    //       </TableHead>
    //       <TableBody >
    //         {data.map((row, index) => (
    //           <TableRow key={index}>
    //             <TableCell>{data2[index]}</TableCell>
    //             <TableCell align="right">{data1[index]}</TableCell>
    //             <TableCell align="right">{row}</TableCell>
    //             <TableCell align="right">{percentage[index] ? percentage[index].toFixed(2) : 0}%</TableCell>
    //             <TableCell align="right">{distribution[index] || 0}</TableCell>
    //             <TableCell align="right">
    //               <TextField 
    //                 variant='outlined'
    //                 sx={{display:'flex'}}
    //                 value={editingIndex}
    //                 onChange={(e)=> setEditingIndex(e)}
    //               />
    //               {/* <Button
    //                 variant="contained"
    //                 color="secondary"
    //                 onClick={() => handleEditClick(index)}
    //                 sx={{ ml: 1 }}
    //               >
    //                 Edit
    //               </Button> */}
    //             </TableCell>
    //           </TableRow>
    //         ))}
    //       </TableBody>
    //     </Table>
    //   </TableContainer>
    // );
  };

  const [buttonText, setButtonText] = useState('Report');

  const handleClick = () => {
    if (view === 'saved') {
      setView('distribution');
      setButtonText('Report');
    } else {
      setView('saved');
      setButtonText(<BackIcon />);
    }
  };

  return (
    <Box sx={{ backgroundColor: '#f9fafb', padding: 3, borderRadius: 4, minHeight: '100%' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: 2 , justifyContent: 'flex-end' }}>
        <Button variant="outlined" color="success" onClick={handleClick}>
          {buttonText}
        </Button>
      </Box>

      {view === 'distribution' ? (
        <Box>
          <Box sx={{ marginBottom: 1, display: 'flex', gap: 1, p: 2 }}>
            <FormControl fullWidth size="small" sx={{ width: '100%' }}>
              <OutlinedInput
                id="outlined-adornment-amount"
                placeholder="Enter Distribute Value"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                fullWidth
                type="number"
              />
            </FormControl>
            <Button variant="contained" color="success" onClick={distributeResources}>
              Enter
            </Button>
            <Box sx={{ display: 'flex', gap: 1, width: '100%', justifyContent: 'flex-end' }}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  // views={['year', 'month',]}
                  minDate={dayjs('2023-01-01')}
                  maxDate={dayjs('2030-12-31')}
                  value={selectedDate}
                  onChange={(newValue) => setSelectedDate(newValue)}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            </Box>

          </Box>

          <Typography sx={{ p: 2, fontWeight: 'bold' }}>
            Total Production: {totalProduction}
          </Typography>

          <DataTable
            data={filteredSeries}
            data1={filteredLabels}
            data2={filteredDate}
            distribution={distributionData}
            percentage={percentageData}
            actualDistribution={actualDistribution}
          />
          <Button variant="contained" color="success" onClick={saveDistribution}
            sx={{ display: 'flex', justifyContent: 'flex-end',alignItems:'flex-end'}}>
            Save Data
          </Button>
        </Box>
      ) : (
        <Box>
          <FormControl fullWidth>
            <InputLabel>Select Data</InputLabel>
            <Select value={selectedSavedDistribution?.id || ''} onChange={handleSavedChange}>
              {savedDistributions.map((distribution) => (
                <MenuItem key={distribution.id} value={distribution.id}>
                  {distribution.farmsInvolved}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          {selectedSavedDistribution && (
            <Box>
              <DataTable
                data={selectedSavedDistribution.data.map((item) => item.value)}
                data1={selectedSavedDistribution.data.map((item) => item.label)}
                data2={selectedSavedDistribution.data.map((item) => item.date)}
                distribution={selectedSavedDistribution.data.map((item) => item.distribution)}
                percentage={selectedSavedDistribution.data.map((item) => item.percentage)}
                actualDistribution={selectedSavedDistribution.data.map((item) => item.actualDistribution)}
                setActualDistribution={() => { }} // Disable updating of actual distribution
              />
              <Button
                variant="contained"
                color="success"
                onClick={() => downloadExcel(selectedSavedDistribution)}
                sx={{ mt: 2 }}
              >
                Download Excel
              </Button>
            </Box>
          )}
        </Box>
      )}

      {/* Dialog for editing actual distribution */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Edit Actual Distribution</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Enter the new actual distribution value:
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Actual Distribution"
            type="number"
            fullWidth
            variant="outlined"
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button onClick={handleSaveEdit}>Save</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

// import * as React from 'react';
// import Box from '@mui/material/Box';
// import { DataGrid, GridColDef } from '@mui/x-data-grid';

// const [columns, setColumns]= useState([
//   {
//     field:'date',
//     headerName:'Date',
//     flex:1,
//   },
//   {
//     field:'farm',
//     headerName:'Farm',
//     flex:1,
//   },
//   {
//     field:'date',
//     headerName:'Date',
//     flex:1,
//   },
// ])

// export default function Distribution(){

//   return(


//   )
// }