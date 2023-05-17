import * as React from "react"
import {useState, Suspense, useEffect} from "react"
import {Helmet} from "react-helmet-async";
import {useParams, Link} from "react-router-dom";
import {useMediaQuery} from "react-responsive";
import Footer from "../elements/utils/Footer";

import ExhibitionIndex from "../elements/indexes/exhibitionIndex";
import ColorIndex from "../elements/indexes/colorIndex";
import Loading from "../elements/utils/Loading";
import NewItems from "../elements/indexes/newItems";
import translations from '../data/translations.json';


import useObjectsQuery from "../hooks/useObjectsQuery";
import useThesaurusQuery from "../hooks/useThesaurusQuery";
import useAgentQuery from "../hooks/useAgentQuery";
import useExhibitionLister from "../hooks/useExhibitionLister";
import AdvancedSearchQuery from "../elements/indexes/advancedSearchQuery";
import AdvancedSearch from "../elements/indexes/advancedSearch";

const Index = () => {

    // UTILS
    //MEDIA QUERIES
    const isDesktopOrLaptop = useMediaQuery({
        query: '(min-width: 700px)'
    })
    const isMobile = useMediaQuery({
        query: '(max-width: 700px)'
    })

    // COLOR INDEX
    const [about, setAbout] = useState(false);
    const [showIndexColors, setShowIndexColors] = useState(true);
    const [showAdvancedSearch, setShowAdvancedSearch] = useState(false);
    const [collapseColors, setCollapseColors] = useState(true);
    const [collapseExhibition, setCollapseExhibition] = useState(false);
    const [collapseNewItems, setCollapseNewItems] = useState(false)
    const [queryResult, setQueryResult] = useState([]);
    const [doubleHeader, setDoubleHeader] = useState(false);
    const [closeSearch, setCloseSearch] = useState(false);
    const [language, setLanguage] = useState("EN")

    // * --- IMPROVED API CALLS --- * //
    const _objects  = useObjectsQuery().data;
    const _thes  = useThesaurusQuery().data;
    const _pers = useAgentQuery().data;
    const _exhibitions = useExhibitionLister(_objects);

    function translate(_term, _lang) {
        return translations[_term][_lang] // _lang = key.
    }

    // * --- DECLARE OBJECTS (LAYOUT) --- * //
    let style, searchBoxStyle, header

    let param = useParams();
    // todo: set params for language in URL (NL, FR , EN)

    useEffect(() => {
        if (param.type === "color") {
            openExhibitionIndex() // opens colors
        }
    }, [param.type]);

    useEffect(() => {
        if (param.type === "exhibition") {
            openColorIndex() // opens exhibitions.
        }
    }, [param.type]);

    useEffect(() => {
        if (param.type === "new") {
            openNewIndex()
        }
    }, [param.type]);

    if(about) {
        style = {
            height: "200px",
            overflowY:"scroll",
            width: "70vw"
        }
    } else {
        style = {
            height: "200px",
            overflowY:"scroll"
        }
    }

    if (closeSearch) {
        searchBoxStyle = {
            gridTemplateColumns: "5% 95%"
        }
    }

    function dropDownMenu() {
        setDoubleHeader(!doubleHeader);
    }

    if (doubleHeader) {
        header = {
            //position: "fixed",
            background: "white",
            width: "100vw",
            borderBottom: "solid 2px black"
        }
    }

    // todo: make into one generic function.
    function openColorIndex() {
        setCollapseColors(false);
        setCollapseExhibition(true)
        setCollapseNewItems(false)
        setDoubleHeader(false);
    }

    function openExhibitionIndex() {3
        setCollapseColors(true);
        setCollapseExhibition(false)
        setCollapseNewItems(false)
        setDoubleHeader(false);
    }

    function openNewIndex() {
        setCollapseColors(false);
        setCollapseExhibition(false)
        setCollapseNewItems(true)
        setDoubleHeader(false);
    }

    function closeSearchTab() {
        setAbout(false)
        setShowAdvancedSearch(false)
        openColorIndex()
    }
    
    function openSearchTab() {
        if (!_objects.isLoading) {
            setAbout(true)
        }
    }

    return(
        <div>
            {isDesktopOrLaptop&&
                <div>
                    <Helmet>
                        <title>INDEX</title>
                        <meta name={"description"} content={"page containing several indexes on the collection of Design Museum Gent"}/>
                        <link rel={"canonical"} href={import.meta.env.REACT_APP_WEB_BASE_URL+"/index/color/"}/>
                    </Helmet>
                    <div style={header}>
                        <div className="grid--even_10">
                            <Link className={"HeaderLink uppercase"} style={{margin: '10px', fontWeight:"bold"}}  to={"/"}>HOME</Link>
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                            {about &&
                                <h2 className={!doubleHeader?"HeaderLink uppercase text-center":"HeaderLink uppercase text-center underlined"} style={{margin: 10}} onClick={()=> closeSearchTab()}>{translate("back_to_index", language)}</h2>
                            }
                            {about &&
                                <div></div>
                            }
                            {!about &&
                                <h2 className={!doubleHeader?"uppercase text-center HeaderLink":"HeaderLink uppercase text-center underlined"} style={{margin: 10}} onClick={()=>dropDownMenu()}>{translate("set_index", language)}</h2>
                            }
                            {!about &&
                                <h2 className="HeaderLink uppercase text-center idle" style={{margin: 10}} onClick={()=>openSearchTab()}>{translate("search", language)}</h2>
                            }
                            <div className="grid--even_3">
                                <h2 className="HeaderLink uppercase text-center strike-through" style={{margin: 10}} onClick={()=>setLanguage("EN")}>EN</h2>
                                <h2 className="HeaderLink uppercase text-center strike-through" style={{margin: 10}} onClick={()=>setLanguage("NL")}>NL</h2>
                                <h2 className="HeaderLink uppercase text-center strike-through" style={{margin: 10}} onClick={()=>setLanguage("FR")}>FR</h2>
                            </div>

                        </div>
                        {doubleHeader &&
                            <div className="grid--even_10">
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                                <div className={"grid--even"}>
                                    <Link to={`/index/color/`} className="HeaderLink" style={{}} onClick={()=>openExhibitionIndex()}>{translate("colors", language)}</Link>
                                    <Link to={`/index/exhibition/`} className="HeaderLink" style={{}} onClick={()=>openColorIndex()}>{translate("exhibition", language)}</Link>
                                    <Link to={`/index/new/`} className="HeaderLink" style={{whiteSpace: "nowrap"}} onClick={()=>openNewIndex()}>{translate("new", language)}</Link>
                                </div>
                                <div></div>
                                <div></div>
                                <div></div>

                            </div>
                        }
                    </div>

                    <div className={about? "grid--3_7 container": "container"} style={searchBoxStyle}>
                        {about &&
                            <div>
                                <AdvancedSearchQuery about={about} setAbout={setAbout}
                                                     showAdvancedSearch={showAdvancedSearch} setShowAdvancedSearch={setShowAdvancedSearch}
                                                     objects={_objects} thesaurus={_thes} language={language}
                                                     setQueryResult={setQueryResult} closeSearch={closeSearch} setCloseSearch={setCloseSearch}
                                />
                            </div>

                        }

                        {showAdvancedSearch&&
                            <AdvancedSearch queryResults={queryResult} objecten={_objects} thesaurus={_thes} personen={_pers} setCloseSearch={setCloseSearch} language={language}/>
                        }

                        {!showAdvancedSearch&&
                            <div>
                                <div className="grid--even" style={{width: "inherit"}}>

                                    <Suspense fallback={<Loading/>}>
                                        <ColorIndex style={style} objects={_objects} thesaurus={_thes} agents={_pers}
                                                    about={about} showIndexColors={showIndexColors} setShowIndexColors={setShowIndexColors}
                                                    collapseColors={collapseColors} setCollapseColors={setCollapseColors}
                                                    collapseExhibition={collapseExhibition} setCollapseExhibition={setCollapseExhibition}
                                                    language={language}
                                        />
                                    </Suspense>


                                    <ExhibitionIndex exhibitionList={_exhibitions} objects={_objects} thesaurus={_thes} agents={_pers}
                                                     collapseColors={collapseColors} setCollapseColors={setCollapseColors}
                                                     collapseExhibition={collapseExhibition} setCollapseExhibition={setCollapseExhibition}
                                                     language={language}
                                    />

                                    <NewItems collapseNewItems={collapseNewItems} setCollapseNewItem={setCollapseNewItems}
                                              objects={_objects} thesaurus={_thes} agents={_pers} language={language}/>

                                </div>
                            </div>
                        }



                    </div>


                </div>
            }
            {isMobile &&
                <div>
                    <ColorIndex style={style} objects={_objects} thesaurus={_thes} agents={_pers}
                                about={about}/>
                    <ExhibitionIndex exhibitionList={_exhibitions}
                                     showIndexColors={showIndexColors} setShowIndexColors={setShowIndexColors}/>
                    <NewItems collapseNewItems={collapseNewItems} setCollapseNewItem={setCollapseNewItems}
                              objects={_objects} thesaurus={_thes} agents={_pers}/>
                </div>
            }


            <Footer></Footer>
        </div>
    )
}

export default Index;