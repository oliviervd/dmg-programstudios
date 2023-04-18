import React, {useState, Suspense, useEffect} from "react"
import {
    fetchText,
    headerTitleBig
} from "../utils/data_parsers";

import ProjectHomeView from "../elements/utils/projectHomeView";
import Header from "../elements/utils/Header";
import studiogrid_data from "../data/content/studiogrid.json"
import {useMediaQuery} from "react-responsive";

// SUPABASE
import useObjectsQuery from "../hooks/useObjectsQuery";
import useThesaurusQuery from "../hooks/useThesaurusQuery";
import useAgentQuery from "../hooks/useAgentQuery";
import useExhibitionLister from "../hooks/useExhibitionLister";
import {useQuery} from "@tanstack/react-query";
import usePayloadQueryStudios from "../hooks/usePayloadQueryStudios";
import {getObjects} from "../utils/SupabaseQueries";

const Home = () => {

    const [loadingState, setLoadingState] = useState(true);
    const InteractionBar = React.lazy(() => import("../elements/utils/interactionBar"))
    const StudioGrid = React.lazy(() => import("../elements/utils/StudioGrid"))

    //todo:  put in function?
    const isDesktopOrLaptop = useMediaQuery({
        query: '(min-width: 1224px)'
    })
    const isMobile = useMediaQuery({
        query: '(max-width: 1224px)'
    })

    const [language, setLanguage] = useState("EN");
    const [openBox, setOpenBox] = useState(false);

    const [about, setAbout] = useState(false);
    const [hoverContent, setHoverContent] = useState(" ");
    const [carouselState, setCarouselState] = useState("true");
    const [darkMode, setDarkMode] = useState(false)
    const [visualIdentity, setVisualIdentity] = useState("graphic_archive_01")

    const [studioData, setStudioData] = useState([]);

    const {data, status} = useQuery({
        queryKey:['STUDIO'],
        queryFn: () =>
            fetch("https://p01--admin-cms--qbt6mytl828m.code.run/api/studios/",{
                credentials:'include',
                method: 'GET'
            }).then((req)=>req.json())
    });

    let _studios = []
    studiogrid_data.forEach((x) => {
        _studios.push(x);
    })

    // * --- IMPROVED API CALLS --- * //
    const _objects = useObjectsQuery().data;
    const _thes = useThesaurusQuery().data;
    const _pers = useAgentQuery().data;
    const _exhibitions = useExhibitionLister(_objects);

    return (
        <div className={visualIdentity}>
            <div className={` ${darkMode ? "darkMode" : "lightMode"}`}>
                {isDesktopOrLaptop &&
                    <div
                        className={carouselState ? "grid-home-main-open full-page" : "grid-home-main-closed full-page"}>
                        <div>
                            <Header showAbout={true} content={headerTitleBig(language)} big={true} about={about}
                                    setAbout={setAbout} setLanguage={setLanguage} language={language} showTitle={true}/>
                            <ProjectHomeView style={{zIndex: -100000}} img={hoverContent}/>
                        </div>
                        <div className="grid--1_1">
                            <div></div>
                            <div style={{margin: 10}}>
                                {_studios.map((text => {
                                    let _text;
                                    _text = fetchText(text, language, "about");
                                    if (typeof _text !== "undefined") {
                                        const _t = _text.map((t) =>
                                            <p className="font-size--small about">{t}</p>
                                        )

                                        if (about === true) {
                                            return (
                                                <div className="about gridH--even_5">
                                                    <p>{_t}</p>
                                                </div>
                                            )
                                        } else {
                                            return (null)
                                        }
                                    } else {
                                        return (null)
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

                        <Suspense>
                            <StudioGrid
                                carouselState={carouselState} setCarouselState={setCarouselState} language={language} data={data}
                            />
                        </Suspense>

                    </div>
                }
                {isMobile &&
                    <div>
                        <div style={{marginTop: "3vh", marginBottom: "3vh"}}>
                            <Header big={true} about={about} setAbout={setAbout} setLanguage={setLanguage}
                                    language={language}/>
                        </div>
                        <div>
                            {_studios.map((studio => {
                                    let title_en;
                                    title_en = "";
                                    //studioType = fetchType(studio);

                                    return (
                                        <div className="grid-autoFill">
                                            <div style={{padding: "2vw"}}>
                                                <div className="grid--even" style={{padding: "2vh"}}>
                                                    <div className="grid--75_25">
                                                        <h2 className="uppercase"
                                                            onClick={() => (setOpenBox(!openBox))}>{title_en} </h2>
                                                        <h2 className="button-dropdown"> V </h2>
                                                    </div>
                                                    {openBox &&
                                                        <div style={{height: "200px"}}></div>
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    )
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