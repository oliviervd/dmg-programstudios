import {useQuery} from "@tanstack/react-query";

function fetchAllExhibitions(input) {
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

function useExhibitionLister(input) {
    const key = ["EXHIBITION"]
    const e = useQuery(key,()=>fetchAllExhibitions(input))
    return e.data;
}

export default useExhibitionLister;