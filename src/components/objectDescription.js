import React from "react"
import ReactDOM from "react-dom"
import ldes_translations from "../data/ldes_dmg_translations.json"

const ObjectDescription = (props) => {

    const desc = props.text.split(" ")
    console.log(desc)
    //const desc = ldes_translations[0]["description_adlib_en"].split(" ")
    const colors = ["red", "green", "yellow", "pink", "bronze", "coffee", "iron",
        "white", "black", "blue", "purple", "brown", "gold", "silver", "metal", "creamy", "cream", "coloured",
    "dark", "light", "Fuchsia", "ebony", "ivory"]
    var tags = [];

    try{
        for (var i = 0; i < desc.length; ++i) {
            //console.log(desc[i]);
            if (colors.includes(desc[i])) {

                tags.push(
                    tags.string = desc[i],
                )

                //var tag = document.createElement("p")
                //var x = document.createTextNode(desc[i])
                //tag.className = "underline";
                //tag.appendChild(x)
                //tags.push(tag)
            } else {
                tags.push(
                    tags.string = desc[i],
                )

                //var tag = document.createElement("p")
                //var x = document.createTextNode(desc[i])
                //tag.appendChild(x)
                //tags.push(tag)

            }
        }

        return(
            tags.map(x => {
                return colors.includes(x) ? <text className="colorText conicBackdrop">{x + " "}</text> :
                    <text className="descText">{x + " "}</text>
            })
        )
    } catch(err) {
        return(
            <></>
        )
    }


}

export default ObjectDescription