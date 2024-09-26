import { Modal, Box, TextField } from '@mui/material'
import React, { useState } from 'react'
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import Button from '@mui/material/Button';

// icon
import DownloadIcon from '@mui/icons-material/FileDownloadOutlined';
import FileIcon from '@mui/icons-material/InsertDriveFileOutlined';
import CloseIcon from '@mui/icons-material/CloseOutlined';


function Exporter({ farms }) {
    const [fileName, setFileName] = useState('PINEAPPLE')
    const [exportModal, setExportModal] = useState(false)

    const customHeader = [[
        "Municipalities",
        "Barangay",
        "Name of Farmers",
        "Sex",
        "Area (Ha)",
        "Number of Plants",
        "Date of Planting",
        "Stage of Crops",
        "Date of Harvest",
        "Date of application of flower inducer",
    ]]

    const propertiesToRemove = [
        "title",
        "brgyUID",
        "images",
        "geopoint",
        "id",
        "soil",
        "farmerId",
        "npk"
    ]

    const handleClose = () => {
        setExportModal(false)
    }

    function convertDate(date) {
        const converted = 25569.0 + ((date.getTime() - (date.getTimezoneOffset() * 60 * 1000)) / (1000 * 60 * 60 * 24));
        return converted
    }

    const handleExport = () => {
        if (!farms) return console.log("wala laman")

        farms.forEach(farm => {
            propertiesToRemove.forEach(prop => {
                delete farm[prop];
            });

            if (farm.start_date) {
                farm.start_date = new Date(farm.start_date.toMillis())
            }
            if (farm.harvest_date) {
                farm.harvest_date = new Date(farm.harvest_date.toMillis())
            }

        });


        const worksheet = XLSX.utils.json_to_sheet(farms, { header: ["mun", "brgy", "farmerName", "sex", "area", "plantNumber", "start_date", "cropStage", "harvest_date", "isEthrel"], skipHeader: true, origin: "A2" });
        XLSX.utils.sheet_add_aoa(worksheet, customHeader, { origin: "A1" });
        const max_width = farms.reduce((w, r) => Math.max(w, r.farmerName.length), 10);
        worksheet["!cols"] = [{ wch: max_width }];
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, fileName);

        // Buffer to store the generated Excel file
        const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
        const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8' });

        saveAs(blob, fileName + '.xlsx');
    };

    return (
        <>
            <Button variant='text' color='error' onClick={() => { setExportModal(true) }}><DownloadIcon /> Download</Button>
            {/* <Button onClick={() => { setExportModal(true) }}>Download</Button> */}
            <Modal
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
            </Modal >
        </>
    )
}

export default Exporter