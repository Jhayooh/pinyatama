import React, { useState, useEffect } from 'react';
import { Gallery } from 'react-grid-gallery';
import { getStorage, ref, listAll, getDownloadURL, uploadBytesResumable } from 'firebase/storage';
import { storage } from '../firebase/Config';
import { Button, Box, Input, Modal, TextField } from '@mui/material';


//icon
import FileIcon from '@mui/icons-material/InsertDriveFileOutlined';
import CloseIcon from '@mui/icons-material/CloseOutlined';


export default function Farm({ farmId }) {
    const [images, setImages] = useState([]);
    const [file, setFile] = useState(null);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [modal, setModal] = useState(false)

    const handleClose = () => {
        setModal(false)
    }

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const listRef = ref(storage, `FarmImages/${farmId}`);
                const result = await listAll(listRef);

                const imagePromises = result.items.map(async (itemRef) => {
                    const downloadURL = await getDownloadURL(itemRef);
                    return {
                        src: downloadURL,
                    };
                });
                const imagesData = await Promise.all(imagePromises);
                setImages(imagesData);
            } catch (error) {
                console.error('Error fetching images: ', error);
            }
        };
        fetchImages();
    }, [farmId]);

    const handleFileChange = (e) => {
        if (e.target.files[0]) {
            setFile(e.target.files[0]);
        }
    };

    const handleUpload = () => {
        if (!file) return;

        const storageRef = ref(storage, `FarmImages/${farmId}/${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on('state_changed',
            (snapshot) => {
                // Observe state change events such as progress, pause, and resume
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setUploadProgress(progress);
            },
            (error) => {
                // Handle unsuccessful uploads
                console.error('Upload error:', error);
            },
            async () => {
                // Handle successful uploads on complete
                const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                setImages((prevImages) => [...prevImages, { src: downloadURL }]);
                setUploadProgress(0);
                setFile(null);
            }
        );
    };

    return (
        <>
            <Box>
                <Box mt={2} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Button variant='contained' color='success' onClick={() => { setModal(true) }}>Add Image</Button>
                    {uploadProgress > 0 && <progress value={uploadProgress} max="100" />}
                </Box>
                <Gallery images={images} />
            </Box>
            <Modal
                open={modal}
                close={handleClose}>

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
                        onClick={() => setModal(false)}>
                        <CloseIcon />
                    </Button>
                    <Box
                        sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', }} >
                        <FileIcon />
                        <Input type="file" onChange={handleFileChange} />
                    </Box>

                    <Button
                        fullWidth
                        variant='contained'
                        color='success'
                        sx={{ justifyContent: 'center', alignItems: 'center', mt: 2, }}
                        onClick={() => {
                            handleUpload()
                            setModal(false)
                        }}>
                        Save
                    </Button>
                </Box>
            </Modal>
        </>
    );
}
