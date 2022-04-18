import React from "react";

const SwapBook = (props) => {

    const _im = props.num;
    return(
        <img alt="DREAMING OF IMAGES" src={_im.replace("/full/0/default.jpg", "/750,/0/default.jpg")}/>
    )
}

export default SwapBook;