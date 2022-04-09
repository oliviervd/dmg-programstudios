import React from "react";

const ImageGenerator = (props) => {
    const curatedSet = props.curatedSet;
    const object_colors = props.data;
    console.log(object_colors)
    const _images = []


    for (var imCount=0; imCount<4; ++imCount) {
        const x = curatedSet[imCount]
        var _im = object_colors[x]["IIIF_image"].replace("['","").replace("']","").replace("'","").split(",")
        _images.push(_im);

    } console.log(_images);

    try{
        return(
            <div className="container" id="imageRandom">
                <img alt="DREAMING OF IMAGES" src={_images[0][0].replace("/full/0/default.jpg", "/750,/0/default.jpg")}/>
                <img alt="DREAMING OF IMAGES" src={_images[1][0].replace("/full/0/default.jpg", "/750,/0/default.jpg")}/>
                <img alt="DREAMING OF IMAGES" src={_images[2][0].replace("/full/0/default.jpg", "/700,/0/default.jpg")}/>
            </div>
        )
    } catch {
        return(
            <div className="container" id="imageRandom">
                <img alt="DREAMING OF IMAGES"/>
                <img alt="DREAMING OF IMAGES"/>
                <img alt="DREAMING OF IMAGES"/>
            </div>
            )
    }
}

export default ImageGenerator;