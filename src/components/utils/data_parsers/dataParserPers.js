import React from "react"

export function fetchPersWikidata(input) {
    let URIs = input.LDES_raw.object["owl:sameAs"]
    console.log(URIs.length)
    for (let i = 0; i < URIs.length; i++) {
        //console.log(URIs[i])
        try {
            if (URIs[i].includes("wikidata")) {
                console.log(URIs[i])
                return URIs[i]
            }
        } catch (e) {
            console.log(e)
        }
    }
}