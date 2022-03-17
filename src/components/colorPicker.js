import React, {useState} from "react";
import object_colors from "../data/objects_color.json";



function ColorPicker(){
    const [_color,_setColor] = useState("marine");

    object_colors = object_colors.filter(function(entry) {
        return entry.color_names.includes({_color})
    });

    return(
        <form>
            <label> A spectrum of <br />
                <input
                    type = "text"
                    value = {_color}
                    onChange={(_c) => _setColor(_c.target.value)}
                />
                <br />
                traversing an ocean of desire
            </label>
        </form>
    )
}

export default ColorPicker;