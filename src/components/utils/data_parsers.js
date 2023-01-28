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
    let title;
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
                        <h1 className={" home"}>programmation</h1>
                    </div>
                )
        }

}

export function headerTitle(lang, stacked) {
    let title;
    if (stacked==true){
        if (lang === "EN") {
            return (
                <div>
                    <h1>program</h1>
                    <h1>studios</h1>
                </div>
            )
        } else if (lang === "NL") {
            return (
                <div>
                    <h1>programma</h1>
                    <h1 className>studios</h1>
                </div>
            )
        } else {
            return(
                <div>
                    <h1>studios de</h1>
                    <h1 className>programmation</h1>
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

export function fetchTitle(i, lang, _type) {
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

export function fetchDescription(i, lang, _type) {
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