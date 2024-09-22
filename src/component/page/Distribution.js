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
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from '@mui/material';

export default function Distribution({ farms, roi }) {
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
  const years = [2022, 2023, 2024, 2025, 2026]; // Adjust based on your data

  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [inputText, setInputText] = useState('');
  const [distributionData, setDistributionData] = useState([]);
  const [savedDistributions, setSavedDistributions] = useState([]);
  const [view, setView] = useState('distribution');
  const [selectedSavedDistribution, setSelectedSavedDistribution] = useState(null); // State to track selected saved distribution

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
    date: formatDate(farm.start_date)
  }));

  const totalProduction = pieChartData.reduce((acc, item) => acc + item.value, 0);

  const filteredPieChartData = pieChartData.filter(item => {
    const itemDate = new Date(item.date);
    return itemDate.getMonth() === selectedMonth && itemDate.getFullYear() === selectedYear;
  });

  const filteredSeries = filteredPieChartData.map(item => item.value);
  const filteredLabels = filteredPieChartData.map(item => item.label);
  const filteredDate = filteredPieChartData.map(item => item.date.toLocaleDateString());

  const distributeResources = () => {
    const filteredTotalProduction = filteredSeries.reduce((acc, value) => acc + value, 0);
    const percentages = filteredSeries.map(value => (value / filteredTotalProduction) * 100);
    const distribution = percentages.map(percentage => ((inputText * percentage) / 100).toFixed(1));
    setDistributionData(distribution);
  };

  const saveDistribution = () => {
    const saved = filteredSeries.map((value, index) => ({
      label: filteredLabels[index],
      value: value,
      distribution: distributionData[index],
      date: filteredDate[index],
    }));
    setSavedDistributions(prev => [...prev, { id: Date.now(), data: saved }]);
    setView('saved');
  };

  const handleSavedItemClick = (distributionId) => {
    const selected = savedDistributions.find(distribution => distribution.id === distributionId);
    setSelectedSavedDistribution(selected);
  };

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
                <TableCell align="right">{distribution[index] || 'N/A'}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  };

  return (
    <Box sx={{ backgroundColor: '#f9fafb', padding: 3, borderRadius: 4, minHeight: '100vh' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: 2 }}>
        <Button variant="contained" color="success" onClick={() => setView('distribution')}>
          Distribution
        </Button>
        <Button variant="contained" color="success" onClick={() => setView('saved')}>
          Saved Data
        </Button>
      </Box>

      {view === 'distribution' ? (
        <Box>
          <Box sx={{ marginBottom: 1, display: 'flex', gap: 2, p: 2 }}>
            <FormControl fullWidth size="small">
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
          </Box>

          <Box sx={{ display: 'flex', gap: 1 }}>
            <FormControl fullWidth size="small">
              <InputLabel id="month-select-label">Month</InputLabel>
              <Select
                labelId="month-select-label"
                id="month-select"
                value={selectedMonth}
                label="Month"
                onChange={(e) => setSelectedMonth(e.target.value)}
              >
                {months.map((month) => (
                  <MenuItem key={month.value} value={month.value}>
                    {month.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth size="small">
              <InputLabel id="year-select-label">Year</InputLabel>
              <Select
                labelId="year-select-label"
                id="year-select"
                value={selectedYear}
                label="Year"
                onChange={(e) => setSelectedYear(e.target.value)}
              >
                {years.map((year) => (
                  <MenuItem key={year} value={year}>
                    {year}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

          <DataTable
            data={filteredSeries}
            data1={filteredLabels}
            data2={filteredDate}
            distribution={distributionData}
          />

          <Button variant="contained" color="success" onClick={saveDistribution} sx={{ marginTop: 2 }}>
            Save Distribution
          </Button>
        </Box>
      ) : (
        <Box>
          <Typography variant="h6" sx={{ marginBottom: 2 }}>Saved Distribution Data</Typography>
          <List>
            {savedDistributions.map((savedItem) => (
              <ListItem key={savedItem.id} disablePadding>
                <ListItemButton onClick={() => handleSavedItemClick(savedItem.id)}>
                <ListItemText 
  primary={`Saved Distribution - ${new Date(savedItem.id).toLocaleString()}`} 
  secondary={`Distribution Values: ${savedItem.data.map(item => item.distribution).join(', ')}`}
/>
                </ListItemButton>
              </ListItem>
            ))}
          </List>

          {selectedSavedDistribution && (
            <Box>
              <Typography variant="h6" sx={{ marginTop: 2 }}>Distribution Details</Typography>
              <DataTable
                data={selectedSavedDistribution.data.map(item => item.value)}
                data1={selectedSavedDistribution.data.map(item => item.label)}
                data2={selectedSavedDistribution.data.map(item => item.date)}
                distribution={selectedSavedDistribution.data.map(item => item.distribution)}
              />
            </Box>
          )}
        </Box>
      )}
    </Box>
  );
}
