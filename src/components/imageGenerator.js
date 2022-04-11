import React from "react";

const ImageGenerator = (props) => {
    const curatedSet = props.curatedSet;
    const object_colors = props.data;
    const objCount = props.num;
    const _images = []


    for (var imCount=0; imCount<objCount; ++imCount) {
        const x = curatedSet[imCount] // TODO: fix this goes above length of array (number of images)
        let _im = object_colors[x]["IIIF_image"].replace("['","").replace("']","").replace("'","").split(",")
        _images.push(_im);

    }

    return(
        <div className="container" id="imageRandom">
            <img alt="DREAMING OF IMAGES" src={_images[0][0].replace("/full/0/default.jpg", "/1000,/0/default.jpg")}/>
            <img alt="DREAMING OF IMAGES" src={_images[1][0].replace("/full/0/default.jpg", "/1000,/0/default.jpg")}/>
            <img alt="DREAMING OF IMAGES" src={_images[2][0].replace("/full/0/default.jpg", "/1000,/0/default.jpg")}/>
        </div>
    )
}

export default ImageGenerator;