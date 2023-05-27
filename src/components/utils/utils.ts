export function translate(_term, _lang, translations) {
    return translations[_term][_lang] // _lang = key.
}


export function wait(duration) {
    return new Promise(resolve => setTimeout(resolve, duration))
}

export function filterGender(male:boolean, female:boolean){
    const filteredSet:[] = []
    if (male) {

    }
    if (female) {

    }
}

// IMAGE HANDLING
export function fetchImageByColor(objects, color) {
    // fetch list of images that share colorname (color);
    const imageList = []
    try {

        for (let i=0; i<objects.length; i++){
            for (let z=0; z<objects[i]["color_names"].length; z++) {
                    if (objects[i]["color_names"][z].includes(color)) {
                        if (objects[i]["iiif_image_uris"][z]) {
                            imageList.push(objects[i]["iiif_image_uris"][z])
                        }
                    }
            }
        }
        return imageList
        //console.log(imageList)
    } catch (e) {console.log(e)}

}

export function shuffleFisherYates(array) {
        let i = array.length;
        while (i--) {
            const ri = Math.floor(Math.random() * i);
            [array[i], array[ri]] = [array[ri], array[i]];
        }
        return array;
    }

export function splice(object, number, number2) {
    const newObj = {};
    if (!number2) {
        number2 = 1;
    }
    Object.entries(object).forEach(function([key, item], index) {
        if (index >= number && index - number < number2) {
            newObj[key] = item
        }
    })
    return newObj;
}

export function getKeyByValue(object, value) {
    return "#" + Object.keys(object).find(key => object[key] === value);
}