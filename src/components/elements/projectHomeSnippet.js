import React from "react";
import {useNavigate} from "react-router-dom";
import {
    fetchStudioProjectTitle,
    fetchStudioProjectDescription,
    fetchStudioProjectImage,
    fetchStudioID
} from "../utils/data_parsers";
import studiogrid_data from "../data/content/studiogrid.json"

const ProjectHomeSnippet = (props) => {

    let id, lang;
    id = props.id;
    lang = props.lang;

    let _projects = []
    studiogrid_data.map((x)=>{
        _projects.push(x);
    })

    return(
        <div>
            {_projects.map((project) => {

                let projectDesc, projectTitle, projectIMG, projectID;
                projectDesc = fetchStudioProjectDescription(project, lang, "text", id)
                projectIMG = fetchStudioProjectImage(project, "text", id);
                projectTitle = fetchStudioProjectTitle(project, lang, "text", id);
                projectID = fetchStudioID(project)
                if (projectID.startsWith(id) && id !== projectID){

                    return(
                        <div className="borderLine-left">
                            <h2 className="text-center uppercase box-title">{projectTitle}</h2>
                            <img className="img__fit center" src={projectIMG}
                                 onClick={() => props.setCarouselState(!props.carouselState)}/>
                            <p className="uppercase justify padding-10">{projectDesc}</p>
                        </div>
                    )
                }

            })}
        </div>
    )
}

export default ProjectHomeSnippet;