import React from "react";
import * as EdtfConverter from 'edtf-converter';
const converter = new EdtfConverter.Converter();

export function fetchOeuvre(_LDES, agent, PERS, THES) {
    let _refID = agent["LDES_raw"]["object"]["http://www.w3.org/ns/adms#identifier"][1]["skos:notation"]["@value"]
    let _len  = _LDES.length
    let match = []

    for (let i = 0; i < _len; i++) {

        //console.log(_LDES[i])
        try{
            let _x = _LDES[i]["LDES_raw"]
            let x = fetchCreatorInfo(_x, PERS, THES)
            let p = fetchProductionInfo(_x, PERS, THES)
            //console.log(x)
            // loop over array
            try {
                for (let o = 0; o < x.length; o ++){
                    let _c = x[o]
                    // filter on same creator.id
                    if (_c.id == _refID) {
                        //console.log (_c.id + " === " + _refID)
                        match.push(_LDES[i])
                        //console.log(match)
                    }

                }

            } catch(error) {console.log(error)}

            try {
                for (let o = 0; o < p.length; o ++){
                    let _c = p[o]
                    // filter on same creator.id
                    if (_c.id == _refID) {
                        //console.log (_c.id + " === " + _refID)
                        match.push(_LDES[i])
                        //console.log(match)
                    }

                }

            } catch(error) {console.log(error)}

        } catch (error) {}
    }
    return match
}

export function fetchRelatedObjects(_LDES, _ref, _thes, _pers) {
    // todo: make more specific - make use of cascade
    // skip: objectverpakking.
    // 1. same artist && same type
    // 2. same type
    // 3. same artist?
    // 1. same artist && same type
    // 2. same type.
    let _refOT
    console.log(_ref["LDES_raw"]);
    try {
        _refOT = fetchObjectType(_ref["LDES_raw"], _thes)
    } catch(error) {
        //console.log(error)
    }

    let _len = _LDES.length
    let _matchingObjects = []
    for (let i = 0; i < _len; i++) {
        let _base = _LDES[i]["LDES_raw"]
        let _OT = fetchObjectType(_base)

        for (let x = 0; x < _refOT.length; x++) {
            try{
                if (_refOT[x] !== "productverpakking") { //skip if productverpakking.
                    if (_OT[0] === _refOT[x]) {
                        _matchingObjects.push(_LDES[i])
                    }
                }

            } catch (error){

            }
        }


        //console.log(_OT)
    }
    //console.log(_matchingObjects)
    return _matchingObjects
}

export async function errorHandler(promise) {
    try {
        let data = await promise();
        return [data, null];
    } catch (error) {
        return [null, error];
    }
}

export function fetchPersFromPers(input, uri, field, id) {
    let _len = input.length
    for (let i = 0; i<_len; i++){
        if(uri){
            if (input[i].is_version_of === uri) {
                //console.log(input[i]["LDES_raw"]["object"]["https://data.vlaanderen.be/ns/persoon#volledigeNaam"])
                if(field === "name"){
                    return input[i]["LDES_raw"]["object"]["https://data.vlaanderen.be/ns/persoon#volledigeNaam"]
                    console.log(input[i]["LDES_raw"]["object"]["https://data.vlaanderen.be/ns/persoon#volledigeNaam"])
                }

                if (field === "id"){
                    return input[i]["LDES_raw"]["object"]["http://www.w3.org/ns/adms#identifier"][1]["skos:notation"]["@value"]
                }

            }
        }
    }
}

export function fetchTermFromThes(input, uri) {
    let _len = input.length
    for (let i = 0; i<_len; i++){
        try {
            if (input[i].is_version_of === uri) {
                //console.log(input[i]["LDES_raw"]["object"]["skos:prefLabel"]["@value"])
                let _val = input[i]["LDES_raw"]["object"]["skos:prefLabel"]["@value"]
                return _val
            } else if (input[i]["LDES_raw"]["object"]["owl:sameAs"] === uri) { // check if URI is not stad.gent
                let _val = input[i]["LDES_raw"]["object"]["skos:prefLabel"]["@value"]
                return _val
            }
        } catch(error) {
            console.log(error)
        }

    }
}

