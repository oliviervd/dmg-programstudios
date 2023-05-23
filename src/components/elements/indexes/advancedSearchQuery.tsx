import React, {useState} from "react"
import Fuse from "fuse.js";
import translations from '../../data/translations.json';

import SearchFilterBar from "../utils/SearchFilterBar";
import {fetchObjectType, fetchTitle} from "../../utils/data_parsers";
import {useMediaQuery} from "react-responsive";
import {useSearchParams} from "react-router-dom";
const AdvancedSearchQuery = (props) => {
    let _lang = props.language

    function translate(_term, _lang) {
        return translations[_term][_lang] // _lang = key.
    }

    //todo:  put in function?
    const isDesktopOrLaptop = useMediaQuery({
        query: '(min-width: 1500px)'
    })

    const [filterTitle, setFilterTitle] = useState("");
    const [filterType, setFilterType] = useState("");
    const [filterDescription, setFilterDescription] = useState("");
    const [isPublicDomain, setIsPublicDomain] = useState(false)
    const [isCheckedPD, setIsCheckedPD] = useState(false);

    //console.log(isCheckedList)
    const thesaurus = props.thesaurus

    function closeTab() {
        props.setCloseSearch(true)
    }

    function handleCheckBoxPD() {
        setIsPublicDomain(!isPublicDomain)
        setIsCheckedPD(!isCheckedPD)
    }

    function filterSet(title, type, description, license) {
        let collection: [] = [];
        let intersection:[] = [];
        let titles = [];
        let types = [];
        let descriptions = [];
        let licenses = []

        //todo: add materials
        //todo: add creator
        //todo: add place of creation/production

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

        const optionsLicense = {
            threshold: 0.0, // perfect match on URL.
            keys: ["license"]
        }

        for (let o = 0; o < props.objects.length; o++) {
            let _title = fetchTitle(props.objects[o]["LDES_raw"])
            let _type = fetchObjectType(props.objects[o]["LDES_raw"], thesaurus)
            titles.push({title: _title, source: props.objects[o]});
            types.push({type: _type, source: props.objects[o]});
            try {
                let _description = props.objects[o]["LDES_raw"]["object"]["http://www.cidoc-crm.org/cidoc-crm/P3_has_note"]["@value"]
                //console.log(_description)
                if (_description !== undefined) {
                    descriptions.push({description: _description, source: props.objects[o]})
                }
            } catch (e) {
            }

            // add license
            try {
                let _license= props.objects[o]["CC_Licenses"][0]
                if (_license !== undefined) {
                    licenses.push({license: _license, source: props.objects[o]})
                }
                //console.log(licenses)
            } catch(e) {}
        }

        const fuseTitles = new Fuse(titles, optionsTitle);
        const fusetype = new Fuse(types, optionsType);
        const fuseDescription = new Fuse(descriptions, optionsDescription)
        const fuseLicense = new Fuse(licenses, optionsLicense)

        const resultTitles = fuseTitles.search(title)
        const resultTypes = fusetype.search(type)
        const resultDescription = fuseDescription.search(description)

        let resultLicenses = []
        if (isPublicDomain) {
            resultLicenses = fuseLicense.search("https://creativecommons.org/publicdomain/zero/1.0/")
        }

        if (resultTitles.length !== 0) {
            collection.push(resultTitles)
        }

        if (resultTypes.length !==0) {
            collection.push(resultTypes)
        }

        if (resultDescription.length !==0) {
            collection.push(resultDescription)
        }

        if (isPublicDomain) {
            if (resultLicenses.length !==0) {
                collection.push(resultLicenses)
            }
        }

        if (collection.length > 1) {
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
            //console.log(intersection)
            return intersection
        } else {
            console.log("single.")
            return collection[0]
        }
    }

    let _result;
    const handleKeyDown = (event) => {
        //todo: fix function (does not work)
        if (event.key === 'Enter') {
            props.setQueryResult(_result)
            props.setShowAdvancedSearch(true)
            props.setCloseSearch(true)
        }
    }
    function performSearch() {
        _result=filterSet(filterTitle, filterType, filterDescription, isPublicDomain)
        console.log(_result)
        props.setQueryResult(_result)
        props.setShowAdvancedSearch(true)
        props.setCloseSearch(true)
    }

    function openSearch() {
        props.setCloseSearch(false)
    }

    //todo: cache search query (I can go back to my search query) - use searchParams ()
    return (
        <div className={"grid--97_3"} style={{height: "auto", overflowY:"hidden"}}>
            {!props.closeSearch &&
                <div>
                    <div className={"lineH"}></div>
                    <div className={"grid--3_7"}>
                        <h2 className={"rhizome"}>{translate("advanced search", _lang)}</h2>
                        <h1 style={{textAlign: "right"}} onClick={() => closeTab()}>X</h1>
                    </div>
                    <br/>
                    <div style={{padding: "2px", height: "auto", borderRadius: "20px"}}>
                        <div className={isDesktopOrLaptop?"grid--3_7":""}>
                            <div>
                                <div className={"lineH"}></div>
                                <h2 style={{padding: "12px 0", paddingLeft: "12px"}}>{translate("title", _lang)}</h2>
                                <div className={"lineH"}></div>
                            </div>
                            <SearchFilterBar filter={filterTitle} setFilter={setFilterTitle} prompt={"enter title here"} onKeyDown={handleKeyDown}/>
                        </div>
                        <br/>
                        <div className={isDesktopOrLaptop?"grid--3_7":""}>
                            <div>
                                <div className={"lineH"}></div>
                                <h2 style={{padding: "12px 0", paddingLeft: "12px"}}>{translate("type", _lang)}</h2>
                                <div className={"lineH"}></div>
                            </div>
                            <SearchFilterBar filter={filterType} setFilter={setFilterType} prompt={"enter type here"} onKeyDown={handleKeyDown}/>
                        </div>
                        <br/>
                        <div className={isDesktopOrLaptop?"grid--3_7":""}>
                            <div>
                                <div className={"lineH"}></div>
                                <h2 style={{padding: "12px 0", paddingLeft: "12px"}}>{translate("description", _lang)}</h2>
                                <div className={"lineH"}></div>
                            </div>
                            <SearchFilterBar filter={filterDescription} setFilter={setFilterDescription} prompt={"enter free text here"} onKeyDown={handleKeyDown}/>
                        </div>
                        <br/>

                        <div>
                            <div>
                                <div className={"lineH"}></div>
                                <h2>{translate("licenseQuery", _lang)}</h2>
                                <br/>
                                <div style={{display:"grid", gridAutoFlow:"column"}}>
                                    <div className={"checkbox-wrapper"}>
                                        <input name={"publicDomain"} type={"checkbox"} checked={isCheckedPD} onChange={()=>handleCheckBoxPD()}></input>
                                        <label className={"checkbox-text"} style={{margin:"none"}}>{translate("https://creativecommons.org/publicdomain/zero/1.0/", _lang)}</label>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <br/>
                        <a className={"buttonType--PRIMARY"} style={{marginLeft: "30%"}} onClick={performSearch}>{translate("search_button", _lang)}</a>
                    </div>
                </div>
            }
            {props.closeSearch &&
                <div className={"grid--97_3"}>
                    <h2 className={"verticalText"} style={{top: "37%", left: "20px", overflowX:"hidden"}} onClick={()=> {openSearch()}}> {translate("open_search_interface", _lang)} </h2>
                    <div className={"lineV"} style={{left: "40px", position:"relative"}}></div>
                </div>
            }
        </div>
    )

}

export default AdvancedSearchQuery;