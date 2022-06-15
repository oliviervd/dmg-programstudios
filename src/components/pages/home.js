import React, {Suspense, useState} from "react";
import {Link} from "react-router-dom";
import SketchPlaceHolder from "../sketches/sketchPlaceHolder";

const XenoHeader = React.lazy(() => import("../elements/xenoHeader"))
const CubicBezier = React.lazy(() => import("../sketches/cubicBezier"));
const XenoFooter = React.lazy(() =>  import("../elements/xenoFooter"))


const Home = () => {

    const[open, setOpen] = useState(true);
    function openAccordion() {
        setOpen(!open);
    }

    return (
        <div>
            <Suspense>
                <XenoHeader header_main={true} header_models={false} header_model={false} header_nav={true}/>
            </Suspense>

            {/*section 1*/}
            <div className="rowScrollMain">
                <div style={{marginBottom: "-600px"}}>
                    <Suspense>
                        <CubicBezier/>
                    </Suspense>
                </div>
                <div>

                    {/* curatorial statement (text) */}
                    <div className="grid--3_4_3">
                        <div className="background__transparent">
                        </div>
                        <div className="background__white" style={{height: "auto", padding: "80px"}}>
                            <h1 style={{
                                fontSize: "60px",
                                textAlign: "center"
                            }}>CURATORIAL STATEMENT</h1>
                            <p className="text font-main"><i>“I then turned
                                my microscope to the cognition engine… This was an engine undergoing continuous
                                transformation,
                                indeed modifying itself as part of its operations. The lattice was not so much a machine
                                as it was a page on
                                which the machine was written, and on which the machine itself ceaselessly wrote.”
                                (Chiang, T. , 2019. Exhalation.)</i></p>
                            <br/>
                            <p className="center text font-main">
                                <strong>MODELS FROM THE PAST FOR THE FUTURE </strong>
                                is a curatorial experiment, post-digital discourse and production platform looking into past,
                                future and speculative models, and takes place during the closure of the Design Museum Ghent (2022-2025).
                                As such this exercise positions itself in a period of transition where past, present and future interlock.
                                By focusing on the medium-specificity of the web, it investigates new curatorial strategies that
                                better reflect the singularity of design practice in its
                                current context. As a prototype for an alternative system, it is always critically probing new forms of
                                knowledge production. And in its growth, it is both reflective and performative in nature,
                                as we embrace the (as yet) unknown in its potential.</p>

                            <h4 className="center" style={{fontFamily: "lineal"}}>* </h4> <p className="center text font-main"> as
                            a <strong> dynamic network</strong>; the project is in constant evolution and critically
                            approaches the
                            underlying metabolism of the museum as a <i>fluid</i> institution. No "rinse and repeat" but
                            a form of
                            "slow programming", a <i>slow</i> burning change, that takes time for getting to know itself.
                            As Carolyn F. Strauss puts it, <i>slow</i> research is less about a register of speed than it is
                            about awareness.
                            Because whoever wants to shape the future, will have to know its past.</p>

                            <h4 className="center" style={{fontFamily: "lineal"}}>* </h4> <p className="center text font-main">
                            As a <strong>living archive</strong>; it approaches the past as an asset for the present and
                            the future.
                            A growing organ, which absorbs, processes and discards. The intertwining of traces of the
                            past
                            with visions for the future. Above all, it eschews the classically oriented forms of
                            -indexation and collection discovery.
                            The collection database may be the starting point of this search, but its finality lies
                            precisely
                            in the critical questioning of the one-to-one translation of its structure in making the
                            collection public.</p>

                        </div>
                        <div className="background__transparent" style={{height: "50vh"}}/>
                    </div>


                    <br/><br/><br/><br/><br/><br/>

                    {/* SECTION 2 */}

                    <div style={{padding: "100px"}} className="background__cool-to-warm-spectrum">


                        <div className="grid--3_4_3">
                            <div className="background__transparent"/>
                            <div className="background__white">
                                <h1 className="center">MODELS</h1>
                                <p className="center text font-main">
                                    MODELS FROM THE PAST FOR THE FUTURE is both a program and a catalyst for change. Establishing models as primary building
                                    blocks and frameworks that become instrumental in the search alternative collectively
                                    built futures in which the museum can operate with care. The conceptual frameworks
                                    operate as structures that exemplify the very notion and movement of the past become
                                    future becoming present – in that way that they harbor space for critical retrospect,
                                    thoughtful futuring and the possibility for present actualization.
                                </p>
                                    <br/>
                                    <br/>

                                    <div className="dotLine"></div>
                                    <p className="font-main text center"><u>RULE #1</u>: models may <i>break, mutate</i> and <i>build</i> upon what is and isn't real</p>
                                    {!open&&
                                        <p className='center nav-header' style={{fontFamily: "lineal"}} onClick={openAccordion}> V - read more - V </p>
                                    }
                                    {open&&
                                        <div>
                                            <div className="dotLine"></div>
                                            <div className="grid--3_7">
                                                <div>
                                                    <p className="center text font-main">TO BUILD</p>
                                                </div>
                                                <div>
                                                    <p className="left text font-main">
                                                        contributions are not building on top of,
                                                        as to hide and discard past traces, but are <i>rebuilding</i> as a form of continuation
                                                        and acknowledgement that concepts and ideas are not singular but perform in a networked system.
                                                        Contributions can take on different forms, including (but not exclusively) essay, interfaces and media.
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="grid--3_7">
                                                <div>
                                                    <p className="center text font-main">TO MUTATE</p>
                                                </div>
                                                <div>
                                                    <p className="left text font-main">
                                                        All models exist within a transformative system, like a filter that distorts in a recognizable way.
                                                        This idea of slowly mutating and <i>distorting</i> the program resembles the programming within Museum of Moving Practice,
                                                        where the exhibition complex was in constant change yet always in dialogue with its environment and its ecosystem.
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="grid--3_7">
                                                <div>
                                                    <p className="center text font-main">TO BREAK</p>
                                                </div>
                                                <div>
                                                    <p className="left text font-main">
                                                        As a flexibly adaptive language system things will most likely break along the way,
                                                        making room for new ideas to flourish in the process. Breaking not in a destructive and disruptive manner,
                                                        but as a way of allowing new combinations of thought to emerge.
                                                    </p>
                                                </div>
                                            </div>
                                            <p className='center nav-header' style={{fontFamily: "lineal", fontSize: "18px"}} onClick={openAccordion}> ^ - close - ^ </p>
                                        </div>
                                    }

                                    <div className="dotLine"></div>
                                    <p className="font-main text center"><u>RULE #2</u>: models are inherently <i>multi-authored</i> and <i>collaborative</i>.</p>
                                    <div className="dotLine"></div>
                                    <div>
                                        <p className="center text" style={{margin:"10px 10px"}}>
                                            by setting up several director's projects, the museum wants to give designers
                                            the space and agency to co-develop the new programming and the necessary support structures.
                                            In order to do this the museum searched for a series of protagonists to work with this coming years.
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div></div>
                        </div>

                        <br/><br/><br/><br/>

                        <div className="grid--even_4 background__cool-to-warm-spectrum" style={{margin:"0px 30px"}}>
                            <div className="center" style={{height: "50vh", margin: "1vw"}}>
                                <h1 className="center" style={{
                                    fontSize: "30px"
                                }}>MODEL1: <br/> SENSE & SENSIBILITY</h1>
                                <div>
                                    <p className="justify text font-main"
                                       style={{padding: "4px"}}>
                                        how do we adapt – not as an individual institution – but as a community of
                                        individuals.
                                        The museum reimagined; as an interface that engages in a mutual relationship –
                                        one based on forms of coexistence, moving beyond the mere display.
                                        A model for an institution that is performative first, representational second.
                                        <u style={{color: "var(--yellow_bright)"}}> #INTIMACY</u>
                                    </p>
                                    <line></line>
                                    <div className="grid--7_3" style={{
                                        padding: "4px",
                                        borderBottom: "2px var(--main__green) solid",
                                        borderTop: "2px var(--main__green) solid"
                                    }}>
                                        <Link to={"../M01_C01"} replace>
                                            <p className="justify text font-main nav--header" style={{fontSize:"14px"}}>
                                                On the Logic of Collecting and Sovereignty towards a Collection of Care.
                                            </p>
                                        </Link>
                                        <p className="center text font-main" style={{fontSize: "15px", padding:"0 10px"}}>
                                            ESSAY, INTERFACE
                                        </p>
                                    </div>
                                    {/*<div className="grid--7_3" style={{
                                        padding: "4px",
                                        borderBottom: "2px var(--main__green) solid",
                                        //borderTop: "2px var(--main__green) solid"
                                    }}>
                                        <Link to={"../M02_C01"} replace>
                                            <p className="justify text font-main nav--header" style={{fontSize:"14px"}}>
                                                On kinship, machines and the museum – from representational devices to performative modes of co-existence.
                                            </p>
                                        </Link>
                                        <p className="center text font-main" style={{fontSize: "15px", padding:"0 10px"}}>
                                            ESSAY
                                        </p>
                                    </div>*/}
                                </div>

                            </div>
                            <div className="center" style={{height: "50vh", margin: "1vw"}}>
                                <h1 className="center" style={{
                                    fontSize: "30px"
                                }}>MODEL2: <br/> THE EXPANDED FIELD</h1>
                                <div>
                                    <p className="justify text font-main"
                                       style={{padding: "4px"}}>
                                        What if a museum could act in an expanded space. What would these spaces look like?
                                        And how do they relate to the existing museological frameworks? What is to be a museum without walls,
                                        or how does it act beyond its walls? What if the museum operated more as a studio,
                                        akin to a production platform, a driver for change. <u style={{color: "var(--yellow_bright)"}}>#PLACE</u>
                                    </p>
                                    <line></line>
                                </div>

                            </div>
                            <div className="center" style={{height: "50vh", margin: "1vw"}}>
                                <h1 className="center" style={{
                                    fontSize: "30px"
                                }}>MODEL3</h1>`
                                <div id="PLCH" style={{height: "40vh"}}>
                                    <Suspense>
                                        <SketchPlaceHolder/>
                                    </Suspense>
                                </div>
                            </div>
                            <div className="center" style={{height: "50vh", margin: "1vw"}}>
                                <h1 className="center" style={{
                                    fontSize: "30px"
                                }}>MODEL4</h1>`
                                <div id="PLCH" style={{height: "50vh", zIndex: "-100000"}}>
                                    <Suspense>
                                        <SketchPlaceHolder _id={"PLCH1"}/>
                                    </Suspense>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div style={{height: "250px", margin: "1vw"}}>
                        <Suspense>
                            <XenoFooter/>
                        </Suspense>
                    </div>
            </div>
            <br/><br/>

        </div>
    )
}

export default Home;