export function fetchObjectType(LDES, THES) {
    let objectType = [];
    if (LDES["object"]["http://www.cidoc-crm.org/cidoc-crm/P41i_was_classified_by"]) {
        try {
            try {
                if (LDES["object"]["http://www.cidoc-crm.org/cidoc-crm/P41i_was_classified_by"]["http://www.cidoc-crm.org/cidoc-crm/P42_assigned"]["skos:prefLabel"]["@value"]) {
                    objectType.push(LDES["object"]["http://www.cidoc-crm.org/cidoc-crm/P41i_was_classified_by"]["http://www.cidoc-crm.org/cidoc-crm/P42_assigned"]["skos:prefLabel"]["@value"])
                    return objectType
                }
            } catch (error) {}
            try {
                if (LDES["object"]["http://www.cidoc-crm.org/cidoc-crm/P41i_was_classified_by"][0]) {
                    let _len = LDES["object"]["http://www.cidoc-crm.org/cidoc-crm/P41i_was_classified_by"].length
                    for (let i = 0; i < _len ; i++) {
                        try {
                            objectType.push(LDES["object"]["http://www.cidoc-crm.org/cidoc-crm/P41i_was_classified_by"][i]["http://www.cidoc-crm.org/cidoc-crm/P42_assigned"]["skos:prefLabel"]["@value"])
                        } catch (error) {
                            let _id = LDES["object"]["http://www.cidoc-crm.org/cidoc-crm/P41i_was_classified_by"][i]["http://www.cidoc-crm.org/cidoc-crm/P42_assigned"]["@id"]
                            objectType.push(fetchTermFromThes(THES, _id))
                        }
                    }
                    return objectType
                }
            } catch (error) {}
        } catch (error) {
            objectType.push("")
            return objectType
        }
    }
}

export function fetchObjectNumber(LDES) {
    return LDES["object"]["http://www.w3.org/ns/adms#identifier"][1]["skos:notation"]["@value"]
}

export function fetchCurrentLocation(LDES) {
    try{
        if (LDES["object"]["http://www.cidoc-crm.org/cidoc-crm/P55_has_current_location"]["opmerking"]) {
            return LDES["object"]["http://www.cidoc-crm.org/cidoc-crm/P55_has_current_location"]["opmerking"]
        }
    } catch {
        return ""
    }
}

export function fetchTitle(LDES) {
    return LDES["object"]["http://www.cidoc-crm.org/cidoc-crm/P102_has_title"]["@value"];
}

export function fetchDescription(LDES) {
    let description =
        new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(LDES["object"]["http://www.cidoc-crm.org/cidoc-crm/P3_has_note"]["@value"])
            }, 1000)
        });
    return description
}

export function fetchExhibitions(LDES) {
    //console.log(LDES["object"]["http://purl.org/dc/terms/isPartOf"]);
    let exhibitions = []
    let _len = LDES["object"]["http://purl.org/dc/terms/isPartOf"].length
    if (LDES["object"]["http://purl.org/dc/terms/isPartOf"]) {
        if (LDES["object"]["http://purl.org/dc/terms/isPartOf"][0]) {

            for (let i =0; i< _len; i++) {
                let exh = {}
                let exhibition = LDES["object"]["http://purl.org/dc/terms/isPartOf"][i]["http://www.cidoc-crm.org/cidoc-crm/P16_used_specific_object"]
                let exhibition_title = exhibition["http://www.cidoc-crm.org/cidoc-crm/P3_has_note"]["@value"]
                exh["title"] = exhibition_title
                let exhibition_date = exhibition["http://www.cidoc-crm.org/cidoc-crm/P4_has_time-span"]["@value"]
                exh["date"] = exhibition_date
                exhibitions.push(exh)
            }
        } else {
            let exh = {}
            let exhibition = LDES["object"]["http://purl.org/dc/terms/isPartOf"]["http://www.cidoc-crm.org/cidoc-crm/P16_used_specific_object"]
            let exhibition_title = exhibition["http://www.cidoc-crm.org/cidoc-crm/P3_has_note"]["@value"]
            exh["title"] = exhibition_title
            let exhibition_date = exhibition["http://www.cidoc-crm.org/cidoc-crm/P4_has_time-span"]["@value"]
            exh["date"] = exhibition_date
            exhibitions.push(exh)
        }

    } return exhibitions//console.log(exhibitions)
}

