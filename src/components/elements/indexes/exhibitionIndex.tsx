// noinspection HttpUrlsUsage

import * as React from "react"
import {useState} from "react"
import {useSearchParams} from "react-router-dom";

import ObjectViewer from "../subjectpages/ObjectViewer";
import SearchFilterBar from "../utils/SearchFilterBar";
import {filterByKey} from "../../utils/data_parsers";
import translations from "../../data/translations.json";

const ExhibitionIndex = (props) => {

    const [exhibitionSearch, setExhibitionSearch] = useSearchParams()

    const [bitonal, setBitonal] = useState(false);
    const [showDetailsExhObj, setShowDetailsExhObj] = useState(false);
    const [image, setImage] = useState("")
    const [details, setDetails] = useState("")
    const [exhibitionFilter, setExhibitionFilter] = useState("")

    let ExhOptions;
    let exhibition:string
    let _lang = props.language

    function translate(_term, _lang) {
        return translations[_term][_lang] // _lang = key.
    }

    const selectExhibition = (type:string, value:string) => {
        exhibitionSearch.set(type, value)
        setExhibitionSearch(exhibitionSearch)
        exhibition = value
    }

    if (exhibitionSearch.get("exhibition") != null) {
        exhibition = exhibitionSearch.get("exhibition")
    } else {
       exhibition = "Object Stories. Een kijk op de collectie"
    }

    if (props.exhibitionList){
        const _exhCounts = {};
        try{
            for (const _exh of props.exhibitionList) {
                _exhCounts[_exh] = _exhCounts[_exh] ? _exhCounts[_exh] + 1 : 1;
            }
        } catch {}

        const _exhFilter = filterByKey(_exhCounts, exhibitionFilter)

        if (exhibitionFilter === "") {
            ExhOptions = Object.entries(_exhCounts).map(([key]) => (
                    <p className={"grid-text-autoflow"}
                       style={{color: "black"}}
                       onClick={()=>selectExhibition("exhibition", key)}>
                        #{key} ({key.length}),
                    </p>
            ))
        } else {
            try{
                ExhOptions = _exhFilter.map((exh)=>{
                    return <p className={"grid-text-autoflow"}
                              style={{color: "black"}}
                              onClick={()=>selectExhibition("exhibition", exh)}>
                        #{exh},
                    </p>
                })
            } catch(e) {console.log(e)}
        }
    }

    function filterByExhibition(objects) {
        //fetch array of objects that were shown at this exhibition.
        const ObjList = [];
        const ImageList = [];
        try {
            for (let i=0; i<objects.length; i++) {
                let LDES = objects[i]["LDES_raw"]["object"]
                if (LDES["http://purl.org/dc/terms/isPartOf"]) {
                    let obj;
                    if (LDES["http://purl.org/dc/terms/isPartOf"][0]){
                        for (let x=0; x<LDES["http://purl.org/dc/terms/isPartOf"].length; x++){
                            try{
                                if (LDES["http://purl.org/dc/terms/isPartOf"][x]["http://www.cidoc-crm.org/cidoc-crm/P16_used_specific_object"]["http://www.cidoc-crm.org/cidoc-crm/P3_has_note"]["@value"] === exhibition){
                                    obj = objects[i]
                                    ObjList.push(obj)
                                    if (objects[i]["iiif_image_uris"].length !== 0) {
                                        ImageList.push(objects[i]["iiif_image_uris"])
                                    }

                                }
                            } catch(e) {}
                        }
                    } else {
                        try{
                            if (LDES["http://purl.org/dc/terms/isPartOf"]["http://www.cidoc-crm.org/cidoc-crm/P16_used_specific_object"]["http://www.cidoc-crm.org/cidoc-crm/P3_has_note"]["@value"] === exhibition) {
                                obj = objects[i]
                                ObjList.push(obj)
                                if (objects[i]["iiif_image_uris"].length !== 0) {
                                    ImageList.push(objects[i]["iiif_image_uris"])
                                }
                            }
                        } catch (e) {}
                    }
                }

            }
            return ImageList;
        } catch (e) {}
    }

    let imageBlockExh:JSX.Element[] = <></>
    let images = filterByExhibition(props.objects)

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
    } catch(e) {console.log(e)}

    const handleImgClick = (id) => {
        setImage(id);
        setShowDetailsExhObj(true);
        let objectNumberString = filterByValue(props.objects, id);
        fetchObjectById(objectNumberString);
    }

    function filterByValue(array, string) {
        let x = array.filter(o => o.iiif_image_uris.includes(string))
        return x[0]["objectNumber"];
    }

    function fetchObjectById(ObjectNumber) {
        for (let i=0; i<props.objects.length; i++) {
            if (props.objects[i].objectNumber === ObjectNumber) {
                setDetails(props.objects[i])
            }
        }
    }

    return(
        <div>
            {props.collapseExhibition &&
                <div>
                    <div>
                        <div>
                            <div className="lineH"/>
                            <div className="grid--2_6_2 " style={{height: '5vh'}}>
                                <h2>{translate("exhibition", _lang).toUpperCase()}</h2>
                                <div className={"grid--5_95"}>
                                    <div></div>
                                    <SearchFilterBar filter={exhibitionFilter} setFilter={setExhibitionFilter} prompt={translate("exhibition_search_prompt", _lang)}/>
                                </div>
                            </div>
                            <div className={"lineH"}></div>
                        </div>
                        <div style={{width:"inherit",  height: "200px",
                            overflowY:"scroll"}}>
                            {ExhOptions}
                        </div>
                    </div>
                    <div>
                        <div className="lineH"/>
                        <div className="grid--2_6_2">
                            <p>{translate("images", _lang)}</p>
                            <div></div>
                            <p></p>
                        </div>

                        <div>
                            <div className="grid--2_6_2">
                                <h2>{exhibition}</h2>
                                <div></div>
                                <div className={"grid--2_1"}>
                                    {bitonal &&
                                        <p onClick={()=> setBitonal(!bitonal)} >◧ {translate("bitonal", _lang)}</p>
                                    }
                                    {!bitonal &&
                                        <p onClick={()=> setBitonal(!bitonal)} >⧅ {translate("bitonal", _lang)}</p>
                                    }
                                    <p> {translate("scroll", _lang)} </p>
                                </div>
                            </div>

                            <div className={showDetailsExhObj? "container-masonry-half": "container-masonry-full"}>
                                <div className={"masonry"} style={{height: "700px", overflowY:"hidden", padding: "5px"}}>
                                    {imageBlockExh}
                                </div>
                                {showDetailsExhObj &&
                                    <ObjectViewer
                                        showDetailUI={showDetailsExhObj} setShowDetailUI={setShowDetailsExhObj} description={false} thesaurus={props.thesaurus} personen={props.agents}
                                        image={image} details={details} colors={props.objects} colorStrip={true} indexUI={true}
                                        box={false} color={"black"} language={_lang} viewer={false}
                                    />
                                }
                            </div>
                        </div>
                    </div>
                </div>
            }
            {!props.collapseExhibition &&
                <div>
                 {/*   <div className="lineH"/>
                    <div style={{height: "5vh"}} className="grid--2_6_2">
                        <p onClick={()=>collapse()}>exhibitions</p>
                        <div></div>
                    </div>*/}
                </div>
            }


        </div>
    )
}

export default ExhibitionIndex