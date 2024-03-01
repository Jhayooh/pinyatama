import React, { Component, useState, useEffect } from 'react'
import './ImageGal.css'

import { Gallery } from "react-grid-gallery";

const ImageGal = () => {
    const [photos, setPhotos] = useState([])
    useEffect(() => {
        fetch("https://api.thecatapi.com/v1/images/search?limit=20")
        .then((res) => {
            return res.json()
        })
        .then((data) => {
            console.log(data)
            data.forEach(e => {
                e.src = e.url;
                delete e.url
            });
            console.log(data)
            setPhotos(data)
        })
        .catch ((error) => (
            console.log(error)
        ))
    }, [])
    return (
        <Gallery images={photos} margin={8}/>
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