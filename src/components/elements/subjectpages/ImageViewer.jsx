import React, {useState} from "react"
import {translate} from "../../utils/utils";
import translations from '../../data/translations.json';
import IIIFVault from "../utils/IIIFVault";

const ImageViewer = (props) => {
    const [showImageInfo, setShowImageInfo] = useState(true);
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
        license = props.details.CC_Licenses[0];
        license = translate(license, props.language, translations)
    } catch (e) {license = "unknown"}

    let _manifest

    try {
        _manifest = props.details["LDES_raw"]["object"]["http://www.cidoc-crm.org/cidoc-crm/P129i_is_subject_of"]["@id"]
    } catch(e) {}

    return(
        <div>
            <div className={"imageContainer"}>
                <span className={"infoIcon"} onClick={()=>setShowImageInfo(!showImageInfo)}>i</span>
                {props.viewer &&
                    <div>
                        <IIIFVault backgroundColor={"white"} manifest={_manifest}/>
                    </div>}
                {!props.viewer &&
                    <img alt="loading.." className="img__fit" style={{paddingLeft: "5%"}} src={props.media.replace("/full/0/default.jpg", "/1000,/0/default.jpg")}/>
                }
            </div>

            {props.attribution &&
                <div className={"imageContainer--attribution"}>
                    <p className={"imageContainer--attribution_text"}>{attribution}</p>
                    <a className={"imageContainer--attribution_link"} href={license} target={"_blank"}>{license}</a>
                </div>
            }

        </div>
    )
}

export default ImageViewer;