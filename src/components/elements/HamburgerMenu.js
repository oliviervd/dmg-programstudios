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
                <div className="hamburgerMenu">
                    <h1 style={{marginLeft: 20, marginTop: 20, position:"absolute"}} onClick={() => setHamburgerOpen(!hamburgerOpen)}>X</h1>
                    <div>
                        <h1 className="text-center">option 1</h1>
                        <h1 className="text-center">option 2</h1>
                        <h1 className="text-center">option 3</h1>
                    </div>
                </div>
            }
        </div>
    )
}

export default HamburgerMenu;