import React, {useState, useEffect, useMemo} from "react"
import Fuse from "fuse.js";

import SearchFilterBar from "../utils/SearchFilterBar";
import {fetchObjectType, fetchTitle} from "../../utils/data_parsers";
import {useMediaQuery} from "react-responsive";
const AdvancedSearchQuery = (props) => {

    //todo:  put in function?
    const isDesktopOrLaptop = useMediaQuery({
        query: '(min-width: 1500px)'
    })


    const [filterTitle, setFilterTitle] = useState("");
    const [filterType, setFilterType] = useState("");
    const [filterDescription, setFilterDescription] = useState("")

    const [filterDesigner, setFilterDesigner] = useState("");
    const [result, setResult] = useState([])
    const objects = props.objects;
    const thesaurus = props.thesaurus

    console.log(props.closeSearch)

    function closeTab() {
        props.setCloseSearch(true)
    }

    console.log(props.objects.length)
    function filterSet(title, type, description) {
        let collection = [];
        let intersection = []
        let titles = [];
        let types = [];
        let descriptions = [];

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

        const optionsDescription = {
            threshold: 0.1,
            ignoreLocation: true,
            includeScore: true,
            keys: ["description"]
        }

        for (let o = 0; o < props.objects.length; o++) {
            let _title = fetchTitle(props.objects[o]["LDES_raw"])
            let _type = fetchObjectType(props.objects[o]["LDES_raw"], thesaurus)
            titles.push({title: _title, source: props.objects[o]});
            types.push({type: _type, source: props.objects[o]});
            try{
                let _description = props.objects[o]["LDES_raw"]["object"]["http://www.cidoc-crm.org/cidoc-crm/P3_has_note"]["@value"]
                //console.log(_description)
                if (_description !== undefined) {
                    descriptions.push({description: _description, source: props.objects[o]})
                }
                /*
                console.log(_description)

                */
            } catch (e) {}

        }


        const fuseTitles = new Fuse(titles, optionsTitle);
        const fusetype = new Fuse(types, optionsType);
        const fuseDescription = new Fuse(descriptions, optionsDescription)

        const resultTitles = fuseTitles.search(title)
        const resultTypes = fusetype.search(type)
        const resultDescription = fuseDescription.search(description)

        //console.log(resultDescription)

        if (resultTitles.length !== 0) {
            collection.push(resultTitles)
        }

        if (resultTypes.length !==0) {
            collection.push(resultTypes)
        }

        if (resultDescription.length !==0) {
            collection.push(resultDescription)
        }

        if (collection.length > 1) {
            console.log(collection.length)
            let array1 = collection[0]
            let array2 = collection[1]
            let array3 = collection[2]

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

    let _result;
    //let _result = useMemo(() => {return filterSet(filterTitle, filterType, filterDescription)},[filterTitle, filterType, filterDescription]);


    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            props.setQueryResult(_result)
            props.setShowAdvancedSearch(true)

        }
    }


    function performSearch() {
        _result=filterSet(filterTitle, filterType, filterDescription)
        props.setQueryResult(_result)
        props.setShowAdvancedSearch(true)
        props.setCloseSearch(true)
    }

    function openSearch() {
        props.setCloseSearch(false)
    }


    //todo: cache search query (I can go back to my search query)

    return (
        <div className={"grid--97_3"} style={{height: "900px", overflowY:"hidden"}}>
            {!props.closeSearch &&
                <div>
                    <div className={"lineH"}></div>
                    <div className={"grid--3_7"}>
                        <h2 className={"rhizome"}>ADVANCED SEARCH</h2>
                        <h1 style={{textAlign: "right"}} onClick={() => closeTab()}>X</h1>
                    </div>
                    <br/>
                    <div style={{padding: "2px", height: "800px", borderRadius: "20px"}}>
                        <div className={isDesktopOrLaptop?"grid--3_7":""}>
                            <div>
                                <div className={"lineH"}></div>
                                <h2 style={{padding: "12px 0", paddingLeft: "12px"}}>title</h2>
                                <div className={"lineH"}></div>
                            </div>
                            <SearchFilterBar filter={filterTitle} setFilter={setFilterTitle} prompt={"enter title here"} onKeyDown={handleKeyDown}/>
                        </div>
                        <br/>

                        <div className={isDesktopOrLaptop?"grid--3_7":""}>
                            <div>
                                <div className={"lineH"}></div>
                                <h2 style={{padding: "12px 0", paddingLeft: "12px"}}>type</h2>
                                <div className={"lineH"}></div>
                            </div>
                            <SearchFilterBar filter={filterType} setFilter={setFilterType} prompt={"enter type here"} onKeyDown={handleKeyDown}/>
                        </div>
                        <br/>

                        <div className={isDesktopOrLaptop?"grid--3_7":""}>
                            <div>
                                <div className={"lineH"}></div>
                                <h2 style={{padding: "12px 0", paddingLeft: "12px"}}>description</h2>
                                <div className={"lineH"}></div>
                            </div>
                            <SearchFilterBar filter={filterDescription} setFilter={setFilterDescription} prompt={"enter free text here"} onKeyDown={handleKeyDown}/>
                        </div>
                        <br/>
                        <a className={"buttonType--PRIMARY"} style={{marginLeft: "30%"}} onClick={performSearch}>search</a>
                    </div>
                </div>
            }
            {props.closeSearch &&
                <div className={"grid--97_3"}>
                    <h2 className={"verticalText"} style={{top: "37%", left: "20px", overflowX:"hidden"}} onClick={()=> {openSearch()}}> ↟ open advanced search ↟ </h2>
                    <div className={"lineV"} style={{left: "40px", position:"relative"}}></div>
                </div>
            }
        </div>
    )

}

export default AdvancedSearchQuery;