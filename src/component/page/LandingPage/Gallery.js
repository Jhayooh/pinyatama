import ImageGal from '../ImageGal'
import React, { useState, useEffect } from 'react';
import { storage } from '../../firebase/Config';
import { ref, listAll, getDownloadURL } from 'firebase/storage';
import { Box } from '@mui/material';

const Gallery = () => {
    const [images, setImages] = useState([]);

    useEffect(() => {
        const fetchImagesRecursively = async (listRef) => {
            try {
                const result = await listAll(listRef);
                const shuffledItems = result.items.sort(() => 0.5 - Math.random());
                const randomItems = shuffledItems.slice(0, 6);

                const imagePromises = randomItems.map(async (itemRef) => {
                    const downloadURL = await getDownloadURL(itemRef);
                    return {
                        title: 'QP Farm',
                        src: downloadURL,
                    };
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
            const selectedImages = allImages.sort(() => 0.5 - Math.random()).slice(0, 6);

            setImages(selectedImages);
        };

        fetchImages();
    }, [storage]);
    return (
        <div id="portfolio" className="text-center">
            <div className="container">
                <div className="section-title">
                    <h2>GALLERY</h2>
    
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}>
                    {images.map((d, i) => (
                        <div
                            key={`${d.title}-${i}`}
                            style={{ width: `calc(100%/3)`, height:'auto', marginBottom: '16px' }}
                        >
                            <ImageGal
                                title={d.title}
                                largeImage={d.src}
                                smallImage={d.src}
                            />
                        </div>
                    ))}
                </div>


            </div>
        </div>
    )
}

export default Gallery