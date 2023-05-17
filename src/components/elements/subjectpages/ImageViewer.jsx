import React, {useState} from "react"
import {at} from "es5-ext/string/#";

const ImageViewer = (props) => {

    const [showImageInfo, setShowImageInfo] = useState(false);
    let attribution, license;


    try {
        attribution = props.details.attributions[0]
        attribution = attribution.split(",")
    } catch(e) {attribution = "unknown"}

    console.log(attribution)

    try {
        license = props.details.CC_Licenses[0]
    } catch (e) {license = "unknown"}

    return(
        <div>
            <div className={"imageContainer"}>
                <span className={"infoIcon"} onClick={()=>setShowImageInfo(!showImageInfo)}>i</span>
                {showImageInfo &&
                    <div className={"hiddenInformation"}>
                        {attribution.map((item)=>{
                            return <p>{item}</p>
                        })}
                        <a href={license} target={"_blank"}>{license}</a>
                    </div>
                }
                <img alt="loading.." className="img__fit" style={{paddingLeft: "5%"}} src={props.media.replace("/full/0/default.jpg", "/1000,/0/default.jpg")}/>
            </div>
        </div>
    )
}

export default ImageViewer;