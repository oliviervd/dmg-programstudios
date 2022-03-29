import React from "react"

const ObjectDescription = (props) => {

    const desc = props.text.split(" ")

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
            } else {
                tags.push(
                    tags.string = desc[i],
                )
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