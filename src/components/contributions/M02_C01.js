import React, {Suspense} from "react"

const XenoHeader = React.lazy(() => import("../elements/xenoHeader"))

const M02_C01 = () => {
    return(
        <div className="rowScrollMain">
            <Suspense>
                <XenoHeader header_main={true} header_nav={true}/>
            </Suspense>
            <div className="grid--3_4_3">
                <div className="background__transparent"></div>
                <div>
                    <h1 className="text-center background__white" style={{height: "auto", padding: "80px"}}> THE MUSEUM AND ITS EXPANDED (DIGITAL) SPACE: FROM THE REPRESENTATIONAL TO THE PERFORMATIVE</h1>
                    <div className="grid--4_2_4">
                        <div className="background__transparent"/>
                        <p className="text-center background__white" style={{fontSize: "16px", fontFamily: "lineal", borderBottom: "2px var(--main__green) solid", borderTop: "2px var(--main__green) solid"}}>ESSAY</p>
                        <div className="background__transparent"/>
                    </div>
                    <p className="text text-center">
                        <i>
                            The digital has been a highly contested space and topic of debate in and around museums ever
                            since its inception around 35 years ago. The reason for this turbulence, and at the forefront
                            of the debate stood the premise that technology would come to replace the museum experience in
                            replacing physical exhibitions with virtual ones, taking away all reason for the visitor to come
                            to the museum and thus making it obsolete. Just as with any other emerging technology this
                            concern and reasonable doubt came forth from the misunderstanding and misinterpretation of the
                            technology at hand. Below you will find a series of events that all worked towards this
                            misunderstanding as well as alternative proposals for establishing a network of kinship,
                            where the wellbeing of either is related to the wellbeing of the network.
                        </i>
                    </p>

                    <div className="grid--even_2">
                        <div/>
                        <div>
                            <p className="left text"> in Greek mythology, <b>Mnemosyne</b> </p>
                        </div>
                    </div>

                    <p className="text text-center">
                        Mariana Fernandez (..) as a designer researches how to reach modes of co-existence,
                        co-authorship and co-creation with machines (AI). Vera van den Burg in a similar way investigates
                        how AI can be used as a technology in the creative design process. Both practices seek to find
                        ways that are mutually beneficiary, a search for negotiating with machines instead of technology
                        such as AI simply dictating our moving.
                    </p>

                </div>
                <div className="background__transparent"></div>
            </div>
        </div>
    )
}

export default M02_C01;