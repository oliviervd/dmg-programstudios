import React, {useState, Suspense} from "react"

const ImageGallery = React.lazy(() => import("./ImageGallery"))


const ImageViewer = ({open, onClose, image, _title}) => {

    let[_i, _setI] = useState(0) // set index for image to show.
    let imagesClean = [];

    function loadNextImage() {
        if (_i + 1 < image.length) {
             _i = _i + 1;
             _setI(()=>_i);
        } else {
            _i = 0;
            _setI(()=>_i);
        }
    }

    for (let i = 0; i < image.length; i++) {
        let x = image[i].replace("'", "");
        imagesClean.push(x.replace("g'","g").replace("/full/0/default.jpg", "/1000,/0/default.jpg"))
    }

    let imageSet = imagesClean[_i].replace("'","").replace("g'","");

    if(!open) return null
    return(
        <div className="imageViewer__modal-main">
            <div className="imageViewer__modal">
                <div className="imageViewer__modal__title">
                    <h2 className="imageViewer__modal__title-inner">{_title}</h2>
                </div>
                <img className="img__large" src={imageSet} onClick={loadNextImage}></img>
                <div>
                    <div className="closeButton__modal" onClick={onClose}>▒▒✖▒▒</div>
                    <p></p>
                </div>
                <div className="imageViewer__modal__gallery-image__outer">
                    <Suspense>
                        <ImageGallery className="imageViewer__modal__gallery" images={imagesClean}/>
                    </Suspense>
                </div>
            </div>
        </div>
)
}


export default ImageViewer;