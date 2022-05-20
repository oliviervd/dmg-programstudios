import React from "react";

const ImageGallery = ({images}) => {

    let l = images.length;
    console.log(l);

    console.log(images);
    for (let i = 0; i < l; i++) {
        console.log(images[i]);
    }

    const imList = images.map(x =>
        <img alt="DREAMING OF IMAGES" className="imageViewer__modal__gallery-image__inner" src={x}></img>
    )
    return(
        <div className="scrollable">
            {imList}
        </div>
    )

    console.log(imList);
}

export default ImageGallery;
