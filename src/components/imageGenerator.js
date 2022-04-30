import React, {useState} from "react";
import ImageViewer from "./modal/imageModal";

import ldes_translations from "../data/postgres_ldes_dmg_translations_ldes_dmg.json"

function LDESViaURI(uri) {
    return ldes_translations.filter(
        function(ldes_translations) {
            return ldes_translations.URI === uri
        }
    )

}


const ImageGenerator = (props) => {
    const curatedSet = props.curatedSet;
    const object_colors = props.data;
    const objCount = props.num;
    const _images = [];
    const _titles = [];


    const[imageViewer1, setImageViewer1] = useState(false);
    const[imageViewer2, setImageViewer2] = useState(false);
    const[imageViewer3, setImageViewer3] = useState(false);

    for (var imCount=0; imCount<objCount; ++imCount) {
        const x = curatedSet[imCount] // TODO: fix this goes above length of array (number of images)
        const uri = object_colors[x]["URI"];
        const _LDES = LDESViaURI(uri)
        let _im = object_colors[x]["IIIF_image"].replace("['","").replace("']","").replace("'","").split(",")
        _images.push(_im);
        _titles.push(_LDES[0]["title_en"])
    }

    return(
        <div className="container" id="imageRandom">

            <img className="__img" alt="DREAMING OF IMAGES" onClick={()=>{setImageViewer1(true)}}  src={_images[0][0].replace("/full/0/default.jpg", "/1000,/0/default.jpg")}/>
                <ImageViewer open={imageViewer1} onClose={() => setImageViewer1(false)} image={_images[0]} _title={_titles[0]}/>

            <img className="__img" alt="DREAMING OF IMAGES" onClick={()=>{setImageViewer2(true)}}  src={_images[1][0].replace("/full/0/default.jpg", "/1000,/0/default.jpg")}/>
                <ImageViewer open={imageViewer2} onClose={() => setImageViewer2(false)} image={_images[1]} _title={_titles[1]}/>

            <img className="__img" alt="DREAMING OF IMAGES" onClick={()=>{setImageViewer3(true)}} src={_images[2][0].replace("/full/0/default.jpg", "/1000,/0/default.jpg")}/>
                <ImageViewer open={imageViewer3} onClose={()=> setImageViewer3(false)} image={_images[2]} _title={_titles[2]}/>


        </div>
    )
}

export default ImageGenerator;