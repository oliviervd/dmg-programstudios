import React from "react"
import {fetchTermFromThes} from "../data_parsers";

export function fetchPersBirth(input, thes) {
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
                birth.place = fetchTermFromThes(thes, b["https://data.vlaanderen.be/ns/persoon#plaats"]["@id"])
            }
        } catch {}
        return birth
    } catch {}
}

export function fetchPersDeath(input, thes) {
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
            if(b["https://data.vlaanderen.be/ns/persoon#plaats"]["@id"]) {
                birth.place = fetchTermFromThes(thes, b["https://data.vlaanderen.be/ns/persoon#plaats"]["@id"])
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
