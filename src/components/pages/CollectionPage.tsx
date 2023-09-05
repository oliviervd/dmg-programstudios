import * as React from "react"
import {useParams} from "react-router-dom";
import {useMediaQuery} from "react-responsive";
import {translate} from "../utils/utils";
import {useNavigate} from "react-router-dom";
import {useState} from "react";
import translations from "../data/translations.json";
import {fetchCollectionsObjects} from "../utils/data_parsers"
import useObjectsQuery from "../hooks/useObjectsQuery";
import useThesaurusQuery from "../hooks/useThesaurusQuery";

const CollectionPage = (props) => {

    const [language, setLanguage] = useState("EN")
    const navigate = useNavigate() // initiate navigate

    const _objects  = useObjectsQuery().data;
    const _thes = useThesaurusQuery().data;

    //MEDIA QUERIES
    const isDesktopOrLaptop = useMediaQuery({
        query: '(min-width: 600px)'
    })

    const routeChange = () => {
        navigate("/index/color/")
    }

    // parse objects based on props
    const {collection} = useParams()
    //console.log(collection)

    function translate(_term, _lang) {
        return translations[_term][_lang] // _lang = key.
    }

    //*fetch subset collection based on collection ID
    let _collectionSubset;
    try{
        _collectionSubset = fetchCollectionsObjects(_objects, _thes, collection)
    } catch(e) {console.log(e)}

    function reduceIIIF(image) {
        try{
            return image.replace("/full/0/default.jpg", "/400,/0/default.jpg")
        } catch(e) {return image}
    }

    return(
        <div>
            {isDesktopOrLaptop &&
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
                <div className={"lineH"}></div>
                <div className={"grid--5_95"}>
                    <div></div>
                    <h1 className={"home"}>{collection}</h1>
                    <div className={"container-masonry-full"} style={{padding: "5vw"}}>
                        {_collectionSubset &&
                            <div className={"masonry"} style={{width: "90vw"}}>
                                {_collectionSubset.map(object=>(
                                    <img src={reduceIIIF(object["iiif_image_uris"][0])} />
                                ))}
                            </div>
                        }
                    </div>

                </div>

            </div>

        </div>
    )
}

export default CollectionPage