import React, {Suspense, useEffect, useState} from "react";
import useObjectsQuery from "../../hooks/useObjectsQuery";
import {fetchObjectsByID} from "../../utils/data_parsers";
import ImageBlock from "../utils/ImageBlock";
import SearchFilterBar from "../utils/SearchFilterBar";
import Loading from "../utils/Loading";
import ObjectViewer from "../subjectpages/ObjectViewer";

const NewItems = (props) => {

    const _thes  = props.thesaurus
    const _pers = props.agents
    const about = props.about
    const _objects = useObjectsQuery();


    const newItems = ["2774", "1987-0882", "1987-0924", "1987-1118_0-2", "1987-0912", "1987-1097", "1987-1101", "1987-1021", "1987-1022", "1987-1064", "1987-0947", "1987-0948", "1987-1066", "2001-0032", "2002-0003", "2005-0131_0-2", "2005-0133", "2006-0017_0-2", "2009-0030_00-26", "2010-0096_0-5", "2011-0033", "2015-0079", "2019-0060", "2637", "4541_0-3", "4548", "4549_0-2", "4550", "4554", "5826", "6473_0-4", "6593", "6596", "6599", "DES.1995.07", "2017-0059", "1417", "1984-0016", "1987-1447", "1987-1160", "4331", "3475", "2793", "2796", "1987-1483", "3374", "4086", "4574", "6016", "6017", "1977-0095", "1977-0096", "1980-0296", "1981-0040", "1997-0006", "1997-0011_0-2", "1999-0094", "2015-0064", "2017-0126_0-2", "2629", "2633", "2634", "2635", "2636", "2771", "2990_0-4", "3150_A", "3150_B", "3150_C", "3221", "3393", "3403_0-3", "3953", "4078", "4313_0-2", "5218", "2012-0027", "2022-0037", "2022-0042", "2001-0118", "DMG_T_00131_ORANJE", "2008-0048", "2006-0021", "2010-0105", "2008-0051", "DMG_T_00810_ORANJE", "DMG_T_00781_ORANJE", "DMG_T_00788_ORANJE", "DMG_T_00766_ORANJE", "DMG_T_00762_ORANJE", "DMG_T_00746_ORANJE"]
    const _newObjectsData = [];
    const _newObjectsImages = [];

    const [detailImageID, setDetailImageID] = useState("");
    const [showDetailUI, setShowDetailUI] = useState(false);
    const [details, setDetails] = useState("");


    if (!_objects.isLoading) {
        // fetch objects from LDES
        for (let i = 0; i < newItems.length; i++) {
            let object = fetchObjectsByID(_objects.data, newItems[i])
            _newObjectsData.push(object)
            _newObjectsImages.push(object.iiif_image_uris[0])
        }
    }

    function fetchObjectById(ObjectNumber) {
        let _obj = _objects.data
        for (let i=0; i<_obj.length; i++) {
            if (_obj[i].objectNumber === ObjectNumber) {
                console.log(_obj[i])
                setDetails(_obj[i])
            }
        }
    }


    function filterByValue(array, string) {
        console.log(array)
        let x = array.filter(o => o.iiif_image_uris.includes(string))
        return x[0]["objectNumber"];
    }

    function handleImgClick(id) {
        setDetailImageID(id)
        setShowDetailUI(true)
        console.log(detailImageID)
        let objectNumberString = filterByValue(_objects.data, id);
        console.log(objectNumberString);
        fetchObjectById(objectNumberString);
    }

    let imageBlock = ""

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
            {props.collapseNewItems &&
                <div>
                    <div style={{width:"inherit"}}>
                        <div>
                            <div className="lineH"/>
                            <div className="grid--2_6_2" style={{height: '5vh'}}>
                                <h2>recent additions</h2>
                                <div className={"grid--5_95"}>
                                    <div></div>
                                </div>
                                <p style={{textAlign:"center", fontSize: "15px"}}>a collection of {newItems.length} items that were added in the month of march 2023.</p>
                            </div>
                            <div className={"lineH"}></div>
                        </div>
                    </div>
                    <div className={showDetailUI? "container-masonry-half": "container-masonry-full"}>
                        <div className={"masonry"} style={{overflowY:"scroll", padding: "5px", height: "85vh"}}>
                            {imageBlock}
                        </div>
                        {showDetailUI &&
                            <ObjectViewer showDetailUI={showDetailUI} setShowDetailUI={setShowDetailUI} thesaurus={_thes} personen={_pers}
                                          description={false} image={detailImageID} colorStrip={true} color={"black"}
                                          indexUI={true} details={details}
                            />
                        }
                    </div>

                </div>

            }
            {!props.collapseNewItems &&
                <div></div>
            }
        </div>
    )
}
export default NewItems