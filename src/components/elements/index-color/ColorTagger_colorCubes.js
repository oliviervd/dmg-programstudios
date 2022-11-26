import React, {useState, Suspense} from "react";
//import ldes_translations from "../../data/postgres_ldes_dmg_translations_ldes_dmg.json"

const HexCube = React.lazy(() => import("./ColorTagger_cube"))
const ObjectDescription = React.lazy(() => import("./ColorTagger_objectDescription"))

/*
function LDESViaURI(uri) {
    return ldes_translations.filter(
        function(ldes_translations) {
            return ldes_translations.uri === uri
        }
    )

}
*/

const ColorTagger_colorCubes = (props) => {

    // open close object description

    const [objectDescription0, setObjectDescription0] = useState(true);
    const [objectDescription1, setObjectDescription1] = useState(true);
    const [objectDescription2, setObjectDescription2] = useState(true);


    function openDescription0() {
        setObjectDescription0(!objectDescription0);
    }
    function openDescription1() {
        setObjectDescription1(!objectDescription1);
    }
    function openDescription2() {
        setObjectDescription2(!objectDescription2);
    }


    // retrieve and parse data

    const selection = props.curation
    const object_colors = props.data
    const objCount = props.num
    //console.log(props.data);
    const color_hex = [];
    const color_names = [];
    const obj_titles_EN = [];
    const obj_desc_EN = [];
    const object_number = [];
    const acquisition_dates = [];
    const LDES = [];
    const color_hex_sel = [];

    for (var hexNum=0; hexNum<objCount; ++hexNum) {
        const x = selection[hexNum];
        var _hexVal = object_colors[x]["HEX_values"].replace("['","").replace("']","").replace("'","").replace("]","").split(",")
        const uri = object_colors[x]["URI"];
        const color_name = object_colors[x]["color_names"]

        console.log(color_name);

        /*const _LDES = LDESViaURI(uri)

        const title_en = _LDES[0]["title_en"];
        let desc_en;
        if(_LDES[0]["description_adlib_en"]) {
            desc_en = _LDES[0]["description_adlib_en"]
        } else {
            desc_en = "this object has no description"
        }

        const LDES_object = JSON.parse(_LDES[0][0]);

        let acquisition_method = ""
        try {
            acquisition_method = LDES_object["MaterieelDing.isOvergedragenBijVerwerving"][0]["Activiteit.gebruikteTechniek"][0]["Recht.type"][0]["skos:prefLabel"]["@value"];
            if (acquisition_method === "aankoop") {
                acquisition_method = " (purchase)"
            } else if (acquisition_method === "legaat") {
                acquisition_method = " (bequest)"
            }  else if (acquisition_method === "schenking") {
                acquisition_method = " (gift)"
            } else if (acquisition_method === "onbekend"|"overdracht") {
                acquisition_method = ""
            }
        } catch {
            acquisition_method = "";
        }

        let acquisition_date = "unknown date of transaction" + acquisition_method
        try {
            acquisition_date = "date of transaction: " + LDES_object["MaterieelDing.isOvergedragenBijVerwerving"][0]["Conditie.periode"]["Periode.begin"] +  acquisition_method;
        } catch {
            acquisition_date = "unknown date of transaction"
        }*/

        color_hex.push(_hexVal);

        color_names.push(color_name);
        //obj_titles_EN.push(title_en);
        //obj_desc_EN.push(desc_en);
        //object_number.push(LDES_object["Entiteit.identificator"][1]["skos:notation"]["@value"])
        //acquisition_dates.push(acquisition_date)
        //LDES.push(LDES_object);

    }

    // function to copy values to clipboard

    function copyTextToClipBoard_0() {
        for (let i = 0; i < 10; i++) {
            color_hex_sel.push(color_hex[0][i].replace("[", ""))
        }
        let copyText = color_hex_sel
        console.log(copyText);
        navigator.clipboard.writeText(copyText);
        alert("Copied the values: " +  copyText);
    }

    function copyTextToClipBoard_1() {
        for (let i = 0; i < 10; i++) {
            color_hex_sel.push(color_hex[1][i].replace("[", ""))
        }
        let copyText = color_hex_sel
        navigator.clipboard.writeText(copyText);
        alert("Copied the values: " +  copyText);
    }

    function copyTextToClipBoard_2() {
        for (let i = 0; i < 10; i++) {
            color_hex_sel.push(color_hex[2][i].replace("[", ""))
        }
        let copyText = color_hex_sel
        navigator.clipboard.writeText(copyText);
        alert("Copied the values: " +  copyText);
    }

    return(
        <div className="grid--even_3">
            <Suspense>
                <HexCube hexColors={color_hex[0]} color_names={color_names[0]}/>
            </Suspense>
            <Suspense>
                <HexCube hexColors={color_hex[1]} color_names={color_names[1]}/>
            </Suspense>
            <Suspense>
                <HexCube hexColors={color_hex[2]} color_names={color_names[2]}/>
            </Suspense>
        </div>

    )

}

export default ColorTagger_colorCubes;