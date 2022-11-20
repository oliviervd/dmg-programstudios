import React from "react";

const HamburgerMenu = () => {
    return(
        <div>
            <div className="grid--even_3" class="button" aria-controls="primary-navigation" aria-expanded="false">
                <div></div>
                <div></div>
                <svg class="hamburger">
                    <rect class="top" width="60" height="10" x="10" y="25"/>
                    <rect class="top" width="60" height="10" x="10" y="45"/>
                    <rect class="top" width="60" height="10" x="10" y="65"/>
                </svg>
            </div>
        </div>
    )
}

export default HamburgerMenu;