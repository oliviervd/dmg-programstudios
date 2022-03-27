import React, {useState} from 'react'

const Accordion = () => {

    const [isActive, setIsActive] = useState(true);

    function openContainer() {
        console.log("▒▒▒▒▒▒▒▒▒▒ OPEN OPEN OPEN ▒▒▒▒▒▒▒▒▒▒▒▒");
        setIsActive(!isActive);
    }

    return (
        <div>
            <div className="centerText" onClick={openContainer}>▒▒▒▒▒▒▒▒▒▒ OPEN OPEN OPEN ▒▒▒▒▒▒▒▒▒▒▒</div>
            {isActive &&
                <div>
                    <div className="accordion-container centerText">
                        <h1 className="mainTitle"> WHO IS <br></br> COLLECTING <br></br> FOR WHO?</h1>
                    </div>
                    <div className="centerText" onClick={openContainer}> ▒▒▒▒▒▒▒▒▒▒ CLOSE CLOSE CLOSE ▒▒▒▒▒▒▒▒▒▒▒▒</div>
                </div>
            }
        </div>


    )
}

export default Accordion;