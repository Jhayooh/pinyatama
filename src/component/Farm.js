import React, { Component, useEffect, useState } from 'react'
import { Gallery } from "react-grid-gallery";
import { getStorage, ref, listAll, getDownloadURL } from 'firebase/storage';
import { storage } from '../firebase/Config';

export default function Farm({ farmId }) {
    const [images, setImages] = useState([]);

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

    return <Gallery images={images} />
}
