import React from "react";

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
    console.log("#" + Object.keys(object).find(key => object[key] === value));
}