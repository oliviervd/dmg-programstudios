import React from "react";

const SearchFilterBar = (props) => {

    const onKeyDown =(event) => {
        if (event.keyCode === 13) { //13 is the key code for Enter
            event.preventDefault()
            //Here you can even write the logic to select the value from the drop down or something.
        }
    }

    return(
        <div>
            <form>
                <input className={"searchbar"} onKeyDown={onKeyDown} value={props.filter} type={"search"} placeholder={props.prompt} onChange={(e)=>props.setFilter(e.target.value)}/>
            </form>
        </div>

    )
}

export default SearchFilterBar;