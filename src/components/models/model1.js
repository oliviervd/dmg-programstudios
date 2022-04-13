import React from "react";

const Model1 = () => {
    return(
        <div>
            <h1 className="center">MODEL 1: SENSE AND SENSIBILITY</h1>
            <div className="model-TextColumns__3">
                <div></div>
                <footer className="visually-hidden footNote__refs" id="footnote-label">
                    <div></div>
                    <ol>
                        <li>
                            <div id="object_stories"> <em>Object Stories </em> was part of the permanent collection presentation.
                                Built out of 6 layers (<em>Commisions & Commisioners, Making Matters, Curiosity, Responsible Objects,
                                    Bauhaus 100!</em> and <em>Children's Choices</em>) it highlighted
                                certain objects from the collection from a certain point of view.
                            </div>
                        </li>
                        <li>
                            <div id="responsible_objects">
                                Marjan van Helvert, The responsible object. A history of design ideology for the future. Valiz, Amsterdam, 2016
                                <a href="#responsible_objects_ref" aria-label="Back to content">↩</a>
                            </div>
                        </li>
                        <li>
                            <div id="resource_hungry">
                                The 2020 Art Verbier Summit <em>Resource Hungry</em> initiated a global dialogue to find harmony,
                                between art, ecology and resources. <a href="#resource_hungry_ref" aria-label="Back to content">↩</a>
                            </div>
                        </li>
                    </ol>
                    <div></div>
                </footer>

                <article>
                    <div className="left box" style={{fontSize: "15px", fontFamily: "happy-times-NG_italic_master_web"}}>
                        “When is an object socially or ecologically responsible?<a href="#object_stories" aria-describedby="footnote-label" id="object_stories_ref">"</a>
                        for four years this question was central in one of the tracks in Object Stories. It demonstrated that
                        although there is an increased focus on sustainability and social concern today, this phenomenon is not new in the design world per se. Throughout history,
                        various design strategies have emerged that critically addressed the impact of our actions on the climate and, as a response, defined new production methods and/or forms of society.
                    </div>
                    <br/>
                    <div className="left box" style={{fontSize: "15px", fontFamily: "happy-times-NG_italic_master_web"}}>
                        Marjan van Helvert defined these “Responsible Objects”; objects that behave responsibly, consciously and with care in relation to their <a href="#responsible_objects" aria-describedby="footnote-label" id="responsible_objects_ref">environment</a>.
                        In line with this, the question arises today on how we, as an institution, can also contribute within this shifting society.
                        Not only by disseminating and opening up these good examples of design, but also by making the critical reflection ourselves of
                        how we can act in a more caring manner. An institution that does not only act about society, but also for and in society.
                        If not, we risk lapsing into a form of façadism in which programming about sustainability is not also sustainable;
                        a major challenge that prevails and is being addressed internationally within the (touring) exhibition <a href="#resource_hungry" aria-describedby="footnote-label" id="resource_hungry_ref">sector</a>.
                        In this sense, making the institution sustainable also implies a critical reprogramming of the museum and its <a href="#metabolism" aria-describedby="glossary-label" id="metabolism_ref">metabolism</a> as a whole.
                    </div>
                    <br/>
                    <h2 className="left box" style={{borderLeft: "3px solid black", paddingLeft: "5px"}}>__Who are we taking care for? <br/> On the Logic of Collecting and Sovereignty towards a Collection of Care.</h2>
                    <br/>
                    <div className="left box" style={{fontSize: "15px", fontFamily: "happy-times-NG_regular_master_web"}}>
                        How can we alter our metabolism and move beyond taking care of our collection (preservation), towards the organization of a collection of care?
                        The way the museum acquires collection objects is varying, some objects are acquired directly from the designer, others are acquired as gifts,
                        thus already prior being part of another collection. The transaction from one owner to the other is in this case characterized by the (intimate)
                        transfer of responsibility and care for a certain object. The latter occurred in the acquisition of the "sample book with paint recipes",
                        a 19th-century catalog of samples that belonged to the personal library of Henry van de Velde.
                        It is possible that this book was used as a source of inspiration when designing one or more of his textile designs.
                    </div>
                    <br/>
                    <div className="left box" style={{fontSize: "15px", fontFamily: "happy-times-NG_regular_master_web"}}>
                        Taking this model, in which one object inspires the other, as a starting point, this model sets out
                        to investigate how technology can be leveraged for establishing speculative relationships between the
                        samples in this book on one hand and the digitized objects in our collection on the other.
                        By means of color extraction, a speculative network can be created in which objects relate to one another
                        based on their color palette. This reorganization of the collection based on samples made and collected by an unknown colorist,
                        evokes a "culture of anonymity" while also seeking other approaches to our collection that move beyond the dominant form of authorship.
                        An inherent quality of the work that often determines the visibility and/or invisibility of an object.
                    </div><br/>
                    <div className="left box" style={{fontSize: "15px", fontFamily: "happy-times-NG_regular_master_web"}}>
                        This approach of the collection as a social network, - a speculative system that connects in a transhistorical and transdisciplinary way -
                        transcends the art historical and institutionalized view - and also refers to the early history of the museum where it functioned as a model museum;
                        a place with the social purpose of inspiring craftsmen by presenting good models or forms of design.
                    </div>
                    <br/><br/>

                </article>

            </div>
        </div>
    )
}

export default Model1;