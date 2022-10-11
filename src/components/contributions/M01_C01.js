import React, { useState } from "react";
import {useMediaQuery} from "react-responsive";

const M01_C01 = () => {

    // open and close READ MORE
    const[readMore, setReadMore] = useState(false);
    function handleReadMore() {
        setReadMore(!readMore);
    }

    const isDesktopOrLaptop = useMediaQuery({
        query: '(min-width: 1224px)'
    })

    const isMobileOrTablet = useMediaQuery({
        query: '(max-width: 1224px)'
    })

    return(
        <div>
            {isDesktopOrLaptop &&
                <div>
                    <div className="grid--3_4_3">
                        <div className="background__transparent"></div>
                        <h1 className="text-center background__white" style={{height: "auto", padding: "80px"}}>ON THE LOGIC OF COLLECTING AND SOVEREIGNTY TOWARDS A COLLECTION OF CARE</h1>
                        <div className="background__transparent"></div>
                    </div>
                    <div className="grid--4_2_4">
                        <div className="background__transparent"/>
                        <p className="text-center background__white" style={{fontSize: "16px", fontFamily: "lineal", borderBottom: "2px var(--main__green) solid", borderTop: "2px var(--main__green) solid"}}>ESSAY, INTERFACE</p>
                        <div className="background__transparent"/>
                    </div>
                </div>
            }
            <div className="grid--even_3">
                <div>
                    {readMore &&
                        <div>
                        </div>
                    }
                </div>
                <article>
                    <div className="text-center text">
                        “When is an object socially or ecologically responsible?<a href="#object_stories" aria-describedby="footnote-label" id="object_stories_ref">"</a>
                        This question served as a baseline for many years in one of the tracks in Object Stories,
                        the semi-permanent presentation of the collection of Design Museum Gent before it closed its doors in 2022.
                        The objects on display, all in their own way demonstrative of the belief that although there is an increased focus on
                        sustainability and social concern today, this phenomenon is not new in the design world per se.
                        The heightened awareness of these changes came along with emerging technologies and theories that
                        enabled us to sense in more-than-human scales that were previously too large to grasp.
                        Throughout history, various design strategies have emerged that critically addressed the impact of
                        our actions on the climate and, as a response, defined new production methods and/or formulated
                        alternate forms of society that better correspond to the issues at hand.
                    </div>
                    {isDesktopOrLaptop && <br/>}
                    <div className="grid--3_4_3">
                        <div></div>
                        <div></div>
                        <div></div>

                    </div>
                    <div className="text-center text">
                        Marjan van Helvert defined “Responsible Objects” as objects that behave responsibly, consciously
                        and with care in relation to their <a href="#responsible_objects" aria-describedby="footnote-label" id="responsible_objects_ref">environment</a>.
                        Taking responsibility through responsible behavior affects and effects all parts of society,
                        which raises the question how the museum as an institution within society, can also contribute
                        and take part in this broader shifting society. Not only by disseminating and opening up these examples of design (such as responsible objects),
                        but also by raising self-awareness and self-consciousness by making the critical reflection ourselves on how we can act in a more caring manner.
                        Caring in the sense that we as an institution not only act <i>about</i> or <i>upon</i> society, but also <i>for</i> and <i>in</i> society. In other words, how do we adapt – not as an individual institution – but as a community of individuals – a part of a changing environment.
                        A museum reimagined; as an interface that engages in a mutual relationship – one based on forms of coexistence, moving beyond representation towards the performative.
                        If not, we risk lapsing into a form of façadism in which programming about <a href="#sustainability_exhibitions" aria-describedby="footnote-label" id="sustainability_exhibitions_ref">sustainability</a> is not also done in sustainable ways.
                        Acknowledging that we are not alone in this, as it has become a major challenge that is being addressed internationally within the (touring) exhibition <a href="#resource_hungry" aria-describedby="footnote-label" id="resource_hungry_ref">sector</a>.
                        In this sense, making the institution sustainable also implies a critical reprogramming of the museum, reconsidering its <a href="#metabolism" aria-describedby="glossary-label" id="metabolism_ref">metabolism</a> as a whole.
                    </div>

                    {isDesktopOrLaptop && <br/>}
                    <h1 className="text-center quote text">I imagine a future where the museum engages in mutual relationships with machines –
                        and other <i>living systems</i>, that enable us to converse on more-than-human scales.
                        A mode of coproducing futures – or futuring - that is built on epistemologies that transcend
                        that of the Anthropos. </h1>
                    {isDesktopOrLaptop && <br/>}

                    {/*read more: open the whole text only when asked for; clean up layout */}

                    {!readMore &&
                        <div>
                            {isDesktopOrLaptop && <br/>}
                            <p className="underlined button__readMore text nav--header" onClick={handleReadMore}> READ MORE </p>
                            {isDesktopOrLaptop && <br/>}
                        </div>
                    }
                    
                    {readMore &&
                        <div>
                            <div className="grid--even_2">
                                <div style={{paddingLeft: "50px", paddingTop: "150px"}}>
                                    <br/>
                                    <img style={{height: "280px"}} src={"https://beeldbank.stad.gent/GENT/b9c4ed74ddd747509c487497b22aa4636559db9dc46648fcadc4d16c36bef951/browse.jpg"}></img>
                                </div>
                                <div>
                                    <br/>
                                    <img style={{height: "300px"}} src={"https://beeldbank.stad.gent/GENT/02212221bbe94ec09cb05beb1d87f4d592dda19734214db3a1071ecfcf7dfd9e/browse.jpg"}></img>
                                    <br/><br/>
                                    <div className="grid--1_8_1">
                                        <div><p>⇡</p></div>
                                        <div><p> museum for decorative arts; now Design Museum Gent (ca. 1913) - Collectie Archief Gent (SCMS_PBK_1668).</p></div>
                                    </div>
                                    <div className="grid--1_8_1">
                                        <div><p>⬸</p></div>
                                        <div><p>019 - Museum of Moving Practice (2019)</p></div>
                                    </div>
                                </div>

                            </div>
                            <div className="text-center text">
                                <p className="subHeader__text text">METABOLISM</p>Can we reimagine and rethink the metabolism –
                                and thus the act of processing “matter” to sustain the vitality of the museum -
                                in such a way that the core tasks of the museum in terms of taking care of the collection are
                                reformulated into the sensible acts of supporting a collection of care? A system that cares
                                for and takes care of whatever it encounters. Although caring for, relates to existing acts of
                                preservation and conservation, the “caring” intended here, is more performative in nature.
                                To preserve something, within museum praxis, relates to notions of isolation,
                                and in the wake of the passing pandemic, to quarantine in order for the object at matter not to get “sick”.
                                <br/><br/>
                                    Getting back to the metabolism of the museum, there are several ways that objects can enter the museum,
                                    one of them being through acquisition. When an object is acquired and enters the collection –
                                    permanently - the act of caring for that object is transferred from one entity to the other.
                                    Although, as mentioned above, the way in which an institution takes care of,
                                    is often different from the personal care it received by its previous human owner.
                                    Defining what is meant by “to take care for” thus is a necessary step to, and may guide
                                    us as a museum in our transformation into a more sustainable and caring institution,
                                    not only for its environment in terms of architecture but also in terms of its inhabitants,
                                    the objects that it houses. As I would like to argue, this relates to a new type of museum,
                                    one that is performative first, and representative second.
                                <br/><br/>
                                To illustrate this position, I would like to address the past acquisition of a "sample book with paint recipes",
                                a 19th-century catalog of samples that used to be part of the personal library of Henry van de Velde.
                                It is plausible that this book was used as a source of inspiration by Henry van de Velde when
                                designing one or more of his textile designs, and thus performed a specific function.
                                The museum is now taking care of this object by preserving and storing it for future generations,
                                yet it has almost never been on display in the museum, which begs the question, who are we taking care of?
                                And for who are we taking care? What relationships do we support and sustain,
                                and how does this affect the way in which we represent? What does this taking care for in
                                this example entail and how might it inform us on alternative means of taking care?

                            </div>
                            {isDesktopOrLaptop && <br/>}
                            <div className="text-center text">
                                <p className="subHeader__text text">TO TAKE CARE OF </p>
                                Taking care of something or someone is a highly social endeavor that demands for a mutual
                                understanding of one another’s needs; To been taken care of and to be cared for is a premise for us to co-exist.
                                To support this act of caretaking and aid us in the process we (humans) have developed strategies and technologies.
                                However, the same technology we develop for doing good, can also lead to direct opposite when not used or approached <a href="#technological_senisbility" aria-describedby="footnote-label" id="technological_senisbility_ref">properly</a>.
                                So how do we define these interfaces of care? Is it possible to make use of technology to create a
                                model that speculates on the interrelationships between agents and objects in a collection?

                                Moving forward, let’s try and define what these interfaces of care could look like.
                                Is it possible to make use of emerging technology to create new models that speculates on
                                the interrelationships between agents and objects in a collection?
                                If so, what can technology teach us about the relationship between things, instead of us teaching <a href="#ecology" aria-describedby="footnote-label" id="ecology_ref">them</a>?
                            </div>

                            <div className="text-center text">
                                <br/><br/>
                                The interface below makes use of AI to negotiate and measure proximity in large collections such as that of a museum.
                                A task that presumably could never be done by human agents on their own (at least not in this time and scale). At the same time,
                                it is inspired by the way in which the catalogue, as an interface to transfer knowledge is used in the past,
                                and how that might be inspiring for the future. Looking back at the color book today –
                                as an interface that guided – both manufacturers of paint, craftsmen as well as – prior to it entering the museum -
                                Henry van de Velde, this interface re-invokes this same ritual of knowledge transfer,
                                embodying the same idea of one object inspiring the creation of another. To become performative again.
                                In recursively looping over the collection, as one would flip the pages of book, the algorirthm written for this case,
                                matches objects that are closely related (in terms of color) to a particular color sample in this book. Acting as a sensory layer,
                                it generates a speculative ecology of 4 objects that might or might not have inspired each other –
                                or at least could have done so in a fictitious past. At the same time, this reorganization
                                of the collection based on samples carefully crafted and collected by an unknown colorist,
                                evokes and performs a "culture of anonymity" and broadens traditional approaches to our
                                collection that move beyond the dominant and sovereign forms of authorship.
                                An inherent quality of the work that often determines the visibility and/or invisibility of an object.
                                Refering to the concept of deep listening by Pauline Oliveras this interface stimulates a sense of deep viewing,
                                a curated slice of the collection that goes beyond the traditional, historically acclaimed.
                            </div>

                            {isDesktopOrLaptop && <br/>}

                            <div className="text-center text">
                                This approach of the collection as a social network, - a speculative system that connects in a transhistorical and transdisciplinary way -
                                transcends the art historical and institutionalized view - resounding the indeterminacy that might lie at the museum’s foundations.
                                At the same time, it very much resonates with the "indeterminacy" that might lie at the museum’s foundations, a place where knowledge is constantly being (re-)produced based upon the passage of both human and non-human agency.
                                One could also read this exercise as if revisiting, invoking or emulating the design museum in its early, former form, in which it went as a <a href="#models_museum" aria-describedby="footnote-label" id="models_museum_ref">model museum</a>;
                                (musee des modeles) a place with the social purpose of inspiring craftsmen by presenting good models or forms of design. Nostalgic, no. Co-existent with the future? Perhaps.
                            </div>

                            {isDesktopOrLaptop && <br/>}
                            <p className="underlined text-center button__readMore nav--header" onClick={handleReadMore}> HIDE TEXT </p>
                            {isDesktopOrLaptop && <br/>}

                        </div>
                    }

                </article>

                {isDesktopOrLaptop &&
                    <footer className="visually-hidden footNote__refs" id="footnote-label">
                        <div></div>
                        <ol>
                            <li>
                                <div className="footNote__text" id="object_stories"><em>Object Stories </em> offered theme-based perspectives on the
                                    collection of the museum. Consisting out of 6 (thematic) layers: (<em>Commisions & Commisioners, Making
                                        Matters, Curiosity, Responsible Objects, Bauhaus 100!</em> and <em>Children's Choices</em>)
                                    In total it highlighted and featured around 200 objects from the collection.
                                </div>
                            </li>
                            <li>
                                <div className="footNote__text" id="responsible_objects">
                                    (Also the title of the track within object stories); Marjan van Helvert, The responsible object. A history of design ideology for the
                                    future. Valiz, Amsterdam, 2016 <a href="#responsible_objects_ref" aria-label="Back to content">↩</a>
                                </div>
                            </li>
                            <li>
                                <div className="footNote__text" id="sustainability_exhibitions">
                                    The museum organised several exhibitions on sustainability and ecological design
                                    such as<em><a href="https://www.designmuseumgent.be/en/events/no-design-to-waste"> No
                                    Design to Waste</a></em> (2014),<em><a href="https://www.designmuseumgent.be/en/events/fibre-fixed"> Fibre Fixed</a></em> (2019)
                                    and <em><a href="https://www.designfestgent.be/"> Design Fest Gent</a></em> (2022).
                                    <a href="#sustainability_exhibitions_ref" aria-label="Back to content">↩</a>
                                </div>
                            </li>
                            <li>
                                <div className="footNote__text" id="resource_hungry">
                                    The 2020 Art Verbier Summit "<em>Resource Hungry</em>" initiated a global dialogue
                                    to find harmony,
                                    between art, ecology and resources. <a href="#resource_hungry_ref"
                                                                           aria-label="Back to content">↩</a>
                                </div>
                            </li>
                            <li>
                                <div className="footNote__text" id="technological_senisbility">
                                    Take for example our social media platforms. On the one hand they have the potential
                                    to create new (sometimes meaningful) relationships between users active on the
                                    platform. On the other hand, the computational power needed to drive the algorithms behind
                                    these machines are reliant on natural resources, resulting in their depletion of highly
                                    needed resources from the earth. <a href="#technological_senisbility_ref"
                                                                        aria-label="Back to content">↩</a>
                                </div>
                            </li>
                            <li>
                                <div className="footNote__text"  id="ecology">
                                    James Bridle refers to an "technological ecology", in which human and non-human
                                    entities, such as computers amplify each other, rather than trying to outdo each other. "The
                                    combination of technological capacity with a more-than-human sensitivy which constructs new ways of seeing and
                                    appreciating the world." - [see also glossary: ECOLOGY] <a href="#ecology_ref"
                                                                                               aria-label="Back to content">↩</a>
                                </div>
                            </li>
                            <li>
                                <div className="footNote__text" id="models_museum">
                                    The museum was established in 1903 as a "models museum" (<em>modellenmuseum</em> or <em>musee des modelles</em>);
                                    a collection built out of good examples of various crafts and trades to inspire artists and craftsmen and
                                    provide support for their training. A collection, with a clear relation to the world. <a href="#models_museum_ref" aria-label="Back to content">↩</a>
                                    {/*<img src="https://api.collectie.gent/iiif/image/iiif/2/b7a376735df545a775899c6efb23f808-MA_SCMS_FO_00683.tif/624,661,1992,1423/full/0/default.jpg"></img>*/}
                                </div>
                            </li>

                        </ol>
                        <div></div>
                    </footer>
                }

            </div>
        </div>
    )
}

export default M01_C01;