import React from "react";
import {useQuery} from "@tanstack/react-query";

export function fetchContentStudiosCMS() {
    const {data, isLoading, status} = useQuery({
        queryKey:['STUDIOS'],
        queryFn: () =>
            fetch("https://p01--admin-cms--qbt6mytl828m.code.run/api/studios/",{
                credentials: 'include',
                method: 'GET'
            }).then((req)=>req.json())
    })
    return data
}

export function containsObject(obj, list) {
    // This method checks if the object reference is the same in the array. It's fast, but won't work if you want to check for a different object with the same content
    for( let i = 0; i < list.length; i++) {
        if (list[i] === obj) {
            return true;
        }
    }
    return false;
}

export function fetchObjectsByID(data, id) {
    try{
        for (let i=0; i<data.length; i++) {
            try{
                if (data[i].objectNumber === id) {
                    return data[i]
                }
            } catch (e) {}
        }
    } catch (e) {}
}

export function filterByKey(object, _filter) {
    return Object.keys(object).filter((key)=>key.toLowerCase().includes(_filter.toLowerCase()));
}

export function fetchAllExhibitions(input) {
    const ExList = [];
    try{
        for (let i=0; i<input.length; i++) {
            // iterate over all exhibitions
            let LDES = input[i]["LDES_raw"]["object"]
            //console.log(LDES)
            try {
                if (LDES["http://purl.org/dc/terms/isPartOf"]) {
                    let exh;
                    if (LDES["http://purl.org/dc/terms/isPartOf"][0]){
                        for (let x=0; x<LDES["http://purl.org/dc/terms/isPartOf"].length; x++){
                            try{
                                exh = LDES["http://purl.org/dc/terms/isPartOf"][x]["http://www.cidoc-crm.org/cidoc-crm/P16_used_specific_object"]["http://www.cidoc-crm.org/cidoc-crm/P3_has_note"]["@value"]
                                ExList.push(exh)
                            } catch(e) {}
                        }
                    } else {
                        exh = LDES["http://purl.org/dc/terms/isPartOf"]["http://www.cidoc-crm.org/cidoc-crm/P16_used_specific_object"]["http://www.cidoc-crm.org/cidoc-crm/P3_has_note"]["@value"]
                        ExList.push(exh)
                    }
                }
            } catch (e) {}
        }
        //console.log(ExList);
        return ExList
    } catch(e) {}
}

export function listOfParticipatedExhibitions(oeuvre) {
    const exhibitionList = []
    const filteredList = []
    for (let i=0; i < oeuvre.length; i++) {
        try {
            let exh = fetchExhibitions(oeuvre[i]["LDES_raw"])
            if (exh.length === 1) {
                exhibitionList.push(exh[0])
            } else {
                for (let e=0; e < exh.length ; e++) {
                    exhibitionList.push(exh[e])
                }
            }

        } catch (e) {}
    }

    exhibitionList.forEach(item=>{
        if(!containsObject(item, filteredList)) {
            filteredList.push(item)
        }
    })
}

