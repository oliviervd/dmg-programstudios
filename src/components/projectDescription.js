import Modal from "./modal/modal"

const ProjectDescription = () => {

    function refreshPage() {
        window.location.reload(false);
    }

    return(
        <div className="infoBoxLeft">
            <h2>*** project description</h2>
            <p style={{fontSize: "15px"}}>MODELS FROM THE PAST FOR THE FUTURE is a site for speculative knowledge production
                that is both reflective and performative in investigating and embracing the (as yet) unknown. <ul> As an
                    <bold> evolving platform</bold>, it seeks out alternative approaches and readings of the collection of Design museum Gent.</ul>
                <ul>As a <bold>living archive</bold>, it will grow and serve as a sensing layer for past, current and future research practices.</ul>
                If anything, it moves and shies away from classical approaches of indexing and traditional ways of opening up museum collections online.
                Although it takes the collection database as a starting point, it aims at remedying the wretch and clutch of its methodologies.
                <br/>

                <h1><italic>_pull. transmit. fall in love, and break up again.</italic></h1>

                <br/> The <Modal text="XENO-MORPHIC" description="Meillisoux arrgues that one can only approach the contingent
                nature of the world, which he calls 'hyperchaos', by creating a toolbox in which constant change could manifest itself.
                Through this platform, Design Museum Gent makes visible, and encourages change to manifest and in doing so resonates
                the layered, and altering nature of its collection, whether trough different readings in exhibitions or the lack thereof."></Modal>, the SENSORIAL & SENSIBLE, the TRANSHISTORICAL, the CURRENT and PAST-FUTURE are all ideologies
                and strategies that propel us in devising new kinds of interfaces that are perhaps more sensible to its users,
                more conscious of its surroundings and above all - foster inspiration.

                <br/>

                <h1>“break, mutate and build upon what is real and what isn't real.”
                </h1>


            </p>
        </div>
    )
}

export default ProjectDescription;