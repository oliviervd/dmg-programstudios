import React, {useState, useEffect, useMemo} from "react"
import Fuse from "fuse.js";

import SearchFilterBar from "../utils/SearchFilterBar";
import {fetchObjectType, fetchTitle, fetchType} from "../../utils/data_parsers";

import {useQuery} from "@tanstack/react-query";

const AdvancedSearchQuery = (props) => {

    const [filterTitle, setFilterTitle] = useState("");
    const [filterType, setFilterType] = useState("");
    const [filterDesigner, setFilterDesigner] = useState("");
    const [result, setResult] = useState([])
    const objects = props.objects;
    const thesaurus = props.thesaurus

    console.log(props.closeSearch)

    function closeTab() {
        props.setAbout(!props.about)
        props.setShowAdvancedSearch(false);
    }

    console.log(props.objects.length)
    function filterSet(title, type) {
        let collection = [];
        let intersection = []
        let titles = [];
        let types = [];

        const optionsTitle = {
            threshold: 0.0,
            ignoreLocation: true,
            includeScore: true,
            keys: ["title"]
        }

        const optionsType = {
            threshold: 0.2,
            keys: ["type"]
        }

        for (let o = 0; o < props.objects.length; o++) {
            let _title = fetchTitle(props.objects[o]["LDES_raw"])
            let _type = fetchObjectType(props.objects[o]["LDES_raw"], thesaurus)
            titles.push({title: _title, source: props.objects[o]});
            types.push({type: _type, source: props.objects[o]})
        }


        const fuseTitles = new Fuse(titles, optionsTitle);
        const fusetype = new Fuse(types, optionsType)

        const resultTitles = fuseTitles.search(title)

        const resultTypes = fusetype.search(type)

        if (resultTitles.length !== 0) {
            collection.push(resultTitles)
        }

        if (resultTypes.length !==0) {
            collection.push(resultTypes)
        }

        if (collection.length > 1) {
            console.log(collection.length)
            let array1 = collection[0]
            let array2 = collection[1]

            array1.map(function(item1){
                array2.map(function(item2){
                    if((item1["item"]["source"] === item2["item"]["source"] && item2["item"]["source"] === item1["item"]["source"])){
                        intersection.push(item2);
                    }
                })
            })
            console.log(intersection)
            return intersection
        } else {
            return collection[0]
        }
    }

    let _result = useMemo(() => {return filterSet(filterTitle, filterType)},[filterTitle, filterType]);


        const handleKeyDown = (event) => {
            if (event.key === 'Enter') {
                props.setQueryResult(_result)
                props.setShowAdvancedSearch(true)

            }
        }


    function performSearch() {
        props.setQueryResult(_result)
        props.setShowAdvancedSearch(true)
        props.setCloseSearch(true)
    }

    function openSearch() {
        props.setCloseSearch(false)
    }


    //todo: cache search query (I can go back to my search query)
    
    return (
        <div className={"grid--97_3"} style={{height: "900px", overflowY:"scroll"}}>
            {!props.closeSearch &&
                <div>
                    <div className={"lineH"}></div>
                    <div className={"grid--8_2"}>
                        <h2 className={"rhizome"}>ADVANCED SEARCH</h2>
                        <p onClick={() => closeTab()}>[CLOSE]</p>
                    </div>
                    <br/>
                    <div>
                        <div className={"grid--2_8"}>
                            <div>
                                <div className={"lineH"}></div>
                                <h2 style={{padding: "12px 0"}}>title</h2>
                                <div className={"lineH"}></div>
                            </div>
                            <SearchFilterBar filter={filterTitle} setFilter={setFilterTitle} prompt={"enter title here"} onKeyDown={handleKeyDown}/>
                        </div>
                        <br/>

                        <div className={"grid--2_8"}>
                            <div>
                                <div className={"lineH"}></div>
                                <h2 style={{padding: "12px 0"}}>type</h2>
                                <div className={"lineH"}></div>
                            </div>
                            <SearchFilterBar filter={filterType} setFilter={setFilterType} prompt={"enter type here"} onKeyDown={handleKeyDown}/>
                        </div>
                        <br/>

                        {/*<div className={"grid--2_8"}>
                        <div>
                            <div className={"lineH"}></div>
                            <h2 style={{padding: "12px 0"}}>designer</h2>
                            <div className={"lineH"}></div>
                        </div>
                        <SearchFilterBar filter={filterDesigner} setFilter={setFilterDesigner} prompt={"enter designer here"} onKeyDown={handleKeyDown}/>
                    </div>
                    <br/>*/}

                        <a className={"buttonType--PRIMARY"} onClick={performSearch}>search</a>
                    </div>
                </div>
            }
            {props.closeSearch &&
                <div className={"grid--97_3"}>
                    <h2 className={"verticalText"} style={{top: "37%"}} onClick={()=> {openSearch()}}> ↟ open advanced search ↟ </h2>
                    <div className={"lineV"} style={{left: "50px", position:"relative"}}></div>
                </div>
            }
        </div>
    )

}

export default AdvancedSearchQuery;