import React, {useState} from "react";
import {useMediaQuery} from "react-responsive";
import {useNavigate} from "react-router-dom";
import AgentViewer from "../elements/subjectpages/AgentViewer"
import {useParams} from "react-router-dom";
import useAgentQuery from "../hooks/useAgentQuery";
import useThesaurusQuery from "../hooks/useThesaurusQuery";
import useObjectsQuery from "../hooks/useObjectsQuery";
import translations from "../data/translations.json";


const AgentPage = () => {

    //* ---- UI: MEDIA QUERIES ----- *//
    const isDesktopOrLaptop = useMediaQuery({
        query: '(min-width: 600px)'
    })

    const isMobile = useMediaQuery({
        query: '(max-width: 600px)'
    })

    //* ---- DATA MANAGEMENT ------ *//

    // fetch id from url.
    let id = useParams();

    //* ---- API (SUPABASE) CALLS --- *//
    const _pers = useAgentQuery().data;
    const _thes = useThesaurusQuery().data;
    const _objects = useObjectsQuery().data;

    let _agent;
    try {
        _agent = fetchAgentRecordwithID(_pers, id.id) // set agent based on ID
    } catch (e) {}

    const [bitonal, setBitonal] = useState(false)
    const [wikiBios, setWikiBios] = useState("")
    const [language, setLanguage] = useState("EN");

    function fetchAgentRecordwithID(LDES, refPID) {
        let _len = LDES.length
        for (let i = 0; i < _len; i++) {
            try{
                let PID = LDES[i]["LDES_raw"]["object"]["http://www.w3.org/ns/adms#identifier"][1]["skos:notation"]["@value"]
                try {
                    if (refPID === PID) {
                        return LDES[i]
                    }
                } catch(e) {}
            } catch(error) {}
        }
    }

    function translate(_term, _lang) {
        return translations[_term][_lang] // _lang = key.
    }


    const navigate = useNavigate()
    const routeChange = () => {
        navigate("/index/colors/")
    }

    // fetch details on specific persons

    return(
        <div >
            {isDesktopOrLaptop&&
                <div>

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
                            <h2 className="uppercase text-center strike-through" style={{margin: 10}} onClick={()=>{setLanguage("EN")}}>EN</h2>
                            <h2 className="uppercase text-center strike-through" style={{margin: 10}} onClick={()=>{setLanguage("NL")}}>NL</h2>
                            <h2 className="uppercase text-center strike-through" style={{margin: 10}} onClick={()=>{setLanguage("FR")}}>FR</h2>
                        </div>

                    </div>

                    <div className={"grid--even_2"}>
                        <div/>
                        <div className={"grid--even_2"}>
                            <p> scroll this way </p>
                            {bitonal &&
                                <p onClick={()=> setBitonal(!bitonal)} >◧ bitonal</p>
                            }
                            {!bitonal &&
                                <p onClick={()=> setBitonal(!bitonal)} >⧅ bitonal</p>
                            }
                        </div>

                    </div>

                    <div style={{height: "100%"}}>
                        <div className="lineH"></div>
                        <AgentViewer id={id} bitonal={bitonal} agent={_agent} objects={_objects} thesaurus={_thes}
                                     personen={_pers} wikibios={wikiBios} language={language}>

                        </AgentViewer>
                    </div>
                </div>
            }
            {isMobile&&
                <div>
                    <div style={{height: "100%"}}>
                        <div className="lineH"></div>
                        <AgentViewer id={id} bitonal={bitonal} agent={_agent} objects={_objects} thesaurus={_thes}
                                     personen={_pers} wikibios={wikiBios} language={language}>

                        </AgentViewer>
                    </div>
                </div>
            }


        </div>
    )
}

export default AgentPage