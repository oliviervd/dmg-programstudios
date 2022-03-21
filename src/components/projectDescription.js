const ProjectDescription = () => {

    function refreshPage() {
        window.location.reload(false);
    }

    return(
        <div className="infoBoxLeft">
            <h2>*** project description</h2>
            <p style={{fontSize: "15px"}}> MODELS FROM THE PAST FOR THE FUTURE takes the form of a speculative research into
                alternative approaches and readings of the collection of Design Museum Gent. As an evolving platform and living archive it will
                grow and serve as a sensing layer for past, current and future research. If anything, it moves and shies
                away from classical approaches of indexing and opening up museum collections online. Although it takes the collection database
                as a starting point, it aims at remedying the wretch and clutch of its methodologies.
                <br/>

                <a><h1 onClick={refreshPage} className="presser hoverLinkEffect" ><italic>_pull. transmit. fall in love, and break up again.</italic></h1></a>

                <br/> The XENO-MORPHIC, the SENSORIAL & SENSIBLE, the TRANSHISTORICAL, the CURRENT and PAST-FUTURE are all ideologies
                and strategies that push us in devicing new kinds of interfaces that are perhaps more sensible to its users,
                more aware of its surroundings and above all - kindle inspiration.

                <br/>

                <h1>“break, mutate and build upon what is real and what isn't real.”
                </h1>


            </p>
        </div>
    )
}

export default ProjectDescription;