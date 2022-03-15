import React, {Component} from "react";
import ReactDOM from "react-dom"
import object_colors from "./data/objects_color.json";

class App extends Component {
    render() {

        var click = 0;
        const handleClick = () => {
            click += 1
            // convert string to array and clean up value
            console.log(object_colors[click]["IIIF_image"].replace("['","").replace("']","").split(","))
            var _im =  object_colors[click]["IIIF_image"].replace("['","").replace("']","").split(",")
            console.log(_im[0])

            ReactDOM.render(
                <img src={_im[0]} className="gridImage"></img>,
              document.getElementById("imageRandom")
            );
        }

        return (
            <body>
                <h1>SPECTRUM</h1>
                <h2>a DMG_ experiment</h2>
                <button onClick={handleClick}>random object</button>
                <div className={"container"}>
                    <div id="imageRandom"></div>
                </div>
            </body>
        )
    };
}

export default App;