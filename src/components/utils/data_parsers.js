import React from "react";

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

export function fetchImage(i, _type) {
    if (i._type === _type){
        if (i.media_ !== "") {
            return i.media_
        }
    }
}

export function headerTitle(lang, _type) {
        if (lang === "EN") {
            return <p>program studios</p>
        } else if (lang === "NL") {
            return <p>programma studios</p>
        } else {
            return <p>studios de programmation</p>
        }

}

export function headerAbout(lang) {
    if (lang === "EN") {
        return <p>about</p>
    } else if (lang === "NL") {
        return <p>over</p>
    } else {
        return <p>à propos de</p>
    }
}

export function fetchTitle(i, lang, _type) {
    if (i._type === _type) {
        if (lang === "EN") {
            if (i.title_en !== "") {
                return <p>{i.title_en}</p>
            }
        } else if (lang === "NL") {
            if (i.title_nl !== "") {
                return <p>{i.title_nl}</p>
            }
        } else {
            return <p>{i.title_fr}</p>
        }
    }
}

export function fetchDescription(i, lang, _type) {
    if (i._type === _type) {
        if (lang === "EN") {
            if (i.description_en !== "") {
                return <p>{i.description_en}</p>
            }
        } else if (lang === "NL") {
            if (i.description_nl !== "") {
                return <p>{i.description_nl}</p>
            }
        } else {
            return <p>{i.description_fr}</p>
        }
    }
}