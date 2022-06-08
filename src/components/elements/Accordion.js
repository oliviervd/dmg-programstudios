import React, {useState} from "react";
import AccordionCollapsed from "./AccordionCollapsed";
import AccordionExpanded from "./AccordionExpanded";

/**
 * @function Accordion
 */

const Accordion = ({ children, initial }) => {
    const [open, setOpen] = useState(false)

    const handleOpen = (e) => {
        const id = e.target.getAttribute('data-id')
        id === open ? setOpen('') : setOpen(id)
    }

    return (
        <div>
            {React.Children.map(children, child => {
                const id = child.props.children[0].props.id

                const collapsed = React.cloneElement(child.props.children[0], {
                    handleOpen
                })

                const expanded = child.props.children[1]

                return (
                    <div>
                        {collapsed}
                        {id === open && expanded}
                    </div>
                )
            })}
        </div>
    )
}

Accordion.Collapsed = AccordionCollapsed;
Accordion.Expanded = AccordionExpanded;
Accordion.Item = ({children}) => children;

export default Accordion;