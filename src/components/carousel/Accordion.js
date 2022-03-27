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
                    <div className="svg_container">
                        <svg id="visual" viewBox="0 0 900 600" width="auto" height="100vh">
                            <path d="M553 600L553.2 596.8C553.3 593.7 553.7 587.3 548.7 580.8C543.7 574.3 533.3 567.7
                            533.3 561.2C533.3 554.7 543.7 548.3 555.5 542C567.3 535.7 580.7 529.3 585.5 522.8C590.3
                            516.3 586.7 509.7 579 503.2C571.3 496.7 559.7 490.3 560.7 484C561.7 477.7 575.3 471.3 574.8
                            464.8C574.3 458.3 559.7 451.7 547.7 445.2C535.7 438.7 526.3 432.3 524.3 425.8C522.3 419.3
                            527.7 412.7 529.8 406.2C532 399.7 531 393.3 539 387C547 380.7 564 374.3 557.2 367.8C550.3
                            361.3 519.7 354.7 507.7 348.2C495.7 341.7 502.3 335.3 519.2 329C536 322.7 563 316.3 561.8
                            309.8C560.7 303.3 531.3 296.7 519 290.2C506.7 283.7 511.3 277.3 529.3 271C547.3 264.7 578.7
                            258.3 584.3 251.8C590 245.3 570 238.7 563.2 232.2C556.3 225.7 562.7 219.3 561.7 213C560.7 206.7
                            552.3 200.3 552 193.8C551.7 187.3 559.3 180.7 562.3 174.2C565.3 167.7 563.7 161.3 555.8
                            154.8C548 148.3 534 141.7 531.8 135.2C529.7 128.7 539.3 122.3 541.5 116C543.7 109.7 538.3
                            103.3 546.7 96.8C555 90.3 577 83.7 588.3 77.2C599.7 70.7 600.3 64.3 599.8 58C599.3 51.7 597.7
                            45.3 597.3 38.8C597 32.3 598 25.7 600.3 19.2C602.7 12.7 606.3 6.3 608.2 3.2L610 0"
                                  fill="none" strokeLinecap="round" strokeLinejoin="miter" stroke="#0066FF" strokeWidth="5"/>
                        </svg>
                    </div>
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