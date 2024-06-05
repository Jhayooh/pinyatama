import React, { useState, useEffect } from 'react';
import { storage } from '../../firebase/Config';
import { ref, listAll, getDownloadURL } from 'firebase/storage';
import './ImageGal.css';

import { Gallery } from "react-grid-gallery";

const ImageGal = () => {
    const [images, setImages] = useState([]);

    useEffect(() => {
        const fetchImagesRecursively = async (listRef) => {
            try {
                const result = await listAll(listRef);

                // Shuffle the array of items randomly
                const shuffledItems = result.items.sort(() => 0.5 - Math.random());

                // Fetch more than 10 random images
                const randomItems = shuffledItems.slice(0, 20);

                const imagePromises = randomItems.map(async (itemRef) => {
                    const downloadURL = await getDownloadURL(itemRef);
                    return { src: downloadURL, width: '100%', height: '100%' };
                });

                const subdirectoryPromises = result.prefixes.map((folderRef) => {
                    return fetchImagesRecursively(folderRef);
                });

                const subdirectoryImages = await Promise.all(subdirectoryPromises);
                const imagesData = await Promise.all(imagePromises);

                return [...imagesData, ...subdirectoryImages.flat()];
            } catch (error) {
                console.error('Error fetching images:', error);
                return [];
            }
        };

        const fetchImages = async () => {
            const rootRef = ref(storage, 'FarmImages');
            const allImages = await fetchImagesRecursively(rootRef);

            // Select 10 random images from the fetched images
            const selectedImages = allImages.sort(() => .5 - Math.random()).slice(0, 10);

            setImages(selectedImages);
        };

        fetchImages();
    }, [storage]);

    return (
        <Gallery images={images} margin={8} />
    );
}

export default ImageGal;