export function EDTFtoDate(EDTF){
    let input = EDTF;
    if (input === ".."){
        let _date = "unknown"
        return _date
    }

    else {
        let date  = converter.edtfToDate(EDTF)
        if (date.min && date.max) {
            let _date = date.min.toDate().getFullYear() + " - " + date.max.toDate().getFullYear()
            return _date
        }

        else if (date.min && !date.max) {
            let _date = "after " + date.min.toDate().getFullYear()
            return _date
        }
        else {

        }
    }
    //return _date
}

export function fetchCreatorInfo(LDES, PERS, THES){

    let creations = [];

    // check if multiple creation events. - designer of conceptual thing. (designed by)
    let _len = LDES["object"]["http://www.cidoc-crm.org/cidoc-crm/P67i_is_referred_to_by"]["http://www.cidoc-crm.org/cidoc-crm/P94i_was_created_by"].length
    if (LDES["object"]["http://www.cidoc-crm.org/cidoc-crm/P67i_is_referred_to_by"]["http://www.cidoc-crm.org/cidoc-crm/P94i_was_created_by"][0]) {
        for (let i = 0; i < _len; i++) {
            let event = LDES["object"]["http://www.cidoc-crm.org/cidoc-crm/P67i_is_referred_to_by"]["http://www.cidoc-crm.org/cidoc-crm/P94i_was_created_by"][i]
            let creation = {}
            creation["creator"] = event["http://www.cidoc-crm.org/cidoc-crm/P14_carried_out_by"]["equivalent"]["label"]["@value"]
            let _id =  event["http://www.cidoc-crm.org/cidoc-crm/P14_carried_out_by"]["equivalent"]["@id"]
            let id = fetchPersFromPers(PERS, _id, "id")
            creation["id"] = id;

            try {
                // creation place
                try {
                    try {
                        creation["creation_place"] = event["http://www.cidoc-crm.org/cidoc-crm/P7_took_place_at"]["equivalent"]["skos:prefLabel"]["@value"]
                    } catch {
                        let _id = event["http://www.cidoc-crm.org/cidoc-crm/P7_took_place_at"]["equivalent"]["@id"]
                        let _x = fetchTermFromThes(THES, _id)
                        creation["creation_place"] = _x
                    }

                } catch(error) {

                }

                // creation date
                try {
                    let creation_date = event["http://www.cidoc-crm.org/cidoc-crm/P4_has_time-span"]["@value"]
                    let _date  = EDTFtoDate(creation_date)
                    creation["date"] = _date

                } catch(error) {console.log(error)}
                creations.push(creation)
            } catch(error)  {console.log(error)}
        }

    // else if only one designer;
    } else {
        let event = LDES["object"]["http://www.cidoc-crm.org/cidoc-crm/P67i_is_referred_to_by"]["http://www.cidoc-crm.org/cidoc-crm/P94i_was_created_by"]
        let creation = {}
        try{
            creation["creator"] = event["http://www.cidoc-crm.org/cidoc-crm/P14_carried_out_by"]["equivalent"]["label"]["@value"]
            let _id =  event["http://www.cidoc-crm.org/cidoc-crm/P14_carried_out_by"]["equivalent"]["@id"]
            let id = fetchPersFromPers(PERS, _id, "id")
            creation["id"] = id

        } catch (error) {
            let _id =  event["http://www.cidoc-crm.org/cidoc-crm/P14_carried_out_by"]["equivalent"]
            let x = fetchPersFromPers(PERS, _id, "name")
            let id = fetchPersFromPers(PERS, _id, "id")
            creation["creator"] = x;
            creation["id"] = id;
        }
        try {

            // creation place
            try {
                try {
                    creation["creation_place"] = event["http://www.cidoc-crm.org/cidoc-crm/P7_took_place_at"]["equivalent"]["skos:prefLabel"]["@value"]
                } catch {
                    let _id = event["http://www.cidoc-crm.org/cidoc-crm/P7_took_place_at"]["equivalent"]
                    let _x = fetchTermFromThes(THES, _id)
                    creation["creation_place"] = _x
                }
            } catch (error) {}

            // creation date
            try {
                let creation_date = event["http://www.cidoc-crm.org/cidoc-crm/P4_has_time-span"]["@value"]
                let _date  = EDTFtoDate(creation_date)
                creation["date"] = _date
            } catch {}
            creations.push(creation)
        } catch (error) {}
    }
    return creations;
}

