import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  FormControl,
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
  Autocomplete,

} from '@mui/material';
import { styled } from "@mui/material/styles";
import Tab, { tabClasses } from "@mui/material/Tab";
import Tabs, { tabsClasses } from "@mui/material/Tabs";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import { StaticDatePicker } from '@mui/x-date-pickers';
import Pie from '../chart/Pie2';
import { collection, doc, addDoc, setDoc, updateDoc, getDoc, getDocs, writeBatch, query, where } from "firebase/firestore";
import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';
import IconButton from '@mui/material/IconButton';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import { db } from '../../firebase/Config';

import { Table } from 'antd'

// icons
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';

export default function Distribution({ farms, roi }) {
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [savedDate, setSavedDate] = useState(dayjs());
  const [savedDistributions, setSavedDistributions] = useState([])

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [inputText, setInputText] = useState('');
  const [actualDistribution, setActualDistribution] = useState([]);
  const [distributionData, setDistributionData] = useState(null)

  const [localFarms, setLocalFarms] = useState([])
  const [totalGrossReturn, setTotalGrossReturn] = useState(0)
  const [totalActualGross, setTotalActualGross] = useState(0)
  const startOfWeek = selectedDate.startOf('week');
  const endOfWeek = startOfWeek.add(13, 'days').endOf('day');

  const [saving, setSaving] = useState(false)
  const [open, setOpen] = useState(false)
  const [openError, setOpenError] = useState({ show: false })
  const [downloadReport, setDownloadReport] = useState(false)
  const [value, setValue] = useState(null)
  const [selectedRow, setSelectedRow] = useState(false)
  const [editModal, setEditModal] = useState(false)

  const [reportSelection, setReportSelection] = useState(null)

  function dateFormatter(date) {
    const d = new Date(date)
    return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
  }

  const fetchDistributions = async (month, year) => {
    try {
      const distributionColl = collection(db, 'distributions');
      const distributionQuery = query(
        distributionColl,
        where('month', '==', month),
        where('year', '==', year)
      );
      const querySnapshot = await getDocs(distributionQuery);
      const distri = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      return distri
    } catch (error) {
      console.error('Error fetching distributions:', error);
    }
  };

  const getPercentage = (num1, num2, decimalPlaces = 10) => {
    if (num2 === 0) return 0;
    const percentage = (num1 / num2) * 100;
    return +percentage;
  };

  const exportExcel = async (reportSelectionDate) => {

    const savedDistri = getDistriData(distributionData).sort((a, b) => {
      return a.farmerName.toLowerCase().localeCompare(b.farmerName.toLowerCase())
    })

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

    worksheet.mergeCells(1, 1, 1, totalColumns);
    worksheet.getCell(1, 1).value = title.join('\n');
    worksheet.getCell(1, 1).alignment = { vertical: 'middle', horizontal: 'center', wrapText: true };
    worksheet.getCell(1, 1).font = { bold: true, size: 12 };
    worksheet.getRow(1).height = 90;

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

      if (header === 'Name of farmers') worksheet.getColumn(colIndex).width = 20;
      if (header === 'Barangay') worksheet.getColumn(colIndex).width = 15;
      if (header === 'Municipality') worksheet.getColumn(colIndex).width = 15;
      if (header === 'Area') worksheet.getColumn(colIndex).width = 10;
      if (header === 'Planting date') worksheet.getColumn(colIndex).width = 15;
    });

    const dayNames = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const dayOfWeek = date.getDay();
      const colIndex = day + headers.length;

      worksheet.getCell(2, colIndex).value = dayNames[dayOfWeek === 0 ? 6 : dayOfWeek - 1];
      worksheet.getCell(3, colIndex).value = day;

      worksheet.getCell(2, colIndex).alignment = { vertical: 'middle', horizontal: 'center' };
      worksheet.getCell(3, colIndex).alignment = { vertical: 'middle', horizontal: 'center' };

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

    const totalColIndex = headers.length + daysInMonth + 1;
    worksheet.mergeCells(2, totalColIndex, 3, totalColIndex);
    worksheet.getCell(2, totalColIndex).value = 'Total';
    worksheet.getCell(2, totalColIndex).alignment = {
      vertical: 'middle',
      horizontal: 'center',
    };

    const aggregatedDistributions = savedDistri.reduce((acc, dist) => {
      const distKey = `${dist.farmId}-${new Date(dist.commitDate).getTime()}`;
      if (!acc[distKey]) {
        acc[distKey] = { ...dist };
      } else {
        acc[distKey].actualCommit += dist.actualCommit;
      }
      return acc;
    }, {});

    const aggregatedDistributionsArray = Object.values(aggregatedDistributions);

    // Filter Farms and Map Data
    const filteredFarms = farms.filter((farm) =>
      aggregatedDistributionsArray.some((dist) => {
        const distDate = new Date(dist.commitDate);
        return dist.farmId === farm.id && distDate.getFullYear() === year && distDate.getMonth() === month;
      })
    );

    let rowIndex = 4; // Start from row 4 (after merged title and header rows)
    let totalArea = 0;
    let totalOfTotal = 0;

    filteredFarms.forEach((farm) => {
      const farmDistributions = aggregatedDistributionsArray.filter((dist) => {
        const distDate = new Date(dist.commitDate);
        return dist.farmId === farm.id && distDate.getFullYear() === year && distDate.getMonth() === month;
      });

      worksheet.getCell(rowIndex, 1).value = farm.farmerName;
      worksheet.getCell(rowIndex, 2).value = farm.brgy;
      worksheet.getCell(rowIndex, 3).value = farm.mun;
      worksheet.getCell(rowIndex, 4).value = parseFloat(farm.area);
      worksheet.getCell(rowIndex, 5).value = dateFormatter(farm.start_date.toDate());

      let total = 0;
      farmDistributions.forEach((dist) => {
        const distDate = new Date(dist.commitDate);
        const colIndex = headers.length + distDate.getDate();
        const value = dist.actualCommit || '';
        worksheet.getCell(rowIndex, colIndex).value = value;
        total += value || 0;
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

  const handleSavedDate = async (date) => {
    setSavedDate(date)

    const month = date.month()
    const year = date.year()

    const distri = await fetchDistributions(month, year)

    const dataDistri = distri?.reduce((acc, d) => {
      const farm = farms.find(farm => farm.id === d.farmId)
      const commitDate = new Date(d.dayOfCommit.toDate()).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });

      if (!acc[commitDate]) {
        acc[commitDate] = {
          key: d.distributionId.toString(),
          commitDate,
          totalArea: 0,
          totalProduction: 0
        };
      }

      acc[commitDate].totalArea += parseFloat(farm.area) || 0;
      acc[commitDate].totalProduction += d.actual || 0
      return acc;
    }, {});

    setDistributionData(distri)
    setSavedDistributions(Object.values(dataDistri).sort((a, b) => new Date(a.commitDate) - new Date(b.commitDate)))
  }

  const handleEditCommit = () => {
    setLocalFarms((prevFarms) => {
      const updatedFarms = prevFarms.map((farm) => {
        if (farm.id === selectedRow.id) {
          return { ...farm, actual: parseInt(selectedRow.actual) };
        }
        return farm;
      });
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
    console.log("farms sa useEffect (1)", farms);

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
          grossReturn: batch.plantSize - (batch.commit || 0),
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

    console.log("farms sa distribute", filterFarmsByDate);

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

  const saveDistribution = async () => {
    setSaving(true)
    console.log("farms sa save distribution", localFarms);
    const currentDate = new Date()
    const distributionColl = collection(db, '/distributions')
    try {
      const uniqueId = uniqueID()
      for (const farm of localFarms) {
        await addDoc(distributionColl, {
          ...farm,
          dayOfCommit: selectedDate.toDate(),
          month: selectedDate.month(),
          year: selectedDate.year(),
          id: uniqueID() + "-" + farm.id,
          distributionId: uniqueId
        })

        const farmDocRef = doc(db, `farms/${farm.farmId}`);
        const farmDocSnapshot = await getDoc(farmDocRef);

        const farmToCommit = farmDocSnapshot.data();

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

  const commitDateColumn = [
    {
      title: 'Date of Commit',
      dataIndex: 'commitDate',
      key: 'commitDate',
    },
    {
      title: 'Total Area',
      dataIndex: "totalArea",
      key: "totalArea",
      render: (e) => {
        return e.toFixed(2)
      }
    },
    {
      title: 'Total Pineapple',
      dataIndex: "totalProduction",
      key: "totalProduction"
    }
  ]

  const commitDateColumnExpanded = [
    {
      title: 'Date of Commit',
      dataIndex: 'commitDate',
      key: 'commitDate',
      render: (e) => {
        return dateFormatter(e)
      }
    },
    {
      title: 'Area',
      dataIndex: "area",
      key: "area",
    },
    {
      title: 'No. of Plants',
      dataIndex: "actualCommit",
      key: "actualCommit",
    },
    {
      title: "Name of Farmer",
      dataIndex: "farmerName",
      key: "farmerName",
    },
    {
      title: "Date of Planting",
      dataIndex: "startDate",
      key: 'startDate',
      render: (e) => {
        return dateFormatter(e)
      }
    },
    {
      title: 'Date of Harvest',
      dataIndex: 'harvestDate',
      key: 'harvestDate',
      render: (e) => {
        return dateFormatter(e)
      }
    }
  ]

  const getDistriData = (distri) => {
    return distri?.map(d => {
      const farm = farms.find(farm => farm.id === d.farmId)
      if (farm) {
        return {
          farmerName: farm.farmerName,
          brgy: farm.brgy,
          mun: farm.mun,
          area: farm.area,
          startDate: farm.start_date.toDate(),
          harvestDate: farm.harvest_date.toDate(),
          commitDate: d.dayOfCommit.toDate(),
          actualCommit: d.actual,
          id: d.id,
          farmId: farm.id
        }
      }
    })
  }

  const expandedRowRender = (e) => {
    const dataGridDistri = distributionData
      .filter(df => {
        const dCommitDate = new Date(df.dayOfCommit.toDate()).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        });
        if (dCommitDate === e.commitDate) {
          return true
        }
        return false
      })

    const dataSource = getDistriData(dataGridDistri)
    return (
      <Table
        columns={commitDateColumnExpanded}
        dataSource={dataSource}
        pagination={false}
      />
    )
  }

  const columnsSavedDistri = [
    {
      field: 'farmerName',
      headerName: 'Name of Farmer',
      align: 'center',
      headerAlign: 'center',
      flex: 1
    },
    {
      field: 'brgy',
      headerName: 'Barangay',
      align: 'center',
      headerAlign: 'center',
      flex: 1
    },
    {
      field: 'mun',
      headerName: 'Municipality',
      align: 'center',
      headerAlign: 'center',
      flex: 1
    },
    {
      field: 'area',
      headerName: 'Area',
      align: 'center',
      headerAlign: 'center',
    },
    {
      field: 'startDate',
      headerName: 'Planting Date',
      align: 'center',
      headerAlign: 'center',
      flex: 1,
      valueFormatter: (d) => {
        if (!d) {
          return ''
        }
        return dateFormatter(d.value)
      }
    },
    {
      field: 'commitDate',
      headerName: 'Distribution Date',
      align: 'center',
      headerAlign: 'center',
      flex: 1,
      valueFormatter: (d) => {
        if (!d) {
          return ''
        }
        return dateFormatter(d.value)
      }
    },
    {
      field: 'actualCommit',
      headerName: 'No. of Plants (pcs)',
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
  ]


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
          padding: 3,
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
                      paddingX: 2,
                      fontSize: 12
                    }}
                  >
                    Calculate Distribution
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
                    initialState={{
                      sorting: {
                        sortModel: [{ field: 'date', sort: 'asc' }],
                      },
                    }}
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
                  <Box sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    mt: 2,
                    flexDirection: 'row'
                  }}>
                    <Typography variant='h5' sx={{ fontWeight: 700 }}>Total Actual Distribution</Typography>
                    <Typography variant='h5' sx={{ fontWeight: 700 }}>{new Intl.NumberFormat().format(totalActualGross)}</Typography>
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
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                pb: 2,
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <h1 style={{ marginRight: '8px' }}>{savedDate.format('MMMM YYYY')}</h1>
                <IconButton
                  onClick={() => setIsModalOpen(true)}
                  style={{ cursor: 'pointer' }}
                >
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
                          handleSavedDate(newValue)
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
                disabled={!savedDistributions}
                onClick={() => exportExcel(savedDate)}
              >
                {!savedDistributions ? 'Waiting...' : 'Download report'}
              </Button>
            </Box>
            <Box
              sx={{
                flex: 1,
                overflow: 'auto',
                backgroundColor: 'yellow',
                borderRadius: 3,
              }}
            >
              <Table
                columns={commitDateColumn}
                dataSource={savedDistributions}
                pagination={false}
                expandable={{
                  expandedRowRender,
                  defaultExpandedRowKeys: ['0']
                }}
              />
              {/* <DataGrid
                rows={savedDistributions}
                columns={columnsSavedDistri}
                disableSelectionOnClick
                sx={{
                  ...datagridStyle,
                  borderRadius: 3,
                  height: '100%',
                  width: '100%',
                  backgroundColor: '#fff',
                  border: 'none',
                }}
                onCellEditCommit={handleEditCellChange}
                getRowClassName={(rows) =>
                  rows.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd'
                }
                hideFooter
              /> */}
            </Box>
          </Grid>
        )}
      </Box>



      <Modal open={saving} aria-labelledby="edit-row-modal">
        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={saving}
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
                max: selectedRow.production,
                min: 0,
              }
            }}
            onChange={(value) => {
              const inputValue = parseInt(value.target.value, 10);
              const newValue = (isNaN(inputValue) || inputValue < 0)
                ? 0
                : Math.min(inputValue, selectedRow.production);

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
