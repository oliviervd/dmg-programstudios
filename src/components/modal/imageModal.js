import React from "react"

const ImageViewer = ({open, onClose, image, _title}) => {
    if(!open) return null
    return(
        <div className="imageViewer__modal">
            <div className="imageViewer__modal__title">
                <h2 className="imageViewer__modal__title-inner">{_title}</h2>
            </div>
            <img className="img__large" src={image}></img>
            <div>
                <div className="closeButton__modal" onClick={onClose}>▒▒✖▒▒</div>
                <p></p>
            </div>
        </div>
    )
}


export default ImageViewer;