export function fetchOeuvreV2(_LDES, agent, PERS, THES) {
    // todo: add function to ensure that each work is only shown once. --> check if already in set
    let _refID = agent["LDES_raw"]["object"]["http://www.w3.org/ns/adms#identifier"][1]["skos:notation"]["@value"]
    let match = [] // setup empty array to store matches
    // loop over all items in LDES
    for (let i=0; i < _LDES.length; i++) {
        // fetch producer == NOVA (DMG-A-00677)
        try{
            try{
                let _prod = fetchProductionInfo(_LDES[i]["LDES_raw"], PERS, THES)
                for (let p = 0; p < _prod.length; p++) {
                    if(_prod[p].id === _refID) {
                        if (_LDES[i]["iiif_image_uris"].length !== 0) {
                            match.push(_LDES[i])
                        }
                    } else if(_prod[0].id=== _refID) {

                    }
                }
            } catch (e) {}

            try {
                let _creators = fetchCreatorInfo(_LDES[i]["LDES_raw"], PERS, THES) //
                for (let c = 0; c < _creators.length; c++) {
                    try{
                        if(_creators[c].id === _refID) {
                            if (_LDES[i]["iiif_image_uris"].length !== 0) {
                                match.push(_LDES[i])
                            }
                        }
                    } catch(e) {}
                }
            } catch (e) {}
            // check creators
        } catch (e) {}
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
    try {
        _refOT = fetchObjectType(_ref["LDES_raw"], _thes)
    } catch(error) {}

    let _len = _LDES.length
    let _matchingObjects = []
    for (let i = 0; i < _len; i++) {
        let _base = _LDES[i]["LDES_raw"]
        let _OT = fetchObjectType(_base)

        for (let x = 0; x < _refOT.length; x++) {
            try{
                if (_refOT[x] !== "productverpakking") { //skip if productverpakking.
                    if (_OT[0] === _refOT[x]) {
                        if (_LDES[i]["iiif_image_uris"].length !== 0){
                            _matchingObjects.push(_LDES[i])
                        }
                    }
                }
            } catch (error){}
        }
    }
    return _matchingObjects
}

export function fetchPersFromPers(input, uri, field) {
    let _len = input.length
    for (let i = 0; i<_len; i++){
        if(uri){
            if (input[i].is_version_of === uri) {
                //console.log(input[i]["LDES_raw"]["object"]["https://data.vlaanderen.be/ns/persoon#volledigeNaam"])
                if(field === "name"){
                    return input[i]["LDES_raw"]["object"]["https://data.vlaanderen.be/ns/persoon#volledigeNaam"]
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
                return input[i]["LDES_raw"]["object"]["skos:prefLabel"]["@value"]
            } else if (input[i]["LDES_raw"]["object"]["owl:sameAs"] === uri) { // check if URI is not stad.gent
                return input[i]["LDES_raw"]["object"]["skos:prefLabel"]["@value"]
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

export function fetchAcquisitionHistory(LDES) {
    let acquisition = {}
    try {
        acquisition["date"] = LDES["object"]["http://www.cidoc-crm.org/cidoc-crm/P24i_changed_ownership_through"]["http://www.cidoc-crm.org/cidoc-crm/P4_has_time-span"]["http://data.europa.eu/m8g/startTime"]["@value"]
    } catch {acquisition["date"]="datum onbekend"}
    acquisition["method"] = LDES["object"]["http://www.cidoc-crm.org/cidoc-crm/P24i_changed_ownership_through"]["http://www.cidoc-crm.org/cidoc-crm/P32_used_general_technique"]["http://www.cidoc-crm.org/cidoc-crm/P2_has_type"][0]["skos:prefLabel"]["@value"]
    return acquisition;
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
    //console.log(LDES["object"]["http://www.cidoc-crm.org/cidoc-crm/P102_has_title"]["@value"])
    return LDES["object"]["http://www.cidoc-crm.org/cidoc-crm/P102_has_title"]["@value"];
}

export function fetchDescription(LDES) {
    let description;
    description = new Promise((resolve) => {
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
                exh["title"] = exhibition["http://www.cidoc-crm.org/cidoc-crm/P3_has_note"]["@value"]
                exh["date"] = exhibition["http://www.cidoc-crm.org/cidoc-crm/P4_has_time-span"]["@value"]
                exhibitions.push(exh)
            }
        } else {
            let exh = {}
            let exhibition = LDES["object"]["http://purl.org/dc/terms/isPartOf"]["http://www.cidoc-crm.org/cidoc-crm/P16_used_specific_object"]
            exh["title"] = exhibition["http://www.cidoc-crm.org/cidoc-crm/P3_has_note"]["@value"]
            exh["date"] = exhibition["http://www.cidoc-crm.org/cidoc-crm/P4_has_time-span"]["@value"]
            exhibitions.push(exh)
        }

    } return exhibitions//console.log(exhibitions)
}

export function EDTFtoDate(EDTF){
    let input = EDTF;
    if (input === ".."){
        return "unknown"
    }

    else {
        return input
        /*let date  = converter.edtfToDate(EDTF)
        if (date.min && date.max) {
            let _date = date.min.toDate().getFullYear() + " - " + date.max.toDate().getFullYear()
            return _date
        }

        else if (date.min && !date.max) {
            let _date = "after " + date.min.toDate().getFullYear()
            return _date
        }
        else {

        }*/
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
            creation["id"] = fetchPersFromPers(PERS, _id, "id")

            try {
                // creation place
                try {
                    try {
                        creation["creation_place"] = event["http://www.cidoc-crm.org/cidoc-crm/P7_took_place_at"]["equivalent"]["skos:prefLabel"]["@value"]
                    } catch {
                        let _id = event["http://www.cidoc-crm.org/cidoc-crm/P7_took_place_at"]["equivalent"]["@id"]
                        creation["creation_place"] = fetchTermFromThes(THES, _id)
                    }

                } catch(error) {

                }

                // creation date
                try {
                    let creation_date = event["http://www.cidoc-crm.org/cidoc-crm/P4_has_time-span"]["@value"]
                    creation["date"] = EDTFtoDate(creation_date)

                } catch(error) {console.log(error)}

                // role
                try {
                    let _role = event["http://www.cidoc-crm.org/cidoc-crm/P14_carried_out_by"]["kwalificatie"]
                    creation["qualification"] = _role
                    console.log(_role)
                } catch(e) {}

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
            creation["id"] = fetchPersFromPers(PERS, _id, "id")

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
                    creation["creation_place"] = fetchTermFromThes(THES, _id)
                }
            } catch (error) {}

            // creation date
            try {
                let creation_date = event["http://www.cidoc-crm.org/cidoc-crm/P4_has_time-span"]["@value"]
                creation["date"] = EDTFtoDate(creation_date)
            } catch {}

            // role
            try {
                let _role = event["http://www.cidoc-crm.org/cidoc-crm/P14_carried_out_by"]["kwalificatie"]
                creation["qualification"] = _role
            } catch(e) {}

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
            production["id"] = fetchPersFromPers(PERS, _id, "id");

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
                production["date"] = EDTFtoDate(production_date)
            } else continue

            // PRODUCTION TECHNIQUE
            try{
                if (LDES["object"]["http://www.cidoc-crm.org/cidoc-crm/P108i_was_produced_by"][i]["http://www.cidoc-crm.org/cidoc-crm/P32_used_general_technique"]['http://www.cidoc-crm.org/cidoc-crm/P2_has_type'][0]["skos:prefLabel"]["@value"]) {
                    production_technique = LDES["object"]["http://www.cidoc-crm.org/cidoc-crm/P108i_was_produced_by"][i]["http://www.cidoc-crm.org/cidoc-crm/P32_used_general_technique"]['http://www.cidoc-crm.org/cidoc-crm/P2_has_type'][0]["skos:prefLabel"]["@value"];
                    production["technique"] = production_technique;
                } else continue
            } catch {}

            // QUALIFICATION
            try{
                let _role = LDES["object"]["http://www.cidoc-crm.org/cidoc-crm/P108i_was_produced_by"][i]["http://www.cidoc-crm.org/cidoc-crm/P14_carried_out_by"]["kwalificatie"]
                production["qualification"] = _role
            } catch {}

            productions.push(production)
        }
    } else { // else only parse one instance
        let production = {}
        //console.log(LDES["object"]["http://www.cidoc-crm.org/cidoc-crm/P108i_was_produced_by"][i])
        producer =  LDES["object"]["http://www.cidoc-crm.org/cidoc-crm/P108i_was_produced_by"]["http://www.cidoc-crm.org/cidoc-crm/P14_carried_out_by"]["equivalent"]["label"]["@value"]
        production["producer"] = producer
        let _id = LDES["object"]["http://www.cidoc-crm.org/cidoc-crm/P108i_was_produced_by"]["http://www.cidoc-crm.org/cidoc-crm/P14_carried_out_by"]["equivalent"]["@id"]
        production["id"] = fetchPersFromPers(PERS, _id, "id");

        try{
            try {
                if (LDES["object"]["http://www.cidoc-crm.org/cidoc-crm/P108i_was_produced_by"]["http://www.cidoc-crm.org/cidoc-crm/P7_took_place_at"]["equivalent"]["skos:prefLabel"]["@value"]) {
                    production_place = LDES["object"]["http://www.cidoc-crm.org/cidoc-crm/P108i_was_produced_by"]["http://www.cidoc-crm.org/cidoc-crm/P7_took_place_at"]["equivalent"]["skos:prefLabel"]["@value"]
                    production["place"] = production_place
                } else {
                    let _id = LDES["object"]["http://www.cidoc-crm.org/cidoc-crm/P108i_was_produced_by"]["http://www.cidoc-crm.org/cidoc-crm/P7_took_place_at"]["equivalent"]
                    production["place"] = fetchTermFromThes(THES, _id)
                }
            } catch {

                //production["place"] = _x
            }
            try {
                production_date = LDES["object"]["http://www.cidoc-crm.org/cidoc-crm/P108i_was_produced_by"]["http://www.cidoc-crm.org/cidoc-crm/P4_has_time-span"]["@value"]
                production["date"] = EDTFtoDate(production_date)
            } catch{}
            try {
                //todo: add multiple occurences to technique
                production_technique = LDES["object"]["http://www.cidoc-crm.org/cidoc-crm/P108i_was_produced_by"]["http://www.cidoc-crm.org/cidoc-crm/P32_used_general_technique"]['http://www.cidoc-crm.org/cidoc-crm/P2_has_type'][0]["skos:prefLabel"]["@value"];
                production["technique"] = production_technique;
            } catch {}
            // qaulification
            try {
                let _qualification = LDES["object"]["http://www.cidoc-crm.org/cidoc-crm/P108i_was_produced_by"]["http://www.cidoc-crm.org/cidoc-crm/P14_carried_out_by"]["kwalificatie"]
                production["qualification"] = _qualification
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
                return i.description_en.split("//")
            }
        } else if (lang === "NL") {
            if (i.description_nl !== "") {
                return i.description_nl.split("//")
            }
        } else {
            if (i.description_fr !== "") {
                return i.description_fr.split("//")
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

export function fetchDataStudiosPayload(source, lang, path) {

    // title
    if (path === "title") {
        if (lang === "EN") {return source.titleEn}
        else if (lang === "NL") {return source.titles.titleNl}
        else if (lang === "FR") {return source.titles.titleFr}
    }

    if (path === "description") {
        if (lang === "EN") {return source["textBlock"]["introductionEn"][0]["children"][0]["text"]}
        if (lang === "NL") {return source["textBlock"]["introductionNl"][0]["children"][0]["text"]}
        if (lang === "FR") {return source["textBlock"]["introductionFr"][0]["children"][0]["text"]}
    }
}

export function fetchPayloadMediaById(id, mediaRepo) {
    console.log(id);
    for (let im=0; im<mediaRepo.length; im++) {
        if (mediaRepo[im].id === id) {
            return mediaRepo[im].url
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
                    return i.description_en
                }
            }
            if (lang === "FR") {
                if (i.description_fr !== "") {
                    return i.description_fr
                }
            }
            if (lang === "NL") {
                if (i.description_nl !== "") {
                    return i.description_nl
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