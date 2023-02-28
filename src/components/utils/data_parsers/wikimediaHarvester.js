import React from "react"

export function harvestWikimedia(item) {
    // https://codepen.io/hugolpz/pen/ByoKOK
    // PRINCIPLES ##########################
    // 1. API's URL:
    // 1a. Parts of the url;

    let wd = "https://www.wikidata.org/w/api.php?" // base URI WIKIDATA
    let wp = "https://www.wikipedia.org/w/api.php?" // base URI WIKIPEDIA
    let aw = "action=wbgetentities"; // gather WIKIDATA
    let aq = "action=query"; // gather WIKIPEDIA
    let ts = "&sites=enwiki"; // wd only&required. // list of wiki-code = ? --------------<


    let t = "&ids=" // target WD+WP
    let i = item //  item to harvest. WD+WP

    //let l = "nl" // languages. // https://www.wikidata.org/wiki/Help:Wikimedia_language_codes/lists/all
    let ps = "&props=sitelinks|labels|aliases|descriptions"; // wdpoint only

    let p = "&prop=extracts&exintro&explaintext&exsentences=10"; // wppage only
    let r = "&redirects&converttitles"; // wppage only
    let c = "&callback=?"; // wd|wp
    let f = "&format=json" // WD+WP

    let urlwd = wd+aw+ts+t+i+ps    +c+f; // typical wikidata query
    let urlwp = wp+aq   +t+i     +p+r+c+f; // typical wikipedia query

    function fetchWikipediaTitles(urlwd) {
        fetch(urlwd).then((response)=> {
            console.log(response.url)
        })
    }

    try {fetchWikipediaTitles(urlwd)} catch(error) {console.log(error)}

    console.log("URL WIKIDATA: " +  urlwd)
    console.log("URL WIKIPEDIA: " +  urlwp)
}