export function fetchProductionInfo(LDES, PERS, THES){
    //console.log(LDES["object"]["http://www.cidoc-crm.org/cidoc-crm/P108i_was_produced_by"]);
    let productions = [];

    let producer, production_place, production_date, production_technique = [];
    let _len = LDES["object"]["http://www.cidoc-crm.org/cidoc-crm/P108i_was_produced_by"].length
    // check if multiple instances of productions.
    if (LDES["object"]["http://www.cidoc-crm.org/cidoc-crm/P108i_was_produced_by"][0]) {
        for (let i = 0; i < _len; i++) {
            let production = {}
            producer =  LDES["object"]["http://www.cidoc-crm.org/cidoc-crm/P108i_was_produced_by"][i]["http://www.cidoc-crm.org/cidoc-crm/P14_carried_out_by"]["equivalent"]["label"]["@value"];
            production["producer"] = producer
            let _id = LDES["object"]["http://www.cidoc-crm.org/cidoc-crm/P108i_was_produced_by"][i]["http://www.cidoc-crm.org/cidoc-crm/P14_carried_out_by"]["equivalent"]["@id"]
            let id = fetchPersFromPers(PERS, _id, "id")
            production["id"] = id;

            // PRODUCTION PLACE
            try{
                if (LDES["object"]["http://www.cidoc-crm.org/cidoc-crm/P108i_was_produced_by"][i]["http://www.cidoc-crm.org/cidoc-crm/P7_took_place_at"]["equivalent"]["skos:prefLabel"]["@value"]) {
                    production_place = LDES["object"]["http://www.cidoc-crm.org/cidoc-crm/P108i_was_produced_by"][i]["http://www.cidoc-crm.org/cidoc-crm/P7_took_place_at"]["equivalent"]["skos:prefLabel"]["@value"]
                    production["place"] = production_place
                } else continue
            } catch (error) {}

            // PRODUCTION DATE
            if (LDES["object"]["http://www.cidoc-crm.org/cidoc-crm/P108i_was_produced_by"][i]["http://www.cidoc-crm.org/cidoc-crm/P4_has_time-span"]["@value"]) {
                production_date = LDES["object"]["http://www.cidoc-crm.org/cidoc-crm/P108i_was_produced_by"][i]["http://www.cidoc-crm.org/cidoc-crm/P4_has_time-span"]["@value"]
                let _date  = EDTFtoDate(production_date)
                production["date"] = _date
            } else continue

            // PRODUCTION TECHNIQUE
            try{
                if (LDES["object"]["http://www.cidoc-crm.org/cidoc-crm/P108i_was_produced_by"][i]["http://www.cidoc-crm.org/cidoc-crm/P32_used_general_technique"]['http://www.cidoc-crm.org/cidoc-crm/P2_has_type'][0]["skos:prefLabel"]["@value"]) {
                    production_technique = LDES["object"]["http://www.cidoc-crm.org/cidoc-crm/P108i_was_produced_by"][i]["http://www.cidoc-crm.org/cidoc-crm/P32_used_general_technique"]['http://www.cidoc-crm.org/cidoc-crm/P2_has_type'][0]["skos:prefLabel"]["@value"];
                    production["technique"] = production_technique;
                } else continue
            } catch {};
            productions.push(production)
        }
    } else { // else only parse one instance
        let production = {}
        //console.log(LDES["object"]["http://www.cidoc-crm.org/cidoc-crm/P108i_was_produced_by"][i])
        producer =  LDES["object"]["http://www.cidoc-crm.org/cidoc-crm/P108i_was_produced_by"]["http://www.cidoc-crm.org/cidoc-crm/P14_carried_out_by"]["equivalent"]["label"]["@value"]
        production["producer"] = producer
        let _id = LDES["object"]["http://www.cidoc-crm.org/cidoc-crm/P108i_was_produced_by"]["http://www.cidoc-crm.org/cidoc-crm/P14_carried_out_by"]["equivalent"]["@id"]
        let id = fetchPersFromPers(PERS, _id, "id")
        production["id"] = id;

        try{
            try {
                if (production_place = LDES["object"]["http://www.cidoc-crm.org/cidoc-crm/P108i_was_produced_by"]["http://www.cidoc-crm.org/cidoc-crm/P7_took_place_at"]["equivalent"]["skos:prefLabel"]["@value"]) {
                    production_place = LDES["object"]["http://www.cidoc-crm.org/cidoc-crm/P108i_was_produced_by"]["http://www.cidoc-crm.org/cidoc-crm/P7_took_place_at"]["equivalent"]["skos:prefLabel"]["@value"]
                    production["place"] = production_place
                } else {
                    let _id = LDES["object"]["http://www.cidoc-crm.org/cidoc-crm/P108i_was_produced_by"]["http://www.cidoc-crm.org/cidoc-crm/P7_took_place_at"]["equivalent"]
                    let _x = fetchTermFromThes(THES, _id)
                    production["place"] = _x
                }
            } catch {

                //production["place"] = _x
            }
            try {
                production_date = LDES["object"]["http://www.cidoc-crm.org/cidoc-crm/P108i_was_produced_by"]["http://www.cidoc-crm.org/cidoc-crm/P4_has_time-span"]["@value"]
                let _date  = EDTFtoDate(production_date)
                production["date"] = _date
            } catch{}
            try {
                //todo: add multiple occurences to technique
                production_technique = LDES["object"]["http://www.cidoc-crm.org/cidoc-crm/P108i_was_produced_by"]["http://www.cidoc-crm.org/cidoc-crm/P32_used_general_technique"]['http://www.cidoc-crm.org/cidoc-crm/P2_has_type'][0]["skos:prefLabel"]["@value"];
                production["technique"] = production_technique;
            } catch {}

        } catch {}
        productions.push(production)


    }
    return productions;

}

