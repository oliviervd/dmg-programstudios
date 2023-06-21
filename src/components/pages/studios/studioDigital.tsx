import * as React from "react";
import {useState} from "react";
import Header from "../../elements/utils/Header";
import {fetchContentStudiosCMS} from "../../utils/data_parsers"

const studioDigital = () => {

    const [language, setLanguage] = useState("EN")

    let _content;
    let content

    try {
        _content = fetchContentStudiosCMS(); // fetch data CMS api endpoint.
        _content = _content["docs"];
        content = _content.filter(obj => obj["postCategory"]==="studioDigital")
        //console.log(content)

    } catch {}

    return(
       <div>
           <Header content={"Studio Digitaal"}></Header>
       </div>
    )
}

export default studioDigital