import React, {Component} from "react";
import ReactDOM from "react-dom"
import object_colors from "./data/objects_color.json";


object_colors = object_colors.filter(function(entry) {
    return entry.color_names.includes("black")
});

class App extends Component {
    render() {

        const handleClick = () => {

            var images = '';

            for (var i=1; i<25; ++i) {
                // pick random image from the collection
                var x = Math.floor(Math.random() * object_colors.length) // todo: add function that uses each number only once.
                // convert string to array and clean up value
                var _im = object_colors[x]["IIIF_image"].replace("['","").replace("']","").replace("'","").split(",")
                console.log(_im[0])
                images += '<img src='+_im[0].replace("/full/0/default.jpg","/500,/0/default.jpg")+'></img>';
            }
            document.getElementById('imageRandom').innerHTML = images
        }

        return (
            <div>
                <h1>SPECTRUM</h1>
                <h2>a DMG_ experiment</h2>
                <button onClick={handleClick}>random object</button>
                <div id="imageRandom" className={"container"}></div>
            </div>
        )
    };
}

export default App;