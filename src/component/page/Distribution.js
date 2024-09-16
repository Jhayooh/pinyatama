import React, { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

export default function Distribution({ farms, roi }) {
  

  const formatDate = (timestamp) => {
    const dateObj = new Date(timestamp.seconds * 1000); // Convert Firebase timestamp
    return dateObj.toLocaleDateString(); // Return formatted date string
  };


  

  // Table Component
  const DataTable = ({ data, data1, data2 }) => {
    return (
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
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
    <TableCell>{data2[index]}</TableCell> {/* Assuming 'row' is a string or some value */}
    <TableCell align="right">{data1[index]}</TableCell> {/* Assuming row.input exists */}
    <TableCell align="right">{row}</TableCell> {/* Access corresponding value in data1 */}
  </TableRow>
))}

          </TableBody>
        </Table>
      </TableContainer>
    );
  };

  // Main Logic
  const [selectedDate, setSelectedDate] = useState('');
  const [inputText, setInputText] = useState('');
  const [tableData, setTableData] = useState([]);
  const sample = [
    { date: '2024-09-12', input: 'test' },
    { date: '2024-09-13', input: 'test2' },
    { date: '2024-09-14', input: 'test3' }
  ];
  


  // Group ROI data by farm title
  const groupedByTitle = roi.reduce((acc, roiItem) => {
    // Find the corresponding farm for the current ROI item
    const farm = farms.find(farm => farm.id === roiItem.farmId);
    const title = farm ? farm.title : 'Unknown';
   

    if (!acc[title]) {
      acc[title] = [];
    }
    acc[title].push(roiItem.grossReturn);
    return acc;
  }, {});

  // Create combinedData array with separated grossReturn values by farm title
  const combinedData = Object.keys(groupedByTitle).map(title => ({
    title,
    data: groupedByTitle[title].map(grossReturn => grossReturn),
  }));

  const pieData = combinedData.flatMap(item => item.data);

  const pieChartData = farms.map((farm, index) => ({
    label: farm.title,
    value: pieData[index] || 0,
    date:  formatDate(farm.start_date)
  }));

  const series = pieChartData.map(item => item.value);
  const labels = pieChartData.map(item => item.label);
  const date = pieChartData.map(item => item.date);
  const total = pieChartData.reduce((acc, item) => acc + item.value, 0);
  console.log(total);

  // Function to add a new row to the table
  const addRowToTable = () => {
    if (selectedDate && inputText) {
      setTableData([...tableData, { date: selectedDate, input: inputText }]);
      setInputText(''); // Clear input field after adding data
    }
  };

  return (
    <div>
      <h1>Distribution Data</h1>
    <input/>
    <button>Distrubute</button>
      <DataTable data={series} data1={labels} data2={date} />


    </div>
  );
}
