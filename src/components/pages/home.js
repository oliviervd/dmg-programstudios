import React, {useState} from "react";
import {useMediaQuery} from "react-responsive";
import useGoogleSheets from "use-google-sheets";
import {fetchTitle, fetchDescription, headerTitle, headerAbout, fetchImage, fetchText
    , fetchStudioProjectDescription, fetchStudioID, fetchStudioProjectTitle, fetchType} from "../utils/data_parsers";
import ProjectHomeSnippet from "../elements/projectHomeSnippet";
import ProjectHomeView from "../elements/projectHomeView";
import Header from "../elements/Header";
const Home = () => {

    const [language, setLanguage] = useState("EN");
    const [about, setAbout] = useState(false);
    const [hoverContent, setHoverContent] = useState(" ");

    console.log(hoverContent);

    const isDesktopOrLaptop = useMediaQuery({
        query: '(min-width: 1224px)'
    })

    const isMobile = useMediaQuery({
        query: '(max-width: 1224px)'
    })

    const {data, loading, error} = useGoogleSheets({
        apiKey: "AIzaSyAhfyQ_9XDc6ajRYDy3qPXPAp8mkLKja90",
        sheetId: "1t8c2FwHlhGBXQ22zg0BRPNdElKNg5_yu8CUAMGY_hvw",
        datasheetOptions: [{id: 'Studios'}],
    });

    if (loading) {
        return <div><p>loading...</p></div>
    }

    if (error) {
        return <div><p>error!</p></div>
    }

    let _studios = [];
    data.map((x)=>{
        x.data.map((l)=>{
            _studios.push(l);
        })
    })

    //todo: make responsive mobile
    //todo: make responsive tablet
    //todo: make seperate container for scroller.

    return(
        <div>
            <div className="grid-home-main full-page">
                <Header about={about} setAbout={setAbout} setLanguage={setLanguage} language={language}/>

                <div className="grid--1_2" style={{zIndex: 100000, background: "white"}}>
                    <div style={{margin: 10}}>
                        {_studios.map((text => {
                            let _text;
                            _text = fetchText(text, language, "about");
                            if (typeof _text !== "undefined"){
                                const _t = _text.map((t)=>
                                    <p className="paragraph">{t}</p>
                                )

                                if (about === true){
                                    return(
                                        <div className="about gridH--even_5">
                                            <p>{_t}</p>
                                        </div>
                                    )
                                }
                            }
                        }))}
                    </div>
                    <div>
                        <ProjectHomeView img={hoverContent}/>
                    </div>
                </div>

                <div className="lineH grid--even_5">
                    {_studios.map((studio => {
                        let title_en, description, studioImage, projectDesc, studioID, projectTitle, studioType;
                        title_en = fetchTitle(studio, language, "studio");
                        description = fetchDescription(studio, language, "studio");
                        studioImage = fetchImage(studio, "studio");
                        studioType = fetchType(studio);
                        studioID = fetchStudioID(studio);

                        projectDesc = fetchStudioProjectDescription(studio, language, "text", studioID);

                        if (studioType === "studio") {

                            return(
                                <div className="rowScroll fade-in">
                                    <div className="scroll-div" >
                                        <h2 className="text-center uppercase box-title">{title_en}</h2>
                                        <img className="img__fit center" src={studioImage} onMouseOver={()=>setHoverContent(studioImage)} onMouseLeave={()=>setHoverContent(" ")}/>
                                        <p className="uppercase justify padding-10">{description}</p>
                                        <ProjectHomeSnippet className="padding-10" id={studioID} lang={language} setHoverContent={setHoverContent}/>
                                    </div>
                                    <div className="scroll-div" >
                                        <h2 className="text-center uppercase box-title">{title_en}</h2>
                                        <img className="img__fit center" src={studioImage} onMouseOver={()=>setHoverContent(studioImage)} onMouseLeave={()=>setHoverContent(" ")}/>
                                        <p className="uppercase justify padding-10">{description}</p>
                                        <ProjectHomeSnippet className="padding-10" id={studioID} lang={language} setHoverContent={setHoverContent}/>
                                    </div>
                                </div>

                            )
                        }


                    }))}
                </div>
            </div>
        </div>


    )
}

export default Home;