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
import ExcelIcon from './../image_src/excel.png'


function Exporter({ farms }) {
    const date = new Date();
    const formattedDate = `${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}-${date.getFullYear()}`;

    const [fileName, setFileName] = useState(formattedDate);
    const [exportModal, setExportModal] = useState(false)

    const handleClose = () => {
        setExportModal(false)
    }

    function formatDate(timestamp) {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        console.log("dateeee", date.toLocaleDateString('en-US', options));

        return timestamp.toLocaleDateString('en-US', options);
    }


    const handleExport = async () => {
        const workbook = new ExcelJS.Workbook();

        const response = await fetch('/pineappleData.xlsx');
        if (!response.ok) {
            console.error('Failed to fetch Excel file:', response.statusText);
            return;
        }

        const data = await response.arrayBuffer();
        await workbook.xlsx.load(data);

        const worksheet = workbook.getWorksheet();

        console.log('Worksheets:', worksheet);
        if (!worksheet) {
            console.error('Worksheet is undefined.');
            return;
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
        const buffer = await workbook.xlsx.writeBuffer();
        const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8' });
        saveAs(blob, `${fileName.trim()}.xlsx`);
    }

    return (
        <>
            <Button variant='text' color='error' onClick={() => { setExportModal(true) }}><DownloadIcon /> Download</Button>
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