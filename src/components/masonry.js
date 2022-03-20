import {useState} from 'react';
import object_colors from "../data/objects_color.json";

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
            var _hexV = object_colors[x]["HEX_values"].split(",");

            images += '<div>' +
                '<img alt="/src/media/alt_img.png" src='+_im[0].replace("/full/0/default.jpg","/500,/0/default.jpg")+'></img>' +
                '<p>'+{_hexV}+'</p>'+
                '</div>';
        }
        document.getElementById('imageRandom').innerHTML = images
        console.log(_xList)
    };

export default MasonryGrid;