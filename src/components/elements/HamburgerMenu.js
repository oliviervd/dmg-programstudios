import React from "react";

const HamburgerMenu = () => {
    return(
        <div>
            <div class="button-burger" aria-controls="primary-navigation" aria-expanded="false">
                <svg className="hamburger" viewPort="0 0 100 100">
                    <rect className="top" width="60" height="10" x="10" y="25"/>
                    <rect className="top" width="60" height="10" x="10" y="45"/>
                    <rect className="top" width="60" height="10" x="10" y="65"/>
                </svg>
            </div>
        </div>
    )
}

export default HamburgerMenu;