import React from "react";

const AccordionCollapsed = ({children, id, handleOpen}) => {
    return(
        <div className="collapsed" data-id={id} onClick={handleOpen}>
            {children}
        </div>
    )
}
export default AccordionCollapsed;