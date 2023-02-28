import React from "react"

export function fetchPersBirth(input) {
    let birth = {}
    try {
        let b = input.LDES_raw.object["https://data.vlaanderen.be/ns/persoon#heeftGeboorte"]
        // birth date
        try {
            if(b["https://data.vlaanderen.be/ns/persoon#datum"]) {
                birth.date =  b["https://data.vlaanderen.be/ns/persoon#datum"]["@value"]
            }
        } catch {}

        // birth place
        try {
            if(b["https://data.vlaanderen.be/ns/persoon#plaats"]) {
                birth.place = b["https://data.vlaanderen.be/ns/persoon#plaats"]["@value"]
            }
        } catch {}
        return birth
    } catch {}
}

export function fetchPersDeath(input) {
    let birth = {}
    try {
        let b = input.LDES_raw.object["https://data.vlaanderen.be/ns/persoon#heeftOverlijden"]
        // birth date
        try {
            if(b["https://data.vlaanderen.be/ns/persoon#datum"]) {
                birth.date =  b["https://data.vlaanderen.be/ns/persoon#datum"]["@value"]
            }
        } catch {}

        // birth place
        try {
            if(b["https://data.vlaanderen.be/ns/persoon#plaats"]) {
                birth.place = b["https://data.vlaanderen.be/ns/persoon#plaats"]["@value"]
            }
        } catch {}
        return birth;

    } catch {}
}

export function fetchPersGender(input) {
    let g = input.LDES_raw.object["https://data.vlaanderen.be/ns/persoon#geslacht"]["@value"]
    if (g.includes("FEMALE")) {
        return "female"
    } else {return "male"}
}

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