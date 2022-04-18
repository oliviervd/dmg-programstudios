import React from "react"

const ImageViewer = ({open, onClose, image}) => {
    if(!open) return null
    return(
        <div className="imageViewer__modal">
            <div/>
            <img className="img__large" src={image}></img>
            <div>
                <div className="closeButton__modal" onClick={onClose}>▒▒✖▒▒</div>
            </div>
        </div>
    )
}


export default ImageViewer;