export function fetchMaterials(LDES ,THES, material) {
    // materials (geheel) -- P45_consists_of

    let _thes = THES
    // thes["object"]["http://purl.org/dc/terms/isVersionOf"]["@id"]

    if (LDES["object"]["http://www.cidoc-crm.org/cidoc-crm/P45_consists_of"]) {
        try{
            if (LDES["object"]["http://www.cidoc-crm.org/cidoc-crm/P45_consists_of"][0]){
                let len = LDES["object"]["http://www.cidoc-crm.org/cidoc-crm/P45_consists_of"].length
                for (let i = 0; i < len; i++) {
                    let _mat;
                    let _id = LDES["object"]["http://www.cidoc-crm.org/cidoc-crm/P45_consists_of"][i]["http://www.cidoc-crm.org/cidoc-crm/P2_has_type"][0]["@id"]
                    try {
                        _mat = LDES["object"]["http://www.cidoc-crm.org/cidoc-crm/P45_consists_of"][i]["http://www.cidoc-crm.org/cidoc-crm/P2_has_type"][0]["skos:prefLabel"]["@value"]
                    } catch {
                        _mat = fetchTermFromThes(_thes, _id)
                    }
                    material.push(_mat + " (geheel)")
                }

            } else {
                let _mat;
                let _id = LDES["object"]["http://www.cidoc-crm.org/cidoc-crm/P45_consists_of"]["http://www.cidoc-crm.org/cidoc-crm/P2_has_type"][0]["@id"]
                try {
                    _mat = LDES["object"]["http://www.cidoc-crm.org/cidoc-crm/P45_consists_of"]["http://www.cidoc-crm.org/cidoc-crm/P2_has_type"][0]["skos:prefLabel"]["@value"]
                } catch {
                    _mat = fetchTermFromThes(_thes, _id)
                }
                material.push(_mat + " (geheel)")

            }
        } catch (error) {console.log(error)}

    }

    // material (parts) -- P46_is_composed_of
    if (LDES["object"]["http://www.cidoc-crm.org/cidoc-crm/P46_is_composed_of"]) {
        try{
            let len = LDES["object"]["http://www.cidoc-crm.org/cidoc-crm/P46_is_composed_of"].length
            for (let i = 0; i < len ; i++) {
                //todo: fix issue --> when same ID the value isn't parsed
                let m  = LDES["object"]["http://www.cidoc-crm.org/cidoc-crm/P46_is_composed_of"][i]
                let _id = m["http://www.cidoc-crm.org/cidoc-crm/P45_consists_of"]["http://www.cidoc-crm.org/cidoc-crm/P2_has_type"][1]["@id"]
                let _mat
                let note
                try {
                    _mat = m["http://www.cidoc-crm.org/cidoc-crm/P45_consists_of"]["http://www.cidoc-crm.org/cidoc-crm/P2_has_type"][1]["skos:prefLabel"]["@value"];
                } catch {
                    try{
                        _mat = fetchTermFromThes(_thes, _id)
                    } catch(error) {
                        console.log(error)
                    }
                }

                if (m["http://www.cidoc-crm.org/cidoc-crm/P3_has_note"]){
                    note = m["http://www.cidoc-crm.org/cidoc-crm/P3_has_note"]["@id"].split("/")[7]
                } else {
                    note = "geheel"
                }
                material.push(_mat +" ("+note+")")
            }
        } catch {}
    }
}

