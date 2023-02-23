import React from "react";
import * as EdtfConverter from 'edtf-converter';
const converter = new EdtfConverter.Converter();

export async function errorHandler(promise) {
    try {
        let data = await promise();
        return [data, null];
    } catch (error) {
        return [null, error];
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
        }

    } return exhibitions//console.log(exhibitions)
}

export function EDTFtoDate(EDTF){
    let input = EDTF;
    if (input == ".."){
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

export function fetchCreatorInfo(LDES){

    let creations = [];
    let creator, creation_place, creation_date
    // check if multiple creation events. - designer of conceptual thing. (designed by)
    let _len = LDES["object"]["http://www.cidoc-crm.org/cidoc-crm/P67i_is_referred_to_by"].length

    if (LDES["object"]["http://www.cidoc-crm.org/cidoc-crm/P67i_is_referred_to_by"][0]) {
        for (let i = 0; i < _len; i++) {
            let event = LDES["object"]["http://www.cidoc-crm.org/cidoc-crm/P67i_is_referred_to_by"][i]["http://www.cidoc-crm.org/cidoc-crm/P94i_was_created_by"]
            let creation = new Object()
            creation["creator"] = event["http://www.cidoc-crm.org/cidoc-crm/P14_carried_out_by"]["equivalent"]["label"]["@value"]
            try {
                try {
                    creation["creation_place"] = event["http://www.cidoc-crm.org/cidoc-crm/P7_took_place_at"]["equivalent"]["skos:prefLabel"]["@value"]
                } catch {}
                try {
                    let creation_date = event["http://www.cidoc-crm.org/cidoc-crm/P4_has_time-span"]["@value"]
                    let _date  = EDTFtoDate(creation_date)
                    creation["date"] = _date
                    //creation["date"] = creation_date

                } catch {}
                creations.push(creation)
            } catch {}
        }

    } else {
        let event = LDES["object"]["http://www.cidoc-crm.org/cidoc-crm/P67i_is_referred_to_by"]["http://www.cidoc-crm.org/cidoc-crm/P94i_was_created_by"]
        let creation = new Object()
        creation["creator"] = event["http://www.cidoc-crm.org/cidoc-crm/P14_carried_out_by"]["equivalent"]["label"]["@value"]
        try {
            try {
                creation["creation_place"] = event["http://www.cidoc-crm.org/cidoc-crm/P7_took_place_at"]["equivalent"]["skos:prefLabel"]["@value"]
            } catch {}
            try {
                let creation_date = event["http://www.cidoc-crm.org/cidoc-crm/P4_has_time-span"]["@value"]
                let _date  = EDTFtoDate(creation_date)
                creation["date"] = _date
            } catch {}
            creations.push(creation)
        } catch {}
    }
    return creations;
}

export function fetchProductionInfo(LDES){
    //console.log(LDES["object"]["http://www.cidoc-crm.org/cidoc-crm/P108i_was_produced_by"]);
    let productions = [];

    let producer, production_place, production_date = [];
    let _len = LDES["object"]["http://www.cidoc-crm.org/cidoc-crm/P108i_was_produced_by"].length
    // check if mulptiple instances of productions.
    if (LDES["object"]["http://www.cidoc-crm.org/cidoc-crm/P108i_was_produced_by"][0]) {
        for (let i = 0; i < _len; i++) {
            let production = new Object()
            //console.log(LDES["object"]["http://www.cidoc-crm.org/cidoc-crm/P108i_was_produced_by"][i])
            producer =  LDES["object"]["http://www.cidoc-crm.org/cidoc-crm/P108i_was_produced_by"][i]["http://www.cidoc-crm.org/cidoc-crm/P14_carried_out_by"]["equivalent"]["label"]["@value"]
            if (LDES["object"]["http://www.cidoc-crm.org/cidoc-crm/P108i_was_produced_by"][i]["http://www.cidoc-crm.org/cidoc-crm/P7_took_place_at"]["equivalent"]["skos:prefLabel"]["@value"]) {
                production_place = LDES["object"]["http://www.cidoc-crm.org/cidoc-crm/P108i_was_produced_by"][i]["http://www.cidoc-crm.org/cidoc-crm/P7_took_place_at"]["equivalent"]["skos:prefLabel"]["@value"]
                production["place"] = production_place
            } else continue

            if (LDES["object"]["http://www.cidoc-crm.org/cidoc-crm/P108i_was_produced_by"][i]["http://www.cidoc-crm.org/cidoc-crm/P4_has_time-span"]["@value"]) {
                production_date = LDES["object"]["http://www.cidoc-crm.org/cidoc-crm/P108i_was_produced_by"][i]["http://www.cidoc-crm.org/cidoc-crm/P4_has_time-span"]["@value"]
                let _date  = EDTFtoDate(production_date)
                production["date"] = _date
            } else continue

            production["producer"] = producer
            productions.push(production)

        }
    } else { // else only parse one instance
        let production = new Object()
        //console.log(LDES["object"]["http://www.cidoc-crm.org/cidoc-crm/P108i_was_produced_by"][i])
        producer =  LDES["object"]["http://www.cidoc-crm.org/cidoc-crm/P108i_was_produced_by"]["http://www.cidoc-crm.org/cidoc-crm/P14_carried_out_by"]["equivalent"]["label"]["@value"]
        production["producer"] = producer

        try{
            try {
                production_place = LDES["object"]["http://www.cidoc-crm.org/cidoc-crm/P108i_was_produced_by"]["http://www.cidoc-crm.org/cidoc-crm/P7_took_place_at"]["equivalent"]["skos:prefLabel"]["@value"]
                production["place"] = production_place
            } catch {}
            try {
                production_date = LDES["object"]["http://www.cidoc-crm.org/cidoc-crm/P108i_was_produced_by"]["http://www.cidoc-crm.org/cidoc-crm/P4_has_time-span"]["@value"]
                let _date  = EDTFtoDate(production_date)
                production["date"] = _date
            } catch{}

        } catch {}
        productions.push(production)


    }
    return productions;

}
export function fetchMaterials(LDES ,material) {
    // materials (geheel) -- P45_consists_of

    if (LDES["object"]["http://www.cidoc-crm.org/cidoc-crm/P45_consists_of"]) {
        try{
            if (LDES["object"]["http://www.cidoc-crm.org/cidoc-crm/P45_consists_of"][0]){
                let len = LDES["object"]["http://www.cidoc-crm.org/cidoc-crm/P45_consists_of"].length
                for (let i = 0; i < len; i++) {
                    //console.log(LDES["object"]["http://www.cidoc-crm.org/cidoc-crm/P45_consists_of"][i]["http://www.cidoc-crm.org/cidoc-crm/P2_has_type"][0]["skos:prefLabel"]["@value"])
                    let _mat = LDES["object"]["http://www.cidoc-crm.org/cidoc-crm/P45_consists_of"][i]["http://www.cidoc-crm.org/cidoc-crm/P2_has_type"][0]["skos:prefLabel"]["@value"]
                    material.push(_mat + " (geheel)")
                }

            } else {
                let len = LDES["object"]["http://www.cidoc-crm.org/cidoc-crm/P45_consists_of"].length
                let _mat = LDES["object"]["http://www.cidoc-crm.org/cidoc-crm/P45_consists_of"]["http://www.cidoc-crm.org/cidoc-crm/P2_has_type"][0]["skos:prefLabel"]["@value"]
                //console.log("P45_consists of: " + len)
                //console.log(props.details[0]["LDES_raw"]["object"]["http://www.cidoc-crm.org/cidoc-crm/P45_consists_of"]["http://www.cidoc-crm.org/cidoc-crm/P2_has_type"][0]["skos:prefLabel"]["@value"])
                material.push(_mat + " (geheel)")

            }
        } catch {}

    }

    // material (parts) -- P46_is_composed_of
    if (LDES["object"]["http://www.cidoc-crm.org/cidoc-crm/P46_is_composed_of"]) {
        try{
            let len = LDES["object"]["http://www.cidoc-crm.org/cidoc-crm/P46_is_composed_of"].length
            for (let i = 0; i < len ; i++) {
                //todo: fix issue --> when same ID the value isn't parsed
                let m  = LDES["object"]["http://www.cidoc-crm.org/cidoc-crm/P46_is_composed_of"][i]
                let _mat
                let note
                try {
                    _mat = m["http://www.cidoc-crm.org/cidoc-crm/P45_consists_of"]["http://www.cidoc-crm.org/cidoc-crm/P2_has_type"][1]["skos:prefLabel"]["@value"];
                } catch {
                    _mat = ""
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