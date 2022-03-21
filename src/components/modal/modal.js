import React, {useState} from "react";

const Modal = (props) => {
    const [modal, setModal] = useState(false);

    const toggleModal= () => {
        setModal(!modal)
    }

    return(
        <>
            <a className="refText" onClick={toggleModal}>{props.text}</a>
            {modal && (
                <div className="overlay" onClick={toggleModal}>
                    <div className="modal">
                        <p>{props.description}</p>
                    </div>
                    <button onClick={toggleModal}>close</button>
                </div>
            )}
        </>
    )

}


export default Modal;