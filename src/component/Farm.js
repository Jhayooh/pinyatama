import React, { useState, useEffect } from 'react';
import { Gallery } from 'react-grid-gallery';
import { getStorage, ref, listAll, getDownloadURL, uploadBytesResumable, deleteObject } from 'firebase/storage';
import { storage } from '../firebase/Config';
import { Button, Box, Input, Modal, Divider } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Fab from '@mui/material/Fab';

// Icons
import FileIcon from '@mui/icons-material/InsertDriveFileOutlined';
import CloseIcon from '@mui/icons-material/CloseOutlined';

export default function Farm({ farmId }) {
    const [images, setImages] = useState([]);
    const [file, setFile] = useState(null);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [modal, setModal] = useState(false);
    const [selectedImages, setSelectedImages] = useState([]);
    const [open, setOpen] = React.useState(false);

    const handleClose = () => {
        setModal(false);
    };

    const handleDialogOpen = () => {
        setOpen(true);
    };

    const handleDialogClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const listRef = ref(storage, `FarmImages/${farmId}`);
                const result = await listAll(listRef);

                const imagePromises = result.items.map(async (itemRef) => {
                    const downloadURL = await getDownloadURL(itemRef);
                    return {
                        src: downloadURL,
                        ref: itemRef 
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
                
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setUploadProgress(progress);
            },
            (error) => {
                
                console.error('Upload error:', error);
            },
            async () => {
                
                const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                setImages((prevImages) => [...prevImages, { src: downloadURL, ref: storageRef }]);
                setUploadProgress(0);
                setFile(null);
            }
        );
    };

    const handleSelectImage = (imageRef) => {
        setSelectedImages((prevSelected) => {
            if (prevSelected.includes(imageRef)) {
                return prevSelected.filter((ref) => ref !== imageRef);
            } else {
                return [...prevSelected, imageRef];
            }
        });
    };

    const handleDeleteSelected = async () => {
        try {
            const deletePromises = selectedImages.map((imageRef) => deleteObject(imageRef));
            await Promise.all(deletePromises);
            setImages((prevImages) => prevImages.filter((image) => !selectedImages.includes(image.ref)));
            setSelectedImages([]);
            handleDialogClose()
        } catch (error) {
            console.error('Error deleting images: ', error);
        }
    };

    return (
        <>
            <Box>
                <Box mt={2} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Box sx={{ '& > :not(style)': { m: 1 } }}>
                        <Fab sx={{ border: 1, color: 'green', backgroundColor: '#fff' }} onClick={() => setModal(true)}>
                            <img src={require('./image_src/add.png')} width={25} />
                        </Fab>
                        <Fab sx={{ border: 1, color: 'red', backgroundColor: '#fff' }} onClick={handleDialogOpen} disabled={selectedImages.length === 0} >
                            <img src={require('./image_src/delete.png')} width={25} />
                        </Fab>
                    </Box>
                    <Dialog
                        open={open}
                        onClose={handleDialogClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogTitle id="alert-dialog-title" >
                            {"Tanggalin ang napiling larawan"}
                        </DialogTitle>
                        <Divider />
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                                Sigurado ka bang gusto mong tanggalin ang larawang ito?
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleDialogClose}>Kanselahin</Button>
                            <Button onClick={handleDeleteSelected} autoFocus>
                                Oo
                            </Button>
                        </DialogActions>
                    </Dialog>
                    {uploadProgress > 0 && <progress value={uploadProgress} max="100" />}
                </Box>
                <Box display="flex" flexWrap="wrap">
                    {images.map((image, index) => (
                        <Box
                            key={index}
                            sx={{
                                position: 'relative',
                                margin: 1,
                                border: selectedImages.includes(image.ref) ? '2px solid blue' : 'none',
                                cursor: 'pointer'
                            }}
                            onClick={() => handleSelectImage(image.ref)}
                        >
                            <img
                                src={image.src}
                                alt={`image-${index}`}
                                style={{ width: '250px', height: '250px', objectFit: 'cover' }}
                            />
                        </Box>
                    ))}
                </Box>
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
                            handleUpload();
                            setModal(false);
                        }}>
                        Save
                    </Button>
                </Box>
            </Modal>
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
                        <Input type="file" accept="image/png, image/gif, image/jpeg"  onChange={handleFileChange} />
                    </Box>

                    <Button
                        fullWidth
                        variant='contained'
                        color='success'
                        sx={{ justifyContent: 'center', alignItems: 'center', mt: 2, }}
                        onClick={() => {
                            handleUpload();
                            setModal(false);
                        }}>
                        Save
                    </Button>
                </Box>
            </Modal>
        </>
    );
}
