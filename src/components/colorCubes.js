import React, {useState, Suspense} from "react";
import ldes_translations from "../data/postgres_ldes_dmg_translations_ldes_dmg.json"

const HexCube = React.lazy(() => import("../components/cube"))
const ObjectDescription = React.lazy(() => import("./objectDescription"))

function LDESViaURI(uri) {
    return ldes_translations.filter(
        function(ldes_translations) {
            return ldes_translations.URI === uri
        }
    )

}

const ColorCubes = (props) => {

    // open close object description

    const [objectDescription0, setObjectDescription0] = useState(false);
    const [objectDescription1, setObjectDescription1] = useState(false);
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

        const _LDES = LDESViaURI(uri)

        const title_en = _LDES[0]["title_en"];
        const desc_en = _LDES[0]["description_adlib_en"]
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
        }

        color_hex.push(_hexVal);

        color_names.push(color_name);
        obj_titles_EN.push(title_en);
        obj_desc_EN.push(desc_en);
        object_number.push(LDES_object["Entiteit.identificator"][1]["skos:notation"]["@value"])
        acquisition_dates.push(acquisition_date)
        LDES.push(LDES_object);

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
        <Suspense>
            <div className="container_color_interface">
                <div>
                    <HexCube id="HexCube"
                             hexColors = {color_hex[0]}
                             color_names={color_names[0]}/>
                    <div className="dotLine"/>
                    <div className="title-box">
                        <div className="title-box__top">
                            <div className="pinkHeader italic" onClick={openDescription0}>[read more]</div>
                            <div className="pinkHeader italic right" onClick={copyTextToClipBoard_0}>[copy to clipboard]</div>
                        </div>
                        <p className="pinkHeader italic">{object_number[0]}</p>
                        <p className="pinkHeader italic">{acquisition_dates[0]}</p>
                        <p className="title-box__title italic" onClick={openDescription0}>{obj_titles_EN[0]}</p>
                    </div>
                    <br/><br/>
                    {objectDescription0 &&
                        <div>
                            <div className="easeBorder__green"/>
                            <div className="rowScroll">
                                <ObjectDescription text={obj_desc_EN[0]}/>
                            </div>
                        </div>
                    }
                </div>
                <div>
                    <HexCube
                        hexColors = {color_hex[1]}
                        color_names={color_names[1]}
                    />
                    <div className="dotLine"/>
                    <div className="title-box">
                        <div className="title-box__top">
                            <div className="pinkHeader italic" onClick={openDescription1}>[read more]</div>
                            <div className="pinkHeader italic right" onClick={copyTextToClipBoard_1}>[copy to clipboard]</div>
                        </div>
                        <p className="pinkHeader italic">{object_number[1]}</p>
                        <p className="pinkHeader italic">{acquisition_dates[1]}</p>
                        <p className="title-box__title italic" onClick={openDescription1} >{obj_titles_EN[1]}</p>
                    </div>
                    <br/><br/>
                    {objectDescription1 &&
                        <div>
                            <div className="easeBorder__green"/>
                            <div className="rowScroll">
                                <ObjectDescription text={obj_desc_EN[1]}/>
                            </div>
                        </div>
                    }
                </div>
                <div>

                    <HexCube
                        hexColors = {color_hex[2]}
                        color_names={color_names[2]}
                    />
                    <div className="dotLine"/>
                    <div className="title-box">
                        <div className="title-box__top">
                            <div className="pinkHeader italic" onClick={openDescription2}>[read more]</div>
                            <div className="pinkHeader italic right" onClick={copyTextToClipBoard_2}>[copy to clipboard]</div>
                        </div>
                        <p className="pinkHeader italic">{object_number[2]}</p>
                        <p className="pinkHeader italic">{acquisition_dates[2]}</p>
                        <p className="title-box__title italic" onClick={openDescription2}>{obj_titles_EN[2]}</p>
                    </div>
                    <br/><br/>
                    {objectDescription2 &&
                        <div>
                            <div className="easeBorder__green"/>
                            <div className="rowScroll">
                                <ObjectDescription text={obj_desc_EN[2]}/>
                            </div>
                        </div>
                    }
                </div>
            </div>
        </Suspense>

    )

}

export default ColorCubes;