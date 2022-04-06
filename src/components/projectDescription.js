import React, {useState} from "react"
import Modal from "./modal/modal"


const chapters = "MODELS FROM THE PAST FOR THE FUTURE, as a site for post-digital discourse, serves as a counter-proposal " +
    "to the accelerated pace of cultural production in museums today resulting in the dichotomy between the need to " +
    "create new experiences in order to increase our marketability within the experience economy, versus our role as care-giving " +
    "institutions. By taking the time to explore different ways of approaching a museum collection (digitally), " +
    "this project can be read as both a critical enquiry into the circulation of collection displays, as well as a curatorial exercise " +
    "in creating new spaces in which we can negotiate alternative modes of knowledge production and dissemination that might " +
    "make more sense on a planetary scale in terms of our environment."

const xenomorphic = "Meillisoux argues that one can only approach the contingent " +
    "nature of the world, which he calls 'hyperchaos', by creating a toolbox in which constant change could manifest itself." +
    "As a research platform, we aim to demonstrate the changing nature of museum collections by evoking the fictions, narratives and frameworks " +
    "in which these changes occur. Whether by being part of the exhibition or the lack thereof..."

const reflective = "MODELS FROM THE PAST OF THE FUTURE reflects on the concept and notion of model(s) in relationship to the museum today." +
    " How does a model museum behave? Looking back at our past we find that the museum in its earliest form was a museum of models, " +
    "a place that displayed 'good forms of design and craftsmanship', in which the museum had a very specific social function to inspire " +
    "and inform local craftsmen in their own practices."

const ProjectDescription = () => {

    const [descActive, setDescActive] = useState(true);

    function openDescription() {
        console.log("▒▒▒▒▒▒▒▒▒▒ OPEN OPEN OPEN ▒▒▒▒▒▒▒▒▒▒▒▒");
        setDescActive(!descActive);
    }

    return(
        <div className="infoBoxLeft">
            {descActive &&
                <div>
                    <h1 className="underlined" style={{fontSize: "20px"}}>PROJECT DESCRIPTION</h1>
                    <p style={{fontSize: "15px", fontFamily: "happy-times-NG_regular_master_web"}}><em><strong>MODELS FROM THE PAST FOR THE FUTURE </strong></em>
                        is a curatorial experiment that takes place during the closure of the Design Museum Ghent (2022-2025) and thus
                        positions itself in a transition period where past, present and future interlock.
                        <br/><br/>
                        By focusing on the medium-specificity of the web, it investigates new curatorial strategies that better reflect
                        the singularity of design in its current context. As a prototype for an alternative system, it is
                        always critically probing new forms of knowledge production. And in its growth, it is both reflective
                        and performative in nature, as we embrace the (as yet) unknown in its potential.
                        <ul>
                            <h1 className=" pinkHeader">* </h1> as a <strong> dynamic network </strong>; the project is in constant evolution and critically approaches the
                            underlying metabolism of the museum as an institution. No "rinse and repeat" but a form of
                            "slow programming" that takes time for getting to know itself. Because whoever wants to shape
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

                        The XENO-MORPHIC, the SENSORIAL & SENSIBLE, the TRANS-HISTORICAL, the CURRENT and PAST-FUTURE are
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