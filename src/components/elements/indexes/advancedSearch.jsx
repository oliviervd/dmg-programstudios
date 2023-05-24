import React, {Suspense, useMemo, useState} from "react"
import ObjectViewer from "../subjectpages/ObjectViewer";
import Loading from "../utils/Loading";
import translations from "../../data/translations.json";

const AdvancedSearch = (props) => {

    const images = useMemo(() => props.queryResults, [props.queryResults]);
    const [showDetailUI, setShowDetailUI] = useState(false);
    const [details, setDetails] = useState("");
    const [detailImageID, setDetailImageID] = useState("");

    let _r;
    let counter = 0
    const _objects = props.objecten
    let _lang = props.language

    function translate(_term, _lang) {
        return translations[_term][_lang] // _lang = key.
    }

    function fetchImage(image) {
        try {
            let im = image["item"]["source"]["iiif_image_uris"][0].replace("/full/0/default.jpg", "/400,/0/default.jpg")
            counter = counter + 1
            return im
        } catch {
        }
    }

    function fetchObjectById(ObjectNumber) {
        let _obj = _objects
        for (let i=0; i<_obj.length; i++) {
            if (_obj[i].objectNumber === ObjectNumber) {
                setDetails(_obj[i])
            }
        }
    }

    function handleImgClick(im) {
        setShowDetailUI(true);
        setDetailImageID(im["item"]["source"]["iiif_image_uris"][0])
        props.setCloseSearch(true)
        fetchObjectById(im["item"]["source"]["objectNumber"])
    }

    try{
        _r = images.map(im => (
            <img
                className={"hoverImage"}
                onClick={()=>handleImgClick(im)}
                //alt={'INSERT ALT HERE'} // todo: alt
                src={fetchImage(im)}
            />
        ))
    } catch(e) {
        _r =
            <div>
                <p>no objects matching this query were found.</p>
            </div>
    }

    // todo: if no results; display "no results".
    return(
        <div className={"lineH"}>
            <div className={showDetailUI? "container-masonry-half": "container-masonry-full"}>
                <div className={"masonry"} style={{height: "90vh", overflowY:"hidden", padding: "5px"}}>
                    <Suspense fallback={<Loading/>}>
                        {_r}
                    </Suspense>
                </div>
                {showDetailUI &&
                    <ObjectViewer
                        showDetailUI={showDetailUI} setShowDetailUI={setShowDetailUI} description={false} thesaurus={props.thesaurus} personen={props.personen}
                        image={detailImageID} details={details} color={"black"} colorStrip={true} indexUI={true}
                        box={false} language={_lang}
                    />
                }
            </div>
        </div>

    )
}

export default AdvancedSearch;