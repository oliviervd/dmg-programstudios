import React from "react";

const SearchFilterBar = (props) => {

    return(
        <div>
            <form>
                <input value={props.filter} type={"search"} placeholder={props.prompt} onChange={(e)=>props.setFilter(e.target.value)}  className={"searchbar"}/>
            </form>
        </div>

    )
}

export default SearchFilterBar;