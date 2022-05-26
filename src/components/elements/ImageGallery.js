import React from "react";

const ImageGallery = ({images}) => {

    let l = images.length;
    const imList = images.map(x =>
        <img alt="DREAMING OF IMAGES" className="imageViewer__modal__gallery-image__inner" src={x}></img>
    )
    return(
        <div className="scrollable">
            {imList}
        </div>
    )

}

export default ImageGallery;
