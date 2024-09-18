import React, { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box, TextField, MenuItem, Button, Typography } from '@mui/material';

export default function Distribution({ farms, roi }) {

  const formatDate = (timestamp) => {
    const dateObj = new Date(timestamp.seconds * 1000); // Convert Firebase timestamp
    return dateObj;
  };

  // Month and year selection
  const months = [
    { value: 0, label: 'January' },
    { value: 1, label: 'February' },
    { value: 2, label: 'March' },
    { value: 3, label: 'April' },
    { value: 4, label: 'May' },
    { value: 5, label: 'June' },
    { value: 6, label: 'July' },
    { value: 7, label: 'August' },
    { value: 8, label: 'September' },
    { value: 9, label: 'October' },
    { value: 10, label: 'November' },
    { value: 11, label: 'December' }
  ];

  const years = [2022, 2023, 2024]; // Adjust this range based on your data

  // State for the selected month and year
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [inputText, setInputText] = useState(''); // For Distribute Value
  const [distributionData, setDistributionData] = useState([]); // Store calculated distribution

  // Table Component
  const DataTable = ({ data, data1, data2, distribution }) => {
    return (
      <TableContainer component={Paper} sx={{ marginTop: 4 }}>
        <Table>
          <TableHead sx={{ backgroundColor: '#f0f0f0' }}>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell align="right">Farm</TableCell>
              <TableCell align="right">Production</TableCell>
              <TableCell align="right">Distribution</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row, index) => (
              <TableRow key={index}>
                <TableCell>{data2[index]}</TableCell> 
                <TableCell align="right">{data1[index]}</TableCell> 
                <TableCell align="right">{row}</TableCell>
                <TableCell align="right">{distribution[index] || 'N/A'}</TableCell> {/* Display distributed value */} 
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  };

  // Group ROI data by farm title
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
    date: formatDate(farm.start_date)
  }));

  const totalProduction = pieChartData.reduce((acc, item) => acc + item.value, 0);

  // Filter pieChartData by selected month and year
  const filteredPieChartData = pieChartData.filter(item => {
    const itemDate = new Date(item.date);
    return itemDate.getMonth() === selectedMonth && itemDate.getFullYear() === selectedYear;
  });

  const filteredSeries = filteredPieChartData.map(item => item.value);
  const filteredLabels = filteredPieChartData.map(item => item.label);
  const filteredDate = filteredPieChartData.map(item => item.date.toLocaleDateString());

  // Function to calculate distribution when "Distribute" button is clicked
  const distributeResources = () => {
    const filteredTotalProduction = filteredSeries.reduce((acc, value) => acc + value, 0);

    // Calculate percentages for production
    const percentages = filteredSeries.map(value => (value / filteredTotalProduction) * 100);

    // Calculate distribution based on inputText (total distribution amount)
    const distribution = percentages.map(percentage => ((inputText * percentage) / 100).toFixed(1));

    // Store calculated distribution in state
    setDistributionData(distribution);
  };

  return (
    <Box sx={{ backgroundColor: '#f9fafb', padding: 3, borderRadius: 4, minHeight: '100vh' }}>
      <Box sx={{ boxShadow: 2, borderRadius: 3, backgroundColor: '#fff', padding: 4 }}>
        <Typography variant="h5" gutterBottom>
          Distribution Data
        </Typography>
        
        {/* Date Filter: Month and Year Selection */}
        <Box sx={{ display: 'flex', gap: 2, marginBottom: 3 }}>
          <TextField
            select
            label="Month"
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            sx={{ minWidth: 150 }}
          >
            {months.map((month) => (
              <MenuItem key={month.value} value={month.value}>
                {month.label}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            select
            label="Year"
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            sx={{ minWidth: 100 }}
          >
            {years.map((year) => (
              <MenuItem key={year} value={year}>
                {year}
              </MenuItem>
            ))}
          </TextField>
        </Box>

        {/* Input field and distribute button */}
        <Box sx={{ display: 'flex', gap: 2, marginBottom: 3 }}>
          <TextField 
            label="Distribute Value" 
            variant="outlined" 
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            fullWidth
            type="number"
          />
          <Button variant="contained" color="secondary" onClick={distributeResources}>
            Distribute
          </Button>
        </Box>

        {/* Data Table */}
        <DataTable data={filteredSeries} data1={filteredLabels} data2={filteredDate} distribution={distributionData} />
      </Box>
    </Box>
  );
}
