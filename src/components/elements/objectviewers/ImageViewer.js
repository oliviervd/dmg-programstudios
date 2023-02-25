import React from "react"

const ImageViewer = (props) => {
    let images = ""
    console.log(props.media)
    console.log(props.details)


    console.log(images)

    return(
        <div>
            <img src={props.media.replace("/full/0/default.jpg", "/1000,/0/default.jpg")}/>
        </div>
    )
}

export default ImageViewer;