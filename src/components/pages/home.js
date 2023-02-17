import React, {useState, Suspense} from "react";
import {
    fetchTitle,
    fetchDescription,
    fetchImage,
    fetchText,
    fetchStudioID,
    fetchType,
    headerTitleBig
} from "../utils/data_parsers";
import {useNavigate} from "react-router-dom"

import ProjectHomeSnippet from "../elements/projectHomeSnippet";
import ProjectHomeView from "../elements/projectHomeView";
import Header from "../elements/Header";
import studiogrid_data from "../data/content/studiogrid.json"
import {useMediaQuery} from "react-responsive";


const Home = () => {

    const InteractionBar = React.lazy(()=>import("../elements/interactionBar"))
    const isDesktopOrLaptop = useMediaQuery({
        query: '(min-width: 1224px)'
    })
    const isMobile = useMediaQuery({
        query: '(max-width: 1224px)'
    })

    let navigate = useNavigate();


    // todo: make more carbon neutral (83)
    // https://www.websitecarbon.com/website/modelsfromthepastforthefuture-herokuapp-com

    const [language, setLanguage] = useState("EN");
    const [openBox, setOpenBox] =useState(false);

    const [about, setAbout] = useState(false);
    const [hoverContent, setHoverContent] = useState(" ");
    const [carouselState, setCarouselState] = useState("true");
    const [darkMode, setDarkMode] = useState(false)
    const [visualIdentity, setVisualIdentity] = useState("graphic_archive_01")

    let _studios = []
    studiogrid_data.forEach((x)=>{
        _studios.push(x);
    })

    return(
        <div className={visualIdentity}>
            <div className={` ${darkMode?"darkMode":"lightMode"}`}>
                {isDesktopOrLaptop &&
                    <div className={carouselState?"grid-home-main-open full-page":"grid-home-main-closed full-page"}>
                        <div>
                            <Header showAbout={true} content={headerTitleBig(language)} big={true} about={about} setAbout={setAbout} setLanguage={setLanguage} language={language}/>
                            <ProjectHomeView style={{zIndex: -100000}} img={hoverContent}/>
                        </div>
                        <div className="grid--1_1">
                            <div></div>
                            <div style={{margin: 10}}>
                                {_studios.forEach((text => {
                                    let _text;
                                    _text = fetchText(text, language, "about");
                                    if (typeof _text !== "undefined"){
                                        const _t = _text.map((t)=>
                                            <p className="font-size--small about">{t}</p>
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

                        <div style={{paddingLeft: "1vh", paddingRight: "1vh"}} className={"lineH grid--even_4 HomeProjectGridContainer"}>
                            {_studios.map((studio => {
                                let title_en, description, studioImage, studioID, studioType, href;
                                title_en = fetchTitle(studio, language, "studio");
                                description = fetchDescription(studio, language, "studio");
                                studioImage = fetchImage(studio, "studio");
                                studioType = fetchType(studio);
                                studioID = fetchStudioID(studio);

                                if (studioType === "studio") {
                                    href = "/studio/" + studio.title_en.split(" ")[1].toLowerCase();
                                    const routeChange = () =>{
                                        navigate(href);
                                    }


                                    // construct URIs

                                    return(
                                        <div id="HomeProjectGrid" className="rowScroll fade-in open">
                                            <div>
                                                <h2 className="text-center uppercase box-title grow main" onClick={routeChange}>{title_en}</h2>
                                                <p className="uppercase justify padding-10" style={{height:'10vh'}}>{description}</p>
                                                <img className="img__fit center" src={studioImage} alt={""}
                                                     onClick={()=>setCarouselState(!carouselState)}
                                                     onMouseOver={()=>setHoverContent(studioImage)}
                                                     onMouseLeave={()=>setHoverContent(" ")}/>
                                                <ProjectHomeSnippet className="padding-10" id={studioID}
                                                                    lang={language} setHoverContent={setHoverContent}
                                                                    setCarouselState={setCarouselState}
                                                                    carouselState={carouselState}/>
                                            </div>
                                        </div>
                                    )
                                } else {
                                    return(null)
                                }
                            }))}
                        </div>
                    </div>
                }
                { isMobile &&
                    <div >
                        <div style={{marginTop: "3vh", marginBottom: "3vh"}}>
                            <Header big={true} about={about} setAbout={setAbout} setLanguage={setLanguage} language={language}/>
                        </div>
                        <div>
                            {_studios.map((studio => {
                                    let title_en, studioType;
                                    title_en = fetchTitle(studio, language, "studio");
                                    studioType = fetchType(studio);

                                    if (studioType === "studio") {

                                        return(
                                            <div className="grid-autoFill">
                                                <div style={{padding: "2vw"}}>
                                                    <div className="grid--even" style={{padding: "2vh"}}>
                                                        <div className="grid--75_25">
                                                            <h2 className="uppercase" onClick={()=>(setOpenBox(!openBox))}>{title_en} </h2>
                                                            <h2 className="button-dropdown"> V </h2>
                                                        </div>
                                                        {openBox &&
                                                            <div style={{height: "200px"}}></div>
                                                        }

                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    } else {
                                        return(null)
                                    }
                                }
                            ))}
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}

export default Home;