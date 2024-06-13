import { Modal, Box } from '@mui/material'
import React, { useState } from 'react'
import * as XLSX from 'xlsx';
import Button from '@mui/material/Button';

// icon
import UploadIcon from '@mui/icons-material/FileUploadOutlined';
import CloseIcon from '@mui/icons-material/CloseOutlined';

function Importer() {
    const [showModal, setShowModal] = useState(false)
    const [file, setFile] = useState(null)
    const [jsonData, setJsonData] = useState("")

    const handleClose = () => {
        setShowModal(false)
    }

    const handleConvert = () => {
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
              const data = e.target.result;
              const workbook = XLSX.read(data, { type: "binary" });
              const sheetName = workbook.SheetNames[0];
              const worksheet = workbook.Sheets[sheetName];
              const json = XLSX.utils.sheet_to_json(worksheet, {header: ['mun', 'brgy', 'farmerName', 'sex', 'area', 'plantNumber', 'start_date', 'cropStage', 'harvest_date']});
              console.log("workbook:", workbook);
              console.log("sheetName:", sheetName);
              console.log("worksheet:", worksheet);
              setJsonData(JSON.stringify(json, null, 2))
            };
            reader.readAsBinaryString(file);
        }
    }

    return (
        <>
            <Button variant='outlined' color='success' onClick={() => setShowModal(true)}><UploadIcon />Upload</Button>

            <Modal
                open={showModal}
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
                    <Button
                        variant='text'
                        sx={{
                            position: 'absolute',
                            top: 0,
                            right: 0,
                            zIndex: 1,
                            color: 'grey'
                        }}
                        onClick={() => setShowModal(false)}>
                        <CloseIcon />
                    </Button>

                    <input
                        type="file"
                        accept=".xls,.xlsx"
                        onChange={(e) => setFile(e.target.files[0])}
                    />
                    <Button
                        variant='contained'
                        color='success'
                        fullWidth
                        sx={{ justifyContent: 'center', alignItems: 'center', mt: 2, }}
                        onClick={handleConvert}>
                        Save
                    </Button>
                    <pre>{jsonData}</pre>
                </Box>
            </Modal >
        </>
    )
}

export default Importer