import React, {Suspense, useEffect, useState} from "react";
import useObjectsQuery from "../../hooks/useObjectsQuery";
import {fetchObjectsByID} from "../../utils/data_parsers";
import ObjectViewer from "../subjectpages/ObjectViewer";
import {useMediaQuery} from "react-responsive";
import {useNavigate} from "react-router-dom";

const NewItems = (props) => {

    const _thes  = props.thesaurus
    const _pers = props.agents
    const about = props.about
    const _objects = useObjectsQuery();

    let navigate = useNavigate();

    const newItems_march = ["2774", "1987-0882", "1987-0924", "1987-1118_0-2", "1987-0912", "1987-1097", "1987-1101", "1987-1021", "1987-1022", "1987-1064", "1987-0947", "1987-0948", "1987-1066", "2001-0032", "2002-0003", "2005-0131_0-2", "2005-0133", "2006-0017_0-2", "2009-0030_00-26", "2010-0096_0-5", "2011-0033", "2015-0079", "2019-0060", "2637", "4541_0-3", "4548", "4549_0-2", "4550", "4554", "5826", "6473_0-4", "6593", "6596", "6599", "DES.1995.07", "2017-0059", "1417", "1984-0016", "1987-1447", "1987-1160", "4331", "3475", "2793", "2796", "1987-1483", "3374", "4086", "4574", "6016", "6017", "1977-0095", "1977-0096", "1980-0296", "1981-0040", "1997-0006", "1997-0011_0-2", "1999-0094", "2015-0064", "2017-0126_0-2", "2629", "2633", "2634", "2635", "2636", "2771", "2990_0-4", "3150_A", "3150_B", "3150_C", "3221", "3393", "3403_0-3", "3953", "4078", "4313_0-2", "5218", "2012-0027", "2022-0037", "2022-0042", "2001-0118", "DMG_T_00131_ORANJE", "2008-0048", "2006-0021", "2010-0105", "2008-0051", "DMG_T_00810_ORANJE", "DMG_T_00781_ORANJE", "DMG_T_00788_ORANJE", "DMG_T_00766_ORANJE", "DMG_T_00762_ORANJE", "DMG_T_00746_ORANJE"]
    const newItems_april = ["1987-0919", "1987-0858", "1987-0860", "1987-0930", "1987-0961", "1987-1000", "1987-0996", "1987-0845", "1987-0846", "1987-1100", "1987-0898", "1987-0960", "1987-1098", "1980-0010", "1988-0030", "1988-0031_0-7", "2010-0030", "DES.1996.01", "DES.1996.03", "DES.1996.05", "DES.1997.05", "1986-0015", "1989-0020", "1991-0038", "1991-0075", "1991-0076", "1457", "4624", "2794", "2795", "0293", "0294", "0472", "0561", "0562", "0563", "0564", "0565", "0571", "0578", "0586", "3814", "DMG_T_00769_ORANJE", "DMG_T_00979_ORANJE", "DMG_T_01018_ORANJE", "DMG_T_01137_ORANJE", "DMG_T_01139_ORANJE", "DMG_T_01147_ORANJE", "DMG_T_01159_ORANJE", "0033_0-2", "0811", "1976-0221", "1977-0097", "1978-0038", "1978-0042", "1985-0068", "1988-0020_0-2", "1999-0092", "1999-0093", "2011-0038", "2013-0015", "2017-0225", "2018-0003", "2900", "2901", "3062", "3083", "3120", "3126", "3139", "3143", "3144", "3147", "3148", "3169", "3172", "3795", "3882", "4314", "4605", "DMG_T_00197_ORANJE", "FH-0028", "FH-0042", "3068", "3090", "3091", "3100", "3110", "3127", "3158", "3159", "3173", "0827", "3054", "3055", "3060", "3066", "3130", "3069", "3073", "3074", "3077", "3080", "3103", "3128", "3171", "3064", "2018-0251_00-16", "1994-0012", "1994-0013"]
    const newItems_may = ["1983-0049", "1983-0051", "1983-0052", "1983-0056", "1983-0057", "1983-0060", "1983-0068", "2001-0117", "2005-0022", "DES.1996.08_0-2", "4508", "4500", "0910", "2017-0100", "2017-0224", "2017-0226", "3056", "3059", "3151", "3394", "3395", "3399", "3401", "3137_2-4"]

    const [newItems, setNewItems] = useState(newItems_may)


    const _newObjectsData = [];
    const _newObjectsImages = [];
    const _lang = props.language

    const [detailImageID, setDetailImageID] = useState("");
    const [showDetailUI, setShowDetailUI] = useState(false);
    const [details, setDetails] = useState("");

    const isDesktopOrLaptop = useMediaQuery({
        query: '(min-width: 700px)'
    })
    const isMobile = useMediaQuery({
        query: '(max-width: 700px)'
    })


    if (!_objects.isLoading) {
        // fetch objects from LDES
        for (let i = 0; i < newItems.length; i++) {
            try {
                let object = fetchObjectsByID(_objects.data, newItems[i])
                _newObjectsData.push(object)
                _newObjectsImages.push(object.iiif_image_uris[0])
            } catch (e) {
                ;
            }

        }
    }

    function fetchObjectById(ObjectNumber) {
        let _obj = _objects.data
        for (let i=0; i<_obj.length; i++) {
            if (_obj[i].objectNumber === ObjectNumber) {
                setDetails(_obj[i])
            }
        }
    }

    function filterByValue(array, string) {
        let x = array.filter(o => o.iiif_image_uris.includes(string))
        return x[0]["objectNumber"];
    }

    function handleImgClick(id) {
        if (isDesktopOrLaptop) {
            setDetailImageID(id)
            setShowDetailUI(true)
            let objectNumberString = filterByValue(_objects.data, id);
            fetchObjectById(objectNumberString);
        } if (isMobile) {
            setDetailImageID(id)
            setShowDetailUI(true)
            let objectNumberString = filterByValue(_objects.data, id);
            fetchObjectById(objectNumberString);
        }
    }

    let imageBlock = "loading"

    try{
        imageBlock = _newObjectsImages.map(image => (
            <img
                className={"hoverImage"}
                onClick={()=>handleImgClick(image)}
                alt={'INSERT ALT HERE'} //todo: alt
                src={image.replace("/full/0/default.jpg", "/400,/0/default.jpg")}
            />
        ))

    } catch {imageBlock=<h2>Loading...</h2>}

    return (
        <div>
            {isDesktopOrLaptop &&
                <div>
                    {props.collapseNewItems &&
                        <div>
                            <div>
                                <div className={"grid--even_10"}>
                                    <p className={"HeaderLink"} onClick={()=>{setNewItems(newItems_march)}}>march 2023</p>
                                    <p className={"HeaderLink"} onClick={()=>{setNewItems(newItems_april)}}>april 2023</p>
                                    <p className={"HeaderLink"} onClick={()=>{setNewItems(newItems_may)}}>may 2023</p>
                                </div>
                                <div className={"lineH"}></div>
                            </div>
                            <div className={showDetailUI? "container-masonry-half": "container-masonry-full"}>
                                <div className={"masonry"} style={{overflowY:"hidden", padding: "5px", height: "85vh"}}>
                                    {_objects.isLoading &&
                                        <h2>LOADING...</h2>
                                    }
                                    {imageBlock}
                                </div>
                                {showDetailUI &&
                                    <ObjectViewer showDetailUI={showDetailUI} setShowDetailUI={setShowDetailUI} thesaurus={_thes} personen={_pers}
                                                  description={false} image={detailImageID} colorStrip={true} color={"black"}
                                                  indexUI={true} details={details} language={_lang}
                                    />
                                }
                            </div>
                        </div>

                    }
                    {!props.collapseNewItems &&
                        <div></div>
                    }
                </div>
            }
            {isMobile &&
                <div>
                    {!showDetailUI &&
                        <div>
                            <div>
                                <h1 className={"text-center home"} style={{margin: "50px", fontSize: "10vw"}}>RECENT ADDITIONS</h1>
                                <div className={"lineH"}></div>
                                <br/>
                                <p style={{fontSize: "20px", margin: "10px"}}>The museum is currently working hard to make its collection available online. Every month we showcase the progress made. In march 2023, {newItems.length} new additions from its collection have been opened up.</p>
                                <div></div>
                                <img className={"center"} style={{width: "25vw"}} src={"https://api.collectie.gent/iiif/image/iiif/2/44ee1c8d5ee57d2da6186d3fc33d00d8-transcode-0519.jpg/full/full/0/bitonal.jpg"}/>

                            </div>
                            <div className={"lineH"}></div>
                            <div className={"masonry"} style={{overflowY:"scroll", padding: "10px", height: "auto"}}>
                                {_objects.isLoading &&
                                    <h2>LOADING...</h2>
                                }
                                {imageBlock}
                            </div>
                        </div>
                    }
                    {showDetailUI &&
                        <div>
                            <h2 style={{margin:"10px"}} onClick={()=>setShowDetailUI(false)}> back </h2>
                            <div className={"lineH"}></div>
                            <ObjectViewer showDetailUI={showDetailUI} setShowDetailUI={setShowDetailUI} thesaurus={_thes} personen={_pers}
                                          description={true} image={detailImageID} colorStrip={true} color={"black"}
                                          indexUI={true} details={details} colorCubes={true}
                            />
                        </div>
                    }
                </div>
            }
        </div>
    )
}
export default NewItems