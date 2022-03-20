import React from "react";
import object_colors from "../data/objectsColor.json";

const ImageGenerator = (props) => {
    const curatedSet = props.curatedSet;
    const _images = []

    for (var imCount=0; imCount<5; ++imCount) {
        const x = curatedSet[imCount]
        var _im = object_colors[x]["IIIF_image"].replace("['","").replace("']","").replace("'","").split(",")
        _images.push(_im);
        console.log(_images);
    }

    return(
        <div className="container" id="imageRandom">
            <img alt="DREAMING OF IMAGES" src={_images[0][0].replace("/full/0/default.jpg","/500,/0/default.jpg")}></img>
            <img alt="DREAMING OF IMAGES" src={_images[1][0].replace("/full/0/default.jpg","/500,/0/default.jpg")}></img>
            <img alt="DREAMING OF IMAGES" src={_images[2][0].replace("/full/0/default.jpg","/500,/0/default.jpg")}></img>
            <img alt="DREAMING OF IMAGES" src={_images[3][0].replace("/full/0/default.jpg","/500,/0/default.jpg")}></img>
            <img alt="DREAMING OF IMAGES" src={_images[4][0].replace("/full/0/default.jpg","/500,/0/default.jpg")}></img>
        </div>
    )
}

export default ImageGenerator;