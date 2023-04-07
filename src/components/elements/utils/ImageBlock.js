import React from "react"

const ImageBlock = (props) => {

    let imageBlock = ""
    let images = props.images

    try {
        if (props.bitonal) {
            imageBlock = images.map(image => (
                <img
                    onClick={() => props.handleImgClick(image)}
                    alt={'INSERT ALT HERE'} //todo: alt
                    src={image.replace("/full/0/default.jpg", "/400,/0/bitonal.jpg")}
                />
            ))
        } else {
            imageBlock = images.map(image => (
                <img
                    className={"hoverImage"}
                    onClick={() => props.handleImgClick(image)}
                    alt={'INSERT ALT HERE'} // todo: alt
                    src={image.replace("/full/0/default.jpg", "/400,/0/default.jpg")}
                />
            ))
        }
    } catch(e) {}

    return (
        <div>
            {imageBlock}
        </div>
    )

}
export default ImageBlock