export function fetchDimensions(input) {
    // utils
    function fetchDimensionValue(i) {
        return input["object"]["http://www.cidoc-crm.org/cidoc-crm/P43_has_dimension"][i]["https://schema.org/value"]["@id"].split("/")[7]
    }
    function fetchDimensionUnit(i) {
        return input["object"]["http://www.cidoc-crm.org/cidoc-crm/P43_has_dimension"][i]["https://schema.org/unitText"]
    }
    function fetchDimensionType(i) {
        let t = input["object"]["http://www.cidoc-crm.org/cidoc-crm/P43_has_dimension"][i]["http://www.cidoc-crm.org/cidoc-crm/P2_has_type"]["@id"].split("/")[7]
        switch (t) {
            case "hoogte": return "H: "
            case "breedte": return "W: "
            case "diepte": return "D: "
            case "diameter": return "Ø: "
        }
    }

    // if only one value
    try {
        let _t = input["object"]["http://www.cidoc-crm.org/cidoc-crm/P43_has_dimension"]["http://www.cidoc-crm.org/cidoc-crm/P2_has_type"]["@id"].split("/")[7]
        let _v = input["object"]["http://www.cidoc-crm.org/cidoc-crm/P43_has_dimension"]["https://schema.org/value"]["@id"].split("/")[7]
        let _u = input["object"]["http://www.cidoc-crm.org/cidoc-crm/P43_has_dimension"]["https://schema.org/unitText"]
        return _t + _v + _u + " "
    } catch {
    }

    // if multiple values
    try {
        let _b = ""
        let _len = input["object"]["http://www.cidoc-crm.org/cidoc-crm/P43_has_dimension"].length
        for (let i = 0; i < _len ; i++) {
            // fetchDimensionType
            let _t = fetchDimensionType(i).toString()
            let _v = fetchDimensionValue(i).toString()
            let _u = fetchDimensionUnit(i).toString()

            let _f = _t + _v + _u + " "
            _b += _f

        }
        return _b
    } catch {
    }
}

export function fetchText(i, lang, id) {
    if (i.id === id) {
        if (lang === "EN") {
            if (i.description_en !== "") {
                const x = i.description_en.split("//")
                return x;
            }
        } else if (lang === "NL") {
            if (i.description_nl !== "") {
                const x = i.description_nl.split("//")
                return x;
            }
        } else {
            if (i.description_fr !== "") {
                const x = i.description_fr.split("//")
                return x;
            }
        }
    }
}

export function fetchType(i){
    return i._type;
}

