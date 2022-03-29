import React from "react";
import object_colors from "../data/objectsColor_10.json";

const ImageGenerator = (props) => {
    const curatedSet = props.curatedSet;
    const _images = []

    for (var imCount=0; imCount<4; ++imCount) {
        const x = curatedSet[imCount]
        var _im = object_colors[x]["IIIF_image"].replace("['","").replace("']","").replace("'","").split(",")
        _images.push(_im);
    }

    return(
        <div className="container" id="imageRandom">
            <img alt="DREAMING OF IMAGES" src={_images[0][0].replace("/full/0/default.jpg","/750,/0/default.jpg")}></img>
            <img alt="DREAMING OF IMAGES" src={_images[1][0].replace("/full/0/default.jpg","/750,/0/default.jpg")}></img>
            <img alt="DREAMING OF IMAGES" src={_images[2][0].replace("/full/0/default.jpg","/700,/0/default.jpg")}></img>
            <img alt="DREAMING OF IMAGES" src={_images[3][0].replace("/full/0/default.jpg","/700,/0/default.jpg")}></img>
        </div>
    )
}

export default ImageGenerator;