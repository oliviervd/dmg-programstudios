import React, {useState} from "react";

const HamburgerMenu = () => {

    const [hamburgerOpen, setHamburgerOpen] = useState(false);
    console.log(hamburgerOpen);

    return(
        <div>
            {hamburgerOpen &&
                <div onClick={() => setHamburgerOpen(!hamburgerOpen)} className="button-burger"
                     aria-controls="primary-navigation" aria-expanded="false">
                    <svg className="hamburger">
                        <rect className="top" width="60" height="3" x="10" y="25"/>
                        <rect className="top" width="60" height="3" x="10" y="45"/>
                        <rect className="top" width="60" height="3" x="10" y="65"/>
                    </svg>
                </div>
            }
            {!hamburgerOpen &&
                <div>
                    <h1 onClick={() => setHamburgerOpen(!hamburgerOpen)}>X</h1>
                </div>
            }
        </div>
    )
}

export default HamburgerMenu;