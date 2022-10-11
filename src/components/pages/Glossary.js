import React, {Suspense,useState} from "react";
import Accordion from "../elements/Accordion";
import useGoogleSheets from "use-google-sheets"

const XenoHeader = React.lazy(() => import("../elements/xenoHeader"))

const Glossary = () => {



    // connect with google sheets API.
    const {data} = useGoogleSheets({
        apiKey: process.env.REACT_APP_GOOGLE_API_KEY,
        sheetId: process.env.REACT_APP_GOOGLE_SHEETS_ID,
        sheetsNames: ['glossary']
    })

    // push objets in array
    let _glossList = []; // init glossary list parsed from JSON
    data.map((sub)=>{
        sub.data.map((x) => {
            //console.log(x);
            _glossList.push(x);
        })
    })


    const [gloss, setGloss] = useState("GLOSS_01")


    const handleID = event => {
        let _gloss;
        _gloss = event.currentTarget.id;
        setGloss(()=> _gloss);

    }

    var _result = _glossList.filter(function(val) {
        return val.id === gloss
    })

    let _glossTitle = _result.map((_temp) => { return _temp.glossary_term.toUpperCase()})
    let _glossDesc = _result.map((_temp) => {return _temp.glossary_description})
    let _glossSource = _result.map((_temp) => {return _temp.glossary_source})
    let _glossActive = _result.map((_temp) => {return _temp.glossary_active})


    // set glossary term to be shown
    return(
        <div>
            <Suspense>
                <XenoHeader header_nav={true} header_main={true}/>
            </Suspense>

            {/* ROW1 */}

            <div className="rowScrollMain">
                <div style={{background: "#111111", height:"150vh"}}>
                    <div className="grid--even_10">
                        <div className="border_box white glossBox"/>
                        <div className="border_box white glossBox"/>
                        <div className="border_box white glossBox"/>
                        {_glossList.map((_term) => {
                            if (_term.sub == "x") {
                                return (
                                    <div className="border_box white glossBox" id={_term.id} onClick={handleID}>
                                        <div>
                                            <div className="glossTitles">{_term.glossary_term}</div>
                                            <div>{_term.glossary_description}</div>
                                        </div>
                                    </div>
                                )
                            }
                            }
                        )}
                        <div className="border_box white glossBox"/>
                        <div className="border_box white glossBox"/>
                    </div>
                    <div className="grid--3_4_3">
                        <div></div>
                        <div className="glossDefinitionBox background__transparent__flow">
                            <h1 className="text-center">{_glossTitle}</h1>
                            <h3 className="text-center">{_glossActive}</h3>
                            <div className="text-center text" style={{margin: "100px"}}>{_glossDesc}</div>
                            <div className="text-center text">{_glossSource}</div>
                        </div>
                        <div></div>
                    </div>
                </div>

            </div>


        </div>
    )
}

export default Glossary;