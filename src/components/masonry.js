import {useState} from 'react';
import object_colors from "../data/objectsColor.json";
import ColorCubes from "./colorCubes"
import {spectrumProvider} from "../spectrumContext";

//todo: move both object_colors and nanNums to app.js

object_colors = object_colors.filter(function(entry) {
    return entry.color_names.includes("coffee") //filter objects based on picked color.
})

function numSelect(i) {

    // this function creates an array of unique numbers based on the length of object_colors.
    var nums = [];
    var ranNums = [];
    var j = 0;
    for (var n=0; n<object_colors.length; ++n) {
        var x = Math.floor(Math.random() * object_colors.length)
        nums.push(n);
    }
    while (i--) {
        j = Math.floor(Math.random() * nums.length);
        ranNums.push(nums[j]);
        nums.splice(j,1);
    }
    return ranNums
}

const MasonryGrid = () => {

        var _xList = numSelect(5);
        var images = '';
        //console.log(props.c);

        for (var i=0; i<5; ++i) {
            var x = _xList[i];
            var _im = object_colors[x]["IIIF_image"].replace("['","").replace("']","").replace("'","").split(",")

            images += '<div>' +
                '<img alt="DREAMING OF IMAGES." src='+_im[0].replace("/full/0/default.jpg","/500,/0/default.jpg")+'></img>' +
                +'<ColorCubes curatedSet={_xlist}></ColorCubes>'+'</div>';
        }
        document.getElementById('imageRandom').innerHTML = images
        console.log(_xList)
    };

export default MasonryGrid;