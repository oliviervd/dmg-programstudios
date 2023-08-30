import * as React from "react"
import {Suspense, useState} from "react"
import ObjectViewer from "../elements/subjectpages/ObjectViewer";
import {useNavigate, useParams} from "react-router-dom";
import {useMediaQuery} from "react-responsive";
import {fetchObjectsByID, fetchRelatedObjects} from "../utils/data_parsers";
import useAgentQuery from "../hooks/useAgentQuery";
import useThesaurusQuery from "../hooks/useThesaurusQuery";
import useObjectsQuery from "../hooks/useObjectsQuery";
import Loading from "../elements/utils/Loading";
import translations from "../data/translations.json";

const ObjectPage = (props) => {

    const { id } = useParams();

    //MEDIA QUERIES
    const isDesktopOrLaptop = useMediaQuery({
        query: '(min-width: 600px)'
    })

    const [details, setDetails] = useState("");
    const [language, setLanguage] = useState("EN")
    const _objects = useObjectsQuery().data;
    const _pers = useAgentQuery().data;
    const _thes = useThesaurusQuery().data;

    if (props.language){
        setLanguage(props.language)
    }

    // todo: make generic function
    function translate(_term, _lang) {
        return translations[_term][_lang] // _lang = key.
    }

    let _related;
    let imageBlock:JSX.Element = <></>

    setTimeout(()=> {
        setDetails(fetchObjectsByID(_objects, id))
    }, )

    try {
        _related = fetchRelatedObjects(_objects, details, _thes);
        imageBlock = _related.map(image => (
            <img className={"related_img"}
                 src={image["iiif_image_uris"][0].replace("/full/0/default.jpg", "/400,/0/default.jpg")}
                 onClick={()=>routeChangeObject(image)}
            />
        ))
    } catch (e) {
        imageBlock= <Loading></Loading>
    }


    const navigate = useNavigate()
    const routeChange = () => {
        navigate("/index/color/")
    }


    let images = ""
    try {
        images = details["iiif_image_uris"][0]
    } catch(error) {
        //console.log(error)
    }

    function routeChangeObject(input) {
        let _uri = '/index/object/' + input["objectNumber"]
        navigate(_uri)
        fetchObjectsByID(input["objectNumber"])
    }


    return(
        <div className={"grid__objectViewer"} style={{overflowX: "hidden"}}>
            {isDesktopOrLaptop&&
                <div className="grid--even_10">
                    <h2 className={"uppercase text-center"} style={{margin: 10}} onClick={()=>routeChange()}> ⇜ {translate("back", language)}</h2>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>

                    <div className="grid--even_3">
                        <h2 className="uppercase text-center strike-through" style={{margin: 10}} onClick={()=>setLanguage("EN")}>EN</h2>
                        <h2 className="uppercase text-center strike-through" style={{margin: 10}} onClick={()=>setLanguage("NL")}>NL</h2>
                        <h2 className="uppercase text-center strike-through" style={{margin: 10}} onClick={()=>setLanguage("FR")}>FR</h2>
                    </div>

                </div>
            }

            <div>
                <div className="lineH"></div>
                <Suspense fallback={<Loading/>}>
                    <ObjectViewer description={true} details = {details}
                                  image={images} colorStrip={false}
                                  thesaurus={_thes} personen={_pers}
                                  box={true} colorCubes={true} split={true}
                                  language={language} viewer={true} attribution={true}
                    />
                </Suspense>
            </div>

            {isDesktopOrLaptop &&

                <div>
                    <div className={"lineH"}></div>
                    <h1 className={"home"} style={{fontSize: "18px", margin:"20px", paddingLeft: "4vw"}}>{translate("relatedObjects", language)}</h1>
                    <div className={"lineH"}></div>
                    <div className={"masonry"} style={{height: "300px", overflowX:"scroll", overflowY:"hidden", marginLeft: "5vw", marginRight:"5vw", marginTop:"1vh"}}>
                        {imageBlock}
                    </div>
                    <div className={"lineH"}></div>

                </div>

            }

        </div>
    )
}

export default ObjectPage

