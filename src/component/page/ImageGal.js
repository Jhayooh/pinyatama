import React from 'react'

const ImageGal = ({title, largeImage, smallImage}) => {
    return (
        <div className="portfolio-item">
            <div className="hover-bg">
                <a href={largeImage} title={title} data-lightbox-gallery="gallery1">
                    <div className="hover-text">
                        <h4>{title}</h4>
                    </div>
                    <img src={smallImage}  className="img-responsive" alt={title} width='100%' height='100%'/>
                </a>
            </div>
        </div>
    )
}

export default ImageGal