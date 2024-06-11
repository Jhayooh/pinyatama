import { Modal, Box } from '@mui/material'
import React, { useState } from 'react'
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

// icon
import GetAppIcon from '@mui/icons-material/GetApp';

function Exporter({ farms }) {
    const [fileName, setFileName] = useState('PINEAPPLE')
    const [exportModal, setExportModal] = useState(false)

    const handleClose = () => {
        setExportModal(false)
    }

    const handleExport = () => {
        const worksheet = XLSX.utils.json_to_sheet(farms);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

        // Buffer to store the generated Excel file
        const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
        const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8' });

        saveAs(blob, fileName+'.xlsx');
    };

    return (
        <>
        <button className='btn-view-all' onClick={()=>{setExportModal(true)}}><GetAppIcon /></button>

        <Modal
                open={exportModal}
                onClose={handleClose}
            >
                <Box sx={{
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
                }}>
                    <button onClick={handleExport}>Save</button>
                </Box>
            </Modal >
        </>
    )
}

export default Exporter