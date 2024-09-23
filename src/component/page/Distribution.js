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
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TextField } from '@mui/material';
import dayjs from 'dayjs';

export default function Distribution({ farms, roi }) {

  const [selectedDate, setSelectedDate] = useState(dayjs());

  const [inputText, setInputText] = useState('');
  const [distributionData, setDistributionData] = useState([]);
  const [percentageData, setPercentage] = useState([]);
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
    const itemDate = dayjs(item.date);
    return itemDate.month() === selectedDate.month() && itemDate.year() === selectedDate.year();
  });
  
  

  const filteredSeries = filteredPieChartData.map(item => item.value);
  const filteredLabels = filteredPieChartData.map(item => item.label);
  const filteredDate = filteredPieChartData.map(item => item.date.toLocaleDateString());

  const distributeResources = () => {
    const filteredTotalProduction = filteredSeries.reduce((acc, value) => acc + value, 0);
    const percentages = filteredSeries.map(value => (value / filteredTotalProduction) * 100);
    const distribution = percentages.map(percentage => ((inputText * percentage) / 100).toFixed(1));
    setPercentage(percentages);
    setDistributionData(distribution);
  };

  const saveDistribution = () => {
    const saved = filteredSeries.map((value, index) => ({
      label: filteredLabels[index],
      value: value,
      distribution: distributionData[index],
      percentage: percentageData[index],
      date: filteredDate[index],
    }));
    setSavedDistributions(prev => [...prev, { id: Date.now(), data: saved }]);
    setView('saved');
  };

  const handleSavedItemClick = (distributionId) => {
    const selected = savedDistributions.find(distribution => distribution.id === distributionId);
    setSelectedSavedDistribution(selected);
  };

  const DataTable = ({ data, data1, data2, distribution, percentage }) => {
    return (
      <TableContainer component={Paper} sx={{ marginTop: 4 }}>
        <Table>
          <TableHead sx={{ backgroundColor: '#f0f0f0' }}>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell align="right">Farm</TableCell>
              <TableCell align="right">Production</TableCell>
              <TableCell align="right">Percentage (%)</TableCell>
              <TableCell align="right">Distribution</TableCell>
              <TableCell align="right">Actual Distribution</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row, index) => (
              <TableRow key={index}>
                <TableCell>{data2[index]}</TableCell> {/* Date */}
                <TableCell align="right">{data1[index]}</TableCell> {/* Farm */}
                <TableCell align="right">{row}</TableCell> {/* Production */}
                <TableCell align="right">{percentage[index] ? percentage[index].toFixed(2) : 0}%</TableCell> {/* Percentage */}
                <TableCell align="right">{distribution[index] || 'N/A'}</TableCell> {/* Distribution */}
                <TableCell align="right">{distribution[index] || 'N/A'}</TableCell> {/* Distribution */}
                
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
            <Box sx={{ display: 'flex', gap: 1, width: '100%' }}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
                label="Select Date"
                value={selectedDate}
                onChange={(newDate) => setSelectedDate(newDate)} // This should already return a Day.js object
                renderInput={(params) => <TextField {...params} />}
              />

    </LocalizationProvider>
            </Box>
          </Box>

          <DataTable
            data={filteredSeries}            // Production values
            data1={filteredLabels}           // Farm names (labels)
            data2={filteredDate}             // Date strings
            distribution={distributionData}  // Calculated distribution values
            percentage={percentageData}      // Calculated percentages
          >

          </DataTable>


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
                percentage = {selectedSavedDistribution.data.map(item => item.percentage)}
              />
            </Box>
          )}
        </Box>
      )}
    </Box>
  );
}
