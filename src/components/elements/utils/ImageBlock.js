import React from "react"

const ImageBlock = (props) => {

    let imageBlock = ""
    let images = props.images

    try {
        if (props.bitonal) {
            imageBlock = images.map(image => (
                <div className={"imageContainer"}>
                    <img
                        onClick={() => props.handleImgClick(image)}
                        alt={'INSERT ALT HERE'} //todo: alt
                        src={image.replace("/full/0/default.jpg", "/400,/0/bitonal.jpg")}
                    />
                </div>

            ))
        } else {
            imageBlock = images.map(image => (
                <div className={"hoverImage"}>
                    <img
                        className={""}
                        onClick={() => props.handleImgClick(image)}
                        alt={'INSERT ALT HERE'} // todo: alt
                        src={image.replace("/full/0/default.jpg", "/400,/0/default.jpg")}
                    />
                </div>
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