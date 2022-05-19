import React, { useState } from "react";

const Model1_sensibility = () => {

    // open and close READ MORE
    const[readMore, setReadMore] = useState(false);
    function handleReadMore() {
        setReadMore(!readMore);
    }

    return(
        <div>
            <h1 className="center">MODEL 1: SENSE AND SENSIBILITY</h1>
            <div className="model-TextColumns__3">
                <div></div>
                <footer className="visually-hidden footNote__refs" id="footnote-label">
                    <div></div>
                    <ol>
                        <li>
                            <div id="object_stories"> <em>Object Stories </em> offered several looks on the collection of the museum.
                                Consisting out of 6 (thematic) layers (<em>Commisions & Commisioners, Making Matters, Curiosity, Responsible Objects,
                                    Bauhaus 100!</em> and <em>Children's Choices</em>) it highlighted
                                featured around 200 objects from the collection of which some were highlighted from certain point of view.
                            </div>
                        </li>
                        <li>
                            <div id="responsible_objects">
                                Marjan van Helvert, The responsible object. A history of design ideology for the future. Valiz, Amsterdam, 2016
                                <a href="#responsible_objects_ref" aria-label="Back to content">↩</a>
                            </div>
                        </li><li>
                            <div id="sustainability_exhibitions">
                                The museum organised several exhibitions on sustainability and ecological design such as
                                <em><a href="https://www.designmuseumgent.be/en/events/no-design-to-waste"> No Design to Waste</a></em> (2014),
                                <em><a href="https://www.designmuseumgent.be/en/events/fibre-fixed"> Fibre Fixed</a></em> (2019) and <em><a href="https://www.designfestgent.be/"> Design Fest Gent</a></em> (2022).
                                <a href="#sustainability_exhibitions_ref" aria-label="Back to content">↩</a>
                            </div>
                        </li>
                        <li>
                            <div id="resource_hungry">
                                The 2020 Art Verbier Summit "<em>Resource Hungry</em>" initiated a global dialogue to find harmony,
                                between art, ecology and resources. <a href="#resource_hungry_ref" aria-label="Back to content">↩</a>
                            </div>
                        </li>
                        <li>
                            <div id="technological_senisbility">
                                Take for example our social media platforms. On the one hand they have the potential to
                                create new (sometimes meaningful) relationships between users active on the platform.
                                On the other hand, the computational power needed to drive the algorithms behind these
                                machines are reliant on natural resources, resulting in their depletion of highly needed
                                resources from the earth. <a href="#technological_senisbility_ref" aria-label="Back to content">↩</a>
                            </div>
                        </li>
                        <li>
                            <div id="ecology">
                                James Bridle refers to an "technological ecology", in which human and non-human entities,
                                such as computers amplify each other, rather than trying to outdo each other. "The combination of technological
                                capacity with a more-than-human sensitivy which constructs new ways of seeing and appreciating the world.
                                - [see also glossary: ECOLOGY] <a href="#ecology_ref" aria-label="Back to content">↩</a>
                            </div>
                        </li>
                        <li>
                            <div id="models_museum">
                                The museum was established in 1903 as a "models museum" (<em>modellenmuseum</em> or <em>musee des modelles</em>).
                                The collection comprised of good examples of various crafts and trades to inspire artists and craftsmen and
                                provide support for their training.<a href="#models_museum_ref" aria-label="Back to content">↩</a>
                                {/*<img src="https://api.collectie.gent/iiif/image/iiif/2/b7a376735df545a775899c6efb23f808-MA_SCMS_FO_00683.tif/624,661,1992,1423/full/0/default.jpg"></img>*/}
                            </div>
                        </li>

                    </ol>
                    <div></div>
                </footer>

                <article>
                    <div className="left box" style={{fontSize: "15px", fontFamily: "happy-times-NG_italic_master_web"}}>
                        <p style={{fontSize: "15px", fontFamily: "P-ACR-AGON-Regular"}}>RESPONSIBLE</p>“When is an object socially or ecologically responsible?<a href="#object_stories" aria-describedby="footnote-label" id="object_stories_ref">"</a>
                        For four years this question was central to one of the tracks in Object Stories, the permanent presentation
                        of the collection of Design Museum Gent. The objects on display (within this specific track) all in their
                        own way demonstrated that although there is an increased focus on sustainability and social concern today,
                        this phenomenon is not new in the design world per se. Throughout history, various design strategies have
                        emerged that critically addressed the impact of our actions on the climate and, as a response,
                        defined new production methods and/or formulated alternate forms of society that better correspond to the issues at hand.
                    </div>
                    <br/>
                    <div className="left box" style={{fontSize: "15px", fontFamily: "happy-times-NG_regular_master_web"}}>
                        Marjan van Helvert defined “Responsible Objects” (also the title of the track on responsible design in Object Stories)
                        as objects that behave responsibly, consciously and with care in relation to their <a href="#responsible_objects" aria-describedby="footnote-label" id="responsible_objects_ref">environment</a>.
                        Taking responsibility through responsible behavior affects and effects all parts of society and is perhaps the primary precondition in order for something (or someone) to co-exist.
                        Which raises the question how the museum as an institution withing society, can also contribute for the better within this shifting society. Not only by disseminating and opening up these good examples of design,
                        but also by becoming more self-aware and self-conscious by making the critical reflection ourselves of how we can act in a more caring manner.
                        An institution that does not only act about or upon society, but also for and in society.
                        As an interface that engages in a mutual relationship – a form of coexistence that moves beyond the mere display.
                        If not, we risk lapsing into a form of façadism in which programming about <a href="#sustainability_exhibitions" aria-describedby="footnote-label" id="sustainability_exhibitions_ref">sustainability</a> is not also sustainable;
                        a major challenge that prevails and is being addressed internationally within the (touring) exhibition <a href="#resource_hungry" aria-describedby="footnote-label" id="resource_hungry_ref">sector</a>.
                        In this sense, making the institution sustainable also implies a critical reprogramming of the museum and its <a href="#metabolism" aria-describedby="glossary-label" id="metabolism_ref">metabolism</a> as a whole.
                    </div>
                    <br/>
                    <h2 className="left box" style={{borderLeft: "3px solid black", paddingLeft: "5px"}}>__Who are we taking care for? <br/> On the Logic of Collecting and Sovereignty towards a Collection of Care.</h2>
                    <br/>

                    {/*read more: open the whole text only when asked for; clean up layout */}

                    {!readMore &&
                        <div>
                            <br/>
                            <p className="underlined" onClick={handleReadMore}> READ MORE </p>
                            <br/>
                        </div>
                    }

                    {readMore &&
                        <div>
                            <div className="left box" style={{fontSize: "15px", fontFamily: "happy-times-NG_regular_master_web"}}>
                                <p style={{fontSize: "15px", fontFamily: "P-ACR-AGON-Regular"}}>METABOLISM</p>Can we reimagine and
                                rethink the metabolism of the museum in such a way that the core tasks of the museum in terms of
                                taking care of the collection (conservation/preservation) are reformulated into
                                the sensible act of supporting a  <u>collection of care</u>?
                                Could we not agree that the process of expanding the collection through acquisition is essentially
                                a transfer of “caring for” an object from one person to the other? Defining what is meant by
                                “to take care for”, as well as the transformation of caring for a collection into a collection of
                                care may help us as a museum in our transformation into a sustainable and caring institution.
                                Let’s take for example the acquisition of the "sample book with paint recipes",
                                a 19th-century catalog of samples that used to belong to the personal library of Henry van de Velde,
                                before it was gifted to the museum. It is plausible that this book was used as a source of inspiration
                                by Henry van de Velde when designing one or more of his textile designs. We are now taking care of
                                this object by preserving it, yet it has almost never been on display in the museum, which begs the question,
                                who are we taking care of? And for who are we taking care?
                            </div>
                            <br/>
                            <div className="left box" style={{fontSize: "15px", fontFamily: "happy-times-NG_regular_master_web"}}>
                                <p style={{fontSize: "15px", fontFamily: "P-ACR-AGON-Regular"}}>TO TAKE CARE OF. </p>
                                Taking care of something or someone is a highly social endeavor and is perhaps even a premise for
                                us to co-exist. To support this act of caretaking we developed technology that aids us in the process.
                                However, this same technology can also lead to direct opposite when not used or approached <a href="#technological_senisbility" aria-describedby="footnote-label" id="technological_senisbility_ref">responsibly</a>.
                                So how do we define these interfaces of care? Is it possible to make use of technology to create a
                                model that speculates on the interrelationships between agents and objects in a collection?
                                What can technology teach us about the relationship between things, an ecology of
                                <a href="#ecology" aria-describedby="footnote-label" id="ecology_ref">technology</a> perhaps?
                                MODEL1: SENSE & SENSIBILITY looks into leveraging technology as a way to measure proximity.
                                At the same time it looks back at past interfaces that might be inspiring for the future.
                                Looking back at the color book today – as an interface that inspired – both manufacturers of paint,
                                craftsmen and artists alike; inspiration struck to consider ways to re-invoke this same ritual of
                                knowledge transfer, this same idea of one object inspiring the creation of another.  <br/><br/>

                                The interface below embodies this idea, recursively looping
                                over the collection, as one would flip the pages of book, to establish encounters of objects that are
                                related (in terms of their color) to a particular color sample in this book. By doing so,
                                an interaction (however briefly) between 4 objects is invoked that might or might not have inspired each other
                                one point in time. At the same time, this reorganization of the collection based on samples carefully
                                crafted and collected by an unknown colorist, evokes a "culture of anonymity" and broadens traditional
                                approaches to our collection that move beyond the dominant form of authorship. An inherent quality
                                of the work that often determines the visibility and/or invisibility of an object.

                            </div><br/>
                            <div className="left box" style={{fontSize: "15px", fontFamily: "happy-times-NG_regular_master_web"}}>
                                This approach of the collection as a social network, - a speculative system that connects in a transhistorical and transdisciplinary way -
                                transcends the art historical and institutionalized view - resounding the indeterminacy that might lie at the museum’s foundations.
                                At the same time it very much resonates with the "indeterminacy" that might lie at the museum’s foundations, a place where knowledge is constantly being (re-)produced based upon the passage of both human and non-human agency.
                                One could also read this exercise as if revisiting, invoking or emulating the museum in its early, former form, in which it went as a <a href="#models_museum" aria-describedby="footnote-label" id="models_museum_ref">model museum</a>;
                                (musee des modeles) a place with the social purpose of inspiring craftsmen by presenting good models or forms of design. Nostalgic, no. Co-existent, perhaps.
                            </div>
                            <br/>
                            <p className="underlined" onClick={handleReadMore}> HIDE TEXT </p>
                            <br/>

                        </div>
                    }

                </article>

            </div>
        </div>
    )
}

export default Model1_sensibility;