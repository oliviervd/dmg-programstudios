import React, {useState, useEffect, useMemo} from "react"
import Fuse from "fuse.js";

import SearchFilterBar from "../utils/SearchFilterBar";
import {fetchTitle} from "../../utils/data_parsers";

import {useQuery} from "@tanstack/react-query";

const AdvancedSearchQuery = (props) => {

    const [filterTitle, setFilterTitle] = useState("");
    const [result, setResult] = useState([])
    const objects = props.objects;

    function closeTab() {
        props.setAbout(!props.about)
        props.setShowAdvancedSearch(false);
    }


    console.log(props.objects.length)
    function filterSet(title) {
        let titles = [];

        const options = {
            threshold: 0.0,
            ignoreLocation: true,
            includeScore: true,
            keys: ["title"]
        }

        for (let o = 0; o < props.objects.length; o++) {
            let x = fetchTitle(props.objects[o]["LDES_raw"])
            titles.push({title: x, source: props.objects[o]});
        }


        const fuse = new Fuse(titles, options);
        const result = fuse.search(title)
        ///console.log(result)
        return result
    }

    let _result = useMemo(() => {return filterSet(filterTitle)},[filterTitle]);


        const handleKeyDown = (event) => {
            if (event.key === 'Enter') {
                props.setQueryResult(_result)
                props.setShowAdvancedSearch(true)
            }
        }


    function performSearch() {
        props.setQueryResult(_result)
        props.setShowAdvancedSearch(true)
    }

    //todo: cache search query (I can go back to my search query)
    
    return (
        <div className={"grid--97_3"} style={{height: "700px", overflowY:"scroll"}}>
            <div style={{marginLeft: "10px", marginRight: "10px"}}>
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
                    <a className={"buttonType--PRIMARY"} onClick={performSearch}>search</a>
                </div>

            </div>
            <div className="lineV"></div>
        </div>
    )

}

export default AdvancedSearchQuery;