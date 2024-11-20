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
  Grid,
  Divider,
  Modal,
  Backdrop,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Alert,
  Tooltip,
  AlertTitle
} from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import BackIcon from '@mui/icons-material/ArrowBackIosNew';
import * as XLSX from 'xlsx';
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import { StaticDatePicker } from '@mui/x-date-pickers';
import Pie from '../chart/Pie1';
import { addDoc, collection, updateDoc } from 'firebase/firestore';
import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';

import { db } from '../../firebase/Config';

// icons
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined'
import { useCollectionData } from 'react-firebase-hooks/firestore';

export default function Distribution({ farms, roi }) {
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [inputText, setInputText] = useState('');
  const [actualDistribution, setActualDistribution] = useState([]);

  const [localFarms, setLocalFarms] = useState([])
  const [totalGrossReturn, setTotalGrossReturn] = useState(0)
  const startOfWeek = selectedDate.startOf('week');
  const endOfWeek = selectedDate.endOf('week');

  const [saving, setSaving] = useState(false)
  const [open, setOpen] = useState(false)
  const [openError, setOpenError] = useState(false)
  const [alert, setAlert] = useState({ show: false })

  const distributionColl = collection(db, '/distributions')
  const [distributions] = useCollectionData(distributionColl)

  function dateFormatter(date) {
    const d = new Date(date)
    return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
  }

  const getPercentage = (num1, num2) => {
    if (num2 === 0) return 0; // Prevent division by zero
    return Math.round((num1 / num2) * 100);
  };

  const calculateGrossReturn = (filteredFarms) => {
    return filteredFarms.reduce((sum, farm) => {
      const roiSum = farm.roi
        .filter(roi => roi.type === 'p')
        .reduce((roiSum, roi) => roiSum + roi.grossReturn, 0);
      return sum + roiSum;
    }, 0);
  };

  const exportExcel = async () => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Harvest Schedule');
    
    const year = 2026;  // Replace with dynamic year if needed
    const month = 4;  // Replace with dynamic month if needed
    const currentDate = new Date(year, month);
    const daysInMonth = new Date(year, month + 1, 0).getDate();
  
    // Title Setup with line breaks
    const title = [
      'Republic of the Philippines',
      'Province of Camarines Norte',
      '-Daet-',
      'OFFICE OF THE PROVINCIAL AGRICULTURIST',
      '',
      ` HARVEST SCHEDULE FOR THE MONTH OF ${currentDate.toLocaleString('default', {
        month: 'long',
      }).toUpperCase()} ${year}`,
    ];
  
    const totalColumns = 5 + daysInMonth + 1; // First 5 columns + day columns + Total column
  
    // Merge the first row for title and insert line breaks
    worksheet.mergeCells(1, 1, 1, totalColumns);  // Merge the entire first row
    worksheet.getCell(1, 1).value = title.join('\n'); // Join the title lines with line breaks
    worksheet.getCell(1, 1).alignment = { vertical: 'middle', horizontal: 'center', wrapText: true }; // Enable text wrapping
    worksheet.getCell(1, 1).font = { bold: true, size: 12 };
  
    // Set custom row height for the first row to show all content
    worksheet.getRow(1).height = 90;  // Adjust the height as needed (increase if content doesn't fit)
  
    // Headers
    const headers = [
      'Name of farmers',
      'Barangay',
      'Municipality',
      'Area',
      'Planting date',
    ];
  
    headers.forEach((header, index) => {
      const colIndex = index + 1;
      worksheet.mergeCells(2, colIndex, 3, colIndex); // Merge 2nd and 3rd rows for headers
      worksheet.getCell(2, colIndex).value = header;
      worksheet.getCell(2, colIndex).alignment = {
        vertical: 'middle',
        horizontal: 'center',
      };
  
      // Set width for specific columns
      if (header === 'Name of farmers') worksheet.getColumn(colIndex).width = 20;
      if (header === 'Barangay') worksheet.getColumn(colIndex).width = 15;
      if (header === 'Municipality') worksheet.getColumn(colIndex).width = 15;
      if (header === 'Area') worksheet.getColumn(colIndex).width = 10;
      if (header === 'Planting date') worksheet.getColumn(colIndex).width = 15;
    });
  
    // Days of the month
    const dayNames = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const dayOfWeek = date.getDay();
      const colIndex = day + headers.length;
      worksheet.getCell(2, colIndex).value = dayNames[dayOfWeek === 0 ? 6 : dayOfWeek - 1];
      worksheet.getCell(3, colIndex).value = day;
      worksheet.getCell(2, colIndex).alignment = {
        vertical: 'middle',
        horizontal: 'center',
      };
      worksheet.getCell(3, colIndex).alignment = {
        vertical: 'middle',
        horizontal: 'center',
      };
    }
  
    // Add "Total" column
    const totalColIndex = headers.length + daysInMonth + 1;
    worksheet.mergeCells(2, totalColIndex, 3, totalColIndex);
    worksheet.getCell(2, totalColIndex).value = 'Total';
    worksheet.getCell(2, totalColIndex).alignment = {
      vertical: 'middle',
      horizontal: 'center',
    };
  
    // Filter Farms and Map Data
    const filteredFarms = farms.filter((farm) =>
      distributions.some((dist) => {
        const distDate = new Date(dist.date);
        return dist.id === farm.id && distDate.getFullYear() === year && distDate.getMonth() === month;
      })
    );
  
    let rowIndex = 4;  // Start from row 4 (after merged title and header rows)
    let totalArea = 0;
    let totalOfTotal = 0;
  
    filteredFarms.forEach((farm) => {
      const farmDistributions = distributions.filter((dist) => {
        const distDate = new Date(dist.date);
        return dist.id === farm.id && distDate.getFullYear() === year && distDate.getMonth() === month;
      });
      worksheet.getCell(rowIndex, 1).value = farm.farmerName;
      worksheet.getCell(rowIndex, 2).value = farm.brgy;
      worksheet.getCell(rowIndex, 3).value = farm.mun;
      worksheet.getCell(rowIndex, 4).value = parseFloat(farm.area);
      worksheet.getCell(rowIndex, 5).value = dateFormatter(farm.start_date.toDate());
  
      let total = 0;
      farmDistributions.forEach((dist) => {
        const distDate = new Date(dist.date);
        const colIndex = headers.length + distDate.getDate();
        worksheet.getCell(rowIndex, colIndex).value = dist.actual;
        total += dist.actual;
      });
  
      worksheet.getCell(rowIndex, totalColIndex).value = total;
  
      // Update total values
      totalArea += parseFloat(farm.area);
      totalOfTotal += total;
  
      rowIndex++;
    });
  
    // Add last row with total Area and Total sum
    worksheet.getCell(rowIndex, 1).value = 'TOTAL';
    worksheet.getCell(rowIndex, 4).value = totalArea;  // Sum of Area column
    worksheet.getCell(rowIndex, totalColIndex).value = totalOfTotal;  // Sum of Total column
    worksheet.getCell(rowIndex, 1).alignment = { vertical: 'middle', horizontal: 'center' };
    worksheet.getCell(rowIndex, 4).alignment = { vertical: 'middle', horizontal: 'center' };
    worksheet.getCell(rowIndex, totalColIndex).alignment = { vertical: 'middle', horizontal: 'center' };
  
    // Save the Excel file
    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], { type: 'application/octet-stream' });
    saveAs(blob, `Harvest_Schedule_${year}_${month + 1}.xlsx`);
  };
  
  useEffect(() => {
    if (!farms) return
    const filterFarmsByDate = farms
      .filter(farm =>
        farm.cropStage !== 'complete' && farm.remarks !== 'failed'
      )
      .filter(farm => {
        const harvestDate = dayjs(farm.harvest_date.toDate())
        return harvestDate.isAfter(startOfWeek) && harvestDate.isBefore(endOfWeek)
      })
      .map(f => ({
        ...f,
        grossReturn: f.roi.find(fr => fr.type === 'p').grossReturn
      }))

    const theTotalGrossReturn = calculateGrossReturn(filterFarmsByDate)

    const locFarms = filterFarmsByDate.map(filFarm => ({
      id: filFarm.id,
      date: dateFormatter(filFarm.harvest_date.toDate()),
      farm: filFarm.title,
      production: filFarm.grossReturn,
      percentage: getPercentage(filFarm.grossReturn, totalGrossReturn),
      suggested: Math.round((inputText * getPercentage(filFarm.grossReturn, totalGrossReturn) / 100)),
      actual: Math.round((inputText * getPercentage(filFarm.grossReturn, totalGrossReturn) / 100))
    }))

    setLocalFarms(locFarms)
    setTotalGrossReturn(theTotalGrossReturn)
  }, [selectedDate])

  const handleClose = () => {
    setOpen(false)
    setOpenError(false)
  }

  const distribute = () => {
    const filterFarmsByDate = farms
      .filter(farm => {
        const harvestDate = dayjs(farm.harvest_date.toDate())
        return harvestDate.isAfter(startOfWeek) && harvestDate.isBefore(endOfWeek)
      })
      .map(f => ({
        ...f,
        grossReturn: f.roi.find(fr => fr.type === 'p').grossReturn
      }))

    const theTotalGrossReturn = calculateGrossReturn(filterFarmsByDate)

    const locFarms = filterFarmsByDate.map(filFarm => ({
      id: filFarm.id,
      date: dateFormatter(filFarm.harvest_date.toDate()),
      farm: filFarm.title,
      production: filFarm.grossReturn,
      percentage: getPercentage(filFarm.grossReturn, totalGrossReturn),
      suggested: Math.round((inputText * getPercentage(filFarm.grossReturn, totalGrossReturn) / 100)),
      actual: Math.round((inputText * getPercentage(filFarm.grossReturn, totalGrossReturn) / 100)),
    }))
    setLocalFarms(locFarms)
    setTotalGrossReturn(theTotalGrossReturn)
  };

  function uniqueID() {
    return Math.floor(Math.random() * Date.now())
  }


  const saveDistribution = async () => {
    setSaving(true)
    const distributionColl = collection(db, '/distributions')

    try {
      const uniqueId = uniqueID()
      for (const farm of localFarms) {
        const farmRef = await addDoc(distributionColl, {
          ...farm,
          distributionId: uniqueId
        })
      }
      handleClose()
      setSaving(false)
    } catch (error) {
      console.log("error pag save: ", error);

    }


  }

  const datagridStyle = {
    // paddingBottom: 0,
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

  const checkActual = () => {
    const zeroActual = localFarms.some(farm => farm.actual === 0)
    if (zeroActual) {
      setOpenError(true)
      return
    }

    setOpen(true)
  }

  const handleEditCellChange = (params) => {
    const updatedActualDistribution = [...actualDistribution];
    updatedActualDistribution[params.id] = params.value;
    setActualDistribution(updatedActualDistribution);
  };

  const columns = [
    {
      field: 'date',
      headerName: 'Date of harvest',
      flex: 1,
      align: 'center',
    },
    {
      field: 'farm',
      headerName: 'Farm',
      flex: 1,
      align: 'center',
    },
    {
      field: 'production',
      headerName: 'Production (pcs)',
      flex: 1,
      align: 'right',
      valueFormatter: (value) => {
        if (value == null) {
          return '';
        }
        return `${value.value.toLocaleString('en-US')}`;
      },
    },
    {
      field: 'percentage',
      headerName: 'Percentage (%)',
      flex: 1,
      align: 'center',
    },
    {
      field: 'suggested',
      headerName: 'Distribution (pcs)',
      flex: 1,
      align: 'right',
      valueFormatter: (value) => {
        if (value == null) {
          return '';
        }
        return `${value.value.toLocaleString('en-US')}`;
      },
    },
    {
      field: 'actual',
      headerName: 'Actual distribution',
      flex: 1,
      type: 'number',
      editable: true,
      align: 'right',
    },
  ];

  return (
    <>
      <Box sx={{ backgroundColor: '#f9fafb', padding: 4, borderRadius: 4, height: '100%', overflow: 'auto' }}>
        <Grid container spacing={3} alignItems='stretch'>

          <Grid item lg={12} md={12} sm={12} xs={12} sx={{ mb: 3 }}>
            <h1 style={{ color: '#000' }}>Distribution </h1>
            <Divider sx={{ borderBottomWidth: 2 }} />
          </Grid>

          <Grid item lg={4} md={8} sm={6} xs={12}>
            <Box sx={{
              boxShadow: 1,
              paddingX: 4,
              paddingY: 2,
              borderRadius: 3,
              backgroundColor: '#fff',
              overflow: 'hidden',
              maxHeight: 1000,
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              gap: 4
            }}>
              <Box>
                <Typography variant="h6" sx={{
                  marginBottom: 2
                }}>
                  Select Date
                </Typography>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label="Select"
                    value={selectedDate}
                    onChange={(newValue) => setSelectedDate(newValue)}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider>
              </Box>
              <Box>
                <Typography variant="h6" sx={{
                  marginBottom: 2
                }}>
                  Enter Total Distribution (limit to {totalGrossReturn})
                </Typography>
                <Box sx={{
                  display: 'flex'
                }}>
                  <OutlinedInput
                    type="number"
                    onChange={(e) => {
                      const value = Math.min(e.target.value, totalGrossReturn);
                      setInputText(value);
                    }}
                    value={inputText}
                    fullWidth
                    inputProps={{
                      max: totalGrossReturn,
                    }}
                    sx={{ borderTopLeftRadius: 20, borderBottomLeftRadius: 20, borderTopRightRadius: 0, borderBottomRightRadius: 0 }}
                  />
                  <Button variant="contained" color="warning" onClick={distribute}
                    sx={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0, borderTopRightRadius: 20, borderBottomRightRadius: 20 }}>
                    Distribute
                  </Button>
                </Box>
              </Box>
              <Box>
                <Pie
                  labels={localFarms.map(lf => lf.farm)}
                  data={localFarms.map(lf => lf.suggested)}
                  title={"Inaasahang Komit"}
                  unit="pcs"
                />
              </Box>
            </Box>
          </Grid>

          <Grid item lg={8} md={6} sm={6} xs={12}>
            <Box >
              <Box sx={{
                display: 'flex',
                justifyContent: 'flex-end',
                marginBottom: 4,
                gap: 4
              }}>
                <Button variant="outlined" color='error' onClick={() => exportExcel(selectedDate)} >
                  Download report
                </Button>
                <Button variant="contained" color='success' onClick={() => setOpen(true)}>
                  Save
                </Button>
              </Box>
              <DataGrid
                rows={localFarms}
                columns={columns}
                disableSelectionOnClick
                sx={{
                  ...datagridStyle,
                  // border: 'none',
                  // paddingX: 2,
                  // overflowX: 'auto',
                  height: `calc(100% - 8px)`,
                  boxShadow: 1,
                  borderRadius: 2,
                  backgroundColor: '#fff',
                  overflow: 'hidden',
                  maxHeight: 1000,
                  height: '100%',
                }}
                onCellEditCommit={handleEditCellChange}
                getRowClassName={(rows) =>
                  rows.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd'
                }
                hideFooter
              />
            </Box>
          </Grid>
        </Grid>
      </Box>
      <Modal open={saving} aria-labelledby="edit-row-modal">
        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={saving}
        // onClick={handleClose}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      </Modal>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Saving distribution
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to save this distribution?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant='outlined' onClick={handleClose}>Cancel</Button>
          <Button variant='contained' onClick={saveDistribution} autoFocus>
            Save
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={openError}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          May problema
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Maglagay ng actuwal na ditribusyon.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant='outlined' onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
    // <Box sx={{ backgroundColor: '#f9fafb', padding: 3, borderRadius: 4, minHeight: '100%' }}>
    //   <Typography variant="h6">Select Date</Typography>
    //   <LocalizationProvider dateAdapter={AdapterDayjs}>
    //     <DatePicker
    //       value={selectedDate}
    //       onChange={(newValue) => setSelectedDate(newValue)}
    //       renderInput={(params) => <TextField {...params} />}
    //     />
    //   </LocalizationProvider>
    //   <Typography variant="h6">Enter Total Distribution (limit to {totalGrossReturn})</Typography>
    //   <OutlinedInput
    //     type="number"
    //     onChange={(e) => {
    //       const value = Math.min(e.target.value, totalGrossReturn);
    //       setInputText(value);
    //     }}
    //     value={inputText}
    //     fullWidth
    //     inputProps={{
    //       max: totalGrossReturn,
    //     }}
    //   />

    //   <Button variant="contained" color="primary" onClick={distributeResources}>
    //     Distribute
    //   </Button>
    //   <Box sx={{ height: 400, width: '100%', marginTop: 4 }}>
    //     <DataGrid
    //       rows={localFarms}
    //       columns={columns}
    //       disableSelectionOnClick
    //       sx={{
    //         ...datagridStyle,
    //         border: 'none',
    //         paddingX: 2,
    //         overflowX: 'auto',
    //         height: `calc(100% - 8px)`,
    //         backgroundColor: '#fff',
    //         paddingTop: 1,
    //         boxShadow: 2
    //       }}
    //       onCellEditCommit={handleEditCellChange}
    //       getRowClassName={(rows) => 
    //         rows.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd'
    //       }
    //       hideFooter
    //     />
    //   </Box>
    //   <Button variant="contained" color="secondary">
    //     Save Distribution
    //   </Button>
    // </Box>
  );
}
