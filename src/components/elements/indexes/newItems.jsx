import React, {Suspense, useEffect, useState} from "react";
import useObjectsQuery from "../../hooks/useObjectsQuery";
import {fetchObjectsByID} from "../../utils/data_parsers";
import ObjectViewer from "../subjectpages/ObjectViewer";
import {useMediaQuery} from "react-responsive";
import {useNavigate} from "react-router-dom";
import Loading from "../utils/Loading";

const NewItems = (props) => {

    const _thes  = props.thesaurus
    const _pers = props.agents
    const about = props.about
    const _objects = useObjectsQuery();

    let navigate = useNavigate();

    const newItems_march = ["2774", "1987-0882", "1987-0924", "1987-1118_0-2", "1987-0912", "1987-1097", "1987-1101", "1987-1021", "1987-1022", "1987-1064", "1987-0947", "1987-0948", "1987-1066", "2001-0032", "2002-0003", "2005-0131_0-2", "2005-0133", "2006-0017_0-2", "2009-0030_00-26", "2010-0096_0-5", "2011-0033", "2015-0079", "2019-0060", "2637", "4541_0-3", "4548", "4549_0-2", "4550", "4554", "5826", "6473_0-4", "6593", "6596", "6599", "DES.1995.07", "2017-0059", "1417", "1984-0016", "1987-1447", "1987-1160", "4331", "3475", "2793", "2796", "1987-1483", "3374", "4086", "4574", "6016", "6017", "1977-0095", "1977-0096", "1980-0296", "1981-0040", "1997-0006", "1997-0011_0-2", "1999-0094", "2015-0064", "2017-0126_0-2", "2629", "2633", "2634", "2635", "2636", "2771", "2990_0-4", "3150_A", "3150_B", "3150_C", "3221", "3393", "3403_0-3", "3953", "4078", "4313_0-2", "5218", "2012-0027", "2022-0037", "2022-0042", "2001-0118", "DMG_T_00131_ORANJE", "2008-0048", "2006-0021", "2010-0105", "2008-0051", "DMG_T_00810_ORANJE", "DMG_T_00781_ORANJE", "DMG_T_00788_ORANJE", "DMG_T_00766_ORANJE", "DMG_T_00762_ORANJE", "DMG_T_00746_ORANJE"]
    const newItems_april = ["1987-0919", "1987-0858", "1987-0860", "1987-0930", "1987-0961", "1987-1000", "1987-0996", "1987-0845", "1987-0846", "1987-1100", "1987-0898", "1987-0960", "1987-1098", "1980-0010", "1988-0030", "1988-0031_0-7", "2010-0030", "DES.1996.01", "DES.1996.03", "DES.1996.05", "DES.1997.05", "1986-0015", "1989-0020", "1991-0038", "1991-0075", "1991-0076", "1457", "4624", "2794", "2795", "0293", "0294", "0472", "0561", "0562", "0563", "0564", "0565", "0571", "0578", "0586", "3814", "DMG_T_00769_ORANJE", "DMG_T_00979_ORANJE", "DMG_T_01018_ORANJE", "DMG_T_01137_ORANJE", "DMG_T_01139_ORANJE", "DMG_T_01147_ORANJE", "DMG_T_01159_ORANJE", "0033_0-2", "0811", "1976-0221", "1977-0097", "1978-0038", "1978-0042", "1985-0068", "1988-0020_0-2", "1999-0092", "1999-0093", "2011-0038", "2013-0015", "2017-0225", "2018-0003", "2900", "2901", "3062", "3083", "3120", "3126", "3139", "3143", "3144", "3147", "3148", "3169", "3172", "3795", "3882", "4314", "4605", "DMG_T_00197_ORANJE", "FH-0028", "FH-0042", "3068", "3090", "3091", "3100", "3110", "3127", "3158", "3159", "3173", "0827", "3054", "3055", "3060", "3066", "3130", "3069", "3073", "3074", "3077", "3080", "3103", "3128", "3171", "3064", "2018-0251_00-16", "1994-0012", "1994-0013"]
    const newItems_may = ["1983-0049", "1983-0051", "1983-0052", "1983-0056", "1983-0057", "1983-0060", "1983-0068", "2001-0117", "2005-0022", "DES.1996.08_0-2", "4508", "4500", "0910", "2017-0100", "2017-0224", "2017-0226", "3056", "3059", "3151", "3394", "3395", "3399", "3401", "3137_2-4"]
    const newItems_june = ["1985-0004_0-2", "2000-0048", "2001-0030", "2001-0031", "1424", "1987-1441_00-15", "0273", "0309", "0424", "0431", "0590", "0889_0-3", "1977-0025", "2023-0015_0-5", "2023-0016_0-2", "2023-0017_0-2", "2023-0019_0-2", "2023-0020_0-2", "2023-0023_0-3", "2023-0024_0-2", "2023-0025", "2023-0026_0-4", "2023-0027", "2023-0028_0-5", "2023-0029_0-2", "2023-0030_0-2", "2023-0031_0-2", "2023-0032_0-2", "2023-0033_0-3", "2023-0034_0-2", "2023-0035_0-2", "2023-0037_0-2", "2023-0038_0-2", "2023-0039_0-2"]
    const newItems_july = ["DES.1997.08", "2011-0078", "1989-0068", "1989-0071", "1989-0075", "DMG_T_00773_ORANJE", "2023-0040_0-2", "2023-0042_0-2", "2023-0043_0-2", "2023-0044_0-2", "2023-0045_0-2", "2023-0046_0-2", "2023-0047_0-2", "2023-0048_0-4", "2023-0052", "2023-0054_0-3", "2023-0055", "2023-0056", "DMG_T_01126_ORANJE", "DMG_T_01130_ORANJE", "2002-0012_0-2", "2017-0228", "3063", "2003-0113", "2003-0114", "2003-0115", "2004-0076_0-2", "2004-0077_0-2", "3040", "3196", "2022-0017"]
    const newItems_august = ["1987-0965_00-10", "1987-1083", "1999-0031", "2005-0004", "1520", "1976-0232", "3907", "1987-0176_0-2", "1987-0177_00-12", "1987-0180_0-2", "1987-0183_0-2", "1986-0042_0-4", "0989", "0056", "1785", "1786", "1787", "1835", "1872", "1986-0040", "1989-0030", "1994-0037", "2017-0234_0-3", "2017-0237_0-7", "2568", "2569", "2570", "2571", "3187", "3206", "3297", "3380", "3383", "3384", "3385", "3386", "3387", "3388", "3389", "3390", "3391", "3472", "3728", "3883"]
    const newItems_september = ["1987-0885", "1987-0887_0-2", "1987-0970_00-12", "1987-0971", "1987-0838", "1987-0839", "1987-0842", "1987-0881", "1987-1015", "1987-1068", "1987-1012", "1987-0958", "1987-1033", "1987-1024", "1983-0055", "2007-0004_1-4", "2007-0012", "2007-0013", "2008-0027", "DES.1995.25", "1992-0069", "1992-0071", "1992-0074", "1992-0076", "1992-0101", "1992-0143", "1992-0148", "1992-0158", "1414", "1432", "1987-1477", "FH-0071", "FH-0085", "FH-0086", "1987-1199", "2001-0004_0-2", "2001-0004_1-2", "2001-0004_2-2", "2005-0047", "3228", "0019", "0829", "1933", "1984-0025", "1988-0004", "1994-0040", "2017-0107", "3162", "3190_1-2", "3191", "3291_0-2", "3295_0-2", "3322", "3938"]
    const newItems_october = ["1994-0072", "1997-0047", "2002-0052", "1987-1186", "FH-0052_0-2", "2022-0085", "1425", "0537", "1979-0014", "1979-0015", "1987-1225", "1987-1276", "1987-1292_0-2", "1987-1313_0-2", "1987-1329", "1987-1379", "1987-1400", "1987-1402", "1987-1442_0-2", "1987-1443_0-2", "1987-1445_0-2", "FH-0002_0-2", "FH-0055", "FH-0059", "1987-1133", "4644", "1987-0209", "1987-0222", "1987-0223", "1987-0224_00-11", "1987-0227", "1987-0231_00-12", "1987-0232_0-5", "1987-0271_0-2", "1987-0284", "1987-0292", "1987-0293", "1987-0113", "1987-0119_00-14", "1987-0125_0-2", "1987-0126", "1987-0127", "1987-0170_0-2", "1987-0171_0-2", "1987-0174_00-10", "1987-0179_00-14", "1987-0181", "1987-0182_0-9", "1987-0184", "1987-0187", "1987-0305_0-7", "1987-0338_00-14", "FH-0008_0-5", "1987-0192_00-12", "1987-0197_0-4", "1987-0198", "1987-0200_0-2", "1987-0203", "1987-0204", "1987-0205", "1987-0212", "1987-0214", "1987-0266", "1987-0270_0-2", "1987-0272", "1987-0297", "1987-0306", "1987-0146", "1987-0147", "1987-0269_0-2", "1987-0291", "FH-0009_0-2", "1987-0104", "1987-0279_0-2", "1987-0218", "1987-0396_0-4", "1987-0628_0-2", "1987-0548", "1987-0549", "1987-0564", "1987-0595", "1987-0766", "1987-0771", "1987-0617", "1987-0618", "1987-0659_0-2", "1987-0680", "1987-0681", "1944", "3133"]
    const newItems_november = ["2005-0125_0-2", "2005-0126", "2017-0242", "0805_0", "3010", "1977-0095_0", "3057", "3150", "1894", "1950", "1981-0039", "3058", "3081", "3085", "3117"]
    const [newItems, setNewItems] = useState(newItems_november)

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
                //todo: alt
                src={image.replace("/full/0/default.jpg", "/400,/0/default.jpg")}
            />
        ))

    } catch {imageBlock=<Loading/>}

    return (
        <div>
            {isDesktopOrLaptop &&
                <div>
                    {props.collapseNewItems &&
                        <div>
                            <div>
                                <div className={"grid--even_10"}>
                                    <p className={"HeaderLink"} onClick={()=>{setNewItems(newItems_november)}}>november 2023</p>
                                    <p className={"HeaderLink"} onClick={()=>{setNewItems(newItems_october)}}>october 2023</p>
                                    <p className={"HeaderLink"} onClick={()=>{setNewItems(newItems_september)}}>september 2023</p>
                                    <p className={"HeaderLink"} onClick={()=>{setNewItems(newItems_august)}}>august 2023</p>
                                    <p className={"HeaderLink"} onClick={()=>{setNewItems(newItems_july)}}>july 2023</p>
                                    <p className={"HeaderLink"} onClick={()=>{setNewItems(newItems_june)}}>june 2023</p>
                                    <p className={"HeaderLink"} onClick={()=>{setNewItems(newItems_may)}}>may 2023</p>
                                    <p className={"HeaderLink"} onClick={()=>{setNewItems(newItems_april)}}>april 2023</p>
                                    <p className={"HeaderLink"} onClick={()=>{setNewItems(newItems_march)}}>march 2023</p>
                                </div>
                                <div className={"lineH"}></div>
                            </div>
                            <div className={showDetailUI? "container-masonry-half": "container-masonry-full"}>
                                <div className={"masonry"} >
                                    {_objects.isLoading &&
                                        <Loading classname={"modal"}></Loading>
                                    }
                                    {imageBlock}
                                </div>
                                {showDetailUI &&
                                    <ObjectViewer showDetailUI={showDetailUI} setShowDetailUI={setShowDetailUI} thesaurus={_thes} personen={_pers}
                                                  description={false} image={detailImageID} colorStrip={true} color={"black"}
                                                  indexUI={true} details={details} language={_lang} viewer={false}
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
