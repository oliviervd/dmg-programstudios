import React, {Suspense, useState} from "react"
import {useParams} from "react-router-dom";
import {fetchDataStudiosPayload} from "../utils/data_parsers";
import {fetchContentStudiosCMS} from "../utils/data_parsers";

const StudioLanding = (props) => {

    const InteractionBar = React.lazy(()=>import("../elements/utils/interactionBar"))
    const id = useParams(); //fetch id from URL
    const Header = React.lazy(()=> import("../elements/utils/Header"))
    const [language, setLanguage] = useState("EN");

    let _studio = ""
    try {
        let _studios = fetchContentStudiosCMS()
        _studio = _studios["docs"]
        for (let i=0; i<_studios["docs"].length; i++) {
            // filter out right studio based on props
            console.log(_studios["docs"][i])
        }

    } catch (e) {}

    console.log(_studio)

    return(
        <div className="container__studio--main">
            <div className="container__studio--main-left">
                <div className={"container__studio--header"}>
                    <h1 className={"studio__digital--header-typo"}>Studio Digital</h1>
                </div>
            </div>
            <div className="container__studio--main-right">
                <div className={"container__studio--header"}>
                    <h1 className={"studio__digital--header-typo"}>projext xyz --</h1>
                </div>
            </div>
        </div>
    )
}

export default StudioLanding