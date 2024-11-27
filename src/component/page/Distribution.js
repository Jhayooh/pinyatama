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
  AlertTitle,
  Autocomplete,

} from '@mui/material';
import { styled } from "@mui/material/styles";
import Tab, { tabClasses } from "@mui/material/Tab";
import Tabs, { tabsClasses } from "@mui/material/Tabs";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import BackIcon from '@mui/icons-material/ArrowBackIosNew';
import * as XLSX from 'xlsx';
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import { StaticDatePicker } from '@mui/x-date-pickers';
import Pie from '../chart/Pie2';
import { collection, doc, addDoc, setDoc, updateDoc, getDoc, writeBatch } from "firebase/firestore";
import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';
import IconButton from '@mui/material/IconButton';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import { db } from '../../firebase/Config';

// icons
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined'
import { useCollectionData } from 'react-firebase-hooks/firestore';

export default function Distribution({ farms, roi }) {
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [savedDate, setSavedDate] = useState(dayjs());
  const [savedDistributions, setSavedDistributions] = useState([])

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [inputText, setInputText] = useState('');
  const [actualDistribution, setActualDistribution] = useState([]);

  const [localFarms, setLocalFarms] = useState([])
  const [totalGrossReturn, setTotalGrossReturn] = useState(0)
  const [totalActualGross, setTotalActualGross] = useState(0)
  const startOfWeek = selectedDate.startOf('week');
  const endOfWeek = selectedDate.endOf('week');

  const [saving, setSaving] = useState(false)
  const [open, setOpen] = useState(false)
  const [openError, setOpenError] = useState({ show: false })
  const [downloadReport, setDownloadReport] = useState(false)
  const [value, setValue] = useState(null)
  const [selectedRow, setSelectedRow] = useState(false)
  const [editModal, setEditModal] = useState(false)

  const distributionColl = collection(db, '/distributions')
  const [distributions, distributionLoading] = useCollectionData(distributionColl)

  const [reportSelection, setReportSelection] = useState(null)

  function dateFormatter(date) {
    const d = new Date(date)
    return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
  }

  const formattedDate = selectedDate.format('MMMM YYYY');

  const getPercentage = (num1, num2, decimalPlaces = 10) => {
    if (num2 === 0) return 0;
    const percentage = (num1 / num2) * 100;
    return +percentage;
  };

  const exportExcel = async (reportSelectionDate) => {
    console.log("export date", reportSelectionDate);

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Harvest Schedule');

    const currentDate = new Date(reportSelectionDate);
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

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

    const totalColumns = 5 + daysInMonth + 1;

    // Title Row (merged and centered)
    worksheet.mergeCells(1, 1, 1, totalColumns);
    worksheet.getCell(1, 1).value = title.join('\n');
    worksheet.getCell(1, 1).alignment = { vertical: 'middle', horizontal: 'center', wrapText: true };
    worksheet.getCell(1, 1).font = { bold: true, size: 12 };
    worksheet.getRow(1).height = 90;

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

      // Add day letters (e.g., M, T, W) and day numbers
      worksheet.getCell(2, colIndex).value = dayNames[dayOfWeek === 0 ? 6 : dayOfWeek - 1];
      worksheet.getCell(3, colIndex).value = day;

      // Apply center alignment for day headers
      worksheet.getCell(2, colIndex).alignment = { vertical: 'middle', horizontal: 'center' };
      worksheet.getCell(3, colIndex).alignment = { vertical: 'middle', horizontal: 'center' };

      // Highlight day letter and day number with grayish color
      worksheet.getCell(2, colIndex).fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'B4B8B4' }, // Grayish color
      };
      worksheet.getCell(3, colIndex).fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'B4B8B4' }, // Grayish color
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

    // Aggregate distributions by id and dayOfHarvest
    const aggregatedDistributions = distributions.reduce((acc, dist) => {
      const distKey = `${dist.farmId}-${new Date(dist.dayOfHarvest.toDate()).getTime()}`;
      if (!acc[distKey]) {
        acc[distKey] = { ...dist };
      } else {
        acc[distKey].actual += dist.actual;
      }
      return acc;
    }, {});

    const aggregatedDistributionsArray = Object.values(aggregatedDistributions);

    // Filter Farms and Map Data
    const filteredFarms = farms.filter((farm) =>
      aggregatedDistributionsArray.some((dist) => {
        const distDate = new Date(dist.dayOfHarvest.toDate());
        return dist.farmId === farm.id && distDate.getFullYear() === year && distDate.getMonth() === month;
      })
    );

    let rowIndex = 4; // Start from row 4 (after merged title and header rows)
    let totalArea = 0;
    let totalOfTotal = 0;

    filteredFarms.forEach((farm) => {
      const farmDistributions = aggregatedDistributionsArray.filter((dist) => {
        const distDate = new Date(dist.dayOfHarvest.toDate());
        return dist.farmId === farm.id && distDate.getFullYear() === year && distDate.getMonth() === month;
      });

      worksheet.getCell(rowIndex, 1).value = farm.farmerName;
      worksheet.getCell(rowIndex, 2).value = farm.brgy;
      worksheet.getCell(rowIndex, 3).value = farm.mun;
      worksheet.getCell(rowIndex, 4).value = parseFloat(farm.area);
      worksheet.getCell(rowIndex, 5).value = dateFormatter(farm.start_date.toDate());

      let total = 0;
      farmDistributions.forEach((dist) => {
        const distDate = new Date(dist.dayOfHarvest.toDate());
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

    // Add last row with total Area and Total sum, and apply yellow highlighting
    worksheet.getCell(rowIndex, 1).value = 'TOTAL';
    worksheet.getCell(rowIndex, 4).value = totalArea; // Sum of Area column
    worksheet.getCell(rowIndex, totalColIndex).value = totalOfTotal; // Sum of Total column

    // Apply yellow highlight and borders for the total row
    worksheet.getCell(rowIndex, 1).fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'FFFF00' }, // Yellow highlight
    };
    worksheet.getCell(rowIndex, 4).fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'FFFF00' },
    };
    worksheet.getCell(rowIndex, totalColIndex).fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'FFFF00' },
    };

    worksheet.getCell(rowIndex, 1).alignment = { vertical: 'middle', horizontal: 'center' };
    worksheet.getCell(rowIndex, 4).alignment = { vertical: 'middle', horizontal: 'center' };
    worksheet.getCell(rowIndex, totalColIndex).alignment = { vertical: 'middle', horizontal: 'center' };


    worksheet.eachRow({ includeEmpty: true }, (row) => {
      row.eachCell({ includeEmpty: true }, (cell) => {
        if (!(cell.row === 1 && cell.col === 1)) {
          cell.border = {
            top: { style: 'thin' },
            left: { style: 'thin' },
            right: { style: 'thin' },
            bottom: { style: 'thin' },
          };
        }
      });
    });

    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], { type: 'application/octet-stream' });
    saveAs(blob, `Harvest_Schedule_${year}_${month + 1}.xlsx`);
  };

  const handleEditClick = (id, row) => () => {
    setSelectedRow(row);
    setEditModal(true);
  };

  const handleActualValue = () => {

  }

  const handleSavedDate = (date) => {
    setSavedDate(date)

    const month = date.month()
    const year = date.year()

    const filteredDistributions = distributions.filter(item => {
      const filDate = new Date(item.date);
      return filDate.getMonth() === month && filDate.getFullYear() === year;
    });
    setSavedDistributions(filteredDistributions)
  }

  const handleEditCommit = () => {
    // Update the localFarms state
    setLocalFarms((prevFarms) => {
      // Update the specific farm object and return a new array
      const updatedFarms = prevFarms.map((farm) => {
        if (farm.id === selectedRow.id) {
          // If the field being edited exists, update it with the new value
          return { ...farm, actual: parseInt(selectedRow.actual) };
        }
        return farm;
      });
      // Calculate the actual total of 'production'
      const actualTotal = updatedFarms.reduce((sum, farm) => {
        return sum + (farm.actual || 0);
      }, 0);
      setTotalActualGross(actualTotal);

      return updatedFarms;
    });
    setEditModal(false)
  };




  useEffect(() => {
    if (!farms) return
    setInputText(0)
    const filterFarmsByDate = farms
      .filter(farm =>
        farm.cropStage !== 'complete' && farm.remarks !== 'failed'
      )
      .flatMap(farm => {
        if (!farm.batches || farm.batches.length === 0) {
          return [{
            ...farm,
            grossReturn: farm.roi.find(fr => fr.type === 'a').grossReturn - (farm.commit || 0),
          }];
        }

        return farm.batches.map(batch => ({
          ...farm,
          title: `${farm.title} (Batch ${batch.index})`,
          batchId: batch.index,
          harvest_date: batch.harvestDate,
          grossReturn: batch.plantSize - (batch.commit || 0), // Set grossReturn to batch.plantSize
        }));
      })
      .filter(farm => {
        const harvestDate = dayjs(farm.harvest_date.toDate());
        return harvestDate.isAfter(startOfWeek) && harvestDate.isBefore(endOfWeek) && farm.grossReturn !== 0;
      })

    const theTotalGrossReturn = filterFarmsByDate.reduce((sum, farm) => sum + (farm.grossReturn || 0), 0)

    const locFarms = filterFarmsByDate.map(filFarm => {
      const percentage = getPercentage(filFarm.grossReturn, totalGrossReturn);
      const allocation = Math.round(inputText * (percentage / 100));
      return {
        farmId: filFarm.id,
        id: filFarm.batchId ? filFarm.batchId + filFarm.id : filFarm.id,
        batchId: filFarm.batchId || null,
        date: dateFormatter(filFarm.harvest_date.toDate()),
        farm: filFarm.title,
        production: filFarm.grossReturn,
        percentage: percentage.toFixed(2),
        suggested: allocation,
        actual: allocation
      }
    })
    setLocalFarms(locFarms)
    setTotalGrossReturn(theTotalGrossReturn)
    setTotalActualGross(0)
  }, [selectedDate, farms])

  const handleClose = () => {
    setOpen(false)
    setOpenError((prev) => ({ ...prev, show: false }));
    setDownloadReport(false)
  }

  const distribute = () => {
    if (!localFarms || !localFarms.length > 0) {
      setOpenError({
        show: true,
        title: 'No Farms Found',
        content: 'No Farms found to distribute.'
      })
      return
    }

    if (!inputText) {
      setOpenError({
        show: true,
        title: 'Invalid Input Value',
        content: 'The total production to distribute is not a valid number'
      })
      return
    }

    const filterFarmsByDate = farms
      .filter(farm =>
        farm.cropStage !== 'complete' && farm.remarks !== 'failed'
      )
      .flatMap(farm => {
        if (!farm.batches || farm.batches.length === 0) {
          return [{
            ...farm,
            grossReturn: farm.roi.find(fr => fr.type === 'a').grossReturn - (farm.commit || 0),
          }];
        }

        return farm.batches.map(batch => ({
          ...farm,
          title: `${farm.title} (Batch ${batch.index})`,
          batchId: batch.index,
          harvest_date: batch.harvestDate,
          grossReturn: batch.plantSize - (batch.commit || 0), // Set grossReturn to batch.plantSize
        }));
      })
      .filter(farm => {
        const harvestDate = dayjs(farm.harvest_date.toDate());
        return harvestDate.isAfter(startOfWeek) && harvestDate.isBefore(endOfWeek) && farm.grossReturn !== 0;
      })

    const theTotalGrossReturn = filterFarmsByDate.reduce((sum, farm) => sum + (farm.grossReturn || 0), 0)

    const locFarms = filterFarmsByDate.map(filFarm => {
      const percentage = getPercentage(filFarm.grossReturn, totalGrossReturn);
      const allocation = Math.round(inputText * (percentage / 100));
      return {
        farmId: filFarm.id,
        id: filFarm.batchId ? filFarm.batchId + filFarm.id : filFarm.id,
        batchId: filFarm.batchId || null,
        date: dateFormatter(filFarm.harvest_date.toDate()),
        farm: filFarm.title,
        production: filFarm.grossReturn,
        percentage: percentage.toFixed(2),
        suggested: allocation,
        actual: allocation
      }
    })
    const totalAct = locFarms.reduce((acc, act) => acc + (act.actual || 0), 0)
    setTotalActualGross(totalAct)
    setLocalFarms(locFarms)
    setTotalGrossReturn(theTotalGrossReturn)
  };

  function uniqueID() {
    return Math.floor(Math.random() * Date.now())
  }

  const monthYear = (dateStr) => {
    const date = new Date(dateStr);
    const options = { year: 'numeric', month: 'long' };
    return date.toLocaleDateString('en-US', options);
  };

  // useEffect(() => {
  //   if (!distributions) return

  //   const reducedData = distributions.reduce((acc, current) => {
  //     const formattedDate = monthYear(current.date);
  //     const existing = acc.find(item => item.label === formattedDate);

  //     if (!existing) {
  //       acc.push({
  //         farmId: current.farmId,
  //         label: formattedDate,
  //       });
  //     } else {
  //       existing.value += current.value;
  //     }

  //     return acc;
  //   }, []);
  //   setReportSelection(reducedData)
  // }, [distributions])
  const saveDistribution = async () => {
    setSaving(true)
    const currentDate = new Date()
    const distributionColl = collection(db, '/distributions')
    console.log("lcoal farms:", localFarms);
    try {
      const uniqueId = uniqueID()
      for (const farm of localFarms) {
        await addDoc(distributionColl, {
          ...farm,
          dayOfHarvest: selectedDate.toDate(),
          distributionId: uniqueId
        })
        const farmDocRef = doc(db, `farms/${farm.farmId}`);
        const farmDocSnapshot = await getDoc(farmDocRef);
        if (!farmDocSnapshot.exists()) {
          console.error(`Farm with ID ${farm.farmId} does not exist.`);
          continue;
        }
        const farmToCommit = farmDocSnapshot.data();
        console.log("farm to commit", farmToCommit);

        if (farmToCommit.batches) {
          const updatedBatches = farmToCommit.batches.map((batch, index) => {
            if (batch.index === farm.batchId) {
              return {
                ...batch,
                commit: batch.commit ? batch.commit + farm.actual : farm.actual,
              };
            }
            return batch;
          });
          await updateDoc(farmDocRef, {
            batches: updatedBatches,
          });
        }
        await updateDoc(farmDocRef, {
          commit: farmToCommit.commit ? farmToCommit.commit + farm.actual : farm.actual,
        });
        await addDoc(collection(db, `farms/${farm.farmId}/activities`), {
          compId: "",
          createdAt: currentDate,
          desc: `${farm.batchId ? `Batch ${farm.batchId}` : farm.title} committed ${farm.actual} pcs of good size pineapple`,
          label: 'Commitment',
          qnty: farm.actual,
          type: 'a'
        })
      }
      handleClose()
      setSaving(false)
    } catch (error) {
      setSaving(false)
      setOpenError({
        show: true,
        title: 'Saving Error',
        content: error instanceof Error ? error.message : error
      })
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

  const handleEditCellChange = (params) => {
    console.log("params");
    const updatedActualDistribution = [...actualDistribution];
    updatedActualDistribution[params.id] = params.value;
    setActualDistribution(updatedActualDistribution);
  };
  const [tabIndex, setTabIndex] = useState(0);
  const handleTabChange = (_, newValue) => {
    setTabIndex(newValue);
  };


  const columns = [
    {
      field: 'date',
      headerName: 'Date of harvest',
      align: 'center',
      headerAlign: 'center',
      flex: 1,
    },
    {
      field: 'farm',
      headerName: 'Farm Name',
      align: 'center',
      flex: 1,
      headerAlign: 'center',
    },
    {
      field: 'production',
      headerName: 'Production (pcs)',
      align: 'right',
      flex: 1,
      headerAlign: 'center',
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
      align: 'center',
      headerAlign: 'center',
      width: 120

    },
    {
      field: 'suggested',
      headerName: 'Distribution (pcs)',
      align: 'right',
      headerAlign: 'center',
      flex: 1,
      valueFormatter: (value) => {
        if (value == null) {
          return '';
        }
        return `${value.value.toLocaleString('en-US')}`;
      },
    },
    {
      field: 'actual',
      headerName: 'Actual (pcs)',
      flex: 1,
      type: 'number',
      editable: true,
      align: 'right',
      headerAlign: 'center',
    },
    ...(
      tabIndex !== 1
        ? [
          {
            field: 'actions',
            type: 'actions',
            headerName: 'Actions',
            flex: 1,
            cellClassName: 'actions',
            getActions: ({ id, row }) => {
              const editAction = (
                <GridActionsCellItem
                  icon={<EditOutlinedIcon />}
                  label="Edit"
                  className="textPrimary"
                  onClick={handleEditClick(id, row)}
                  color="inherit"
                  sx={{
                    backgroundColor: '#E7F3E7',
                    height: '40px',
                    width: '40px',
                    borderRadius: 3,
                    color: '#58AC58',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    '&:hover': {
                      color: '#FFF',
                      backgroundColor: '#88C488'
                    }
                  }}
                />
              );

              return [editAction];
            },
          },
        ]
        : [])
  ];

  const TabItem = styled(Tab)(({ theme }) => ({
    opacity: 1,
    overflow: "initial",
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    borderTopLeftRadius: theme.spacing(1),
    borderTopRightRadius: theme.spacing(1),
    color: (theme.vars || theme).palette.text.primary,
    backgroundColor: '#fff',
    transition: "0.2s",
    zIndex: 2,
    marginTop: theme.spacing(0.5),
    textTransform: "initial",
    [theme.breakpoints.up("md")]: {
      minWidth: 160,
    },
    "&:before": {
      transition: "0.2s",
    },
    "&:not(:first-of-type)": {
      "&:before": {
        content: '" "',
        position: "absolute",
        left: 0,
        display: "block",
        height: '100%',
        width: "1px",
        zIndex: 1,
        marginTop: theme.spacing(0.5),
        backgroundColor: '#fff',
      },
    },
    [`& + .${tabClasses.selected}::before`]: {
      opacity: 0,
    },
    "&:hover": {
      [`&:not(.${tabClasses.selected})`]: {
        backgroundColor: "#93d6b0",
      },
      "&::before": {
        opacity: 0,
      },
      [`& + .${tabClasses.root}::before`]: {
        opacity: 0,
      },
    },
    [`&.${tabClasses.selected}`]: {
      backgroundColor: '#52be80',
      color: '(theme.vars || theme).palette.common.white,'
    },
    [`&.${tabClasses.selected} + .${tabClasses.root}`]: {
      zIndex: 1,
    },
    [`&.${tabClasses.selected} + .${tabClasses.root}::before`]: {
      opacity: 0,
    },
  }));

  return (
    <>
      <Box
        sx={{
          backgroundColor: '#f9fafb',
          padding: { xs: 1, sm: 2 },
          borderRadius: 4,
          height: '100vh', // Full viewport height
          overflow: 'auto',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Grid container spacing={2} alignItems="stretch" sx={{ flex: '0 0 auto' }}>
          <Grid item lg={12} md={12} sm={12} xs={12} sx={{ mb: 1 }}>
            <h1 style={{ color: '#000' }}>Distribution </h1>
            <Divider sx={{ borderBottomWidth: 2 }} />
          </Grid>
          <Grid item xs={12}>
            <Tabs
              value={tabIndex}
              onChange={handleTabChange}
              textColor="black"
              indicatorColor="success"
              sx={{ color: 'black' }}
            >
              <TabItem label="Distribute" />
              <TabItem label="Saved" />
            </Tabs>
          </Grid>
        </Grid>

        {/* Conditional rendering for "Distribute" */}
        {tabIndex === 0 && (
          <Box sx={{ flex: '1 1 auto', display: 'flex', flexDirection: 'column', gap: 2, overflow: 'hidden' }}>
            <Grid container spacing={2} sx={{ marginTop: 2 }}>
              <Grid item xs={2}>
                <Box sx={{ display: 'flex' }}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      label="Select Date"
                      value={selectedDate}
                      onChange={(newValue) => {
                        setLocalFarms([]);
                        setTotalActualGross(0);
                        setSelectedDate(newValue);
                      }}
                      renderInput={(params) => <TextField {...params} />}
                      sx={{ borderRadius: 8 }}
                    />
                  </LocalizationProvider>
                </Box>
              </Grid>
              <Grid item xs={4}>
                <Box sx={{ display: 'flex' }}>
                  <FormControl fullWidth>
                    <InputLabel htmlFor="total-distribution">Enter Total Distribution</InputLabel>
                    <OutlinedInput
                      id="total-distribution"
                      type="number"
                      onChange={(e) => {
                        if (!localFarms || !localFarms.length) {
                          setOpenError({
                            show: true,
                            title: 'No Farms Found',
                            content: 'No Farms found to distribute.',
                          });
                          setInputText(0);
                          return;
                        }
                        const value = Math.min(e.target.value, totalGrossReturn);
                        setInputText(value);
                      }}
                      value={inputText}
                      inputProps={{
                        max: totalGrossReturn,
                      }}
                      sx={{
                        borderTopLeftRadius: 8,
                        borderBottomLeftRadius: 8,
                        borderTopRightRadius: 0,
                        borderBottomRightRadius: 0,
                      }}
                    />
                  </FormControl>

                  <Button
                    variant="contained"
                    color="warning"
                    onClick={distribute}
                    sx={{
                      borderTopLeftRadius: 0,
                      borderBottomLeftRadius: 0,
                      borderTopRightRadius: 8,
                      borderBottomRightRadius: 8,
                      paddingX: 5
                    }}
                  >
                    Distribute
                  </Button>
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', height: '100%' }}>
                  <Button variant="contained" color="success" onClick={() => setOpen(true)} sx={{ fontSize: 16 }}>
                    Save
                  </Button>
                </Box>
              </Grid>
            </Grid>

            <Grid container spacing={2} sx={{ flex: 1, overflow: 'hidden', paddingBottom: 2 }}>
              <Grid item xs={12} md={4}>
                <Box
                  sx={{
                    padding: 1,
                    height: '100%',
                    width: '100%',
                    overflow: 'hidden',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: '#fff',
                    borderRadius: 3,
                    boxShadow: 1,
                  }}
                >
                  <Pie
                    labels={localFarms.map((lf) => lf.farm)}
                    data={localFarms.map((lf) => lf.suggested)}
                    title="Inaasahang Komit"
                    unit="pcs"
                  />
                </Box>
              </Grid>
              <Grid item xs={12} md={8}>
                <Box
                  sx={{
                    padding: 1,
                    boxShadow: 1,
                    height: '100%',
                    width: '100%',
                    overflow: 'hidden',
                    backgroundColor: '#fff',
                    borderRadius: 3,
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <DataGrid
                    rows={localFarms}
                    columns={columns}
                    disableSelectionOnClick
                    sx={{
                      ...datagridStyle,
                      flex: 1,
                      border: 'none',
                      overflowY: 'auto',
                    }}
                    getRowClassName={(rows) =>
                      rows.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd'
                    }
                    hideFooter
                  />
                  <Box sx={{display:'flex', 
                    justifyContent:'space-between',
                    mt:2,
                    flexDirection:'row'
                  }}>
                    <Typography variant='h5'>Total Actual Distribution</Typography>
                    <Typography variant='h5'>{new Intl.NumberFormat().format(totalActualGross)}</Typography>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Box>
        )}

        {/* Conditional rendering for "Saved" */}
        {tabIndex === 1 && (
          <Grid
            container
            sx={{
              flex: 1,
              flexDirection: 'column',
              padding: 1,
              overflow: 'hidden',
              mt: 1,
            }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <h1 style={{ marginRight: '8px' }}>{savedDate.format('MMMM YYYY')}</h1>
                <IconButton onClick={() => setIsModalOpen(true)} style={{ cursor: 'pointer' }}>
                  <CalendarTodayIcon />
                </IconButton>

                <Modal
                  open={isModalOpen}
                  onClose={() => setIsModalOpen(false)}
                  aria-labelledby="month-year-picker-modal"
                  aria-describedby="select-month-and-year"
                >
                  <Box
                    sx={{
                      position: 'absolute',
                      top: '43%',
                      left: '25%',
                      transform: 'translate(-50%, -50%)',
                      width: 300,
                    }}
                  >
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <StaticDatePicker
                        displayStaticWrapperAs="desktop"
                        value={savedDate}
                        onChange={(newValue) => {
                          handleSavedDate(newValue);
                          setIsModalOpen(false);
                        }}
                        views={['year', 'month']}
                      />
                    </LocalizationProvider>
                  </Box>
                </Modal>
              </Box>
              <Button
                variant="contained"
                color="success"
                disabled={distributionLoading}
                onClick={() => exportExcel(savedDate)}
              >
                {distributionLoading ? 'Waiting...' : 'Download report'}
              </Button>
            </Box>
            <Box
              sx={{
                flex: 1,
                boxShadow: 1,
                height: '100%',
                width: '100%',
                overflow: 'hidden',
                backgroundColor: '#fff',
                borderRadius: 3,
              }}
            >
              <DataGrid
                rows={savedDistributions}
                columns={columns}
                disableSelectionOnClick
                sx={{
                  ...datagridStyle,
                  borderRadius: 3,
                  overflowY: 'auto',
                  height: `calc(100% - 8px)`,
                  backgroundColor: '#fff',
                  border: 'none',
                }}
                onCellEditCommit={handleEditCellChange}
                getRowClassName={(rows) =>
                  rows.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd'
                }
                hideFooter
              />
            </Box>
          </Grid>
        )}
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
          <Button variant='outlined' color='error' onClick={handleClose}>Cancel</Button>
          <Button variant='contained' color='success' onClick={saveDistribution} autoFocus>
            Save
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={openError.show}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {openError.title}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {openError.content}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant='contained' color='error' onClick={handleClose}>Ok</Button>
        </DialogActions>
      </Dialog>
      <Modal open={downloadReport} onClose={handleClose} aria-labelledby="edit-row-modal">
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            bgcolor: 'background.paper',
            borderRadius: '5px',
            boxShadow: 24,
            p: 1,
            width: 380,
          }}
        >
          <Autocomplete
            value={value}
            onChange={(event, newValue) => {
              setValue(newValue);
            }}
            disablePortal
            options={reportSelection}
            sx={{ width: '100%' }}
            renderInput={(params) => <TextField {...params} label="Reports" />}
          />
          <Button variant='contained' color='success' onClick={() => { exportExcel(value.label) }}>
            Download
          </Button>
        </Box>
      </Modal>
      <Modal open={editModal} onClose={() => setEditModal(false)} aria-labelledby="edit-row-modal">
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            bgcolor: 'background.paper',
            borderRadius: '5px',
            boxShadow: 24,
            p: 4,
            width: 380,
          }}
        >
          <TextField
            label="Actual Value"
            name="actual"
            type="number"
            value={selectedRow.actual}
            InputProps={{
              inputProps: {
                max: selectedRow.suggested,
                min: 0,
              }
            }}
            onChange={(value) => {
              const inputValue = parseInt(value.target.value, 10);

              console.log("Input value type:", typeof (inputValue), "value:", inputValue);

              const newValue = (isNaN(inputValue) || inputValue < 0)
                ? 0
                : Math.min(inputValue, selectedRow.suggested);

              setSelectedRow((prev) => ({
                ...prev,
                actual: newValue,
              }));
            }}
            fullWidth
            sx={{ mb: 2 }}
          />

          <Box sx={{ display: 'flex', justifyContent: 'space-around' }}>
            <button className="btn-view-all" onClick={handleEditCommit}>
              Save
            </button>
            <button className="btn-view-all" onClick={() => setEditModal(false)}>
              Cancel
            </button>
          </Box>
        </Box>
      </Modal>
    </>
  );
}
