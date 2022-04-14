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
                            <div id="models_museum">
                                The museum was established in 1903 as a "models museum" (<em>modellenmuseum</em> or <em>musee des modelles</em>).
                                The collection comprised of good examples of various crafts and trades to inspire artists and craftsmen and
                                provide support for their training.<a href="#models_museum_ref" aria-label="Back to content">↩</a>
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
                        Marjan van Helvert defined “Responsible Objects” as objects that behave responsibly, consciously and with care in relation to their <a href="#responsible_objects" aria-describedby="footnote-label" id="responsible_objects_ref">environment</a>.
                        Taking responsibility through responsible behavior affects and effects all parts of society. Which raises the question how we as an institution,
                        can also contribute for the better within this shifting society. Not only by disseminating and opening up these good examples of design,
                        but also by making the critical reflection ourselves of how we can act in a more caring manner.
                        An institution that does not only act about society, but also for and in society.
                        If not, we risk lapsing into a form of façadism in which programming about <a href="#sustainability_exhibitions" aria-describedby="footnote-label" id="sustainability_exhibitions_ref">sustainability</a> is not also sustainable;
                        a major challenge that prevails and is being addressed internationally within the (touring) exhibition <a href="#resource_hungry" aria-describedby="footnote-label" id="resource_hungry_ref">sector</a>.
                        In this sense, making the institution sustainable also implies a critical reprogramming of the museum and its <a href="#metabolism" aria-describedby="glossary-label" id="metabolism_ref">metabolism</a> as a whole.
                    </div>
                    <br/>
                    <h2 className="left box" style={{borderLeft: "3px solid black", paddingLeft: "5px"}}>__Who are we taking care for? <br/> On the Logic of Collecting and Sovereignty towards a Collection of Care.</h2>
                    <br/>
                    <div className="left box" style={{fontSize: "15px", fontFamily: "happy-times-NG_regular_master_web"}}>
                        What if we try and alter our metabolism by moving extending the task of taking care of a collection (preservation),
                        towards the sensible act of supporting a collection of care? The ways in which objects enter and exit the museum, are perhaps telling;
                        some objects are acquired directly from the designer, others enter as gifts,
                        thus already prior being part of another collection. The transaction from one owner to the other
                        is in this case characterized by the (intimate) transfer of responsibility and care for a certain object.
                        The latter occurred in the acquisition of the "sample book with paint recipes",
                        a 19th-century catalog of samples that belonged to the personal library of Henry van de Velde.
                        It is possible that this book was used as a source of inspiration when designing one or more of his textile designs.
                    </div>
                    <br/>
                    <div className="left box" style={{fontSize: "15px", fontFamily: "happy-times-NG_regular_master_web"}}>
                        How can technology then aid us in invoking this idea of being inspired? Can we create a model that
                        establishes speculative relationships between the samples in this book on one hand and the digitized
                        objects in our collection on the other? By means of color extraction, the model tries to evoke a social network,
                        a system, in which objects relate to one another based on their color palette. At the same time,
                        this reorganization of the collection based on samples made and collected by an unknown colorist,
                        evokes a "culture of anonymity" while also seeking other approaches to our collection that move beyond
                        the dominant form of authorship. An inherent quality of the work that often through both its absence and/or presence
                        determines the visibility or invisibility of an object.
                    </div><br/>
                    <div className="left box" style={{fontSize: "15px", fontFamily: "happy-times-NG_regular_master_web"}}>
                        This approach of the collection as a social network, - a speculative system that connects in a transhistorical and transdisciplinary way -
                        transcends the art historical and institutionalized view - and also refers to the early history of the museum where it functioned as a models <a href="#models_museum" aria-describedby="footnote-label" id="models_museum_ref">museum</a>;
                        a place with the social purpose of inspiring craftsmen by presenting good models or forms of design.
                    </div>
                    <br/><br/>

                </article>

            </div>
        </div>
    )
}

export default Model1;