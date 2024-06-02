import React, { Component, useState, useEffect } from 'react'
import { storage } from '../../firebase/Config';
import { ref, listAll, getDownloadURL } from 'firebase/storage';
import './ImageGal.css'

import { Gallery } from "react-grid-gallery";

const ImageGal = () => {
    const [images, setImages] = useState([]);

    useEffect(() => {
        const fetchImagesRecursively = async (listRef) => {
            try {
                const result = await listAll(listRef);

                const imagePromises = result.items.map(async (itemRef) => {
                    const downloadURL = await getDownloadURL(itemRef);
                    return { src: downloadURL, width: 200, heigth: 480 };
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
            setImages(allImages);
        };

        fetchImages();
    }, [storage]);
    return (
        <Gallery images={images} margin={8} />
        // <div className='images-api'>
        //     {photos.map((photo) => (
        //         <img key={photo.id} src={photo.url} style={{width: "200px", height: "auto"}}/>
        //     ))}
        // </div>
    )
}
// export default class ImageGal extends Component {
//   render() {
//     console.log(getData())
//     return ()
//   }
// }
export default ImageGal