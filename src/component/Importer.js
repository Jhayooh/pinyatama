import { Modal, Box } from '@mui/material'
import React, { useState } from 'react'
import * as XLSX from 'xlsx';

// icon
import PublishIcon from '@mui/icons-material/Publish';

function Importer() {
    const [showModal, setShowModal] = useState(false)
    const [file, setFile] = useState(null)
    const [jsonData, setJsonData] = useState("")

    const handleConvert = () => {
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
              const data = e.target.result;
              const workbook = XLSX.read(data, { type: "binary" });
              const sheetName = workbook.SheetNames[0];
              const worksheet = workbook.Sheets[sheetName];
              const json = XLSX.utils.sheet_to_json(worksheet);
              setJsonData(JSON.stringify(json, null, 2))
              console.log("The json data:", JSON.stringify(json, null, 2))
            };
            reader.readAsBinaryString(file);
          }
    }

    return (
        <>
            <button className='btn-view-all' onClick={() => setShowModal(true)}><PublishIcon />Import</button>

            <Modal
                open={showModal}
                onClose={setShowModal}
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
                    <input
                        type="file"
                        accept=".xls,.xlsx"
                        onChange={(e) => setFile(e.target.files[0])}
                    />
                    <button onClick={handleConvert}>Convert</button>
                    <pre>{jsonData}</pre>
                </Box>
            </Modal >
        </>
    )
}

export default Importer