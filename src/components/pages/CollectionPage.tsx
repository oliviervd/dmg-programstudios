import * as React from "react"
import {useParams} from "react-router-dom";
import {useMediaQuery} from "react-responsive";
import {translate} from "../utils/utils";
import {useNavigate} from "react-router-dom";
import {useState} from "react";
import translations from "../data/translations.json";


const CollectionPage = (props) => {

    const [language, setLanguage] = useState("EN")
    const navigate = useNavigate() // initiate navigate

    //MEDIA QUERIES
    const isDesktopOrLaptop = useMediaQuery({
        query: '(min-width: 600px)'
    })

    // todo: make routeChange generic function
    const routeChange = () => {
        navigate("/index/color/")
    }

    // parse objects based on props
    const {collection} = useParams()
    //todo: make translation generic function
    function translate(_term, _lang) {
        return translations[_term][_lang] // _lang = key.
    }

    const _collectionSet = <div>
        <p>subset comes here</p>
    </div>


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
                    <div>
                        {_collectionSet}
                    </div>

                </div>

            </div>

        </div>
    )
}

export default CollectionPage