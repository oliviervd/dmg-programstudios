import React from "react";

export function fetchTitleEn(i) {
    let titleEn;
    if (i.title_en !== "") {
        return <p>{i.title_en}</p>
    }
}

export function fetchDescriptionEn(i) {
    let descEn;
    if (i.description_en !== "") {
        return <p>{i.description_en}</p>
    }
}