export function fetchImage(i, _type) {
    if (i._type === _type){
        if (i.media !== "") {
            return "/media/raw/"+i.media
        }
    }
}

export function headerTitleBig(lang, _type) {
    if (lang === "EN") {
        return (
            <div>
                <h1 className={"home"}>program</h1>
                <h1 className={"home"}>studios</h1>
            </div>
        )
    } else if (lang === "NL") {
        return (
            <div>
                <h1 className={"home"}>programma</h1>
                <h1 className={"home"}>studios</h1>
            </div>
        )
    } else {
        return(
            <div>
                <h1 className={"home"}>studios de</h1>
                <h1 className={"home"}>programmation</h1>
            </div>
        )
    }

}

export function headerTitle(lang, stacked) {
    if (stacked===true){
        if (lang === "EN") {
            return (
                <div>
                    <h1 className="home">program</h1>
                    <h1 className="home">studios</h1>
                </div>
            )
        } else if (lang === "NL") {
            return (
                <div>
                    <h1 className="home">programma</h1>
                    <h1 className="home">studios</h1>
                </div>
            )
        } else {
            return(
                <div>
                    <h1 className="home">studios de</h1>
                    <h1 className="home">programmation</h1>
                </div>
            )
        }
    }
    if (!stacked) {
        if (lang === "EN") {
            return (
                <div>
                    <h1>program studios</h1>
                </div>
            )
        } else if (lang === "NL") {
            return (
                <div>
                    <h1>programma studios</h1>
                </div>
            )
        } else {
            return(
                <div>
                    <h1>studios de programmation</h1>
                </div>
            )
        }
    }

}

export function headerAbout(lang) {
    if (lang === "EN") {
        return "about"
    } else if (lang === "NL") {
        return "over"
    } else {
        return "à propos de"
    }
}

export function fetchTitleStudios(i, lang, _type) {
    if (i._type === _type) {
        if (lang === "EN") {
            if (i.title_en !== "") {
                return <>{i.title_en}</>
            }
        } else if (lang === "NL") {
            if (i.title_nl !== "") {
                return <>{i.title_nl}</>
            }
        } else {
            return <>{i.title_fr}</>
        }
    }
}

export function fetchStudioDescription(i, lang, _type) {
    if (i._type === _type) {
        if (lang === "EN") {
            if (i.description_en !== "") {
                return <>{i.description_en}</>
            }
        } else if (lang === "NL") {
            if (i.description_nl !== "") {
                return <>{i.description_nl}</>
            }
        } else {
            return <>{i.description_fr}</>
        }
    }
}

export function fetchStudioID(i) {
    return i.id;
}

export function fetchStudioProjectImage(i, _type, studioID) {
    if (i._type === _type){
        if (i.id.startsWith(studioID)){
            if (i.media !== "") {
                return "/media/raw/"+i.media
            }
        }
    }
}

export function fetchStudioProjectDescription(i, lang, _type, studioID) {
    if (i._type === _type) {
        if (i.id.startsWith(studioID)){
            if (lang === "EN") {
                if (i.description_en !== "") {
                    const desc = i.description_en
                    return desc;
                }
            }
            if (lang === "FR") {
                if (i.description_fr !== "") {
                    const desc = i.description_fr
                    return desc;
                }
            }
            if (lang === "NL") {
                if (i.description_nl !== "") {
                    const desc = i.description_nl
                    return desc;
                }
            }
        }
    }
}

export function fetchStudioProjectTitle(i, lang, _type, studioID) {
    if (i._type === _type) {
        if (i.id.startsWith(studioID)) {
            if (lang === "EN") {
                if (i.title !== ""){
                    return <>{i.title_en}</>;
                }
            }
            if (lang === "NL") {
                if (i.title !== ""){
                    return <>{i.title_nl}</>;
                }
            }
            if (lang === "FR") {
                if (i.title !== ""){
                    return <>{i.title_fr}</>;
                }
            }
        }
    }
}

export function fetchStudioProjectLink(i) {
    let url;
    if(i.link === "yes") {
        if (i.link_URL !== "") {
            url = i.link_URL
            return url
        }
    }
}