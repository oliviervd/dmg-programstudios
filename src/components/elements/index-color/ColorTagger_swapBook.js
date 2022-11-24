import React from "react";

const ColorTagger_swapBook = (props) => {

    const _im = props.num;
    return(
        <img className="__img center" alt="DREAMING OF IMAGES" src={_im.replace("/full/0/default.jpg", "/750,/0/default.jpg")}/>
    )
}

export default ColorTagger_swapBook;