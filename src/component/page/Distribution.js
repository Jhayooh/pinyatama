import React, { useState, useEffect } from 'react';
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
} from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import BackIcon from '@mui/icons-material/ArrowBackIosNew';
import * as XLSX from 'xlsx';
import { DataGrid } from '@mui/x-data-grid';

export default function Distribution({ farms, roi }) {
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [inputText, setInputText] = useState('');
  const [distributionData, setDistributionData] = useState([]);
  const [percentageData, setPercentage] = useState([]);
  const [actualDistribution, setActualDistribution] = useState([]);
  const [savedDistributions, setSavedDistributions] = useState([]);
  const [view, setView] = useState('distribution');
  const [selectedSavedDistribution, setSelectedSavedDistribution] = useState(null);

  const startOfWeek = selectedDate.startOf('week');
  const endOfWeek = selectedDate.endOf('week');

  useEffect(() => {
    // Load saved distributions from localStorage on component mount
    const storedDistributions = localStorage.getItem('savedDistributions');
    if (storedDistributions) {
      setSavedDistributions(JSON.parse(storedDistributions));
    }
  }, []);

  useEffect(() => {
    // Save to localStorage whenever savedDistributions changes
    if (savedDistributions.length > 0) {
      localStorage.setItem('savedDistributions', JSON.stringify(savedDistributions));
    }
  }, [savedDistributions]);

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
    return itemDate.isAfter(startOfWeek) && itemDate.isBefore(endOfWeek);
  });

  const filteredSeries = filteredPieChartData.map(item => item.value);
  const filteredLabels = filteredPieChartData.map(item => item.label);
  const filteredDate = filteredPieChartData.map(item => item.date.toLocaleDateString());

  const distributeResources = () => {
    const filteredTotalProduction = filteredSeries.reduce((acc, value) => acc + value, 0);
    const percentages = filteredSeries.map(value => (value / filteredTotalProduction) * 100);
    const distribution = percentages.map(percentage => Math.round((inputText * percentage) / 100));

    // Ensure the distribution does not exceed total production
    const maxTotalDistribution = Math.min(filteredTotalProduction, Number(inputText));
    const totalSuggestedDistribution = distribution.reduce((acc, val) => acc + val, 0);

    if (totalSuggestedDistribution > maxTotalDistribution) {
      const scaleFactor = maxTotalDistribution / totalSuggestedDistribution;
      setDistributionData(distribution.map(d => Math.round(d * scaleFactor)));
    } else {
      setDistributionData(distribution);
    }

    setPercentage(percentages);
    setActualDistribution(new Array(distribution.length).fill(''));
  };

  const saveDistribution = () => {
    const saved = filteredSeries.map((value, index) => ({
      label: filteredLabels[index],
      value: value,
      distribution: distributionData[index],
      actualDistribution: actualDistribution[index] || 0,
      percentage: percentageData[index],
      date: filteredDate[index],
    }));

    const formattedDate = selectedDate.format('YYYY-MM-DD');
    const involvedFarms = `${inputText} distributed on ${formattedDate} to: ${filteredLabels.join(', ')}`;

    const newSavedDistribution = { id: Date.now(), data: saved, farmsInvolved: involvedFarms };

    setSavedDistributions(prev => [...prev, newSavedDistribution]);
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
  };

  const handleEditCellChange = (params) => {
    const updatedActualDistribution = [...actualDistribution];
    updatedActualDistribution[params.id] = params.value;
    setActualDistribution(updatedActualDistribution);
  };

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
      percentage: percentage[index] ? percentage[index].toFixed(2) : 0,
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
          onCellEditCommit={handleEditCellChange}
          getRowClassName={(rows) =>
            rows.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd'
          }
          hideFooter
        />
      </Box>
    );
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
      <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: 2, justifyContent: 'flex-end' }}>
        <Button variant="outlined" color="success" onClick={handleClick}>
          {buttonText}
        </Button>
      </Box>
      {view === 'distribution' && (
        <>
          
          <Typography variant="h6">Select Date</Typography>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              value={selectedDate}
              onChange={(newValue) => setSelectedDate(newValue)}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
          <Typography variant="h6">Enter Total Distribution</Typography>
          <OutlinedInput
            type="number"
            onChange={(e) => setInputText(e.target.value)}
            value={inputText}
            fullWidth
          />
          <Button variant="contained" color="primary" onClick={distributeResources}>
            Distribute
          </Button>
          <DataTable
            data={filteredSeries}
            data1={filteredLabels}
            data2={filteredDate}
            distribution={distributionData}
            percentage={percentageData}
            actualDistribution={actualDistribution}
          />
          <Button variant="contained" color="secondary" onClick={saveDistribution}>
            Save Distribution
          </Button>
        </>
      )}

      {view === 'saved' && (
        <>
          <Typography variant="h6">Saved Distribution</Typography>
          <FormControl fullWidth>
            <InputLabel id="saved-distribution-select-label">Select Distribution</InputLabel>
            <Select
              labelId="saved-distribution-select-label"
              value={selectedSavedDistribution ? selectedSavedDistribution.id : ''}
              onChange={handleSavedChange}
              label="Select Distribution"
            >
              {savedDistributions.map((distribution) => (
                <MenuItem key={distribution.id} value={distribution.id}>
                  {distribution.farmsInvolved}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {selectedSavedDistribution && (
            <>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 2 }}>
                <Button variant="outlined" onClick={() => downloadExcel(selectedSavedDistribution)}>
                  Download Excel
                </Button>
              </Box>
              <DataTable
                data={selectedSavedDistribution.data.map(item => item.value)}
                data1={selectedSavedDistribution.data.map(item => item.label)}
                data2={selectedSavedDistribution.data.map(item => item.date)}
                distribution={selectedSavedDistribution.data.map(item => item.distribution)}
                percentage={selectedSavedDistribution.data.map(item => item.percentage)}
                actualDistribution={selectedSavedDistribution.data.map(item => item.actualDistribution)}
              />
            </>
          )}
        </>
      )}
    </Box>
  );
}
