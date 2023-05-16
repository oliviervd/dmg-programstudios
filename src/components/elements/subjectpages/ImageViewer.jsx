import React from "react"

const ImageViewer = (props) => {

    let attribution, license;

    try {
        attribution = props.details.attributions[0]
    } catch(e) {attribution = "unknown"}

    try {
        license = props.details.CC_Licenses[0]
    } catch (e) {license = "unknown"}

    return(
        <div>
            <div className={"imageContainer"}>
                <p className={"infoIcon"}>i</p>
                <img alt="loading.." className="img__fit" style={{paddingLeft: "5%"}} src={props.media.replace("/full/0/default.jpg", "/1000,/0/default.jpg")}/>
            </div>
        </div>
    )
}

export default ImageViewer;