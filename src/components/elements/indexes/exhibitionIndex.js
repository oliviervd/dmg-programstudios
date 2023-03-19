import React, {useState} from "react";
import {getKeyByValue} from "../../utils/utils";
import colorRef from "../../data/db/colorRef.json";
import ObjectViewer from "../subjectpages/ObjectViewer";

const ExhibitionIndex = (props) => {

    const [loading, setLoading] = useState(true);
    const [exhibition, setExhibition] = useState("Gelinkt: de collectie netwerkt");
    const [bitonal, setBitonal] = useState(false);
    const [showDetailsExhObj, setShowDetailsExhObj] = useState(false);
    const [image, setImage] = useState("")
    const [details, setDetails] = useState("")

    console.log(details);

    let ExhOptions;

    if (props.exhibitionList){
        const _exhCounts = {};
        try{
            for (const _exh of props.exhibitionList) {
                _exhCounts[_exh] = _exhCounts[_exh] ? _exhCounts[_exh] + 1 : 1;
            }
        } catch {}

        let imageList;
        const handleClickTag = (key) => {
            setExhibition(key);
            props.setCollapseColors(false)
        }


        ExhOptions = Object.entries(_exhCounts).map(([key, i]) => (
            <p className={"grid-text-autoflow"}
               style={{color: "black"}}
               onClick={()=>handleClickTag(key)}>
                #{key},
            </p>
        ))

    }

    function filterByExhibition(objects, exhibitions) {
        //fetch array of objects that were shown at this exhibition.
        const ObjList = [];
        const ImageList = [];
        try {
            for (let i=0; i<objects.length; i++) {
                let LDES = objects[i]["LDES_raw"]["object"]
                if (LDES["http://purl.org/dc/terms/isPartOf"]) {
                    //console.log(LDES["http://purl.org/dc/terms/isPartOf"])
                    let obj;
                    if (LDES["http://purl.org/dc/terms/isPartOf"][0]){
                        for (let x=0; x<LDES["http://purl.org/dc/terms/isPartOf"].length; x++){
                            try{
                                if (LDES["http://purl.org/dc/terms/isPartOf"][x]["http://www.cidoc-crm.org/cidoc-crm/P16_used_specific_object"]["http://www.cidoc-crm.org/cidoc-crm/P3_has_note"]["@value"] === exhibition){
                                    obj = objects[i]
                                    ObjList.push(obj)
                                    ImageList.push(objects[i]["iiif_image_uris"])
                                }
                            } catch(e) {}
                        }
                    } else {
                        try{
                            if (LDES["http://purl.org/dc/terms/isPartOf"]["http://www.cidoc-crm.org/cidoc-crm/P16_used_specific_object"]["http://www.cidoc-crm.org/cidoc-crm/P3_has_note"]["@value"] === exhibition) {
                                obj = objects[i]
                                ObjList.push(obj)
                                ImageList.push(objects[i]["iiif_image_uris"])
                            }
                        } catch (e) {}
                    }
                }

            }
            return ImageList;
        } catch (e) {}
    }

    let imageBlockExh = ""
    let images = filterByExhibition(props.objects, exhibition)

    try{
        if (bitonal) {
            imageBlockExh = images.map(image => (
                <img
                    onClick={()=>handleImgClick(image[0])}
                    alt={'INSERT ALT HERE'} //todo: alt
                    src={image[0].replace("/full/0/default.jpg", "/400,/0/bitonal.jpg")}
                />
            ))
        } else {
            imageBlockExh = images.map(image => (
                <img
                    className={"hoverImage"}
                    onClick={()=>handleImgClick(image[0])}
                    alt={'INSERT ALT HERE'} // todo: alt
                    src={image[0].replace("/full/0/default.jpg", "/400,/0/default.jpg")}
                />
            ))
        }
    } catch {}

    const handleImgClick = (id) => {
        setImage(id);
        //console.log(id);
        setShowDetailsExhObj(true);
        let objectNumberString = filterByValue(props.objects, id);
        console.log(objectNumberString)
        fetchObjectById(objectNumberString);
    }

    function filterByValue(array, string) {
        //console.log(string);
        //console.log(array)
        let x = array.filter(o => o.iiif_image_uris.includes(string))
        //console.log(x[0]["objectNumber"])
        //console.log(x.objectNumber)
        return x[0]["objectNumber"];
    }

    function fetchObjectById(ObjectNumber) {
        for (let i=0; i<props.objects.length; i++) {
            if (props.objects[i].objectNumber === ObjectNumber) {
                setDetails(props.objects[i])
            }
        }
    }

    function collapse() {
        props.setCollapseExhibition(!props.collapseExhibition)
        props.setCollapseColors(false);
    }

    return(
        <div>
            {props.collapseExhibition &&

                <div>
                    <div className="lineH"/>
                    <p className={"indexLabel"} onClick={()=>props.setCollapseExhibition(!props.collapseExhibition)}>exhibitions</p>
                    <div style={{width:"inherit",  height: "200px",
                        overflowY:"scroll"}}>
                        {ExhOptions}
                    </div>
                    <div>
                        <div className="lineH"/>
                        <div className="lineH"/>

                        <div className="grid--2_6_2">
                            <p>images</p>
                            <div></div>
                            <p></p>
                        </div>

                        <div>
                            <div className="grid--2_6_2">
                                <h2>{exhibition}</h2>
                                <div></div>
                                <div className={"grid--2_1"}>
                                    <p>>>> scroll this way >>>></p>
                                    {bitonal &&
                                        <p onClick={()=> setBitonal(!bitonal)} >◧ bitonal</p>
                                    }
                                    {!bitonal &&
                                        <p onClick={()=> setBitonal(!bitonal)} >⧅ bitonal</p>
                                    }
                                </div>
                            </div>

                            <div className={showDetailsExhObj? "container-masonry-half": "container-masonry-full"}>
                                <div className={"masonry"} style={{height: "700px", overflowY:"scroll", padding: "5px"}}>
                                    {imageBlockExh}
                                </div>
                                {showDetailsExhObj &&
                                    <ObjectViewer
                                        showDetailUI={showDetailsExhObj} setShowDetailUI={setShowDetailsExhObj} description={false} thesaurus={props.thesaurus} personen={props.agents}
                                        image={image} details={details} colors={props.objects} colorStrip={true} indexUI={true}
                                        box={false} color={"palegreen"}
                                    />
                                }
                            </div>
                        </div>

                    </div>
                </div>
            }
            {!props.collapseExhibition &&
                <div>
                    <div className="lineH"/>
                    <div style={{height: "5vh"}} className="grid--2_6_2">
                        <p className={"indexLabel"} onClick={()=>collapse()}>exhibitions</p>
                        <div></div>
                    </div>
                </div>
            }


        </div>
    )
}

export default ExhibitionIndex