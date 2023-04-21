import React, {useState, Suspense, useEffect} from "react"
import {useParams} from "react-router-dom";
import {useNavigate} from "react-router-dom";
import {useMediaQuery} from "react-responsive";
import Footer from "../elements/utils/Footer";

import ExhibitionIndex from "../elements/indexes/exhibitionIndex";
import ColorIndex from "../elements/indexes/colorIndex";
import Loading from "../elements/utils/Loading";
import NewItems from "../elements/indexes/newItems";

import useObjectsQuery from "../hooks/useObjectsQuery";
import useThesaurusQuery from "../hooks/useThesaurusQuery";
import useAgentQuery from "../hooks/useAgentQuery";
import useExhibitionLister from "../hooks/useExhibitionLister";
import AdvancedSearchQuery from "../elements/indexes/advancedSearchQuery";
import AdvancedSearch from "../elements/indexes/advancedSearch";

const Index = (props) => {

    // UTILS
    let navigate = useNavigate();
    //MEDIA QUERIES
    const isDesktopOrLaptop = useMediaQuery({
        query: '(min-width: 700px)'
    })
    const isMobile = useMediaQuery({
        query: '(max-width: 700px)'
    })

    let type = useParams()

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

    console.log(queryResult)
    console.log(showAdvancedSearch)

    // * --- IMPROVED API CALLS --- * //
    const _objects  = useObjectsQuery().data;
    const _thes  = useThesaurusQuery().data;
    const _pers = useAgentQuery().data;
    const _exhibitions = useExhibitionLister(_objects);

    let param = useParams();

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

    console.log(param);

    // * --- * //

    // https://www.youtube.com/watch?v=FEiggoSm8tw
    const routeChange = () => {
        navigate("/")
    }

    let style;

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

    let searchBoxStyle;

    if (closeSearch) {
        searchBoxStyle = {
            gridTemplateColumns: "5% 95%"
        }
    }

    function dropDownMenu() {
        setDoubleHeader(!doubleHeader);
    }

    let header
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
        //setAbout(!about)
        //setShowAdvancedSearch(false)
    }

    function openExhibitionIndex() {
        setCollapseColors(true);
        setCollapseExhibition(false)
        setCollapseNewItems(false)
        setDoubleHeader(false);
        //setAbout(!about)
        //setShowAdvancedSearch(false)
    }

    function openNewIndex() {
        setCollapseColors(false);
        setCollapseExhibition(false)
        setCollapseNewItems(true)
        setDoubleHeader(false);
        //setAbout(!about)
        //setShowAdvancedSearch(false)
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
                    <div style={header}>
                        <div className="grid--even_10">
                            <h2 className="uppercase" style={{margin: 10}}>home</h2>
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                            {about &&
                                <h2 className={!doubleHeader?"uppercase text-center":"uppercase text-center underlined"} style={{margin: 10}} onClick={()=> closeSearchTab()}>back to index</h2>
                            }
                            {about &&
                                <div></div>
                            }
                            {!about &&
                                <h2 className={!doubleHeader?"uppercase text-center":"uppercase text-center underlined"} style={{margin: 10}} onClick={()=>dropDownMenu()} >set index</h2>
                            }
                            {!about &&
                                <h2 className="uppercase text-center idle" style={{margin: 10}} onClick={()=>openSearchTab()}>search</h2>
                            }
                            <div className="grid--even_3">
                                <h2 className="uppercase text-center strike-through" style={{margin: 10}}>EN</h2>
                                <h2 className="uppercase text-center strike-through" style={{margin: 10}}>NL</h2>
                                <h2 className="uppercase text-center strike-through" style={{margin: 10}}>FR</h2>
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

                                <div>
                                    <h2 className="uppercase text-center strike-through" style={{margin: 10}} onClick={()=>openExhibitionIndex()}>COLORS</h2>
                                    <h2 className="uppercase text-center strike-through" style={{margin: 10}} onClick={()=>openColorIndex()}>EXHIBITIONS</h2>
                                    <h2 className="uppercase text-center strike-through" style={{margin: 10}} onClick={()=>openNewIndex()}>RECENTLY ADDED</h2>
                                </div>


                            </div>
                        }
                    </div>

                    <div className={about? "grid--3_7 container": "container"} style={searchBoxStyle}>
                        {about &&
                            <div>
                                <AdvancedSearchQuery about={about} setAbout={setAbout}
                                                     showAdvancedSearch={showAdvancedSearch} setShowAdvancedSearch={setShowAdvancedSearch}
                                                     objects={_objects} thesaurus={_thes}
                                                     setQueryResult={setQueryResult} closeSearch={closeSearch} setCloseSearch={setCloseSearch}
                                />
                            </div>

                        }

                        {showAdvancedSearch&&
                            <AdvancedSearch queryResults={queryResult} objecten={_objects} thesaurus={_thes} personen={_pers} setCloseSearch={setCloseSearch}/>
                        }

                        {!showAdvancedSearch&&
                            <div>
                                <div className="grid--even" style={{width: "inherit"}}>

                                    <Suspense fallback={<Loading/>}>
                                        <ColorIndex style={style} objects={_objects} thesaurus={_thes} agents={_pers}
                                                    about={about} showIndexColors={showIndexColors} setShowIndexColors={setShowIndexColors}
                                                    collapseColors={collapseColors} setCollapseColors={setCollapseColors}
                                                    collapseExhibition={collapseExhibition} setCollapseExhibition={setCollapseExhibition}
                                        />
                                    </Suspense>


                                    <ExhibitionIndex exhibitionList={_exhibitions} objects={_objects} thesaurus={_thes} agents={_pers}
                                                     collapseColors={collapseColors} setCollapseColors={setCollapseColors}
                                                     collapseExhibition={collapseExhibition} setCollapseExhibition={setCollapseExhibition}
                                    />

                                    <NewItems collapseNewItems={collapseNewItems} setCollapseNewItem={setCollapseNewItems}
                                              objects={_objects} thesaurus={_thes} agents={_pers}/>

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