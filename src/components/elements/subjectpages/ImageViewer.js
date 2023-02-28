import React from "react"
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import {Carousel} from "react-responsive-carousel";
import ReactDOM from 'react-dom';

const ImageViewer = (props) => {
    let images = ""

    return(
        <div>
            <img className="img__fit" style={{paddingLeft: "5%"}} src={props.media.replace("/full/0/default.jpg", "/1000,/0/default.jpg")}/>
        </div>
    )
}

export default ImageViewer;