import { Modal, Typography, Box, TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton } from '@mui/material'
import React, { useState } from 'react'
import { saveAs } from 'file-saver';
import Button from '@mui/material/Button';
import ExcelJS from 'exceljs';
import CloseIcon from '@mui/icons-material/Close';

// icon
import DownloadIcon from '@mui/icons-material/FileDownloadOutlined';
import FileIcon from '@mui/icons-material/InsertDriveFileOutlined';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import ExcelIcon from './image_src/excel.png'
// import CloseIcon from '@mui/icons-material/CloseOutlined';


function Exporter({ farms }) {
    const date = new Date();
    const formattedDate = `${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}-${date.getFullYear()}`;

    const [fileName, setFileName] = useState(formattedDate);
    const [exportModal, setExportModal] = useState(false)

    // const customHeader = [[
    //     "Municipalities",
    //     "Barangay",
    //     "Name of Farmers",
    //     "Sex",
    //     "Area (Ha)",
    //     "Number of Plants",
    //     "Date of Planting",
    //     "Stage of Crops",
    //     "Date of Harvest",
    //     "Date of application of flower inducer",
    // ]]

    // const propertiesToRemove = [
    //     "title",
    //     "brgyUID",
    //     "images",
    //     "geopoint",
    //     "id",
    //     "soil",
    //     "farmerId",
    //     "npk",
    //     "ethrel",
    //     "fieldId"
    // ]

    const handleClose = () => {
        setExportModal(false)
    }

    function formatDate(timestamp) {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        console.log("dateeee", date.toLocaleDateString('en-US', options));

        return timestamp.toLocaleDateString('en-US', options);
    }

    // function convertDate(date) {
    //     const converted = 25569.0 + ((date.getTime() - (date.getTimezoneOffset() * 60 * 1000)) / (1000 * 60 * 60 * 24));
    //     return converted
    // }

    const handleExport = async () => {
        const workbook = new ExcelJS.Workbook();

        // Fetch and load the existing Excel template
        const response = await fetch('/pineappleData.xlsx');
        if (!response.ok) {
            console.error('Failed to fetch Excel file:', response.statusText);
            return;
        }

        const data = await response.arrayBuffer();
        await workbook.xlsx.load(data);
        console.log("workbook:", workbook)
        console.log('Worksheets[1]:', workbook.worksheets.map(ws => ws.name));
        console.log('Number of worksheets:', workbook.worksheets.length);

        // Get the first worksheet (1-based index)

        const worksheet = workbook.getWorksheet();

        console.log('Worksheets:', worksheet); // Log the worksheet to check its value
        if (!worksheet) {
            console.error('Worksheet is undefined.');
            return; // Exit if the worksheet is not found
        }

        farms.forEach((farm, index) => {
            worksheet.insertRow(11 + index, [
                farm.mun,
                farm.farmerName,
                farm.area,
                farm.plantNumber,
                formatDate(farm.start_date.toDate()),
                farm.cropStage,
                formatDate(farm.harvest_date.toDate()),
            ]);
        });

        console.log("worksheet ", worksheet);

        // Write the modified workbook to a buffer
        const buffer = await workbook.xlsx.writeBuffer();

        // Create a Blob from the buffer and trigger the download
        const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8' });
        saveAs(blob, `${fileName.trim()}.xlsx`);
    }

    // const handleExport = () => {
    //     if (!farms) return console.log("wala laman")

    //     farms.forEach(farm => {
    //         propertiesToRemove.forEach(prop => {
    //             delete farm[prop];
    //         });

    //         if (farm.start_date) {
    //             farm.start_date = new Date(farm.start_date.toMillis())
    //         }
    //         if (farm.harvest_date) {
    //             farm.harvest_date = new Date(farm.harvest_date.toMillis())
    //         }
    //         if (farm.isEthrel) {
    //             farm.isEthrel = new Date(farm.isEthrel.toMillis())
    //         } else {
    //             farm.isEthrel = "N/A"
    //         }

    //     });


    //     const worksheet = XLSX.utils.json_to_sheet(farms, { header: ["mun", "brgy", "farmerName", "sex", "area", "plantNumber", "start_date", "cropStage", "harvest_date", "isEthrel"], skipHeader: true, origin: "A2" });
    //     XLSX.utils.sheet_add_aoa(worksheet, customHeader, { origin: "A1" });
    //     const max_width = farms.reduce((w, r) => Math.max(w, r.farmerName.length), 10);
    //     worksheet["!cols"] = [{ wch: max_width }];
    //     const workbook = XLSX.utils.book_new();
    //     XLSX.utils.book_append_sheet(workbook, worksheet, fileName);

    //     // Buffer to store the generated Excel file
    //     const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    //     const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8' });

    //     saveAs(blob, fileName + '.xlsx');
    // };

    return (
        <>
            <Button variant='text' color='error' onClick={() => { setExportModal(true) }}><DownloadIcon /> Download</Button>
            {/* <Button onClick={() => { setExportModal(true) }}>Download</Button> */}
            {/* <Modal
                open={exportModal}
                onClose={handleClose}
            >
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        maxHeight: '92%',
                        overflowX: 'auto',
                        width: 400,
                        bgcolor: 'background.paper',
                        boxShadow: 24,
                        p: 4,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        borderRadius: 2
                    }}>
                    <Button
                        variant='text'
                        sx={{
                            position: 'absolute',
                            top: 0,
                            right: 0,
                            zIndex: 1,
                            color: 'grey'
                        }}
                        onClick={() => setExportModal(false)}>
                        <CloseIcon />
                    </Button>
                    <Box
                        sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', }} >
                        <FileIcon />
                        <TextField

                            id='outlined-basic'
                            label='Filename'
                            variant='outlined'
                            value={fileName}
                            onChange={(e) => setFileName(e.target.value)}
                            sx={{ flex: 1 }}
                        />
                    </Box>

                    <Button
                        fullWidth
                        variant='contained'
                        color='success'
                        sx={{ justifyContent: 'center', alignItems: 'center', mt: 2, }}
                        onClick={handleExport}>
                        Save
                    </Button>
                </Box>
            </Modal > */}
            <Dialog
                open={exportModal}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                maxWidth="sm"
            >
                <DialogTitle sx={{ backgroundColor: 'green', color: 'white', fontWeight: 'bold' }} id="alert-dialog-title">
                    Mag-save
                </DialogTitle>
                <IconButton
                    aria-label="close"
                    onClick={handleClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: '#fefefe'
                    }}
                >
                    <CloseIcon />
                </IconButton>
                <DialogContent dividers sx={{ alignItems: 'center', justifyContent: 'center' }}>
                    <Typography sx={{marginBottom:2}} >Ilagay ang pangalan ng file</Typography>
                    <Box sx={{ display: 'flex', }}>
                        <img src={ExcelIcon} alt="Excel Icon" style={{ width: 52, height: 'auto', marginRight: 18 }} />
                        <TextField
                            id='outlined-basic'
                            variant='outlined'
                            value={fileName}
                            onChange={(e) => setFileName(e.target.value)}
                            sx={{ flex: 1 }}
                        />
                    </Box>
                </DialogContent>
                <DialogActions sx={{ alignItems: 'center', justifyContent: 'center' }}>
                    <Button
                        autoFocus
                        variant='contained'
                        color='success'
                        onClick={handleExport}>
                        Save
                    </Button>
                </DialogActions>
            </Dialog >
        </>
    )
}

export default Exporter