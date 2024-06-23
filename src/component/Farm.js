import React, { useState, useEffect } from 'react';
import { Gallery } from 'react-grid-gallery';
import { getStorage, ref, listAll, getDownloadURL, uploadBytesResumable } from 'firebase/storage';
import { storage } from '../firebase/Config';
import { Button, Box, Input } from '@mui/material';

export default function Farm({ farmId }) {
    const [images, setImages] = useState([]);
    const [file, setFile] = useState(null);
    const [uploadProgress, setUploadProgress] = useState(0);

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
        <Box>
            <Gallery images={images} />
            <Box mt={2}>
                <Input type="file" onChange={handleFileChange} />
                <Button variant="contained" onClick={handleUpload}>Add Image</Button>
            </Box>
            {uploadProgress > 0 && <progress value={uploadProgress} max="100" />}
        </Box>
    );
}
