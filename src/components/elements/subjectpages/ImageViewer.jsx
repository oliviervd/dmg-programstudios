import React, {useState} from "react"
import {translate} from "../../utils/utils";
import translations from '../../data/translations.json';
import IIIFVault from "../utils/IIIFVault";

const ImageViewer = (props) => {
    const [showImageInfo, setShowImageInfo] = useState(false);
    let attribution, license;
    try {
        attribution = props.details.attributions[0]
        try{
            attribution = attribution.split(",")
            attribution = attribution.map((item)=> {
                return <p>{item}</p>
            })
        } catch {attribution = props.details.attributions[0]}
    } catch(e) {attribution = "unknown"}

    try {
        license = props.details.CC_Licenses[0]
    } catch (e) {license = "unknown"}

    return(
        <div>
            <div className={"imageContainer"}>
                <span className={"infoIcon"} onClick={()=>setShowImageInfo(!showImageInfo)}>i</span>
                {showImageInfo &&
                    <div className={"hiddenInformation"}>
                        <div>{attribution}</div>
                        <a href={license} target={"_blank"}>{translate(license, props.language, translations)}</a>
                    </div>
                }
                {props.viewer &&
                    <IIIFVault manifest={"https://api.collectie.gent/iiif/presentation/v2/manifest/dmg:1987-1311_0-2"}/>
                }
                {!props.viewer &&
                    <img alt="loading.." className="img__fit" style={{paddingLeft: "5%"}} src={props.media.replace("/full/0/default.jpg", "/1000,/0/default.jpg")}/>
                }
            </div>
        </div>
    )
}

export default ImageViewer;