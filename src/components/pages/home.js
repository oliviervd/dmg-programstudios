import React, {useState, Suspense, useEffect} from "react";
import useGoogleSheets from "use-google-sheets";
import {fetchTitle, fetchDescription, fetchImage, fetchText, fetchStudioID, fetchType, fetchStudioProjectLink} from "../utils/data_parsers";
import ProjectHomeSnippet from "../elements/projectHomeSnippet";
import ProjectHomeView from "../elements/projectHomeView";
import Header from "../elements/Header";
import {Link} from "react-router-dom";


const InteractionBar = React.lazy(()=>import("../elements/interactionBar"))

const Home = () => {

    // todo: make more carbon neutral (83);
    // https://www.websitecarbon.com/website/modelsfromthepastforthefuture-herokuapp-com/

    const [language, setLanguage] = useState("EN");
    const [about, setAbout] = useState(false);
    const [hoverContent, setHoverContent] = useState(" ");
    const [carouselState, setCarouselState] = useState("true");
    const [darkMode, setDarkMode] = useState(false)
    const [visualIdentity, setVisualIdentity] = useState("graphic_archive_01")

    console.log(visualIdentity);

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
        <div className={visualIdentity}>
            <div className={` ${darkMode?"darkMode":"lightMode"}`}>
                <div className={carouselState?"grid-home-main-open full-page":"grid-home-main-closed full-page"}>
                    <Header about={about} setAbout={setAbout} setLanguage={setLanguage} language={language}/>

                    <div className="grid--1_2" style={{zIndex: 100000}}>
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

                    <div>
                        <Suspense>
                            <InteractionBar lang={language}
                                            carouselState={carouselState} setCarouselState={setCarouselState}
                                            darkMode={darkMode} setDarkMode={setDarkMode}
                                            visualIdentity={visualIdentity} setVisualIdentity={setVisualIdentity}
                                            darkModeShow={true} archiveShow={true} lastFetch={false}/>
                        </Suspense>
                    </div>

                    <div className={"lineH grid--even_5 HomeProjectGridContainer"}>
                        {_studios.map((studio => {
                            let title_en, description, studioImage, studioID, studioType, studioLink;
                            title_en = fetchTitle(studio, language, "studio");
                            description = fetchDescription(studio, language, "studio");
                            studioImage = fetchImage(studio, "studio");
                            studioType = fetchType(studio);
                            studioID = fetchStudioID(studio);
                            studioLink = fetchStudioProjectLink(studio)
                            console.log(studioLink);

                            if (studioType === "studio") {
                                return(
                                    <div id="HomeProjectGrid" className="rowScroll fade-in open">
                                        <div className="scroll-div">
                                            <h2 className="text-center uppercase box-title">{title_en}</h2>
                                            <img className="img__fit center" src={studioImage}
                                                 onClick={()=>setCarouselState(!carouselState)}
                                                 onMouseOver={()=>setHoverContent(studioImage)}
                                                 onMouseLeave={()=>setHoverContent(" ")}/>
                                            <p className="uppercase justify padding-10">{description}</p>
                                            <ProjectHomeSnippet className="padding-10" id={studioID}
                                                                lang={language} setHoverContent={setHoverContent}
                                                                setCarouselState={setCarouselState}
                                                                carouselState={carouselState}/>
                                        </div>

                                        <div className="scroll-div">
                                            <h2 className="text-center uppercase box-title">{title_en}</h2>
                                            <img className="img__fit center" src={studioImage}
                                                 onClick={()=>setCarouselState(!carouselState)}
                                                 onMouseOver={()=>setHoverContent(studioImage)}
                                                 onMouseLeave={()=>setHoverContent(" ")}/>
                                            <p className="uppercase justify padding-10">{description}</p>
                                            <ProjectHomeSnippet className="padding-10" id={studioID}
                                                                lang={language} setHoverContent={setHoverContent}
                                                                setCarouselState={setCarouselState}
                                                                carouselState={carouselState}/>
                                        </div>
                                    </div>

                                )
                            }


                        }))}
                    </div>
                </div>
            </div>
        </div>



    )
}

export default Home;