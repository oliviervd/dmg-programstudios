import React, {useState} from "react";
import { Link } from "react-router-dom";

const chapters = "MODELS FROM THE PAST FOR THE FUTURE, as a site for post-digital discourse, serves as a counter-proposal " +
    "to the accelerated pace of cultural production in museums today resulting in the dichotomy between the need to " +
    "create new experiences in order to increase our marketability within the experience economy, versus our role as care-giving " +
    "institutions. By taking the time to explore different ways of approaching a museum collection (digitally), " +
    "this project can be read as both a critical enquiry into the circulation of collection displays, as well as a curatorial exercise " +
    "in creating new spaces in which we can negotiate alternative modes of knowledge production and dissemination that might " +
    "make more sense on a planetary scale in terms of our environment."

const reflective = "MODELS FROM THE PAST OF THE FUTURE reflects on the concept and notion of model(s) in relationship to the museum today." +
    " How does a model museum behave? Looking back at our past we find that the museum in its earliest form was a museum of models, " +
    "a place that displayed 'good forms of design and craftsmanship', in which the museum had a very specific social function to inspire " +
    "and inform local craftsmen in their own practices."

const ProjectDescription = () => {

    const [descActive, setDescActive] = useState(true);

    function openDescription() {
        console.log("▒▒▒▒▒▒▒▒▒▒ XXXX ▒▒▒▒▒▒▒▒▒▒▒▒");
        setDescActive(!descActive);
    }

    return(
        <div className="infoBoxLeft">
            {descActive &&
                <div>
                    <h1 className="underlined" style={{fontSize: "20px"}}>PROJECT DESCRIPTION</h1>
                    <p style={{fontSize: "15px", fontFamily: "happy-times-NG_italic_master_web"}}>“I then turned my microscope to the cognition engine… This was an engine undergoing continuous transformation,
                        indeed modifying itself as part of its operations. The lattice was not so much a machine as it was a page on
                        which the machine was written, and on which the machine itself ceaselessly wrote.” (Chiang, T. , 2019. Exhalation.)</p>
                    <p style={{fontSize: "15px", fontFamily: "happy-times-NG_regular_master_web"}}><em><strong>MODELS FROM THE PAST FOR THE FUTURE </strong></em>
                        is a curatorial experiment and post-digital discourse looking into past, future and speculative models, and
                        takes place during the closure of the Design Museum Ghent (2022-2025). As such this exercise positions
                        itself in a period of transition where past, present and future interlock.
                        <br/><br/>
                        By focusing on the medium-specificity of the web, it investigates new curatorial strategies that better reflect
                        the intricacies, complexities and plural nature of design of design practice in its current context. As a prototype for an alternative system, it is
                        always critically probing new forms of knowledge production. And in its growth, it is both reflective
                        and performative in nature, as we embrace the (as yet) unknown in its potential.
                        <ul>
                            <h1 className=" pinkHeader">* </h1> as a <strong> dynamic network </strong>; the project is in constant evolution and critically approaches the
                            underlying metabolism of the museum as an institution. No "rinse and repeat" but a form of
                            "slow programming", a slow burning change, that takes time for getting to know itself. Because whoever wants to shape
                            the future, will have to know its past.
                        </ul>
                        <ul>
                            <h1 className=" pinkHeader">* </h1> As a <strong>living archive</strong>; it approaches the past as an asset for the present and the future.
                            A growing organ, which absorbs, processes and discards. The intertwining of traces of the past
                            with visions for the future.
                        </ul>
                        Above all, it eschews the classically oriented forms of -indexation and collection discovery.
                        The collection database may be the starting point of this search, but its finality lies precisely
                        in the critical questioning of the one-to-one translation of its structure in making the collection public.

                        <br/><br/>

                        <h1 className=" pinkHeader" style={{fontSize: "30px"}}>__pull. transmit.</h1>
                        <h1 className=" pinkHeader italicSet" style={{fontSize: "30px"}}>fall in love,</h1>
                        <h1 className=" pinkHeader" style={{fontSize: "30px"}}>& break up again.</h1>

                        <br/><br/>

                        The COMPUTATIONAL, XENO-MORPHIC, the <Link to="/">SENSORIAL & SENSIBLE</Link>, the TRANS-HISTORICAL, the CURRENT and PAST-FUTURE are
                        speculative models that instigate us in questioning our current tools and inspire us in devising
                        new kinds of knowledge production and interfaces that are perhaps more sensible to its users,
                        more conscious of its surroundings and above all - foster inspiration. Moving from caring for collections, to a collection of care.

                        <br/><br/>

                        <h1 className=" pinkHeader" style={{fontSize: "30px"}}>__break, mutate and</h1>
                        <h1 className=" pinkHeader italicSet" style={{fontSize: "30px"}}>build upon what is real</h1>
                        <h1 className=" pinkHeader" style={{fontSize: "30px"}}>& what isn't real</h1>

                        <br/><br/>
                        <br/><br/>

                    </p>
                </div>
            }
        </div>
    )
}

export default ProjectDescription;