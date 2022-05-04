import React from "react";

const ImageGallery = ({images}) => {
    const imList = images.map(x =>
        <img className="imageViewer__modal__gallery-image" src={images[x]}></img>
    )
    return(
        <>
            {imList}
        </>
    )
}

export default ImageGallery;
