import React from "react";

const SearchFilterBar = (props) => {

    return(
        <div>
            <form>
                <input value={props.hexFilter} type={"search"} placeholder={props.prompt} onChange={(e)=>props.setHexFilter(e.target.value)}  className={"searchbar"} type="search"/>
            </form>
        </div>

    )
}

export default SearchFilterBar;